import React, { useEffect, useState } from 'react';
import { X, ArrowRight, ScrollText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bookImage from '../assets/Kundali_Report_book.png';
import { getCountryCode, getCurrencyInfo, getCookie } from "../utils/locationCurrencyUtils";
import { usePrice } from "../context/PriceContext";

interface FullReportOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const reportFeatures = [
  "Future partner and married life",
  "Doshas and simple remedies",
  "Key years for money, health, and life changes"
];

export const FullReportOfferModal: React.FC<FullReportOfferModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { prices } = usePrice();
  const [priceDetails, setPriceDetails] = useState<{
    symbol: string;
    price: string;
    strikeout: string;
    savings: string;
  } | null>(null);

  useEffect(() => {
    let targetCurrencyCode = getCookie("currentcurrency");
    if (!targetCurrencyCode) {
      const countryCode = getCountryCode();
      const currencyInfo = getCurrencyInfo(countryCode);
      targetCurrencyCode = (currencyInfo.currencyCode || "").toUpperCase();
    }

    let matchedPrice = null;
    if (prices && prices.length > 0 && prices[0].ProductPriceList) {
      matchedPrice = prices[0].ProductPriceList.find((p: any) => p.CurrencyCode === targetCurrencyCode);
      if (!matchedPrice) {
        matchedPrice = prices[0].ProductPriceList.find((p: any) => p.CurrencyCode === "USD");
      }
    }

    if (matchedPrice) {
      let symbol = "₹";
      if (matchedPrice.CurrencyCode === "USD") symbol = "$";
      else if (matchedPrice.CurrencyCode === "MYR") symbol = "MYR";

      // console.log("Matched API Price Data for FullReportOfferModal:", matchedPrice);

      setPriceDetails({
        symbol,
        price: String(matchedPrice.SellingPrice),
        strikeout: String(matchedPrice.ListPrice),
        savings: String(matchedPrice.Yousave || (matchedPrice.ListPrice - matchedPrice.SellingPrice)),
      });
    }
  }, [prices]);

  if (!isOpen) return null;

  const handleUnlockClick = () => {
    onClose();
    navigate('/report/premium-deliverables');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 sm:p-8 bg-slate-900/40 animate-in fade-in duration-300">

      {/* Container - responsive max-width to look good on both small phones and tablets */}
      <div className="relative w-full max-w-[360px] sm:max-w-[420px] md:max-w-[460px] bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[96vh]">

        {/* Header - ultra compact */}
        <div className="relative bg-gradient-to-br from-[#4c1d95] to-[#7c3aed] p-4 sm:p-5 text-left shrink-0 rounded-t-2xl sm:rounded-t-3xl overflow-hidden flex min-h-[140px] sm:min-h-[150px]">

          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white hover:text-white bg-black/40 hover:bg-black/60 p-1.5 rounded-full transition-colors z-50"
          >
            <X size={16} />
          </button>

          {/* Text Content */}
          <div className="relative z-10 w-[65%] sm:w-[68%] pr-1">
            <h3 className="text-amber-400 text-[11px] sm:text-[12px] font-bold tracking-widest uppercase mb-1">
              Your Birth Chart Has More To Reveal
            </h3>
            <h2 className="text-white text-[18px] sm:text-[20px] font-bold leading-tight">
              Get your personalized <span className="text-amber-400">Kundali</span> and see what it says about your life ahead.
            </h2>
          </div>

          {/* Book Image - scaled down to fit compact header */}
          <div className="absolute -bottom-2 right-1 w-24 sm:w-28 drop-shadow-2xl z-10 transform -rotate-[5deg]">
            <img
              src={bookImage}
              alt="Kundali Report Book"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Content Area - ultra compact paddings/margins */}
        <div className="px-4 sm:px-5 py-3 sm:py-4 bg-white dark:bg-slate-900 rounded-b-2xl sm:rounded-b-3xl flex flex-col justify-between">

          <ul className="space-y-1.5 sm:space-y-2 mb-3 text-[14px] sm:text-[15px] font-medium text-slate-700 dark:text-slate-200 text-left">
            {reportFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-left">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center mt-0.5">
                  <ArrowRight size={10} className="text-amber-600 dark:text-amber-400 stroke-[2.5]" />
                </div>
                <span className="leading-tight mt-0.5 text-left">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Trust Elements - stacked very tightly */}
          <div className="space-y-1.5 mb-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 py-1.5 px-3 rounded-lg flex items-center justify-left gap-2 border border-slate-100 dark:border-slate-700/50">
              <div className="flex -space-x-2">
                <img className="w-5 h-5 rounded-full border border-white dark:border-slate-800 object-cover" src="https://randomuser.me/api/portraits/women/57.jpg" alt="User" />
                <img className="w-5 h-5 rounded-full border border-white dark:border-slate-800 object-cover" src="https://randomuser.me/api/portraits/men/53.jpg" alt="User" />
                <img className="w-5 h-5 rounded-full border border-white dark:border-slate-800 object-cover" src="https://randomuser.me/api/portraits/women/71.jpg" alt="User" />
                <img className="w-5 h-5 rounded-full border border-white dark:border-slate-800 object-cover" src="https://randomuser.me/api/portraits/men/73.jpg" alt="User" />
              </div>
              <span className="text-[13px] sm:text-[14px] font-semibold text-slate-700 dark:text-slate-300">
                Trusted by 7M+ people worldwide
              </span>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-500/20 py-1.5 px-2.5 rounded-lg flex items-center gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                <ScrollText size={14} className="text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-[12px] sm:text-[13px] font-medium text-orange-800 dark:text-orange-300 leading-tight text-left">
                Written by a real astrologer with 10+ years of experience. Not AI-generated.
              </p>
            </div>
          </div>

          {/* Unified Pricing and CTA - squished margins */}
          {priceDetails && (
            <div className="relative mt-1">
              {priceDetails.strikeout !== priceDetails.price && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-sm z-10 whitespace-nowrap">
                  Save {priceDetails.symbol} {priceDetails.savings} today
                </div>
              )}
              <a
                href="https://www.astroved.com/prediction-services-personalized-kundali-report-P88426.aspx?promo=SL_Kundali_Report"
                target="_blank"
                onClick={handleUnlockClick}
                className="block w-full relative overflow-hidden group bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl shadow-md transition-all transform hover:scale-[1.01] active:scale-[0.99] no-underline"
              >
                <div className="absolute inset-0 bg-white/20 w-full translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out skew-x-12" />
                <div className="flex flex-col sm:flex-row items-center justify-between px-3 py-2 sm:py-2.5">
                  <span className="text-[16px] sm:text-[18px] mb-0.5 sm:mb-0">Unlock My Full Kundali</span>
                  <div className="flex items-center gap-1.5 bg-black/10 px-2 py-1 rounded-lg backdrop-blur-sm">
                    {priceDetails.strikeout !== priceDetails.price && (
                      <span className="text-[12px] text-white/70 line-through">{priceDetails.symbol} {priceDetails.strikeout}</span>
                    )}
                    <span className="text-lg sm:text-xl font-black leading-none">{priceDetails.symbol} {priceDetails.price}</span>
                  </div>
                </div>
              </a>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full text-center mt-3 text-[13px] sm:text-[14px] font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline underline-offset-2 transition-colors"
          >
            Continue with the free report
          </button>

        </div>
      </div>
    </div>
  );
};
