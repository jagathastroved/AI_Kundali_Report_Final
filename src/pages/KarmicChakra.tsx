import React from 'react';
import { useReport } from '../context/ReportContext';
import chakrasImage from '../assets/chakras.png';
import { Shield } from 'lucide-react';


export const KarmicChakraPage: React.FC<{ pageIdx: number, setPage: (idx: number) => void }> = () => {
  const { reportData: data } = useReport();
  const chakraAnalysis = data?.pages?.page3_dominant_chakra?.chakraAnalysis || data?.chakraAnalysis;
  if (!data) return null;

  return (
    <div className="space-y-8 pb-6">

      {/* Title Section */}
      <div className="text-center space-y-3 mt-4">
        <h2 className="text-2xl md:text-3xl font-semibold page-text tracking-tight leading-tight max-w-xl mx-auto">
          Stored Karma & Dominant Chakra
        </h2>
        <div className="w-16 h-1 bg-linear-to-r from-orange-400 to-indigo-500 mx-auto rounded-full mt-4" />
      </div>

      <div className="px-2">
        <p className="page-text text-[14px] leading-relaxed font-medium max-w-2xl mx-auto">
          Your Chakra Karma Distribution illustrates how karmic energy is expressed through each of the seven chakras. The percentage of each chakra represents its relative influence on your life's lessons and spiritual evolution. The chakra with the highest percentage marks the area where you are most likely to experience growth, transformation, and important karmic teachings throughout this lifetime.
        </p>
      </div>

      <div className="flex justify-center py-4">
        <div className="w-full max-w-md p-6 bg-gradient-to-b from-purple-50/50 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-purple-900/40 hover:dark:to-slate-800/40 transition-all duration-300 rounded-3xl border border-purple-100 shadow-soft flex justify-center">
          <img
            src={chakrasImage}
            alt="Chakras Map"
            className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      <div className="space-y-5 pt-4 font-sans px-1">

        {/* Dominant Chakra Insight */}
        <div className="p-6 rounded-3xl bg-linear-to-r from-indigo-50/80 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-indigo-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border border-indigo-100 shadow-soft relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center gap-4 group hover:shadow-soft transition-shadow">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-400" />
          <div className="w-16 h-16 flex-shrink-0 rounded-full overflow-hidden border-2 border-indigo-200 shadow-soft ml-2 bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
            <img src={chakrasImage} alt="Dominant Chakra" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-300 text-[13px] uppercase tracking-wider mb-1">
              Your Dominant Energy Center
            </h4>
            <h3 className="text-lg font-bold page-text tracking-tight mb-2">
              The {chakraAnalysis?.dominantChakra?.name} Chakra
            </h3>
            <p className="text-[14px] page-text leading-relaxed font-medium">
              {chakraAnalysis?.dominantChakra?.description}
            </p>
          </div>
        </div>

        {/* Spiritual Remedy */}
        <div className="p-6 rounded-3xl bg-linear-to-r from-emerald-50/80 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-emerald-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border border-emerald-100 shadow-soft relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center gap-4 group hover:shadow-soft transition-shadow">
          <div className="absolute top-0 left-0 w-2 h-full bg-emerald-400" />
          <div className="w-16 h-16 flex-shrink-0 rounded-full border-2 border-emerald-200 shadow-soft ml-2 bg-emerald-50 flex items-center justify-center group-hover:scale-105 transition-transform text-emerald-600">
            <Shield size={24} />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-[13px] uppercase tracking-wider mb-1">
              Spiritual Remedy
            </h4>
            <p className="text-[14px] page-text leading-relaxed font-medium">
              {chakraAnalysis?.dominantChakra?.remedy}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
