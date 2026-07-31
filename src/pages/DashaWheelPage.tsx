import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReport } from '../context/ReportContext';
import { planetImages } from '../constants/planetImages';


const getPlanetImage = (planetName: string) => {
  const name = planetName.toLowerCase();
  if (name.includes('sun') || name.includes('surya')) return planetImages.surya;
  if (name.includes('moon') || name.includes('chandra')) return planetImages.moon;
  if (name.includes('mars') || name.includes('mangal') || name.includes('kuja')) return planetImages.mars;
  if (name.includes('mercury') || name.includes('budh') || name.includes('buddha')) return planetImages.buddha;
  if (name.includes('jupiter') || name.includes('guru') || name.includes('brihaspati')) return planetImages.guru;
  if (name.includes('venus') || name.includes('shukra') || name.includes('sukra')) return planetImages.sukra;
  if (name.includes('saturn') || name.includes('shani') || name.includes('sani')) return planetImages.sani;
  if (name.includes('rahu')) return planetImages.rahu;
  if (name.includes('ketu')) return planetImages.ketu;
  return planetImages.surya; // fallback
};

export const DashaWheelPage: React.FC<{ pageIdx: number, setPage: (idx: number) => void }> = ({ pageIdx, setPage }) => {
  const { reportData: data } = useReport();
  const dasha = data?.pages?.page6_dasha || data;
  if (!data) return null;

  return (
    <div className="space-y-8 pb-6">

      {/* Header Section */}
      <div className="text-center space-y-3 mt-4">
        <h2 className="text-2xl md:text-3xl font-semibold page-text tracking-tight leading-tight max-w-xl mx-auto">
          Current Dasha Timeline
        </h2>
        <div className="w-16 h-1 bg-linear-to-r from-emerald-400 to-teal-500 mx-auto rounded-full mt-4" />
      </div>

      {/* Hero Active Pill */}
      <div className="p-5 sm:p-6 card-bg-secondary rounded-3xl border border-default shadow-soft relative overflow-hidden flex items-center justify-center text-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-200/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 card-bg rounded-full shadow-soft text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-3 ring-1 ring-emerald-200/50">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active Phase
          </span>
          <h3 className="text-lg sm:text-xl font-bold page-text tracking-tight">
            {dasha?.dashaTimeline?.[0]?.planetName} {dasha?.dashaTimeline?.[0]?.levelName} & {dasha?.dashaTimeline?.[1]?.planetName} {dasha?.dashaTimeline?.[1]?.levelName}
          </h3>
        </div>
      </div>

      {/* Description Card */}
      <div className="p-6 rounded-3xl card-bg border border-default shadow-soft relative mx-1">
        <p className="text-[14px] page-text leading-relaxed font-medium">
          {dasha?.summaryText || dasha?.page6_dasha?.summaryText}
        </p>
      </div>

      {/* Timeline Section */}
      <div className="px-2 pt-2">
        <div className="relative border-l-2 border-light ml-6 space-y-8">
          {dasha?.dashaTimeline?.map((item: any, idx: number) => (
            <div key={idx} className="relative pl-8 sm:pl-10 group">

              {/* Timeline Planet Node */}
              <div className="absolute -left-[19px] sm:-left-[21px] top-1/2 -translate-y-1/2 w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-full border-4 border-default card-bg shadow-soft overflow-hidden z-10 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-soft ring-1 ring-slate-200 dark:ring-slate-700">
                <img
                  src={getPlanetImage(item?.planetName)}
                  alt={item?.planetName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5 rounded-3xl card-bg hover:card-bg-secondary border border-default shadow-soft transition-all duration-300 group-hover:shadow-soft group-hover:border-emerald-200/50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-1 z-10">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">
                    {item?.levelName}
                  </span>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold page-text text-base sm:text-lg tracking-tight">
                      Lord {item?.planetName}
                    </h4>
                  </div>
                </div>

                <div className="flex flex-col sm:text-right gap-1 sm:gap-0 z-10 card-bg-secondary sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none mt-2 sm:mt-0">
                  <div className="text-[11.5px] sm:text-[13px] font-mono font-bold page-text text-left sm:text-right whitespace-nowrap flex items-center gap-2">
                    <span className="sm:hidden text-[9px] uppercase tracking-widest text-emerald-600/70">From</span>
                    {item?.startDate}
                  </div>
                  <div className="text-[11.5px] sm:text-[11px] font-medium text-muted font-mono flex items-center justify-start sm:justify-end gap-2 whitespace-nowrap">
                    <span className="hidden sm:inline">until</span>
                    <span className="sm:hidden text-[9px] uppercase tracking-widest text-emerald-600/70 ml-0.5">To</span>
                    {item?.endDate}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
