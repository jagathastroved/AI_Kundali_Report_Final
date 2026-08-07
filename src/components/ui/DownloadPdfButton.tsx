import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface DownloadPdfButtonProps {
  targetId?: string;
  targetIds?: string[];
  filename?: string;
  className?: string;
}

// Proxy logic removed. html2canvas will fetch directly relying on native CORS.
export default function DownloadPdfButton({
  targetId,
  targetIds,
  filename = "Kundali_Report.pdf",
  className = "",
}: DownloadPdfButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = async () => {
    const idsToDownload = targetIds || (targetId ? [targetId] : []);

    if (idsToDownload.length === 0) {
      console.error("No target IDs provided for PDF generation");
      return;
    }

    try {
      setIsDownloading(true);
      setDownloadProgress(0);

      let pdf: jsPDF | null = null;

      for (let i = 0; i < idsToDownload.length; i++) {
        setDownloadProgress(Math.round((i / idsToDownload.length) * 100));

        const id = idsToDownload[i];
        const element = document.getElementById(id);

        if (!element) {
          console.warn(`Element with id ${id} not found, skipping...`);
          continue;
        }

        // Wait a tiny bit to ensure any immediate rendering is done
        await new Promise((resolve) => setTimeout(resolve, 100));

        let linkData: {
          x: number;
          y: number;
          w: number;
          h: number;
          url: string;
        }[] = [];

        // Proxy pre-fetch removed as per user request to use direct links.

        // Workaround for html2canvas crashing on 'color(...)' (e.g., Safari P3 colors)
        const originalGetComputedStyle = window.getComputedStyle;
        window.getComputedStyle = function (el, pseudoElt) {
          const style = originalGetComputedStyle(el, pseudoElt);
          return new Proxy(style, {
            get: function (target, prop) {
              const value = target[prop as keyof CSSStyleDeclaration];
              if (typeof value === "function") {
                if (prop === "getPropertyValue") {
                  return function (property: string) {
                    const val = target.getPropertyValue(property);
                    if (
                      typeof val === "string" &&
                      (val.startsWith("color(") || val.includes("oklch("))
                    ) {
                      return "rgb(0, 0, 0)";
                    }
                    return val;
                  };
                }
                return value.bind(target);
              }
              if (
                typeof value === "string" &&
                (value.startsWith("color(") || value.includes("oklch("))
              ) {
                return "rgb(0, 0, 0)"; // Fallback color
              }
              return value;
            },
          });
        };

        let canvas;
        try {
          canvas = await html2canvas(element, {
            scale: 2, // Higher resolution
            useCORS: true,
            allowTaint: true,
            logging: false,
            ignoreElements: (node) => {
              // Automatically ignore broken images so they don't crash html2canvas
              if (node.tagName && node.tagName.toLowerCase() === "img") {
                const img = node as HTMLImageElement;
                if (img.naturalWidth === 0 || img.naturalHeight === 0) {
                  return true;
                }
              }
              return false;
            },
            backgroundColor: "#ffffff",
            windowWidth: 800, // Match the hidden container width
            onclone: async (_document, clonedElement) => {
              // 1. FORCE LIGHT MODE: Remove dark class so text colors revert to black/gray
              _document.documentElement.classList.remove("dark");

              // 2. FIX GRADIENT TEXTS: html2canvas renders background-clip: text as solid blocks
              const gradientTexts = clonedElement.querySelectorAll(
                ".bg-clip-text",
              ) as NodeListOf<HTMLElement>;
              gradientTexts.forEach((el) => {
                el.style.background = "none";
                el.style.webkitTextFillColor = "currentcolor";
                el.style.color = "#f97316"; // Fallback orange
              });
              const titleGradients = clonedElement.querySelectorAll(
                "h2 span.bg-clip-text",
              ) as NodeListOf<HTMLElement>;
              titleGradients.forEach((el) => {
                el.style.color = "#FBBF24"; // Fallback amber for titles
              });

              // 3. FIX CUT-OFF TEXT: Remove truncate and fix line-height
              const truncates = clonedElement.querySelectorAll(
                ".truncate",
              ) as NodeListOf<HTMLElement>;
              truncates.forEach((el) => {
                el.classList.remove("truncate");
                el.style.overflow = "visible";
                el.style.whiteSpace = "normal";
              });
              const leadingNones = clonedElement.querySelectorAll(
                ".leading-none",
              ) as NodeListOf<HTMLElement>;
              leadingNones.forEach((el) => {
                el.classList.remove("leading-none");
                el.style.lineHeight = "1.25";
              });

              // 4. FIX LAGNA CHART OVERLAPS: Adjust foreignObject text alignment
              const foreignObjects = clonedElement.querySelectorAll(
                "foreignObject div",
              ) as NodeListOf<HTMLElement>;
              foreignObjects.forEach((el) => {
                el.style.justifyContent = "flex-start";
                el.style.paddingTop = "4px";
              });

              // 5. PREVENT CORS CRASH: Replace or remove images that are known to fail CORS without a proxy
              const originalImages = Array.from(
                document.querySelectorAll("img"),
              );
              const clonedImages = clonedElement.querySelectorAll("img");
              clonedImages.forEach((img) => {
                const original = originalImages.find(
                  (orig) => orig.src === img.src,
                );
                const isBroken = original && original.naturalWidth === 0;
                // AstroVed CDN strictly blocks CORS. Since we cannot use a proxy,
                // html2canvas will always crash when trying to fetch this logo.
                const isCorsBlocked =
                  img.src && img.src.includes("AstroVed-Logo.svg");

                if (isBroken || isCorsBlocked) {
                  // Completely remove the element from the clone.
                  // If it's not in the clone, html2canvas CANNOT crash on it!
                  img.remove();
                }
              });

              // Custom image src swapping removed; relying on html2canvas useCORS
              const links = clonedElement.querySelectorAll("a");
              const elementRect = clonedElement.getBoundingClientRect();
              links.forEach((link) => {
                if (link.href) {
                  const rect = link.getBoundingClientRect();
                  // Only add if it has actual dimensions (i.e., not display: none)
                  if (rect.width > 0 && rect.height > 0) {
                    linkData.push({
                      x: rect.left - elementRect.left,
                      y: rect.top - elementRect.top,
                      w: rect.width,
                      h: rect.height,
                      url: link.href,
                    });
                  }
                }
              });
            },
          });
        } finally {
          window.getComputedStyle = originalGetComputedStyle;
        }

        const imgData = canvas.toDataURL("image/jpeg", 0.8);

        // Use pixels as unit and exact canvas dimensions for the PDF page
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        if (!pdf) {
          pdf = new jsPDF({
            orientation: imgWidth > imgHeight ? "landscape" : "portrait",
            unit: "px",
            format: [imgWidth, imgHeight],
          });
        } else {
          pdf.addPage(
            [imgWidth, imgHeight],
            imgWidth > imgHeight ? "landscape" : "portrait",
          );
        }

        pdf.addImage(
          imgData,
          "JPEG",
          0,
          0,
          imgWidth,
          imgHeight,
          undefined,
          "FAST",
        );

        linkData.forEach((link) => {
          // Calculate scale based on the clone's elementRect vs the final img dimensions
          // Actually, since we know html2canvas uses scale: 2
          const scale = 2;
          pdf!.link(
            link.x * scale,
            link.y * scale,
            link.w * scale,
            link.h * scale,
            { url: link.url },
          );
        });
      }

      if (pdf) {
        pdf.save(filename);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setDownloadProgress(100);
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`group relative flex items-center justify-center space-x-2 w-full px-4 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-2xl shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(16,185,129,0.7)] transition-all duration-300 focus:outline-none overflow-hidden active:scale-[0.98] border border-white/10 ${className}`}
    >
      <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 ease-in-out -skew-x-12 -translate-x-[150%]"></div>

      {isDownloading ? (
        <Loader2
          size={16}
          className="relative z-10 animate-spin flex-shrink-0"
        />
      ) : (
        <Download
          size={16}
          className="relative z-10 transition-transform duration-500 group-hover:-translate-y-0.5 flex-shrink-0"
        />
      )}

      <span className="relative z-10 text-[10px] sm:text-[11px] font-extrabold tracking-wide sm:tracking-[0.1em] uppercase drop-shadow-sm whitespace-nowrap">
        {isDownloading
          ? `Generating PDF... ${downloadProgress}%`
          : "Download Report"}
      </span>
    </button>
  );
}
