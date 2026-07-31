import React from 'react';
import { useReport } from '../context/ReportContext';
import { Compass, AlertCircle, Sparkles, CheckCircle } from 'lucide-react';
import { elementImages } from '../constants/elementImages';

export const BirthStarPage: React.FC<{ pageIdx: number, setPage: (idx: number) => void }> = () => {
  const { reportData: data } = useReport();
  const birthStar = data?.pages?.page10_nakshatra?.birthStar || data?.birthStar;
  if (!data) return null;

  return (
    <div className="space-y-8 pb-8">

      {/* Title Section */}
      <div className="text-center space-y-3 mt-4">
        {/* <p className="text-[12px] text-muted font-medium uppercase tracking-widest">Chapter 1</p> */}
        <div className="inline-flex items-center justify-center p-4 rounded-full mb-2 shadow-inner border border-white bg-gradient-to-br from-indigo-100 to-indigo-50 overflow-hidden w-20 h-20 relative group mx-auto">
          <img src={elementImages.ether} alt="Ether Space" className="w-full h-full object-cover absolute opacity-30 group-hover:scale-110 transition-transform duration-500" />
          <span className="text-4xl filter drop-shadow-soft relative z-10">⭐</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold page-text tracking-tight leading-tight max-w-xl mx-auto">
          Your Birth Star is {birthStar?.nkName} Nakshatra
        </h2>
        <p className="text-sm font-bold text-muted uppercase tracking-widest">
          Associated with the Deity {birthStar?.associatedDeity}
        </p>
        <div className="w-16 h-1 bg-linear-to-r from-indigo-400 to-orange-400 mx-auto rounded-full mt-4" />
      </div>

      {/* Main Description */}
      <div className="px-2">
        <div className="p-6 rounded-3xl bg-linear-to-r from-indigo-50/50 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-indigo-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border border-indigo-100 shadow-soft relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-400" />
          <div className="page-text text-[14px] md:text-[15px] leading-relaxed md:leading-loose font-medium text-left md:text-center max-w-2xl mx-auto z-10 relative space-y-4">
            <p>
              {birthStar?.nkName} Nakshatra! You are ruled by the <strong className="text-indigo-600">{birthStar?.rulingPlanet}</strong> and your zodiac sign is <strong className="text-indigo-600">{birthStar?.zodiacSign}</strong>. Your nakshatra is intimately associated with the god {birthStar?.associatedDeity}.
            </p>
            <p>
              {birthStar?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Traits Cards Grid */}
      <div className="grid grid-cols-1 gap-8 pt-4">

        {/* Personality Card */}
        <div className="relative p-6 sm:px-8 sm:py-7 rounded-3xl bg-gradient-to-br from-orange-50/80 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-orange-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border border-orange-100 shadow-soft hover:shadow-soft transition-all group hover:-translate-y-1">
          <div className="absolute -top-3 left-6 bg-linear-to-r from-orange-500 to-orange-400 text-white px-4 py-1 text-[11px] font-bold uppercase rounded-full shadow-soft tracking-wider flex items-center">
            <Sparkles className="w-3 h-3 mr-1" /> Core Personality
          </div>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center shadow-inner border border-white p-2.5">
              <img src={elementImages.fire} alt="Fire Energy" className="w-full h-full object-contain opacity-80" />
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <p className="page-text text-[14px] sm:text-[15px] leading-relaxed font-medium break-words">
                {`As a ${birthStar?.nkName}, you are naturally curious and possess a great desire for knowledge. You have an excellent memory and love to learn new things. You are also a good listener and are sensitive to the needs of others. You are respectful of tradition and often hold a position of authority or leadership within your community.`}
              </p>
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses Card */}
        <div className="relative p-6 sm:px-8 sm:py-7 rounded-3xl bg-gradient-to-br from-indigo-50/80 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-indigo-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border border-indigo-100 shadow-soft hover:shadow-soft transition-all group hover:-translate-y-1">
          <div className="absolute -top-3 left-6 bg-linear-to-r from-indigo-600 to-indigo-500 text-white px-4 py-1 text-[11px] font-bold uppercase rounded-full shadow-soft tracking-wider flex items-center">
            <Compass className="w-3 h-3 mr-1" /> Strengths & Weaknesses
          </div>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center shadow-inner border border-white p-2.5">
              <img src={elementImages.water} alt="Water Flow" className="w-full h-full object-contain opacity-80" />
            </div>
            <div className="space-y-5 flex-1 min-w-0 pt-1">
              <div>
                <span className="text-emerald-700 font-bold mb-1.5 flex items-center text-[13px] uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4 mr-1.5" /> Your Strengths
                </span>
                <p className="page-text text-[14px] sm:text-[15px] leading-relaxed font-medium break-words">
                  {birthStar?.strengths}
                </p>
              </div>
              <div className="h-px w-full bg-indigo-200/50" />
              <div>
                <span className="text-rose-600 font-bold mb-1.5 flex items-center text-[13px] uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 mr-1.5" /> Areas for Growth
                </span>
                <p className="page-text text-[14px] sm:text-[15px] leading-relaxed font-medium break-words">
                  {birthStar?.weaknesses}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
