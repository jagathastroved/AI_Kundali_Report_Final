import React from 'react';
import { useReport } from '../context/ReportContext';
import { planetImages } from '../constants/planetImages';
import { zodiacSignImages } from '../constants/zodiacSigns';

export const BigThreeSignsPage: React.FC<{ pageIdx: number, setPage: (idx: number) => void }> = () => {
  const { reportData: data } = useReport();
  const personality = data?.pages?.page1_big3_detail?.personality || data?.personality;
  if (!data) return null;

  return (
    <div className="space-y-8 pb-6">

      {/* Title Section */}
      <div className="text-center space-y-3 mt-4">

        <p className="text-[12px] text-muted font-medium uppercase tracking-widest">As per your kundli,</p>
        <h2 className="text-2xl md:text-3xl font-semibold page-text tracking-tight leading-tight max-w-xl mx-auto">
          The three most influential and important signs for you
        </h2>
        <div className="w-16 h-1 bg-linear-to-r from-orange-400 to-indigo-500 mx-auto rounded-full mt-4" />
      </div>

      {/* Three big signs columns grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-sans pt-4">

        {/* Sun Card */}
        <div className="relative p-6 rounded-3xl bg-gradient-to-b from-orange-50/50 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-orange-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border border-orange-100 shadow-soft hover:shadow-soft transition-shadow text-center flex flex-col items-center group">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-200 to-orange-100 flex items-center justify-center shadow-inner border border-white mb-4 group-hover:scale-105 transition-transform overflow-hidden">
            <img src={planetImages.surya} alt="Surya (Sun)" className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-1">Surya (Sun)</span>
          <h4 className="font-bold page-text text-lg tracking-tight">
            {personality?.bigThree?.sun?.sign}
          </h4>
        </div>

        {/* Lagna (Rising Card) */}
        <div className="relative p-6 rounded-3xl bg-gradient-to-b from-rose-50 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-rose-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border-2 border-rose-200 shadow-soft hover:shadow-lg transition-shadow text-center flex flex-col items-center group transform sm:-translate-y-2">
          <div className="absolute -top-3 bg-linear-to-r from-rose-500 to-rose-400 text-white px-3 py-1 text-[10px] font-bold uppercase rounded-full shadow-soft tracking-wider">
            Most Important
          </div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-200 to-rose-100 flex items-center justify-center shadow-inner border border-white mb-4 mt-2 group-hover:scale-105 transition-transform overflow-hidden p-1">
            <img src={zodiacSignImages[personality?.bigThree?.ascendant?.sign?.split(' ')[0].toLowerCase()] || ''} alt={personality?.bigThree?.ascendant?.sign} className="w-full h-full object-contain" />
          </div>
          <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-1">Lagna (Rising)</span>
          <h4 className="font-bold text-rose-900 dark:text-rose-300 text-lg tracking-tight">
            {personality?.bigThree?.ascendant?.sign}
          </h4>
        </div>

        {/* Moon Card */}
        <div className="relative p-6 rounded-3xl bg-gradient-to-b from-indigo-50/50 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-indigo-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border border-indigo-100 shadow-soft hover:shadow-soft transition-shadow text-center flex flex-col items-center group">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-100 flex items-center justify-center shadow-inner border border-white mb-4 group-hover:scale-105 transition-transform overflow-hidden">
            <img src={planetImages.moon} alt="Chandra (Moon)" className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">Chandra (Moon)</span>
          <h4 className="font-bold page-text text-lg tracking-tight">
            {personality?.bigThree?.moon?.sign}
          </h4>
        </div>
      </div>

      {/* Dynamic description cards structured in matching color themes */}
      <div className="space-y-5 pt-4 font-sans">

        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-50/50 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-orange-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border border-orange-100 shadow-soft relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="absolute top-0 left-0 w-2 h-full bg-orange-400" />
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-full overflow-hidden border-2 border-orange-200 shadow-soft">
            <img src={planetImages.surya} alt="Sun" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 space-y-2">
            <h4 className="font-bold text-orange-900 dark:text-orange-300 text-[14px] sm:text-[15px] uppercase tracking-wider">
              Your Sun Sign Essence
            </h4>
            <p className="text-[14.5px] sm:text-[15px] page-text leading-relaxed md:leading-loose font-medium opacity-90">
              {personality?.bigThree?.sun?.description}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-50/50 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-rose-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border border-rose-100 shadow-soft relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="absolute top-0 left-0 w-2 h-full bg-rose-400" />
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-full overflow-hidden border-2 border-rose-200 shadow-soft card-bg p-1.5">
            <img src={zodiacSignImages[personality?.bigThree?.ascendant?.sign?.split(' ')[0].toLowerCase()] || ''} alt="Ascendant" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 space-y-2">
            <h4 className="font-bold text-rose-900 dark:text-rose-300 text-[14px] sm:text-[15px] uppercase tracking-wider">
              Your Rising Sign Persona
            </h4>
            <p className="text-[14.5px] sm:text-[15px] page-text leading-relaxed md:leading-loose font-medium opacity-90">
              {personality?.bigThree?.ascendant?.description}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-50/50 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-indigo-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border border-indigo-100 shadow-soft relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-400" />
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-full overflow-hidden border-2 border-indigo-200 shadow-soft">
            <img src={planetImages.moon} alt="Moon" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 space-y-2">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-300 text-[14px] sm:text-[15px] uppercase tracking-wider">
              Your Moon Sign Emotion
            </h4>
            <p className="text-[14.5px] sm:text-[15px] page-text leading-relaxed md:leading-loose font-medium opacity-90">
              {personality?.bigThree?.moon?.description}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
