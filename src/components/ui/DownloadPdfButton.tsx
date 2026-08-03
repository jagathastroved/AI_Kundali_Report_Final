import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface DownloadPdfButtonProps {
    targetId?: string;
    targetIds?: string[];
    filename?: string;
    className?: string;
}

/**
 * Fetches a cross-origin image THROUGH YOUR OWN BACKEND (no browser CORS
 * restriction applies server-to-server) and converts it to a base64 data URL.
 *
 * You need a tiny proxy endpoint on your backend, e.g.:
 *
 *   GET /api/image-proxy?url=<encoded-url>
 *
 * Express example:
 *   app.get('/api/image-proxy', async (req, res) => {
 *     const url = req.query.url as string;
 *     const allowed = ['cdn.astroved.com']; // whitelist!
 *     if (!allowed.some(h => new URL(url).hostname === h)) {
 *       return res.status(400).send('Domain not allowed');
 *     }
 *     const r = await fetch(url);
 *     const buf = Buffer.from(await r.arrayBuffer());
 *     res.setHeader('Content-Type', r.headers.get('content-type') || 'image/jpeg');
 *     res.setHeader('Access-Control-Allow-Origin', '*');
 *     res.send(buf);
 *   });
 *
 * Next.js API route example (app/api/image-proxy/route.ts):
 *   export async function GET(req: Request) {
 *     const url = new URL(req.url).searchParams.get('url')!;
 *     const allowed = ['cdn.astroved.com'];
 *     if (!allowed.includes(new URL(url).hostname)) {
 *       return new Response('Domain not allowed', { status: 400 });
 *     }
 *     const r = await fetch(url);
 *     const buf = await r.arrayBuffer();
 *     return new Response(buf, {
 *       headers: {
 *         'Content-Type': r.headers.get('content-type') || 'image/jpeg',
 *         'Access-Control-Allow-Origin': '*',
 *       },
 *     });
 *   }
 */
const IMAGE_PROXY_ENDPOINT = '/api/image-proxy'; // <-- point this to your real proxy route

async function urlToDataUri(url: string): Promise<string | null> {
    try {
        const proxied = `${IMAGE_PROXY_ENDPOINT}?url=${encodeURIComponent(url)}`;
        const res = await fetch(proxied);
        if (!res.ok) throw new Error(`Proxy fetch failed: ${res.status}`);
        const blob = await res.blob();
        return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (err) {
        console.warn(`Failed to proxy image ${url}, leaving as-is`, err);
        return null;
    }
}

// Domains that need to be routed through the proxy because they don't send
// Access-Control-Allow-Origin headers.
const CORS_BLOCKED_HOSTS = ['cdn.astroved.com', 'ui-avatars.com'];

function needsProxy(src: string): boolean {
    try {
        const host = new URL(src, window.location.href).hostname;
        return CORS_BLOCKED_HOSTS.includes(host);
    } catch {
        return false;
    }
}

export default function DownloadPdfButton({
    targetId,
    targetIds,
    filename = 'Numerology_Report.pdf',
    className = '',
}: DownloadPdfButtonProps) {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);

    const handleDownload = async () => {
        const idsToDownload = targetIds || (targetId ? [targetId] : []);

        if (idsToDownload.length === 0) {
            console.error('No target IDs provided for PDF generation');
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
                await new Promise(resolve => setTimeout(resolve, 100));

                let linkData: { x: number, y: number, w: number, h: number, url: string }[] = [];

                // Pre-fetch every blocked-CORS image ONCE, so onclone can swap
                // src synchronously per-node without re-fetching duplicates.
                const originalImgSrcs = Array.from(element.querySelectorAll('img'))
                    .map(img => img.src)
                    .filter(needsProxy);
                const uniqueSrcs = Array.from(new Set(originalImgSrcs));
                const dataUriMap = new Map<string, string>();
                await Promise.all(
                    uniqueSrcs.map(async (src) => {
                        const dataUri = await urlToDataUri(src);
                        if (dataUri) dataUriMap.set(src, dataUri);
                    })
                );

                // Workaround for html2canvas crashing on 'color(...)' (e.g., Safari P3 colors)
                const originalGetComputedStyle = window.getComputedStyle;
                window.getComputedStyle = function (el, pseudoElt) {
                    const style = originalGetComputedStyle(el, pseudoElt);
                    return new Proxy(style, {
                        get: function (target, prop) {
                            const value = target[prop as keyof CSSStyleDeclaration];
                            if (typeof value === 'function') {
                                if (prop === 'getPropertyValue') {
                                    return function (property: string) {
                                        const val = target.getPropertyValue(property);
                                        if (typeof val === 'string' && (val.startsWith('color(') || val.includes('oklch('))) {
                                            return 'rgb(0, 0, 0)';
                                        }
                                        return val;
                                    };
                                }
                                return value.bind(target);
                            }
                            if (typeof value === 'string' && (value.startsWith('color(') || value.includes('oklch('))) {
                                return 'rgb(0, 0, 0)'; // Fallback color
                            }
                            return value;
                        }
                    });
                };

                let canvas;
                try {
                    canvas = await html2canvas(element, {
                        scale: 2, // Higher resolution
                        useCORS: true,
                        logging: false,
                        backgroundColor: '#ffffff',
                        windowWidth: 800, // Match the hidden container width
                        onclone: async (_document, clonedElement) => {
                            // 1. FORCE LIGHT MODE: Remove dark class so text colors revert to black/gray
                            _document.documentElement.classList.remove('dark');

                            // 2. FIX GRADIENT TEXTS: html2canvas renders background-clip: text as solid blocks
                            const gradientTexts = clonedElement.querySelectorAll('.bg-clip-text') as NodeListOf<HTMLElement>;
                            gradientTexts.forEach(el => {
                                el.style.background = 'none';
                                el.style.webkitTextFillColor = 'currentcolor';
                                el.style.color = '#f97316'; // Fallback orange
                            });
                            const titleGradients = clonedElement.querySelectorAll('h2 span.bg-clip-text') as NodeListOf<HTMLElement>;
                            titleGradients.forEach(el => {
                                el.style.color = '#FBBF24'; // Fallback amber for titles
                            });

                            // 3. FIX CUT-OFF TEXT: Remove truncate and fix line-height
                            const truncates = clonedElement.querySelectorAll('.truncate') as NodeListOf<HTMLElement>;
                            truncates.forEach(el => {
                                el.classList.remove('truncate');
                                el.style.overflow = 'visible';
                                el.style.whiteSpace = 'normal';
                            });
                            const leadingNones = clonedElement.querySelectorAll('.leading-none') as NodeListOf<HTMLElement>;
                            leadingNones.forEach(el => {
                                el.classList.remove('leading-none');
                                el.style.lineHeight = '1.25';
                            });

                            // 4. FIX LAGNA CHART OVERLAPS: Adjust foreignObject text alignment
                            const foreignObjects = clonedElement.querySelectorAll('foreignObject div') as NodeListOf<HTMLElement>;
                            foreignObjects.forEach(el => {
                                el.style.justifyContent = 'flex-start';
                                el.style.paddingTop = '4px';
                            });

                            // 5. FIX CORS IMAGES: swap blocked-CORS <img> src with
                            // pre-fetched base64 data URIs (fetched via server proxy,
                            // so no browser CORS restriction applies).
                            const images = clonedElement.querySelectorAll('img');
                            images.forEach((img) => {
                                const dataUri = dataUriMap.get(img.src);
                                if (dataUri) {
                                    img.src = dataUri;
                                    img.removeAttribute('crossorigin');
                                } else if (needsProxy(img.src)) {
                                    // Proxy failed — avoid a broken/blocked request breaking the canvas render
                                    img.removeAttribute('src');
                                }
                            });

                            const links = clonedElement.querySelectorAll('a');
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
                                            url: link.href
                                        });
                                    }
                                }
                            });
                        }
                    });
                } finally {
                    window.getComputedStyle = originalGetComputedStyle;
                }

                const imgData = canvas.toDataURL('image/jpeg', 0.8);

                // Use pixels as unit and exact canvas dimensions for the PDF page
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;

                if (!pdf) {
                    pdf = new jsPDF({
                        orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
                        unit: 'px',
                        format: [imgWidth, imgHeight],
                    });
                } else {
                    pdf.addPage([imgWidth, imgHeight], imgWidth > imgHeight ? 'landscape' : 'portrait');
                }

                pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');


                linkData.forEach((link) => {
                    // Calculate scale based on the clone's elementRect vs the final img dimensions
                    // Actually, since we know html2canvas uses scale: 2
                    const scale = 2;
                    pdf!.link(link.x * scale, link.y * scale, link.w * scale, link.h * scale, { url: link.url });
                });
            }

            if (pdf) {
                pdf.save(filename);
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
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
                <Loader2 size={16} className="relative z-10 animate-spin flex-shrink-0" />
            ) : (
                <Download size={16} className="relative z-10 transition-transform duration-500 group-hover:-translate-y-0.5 flex-shrink-0" />
            )}

            <span className="relative z-10 text-[10px] sm:text-[11px] font-extrabold tracking-wide sm:tracking-[0.1em] uppercase drop-shadow-sm whitespace-nowrap">
                {isDownloading ? `Generating PDF... ${downloadProgress}%` : 'Download Report'}
            </span>
        </button>
    );
}