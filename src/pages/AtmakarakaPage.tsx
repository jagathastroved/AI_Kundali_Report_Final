import React from 'react';
import { useReport } from '../context/ReportContext';
import { Sparkles, Heart } from 'lucide-react';

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

const getPlanetDisplayName = (planetName: string) => {
  if (!planetName) return '';
  const name = planetName.toLowerCase();
  if (name.includes('sun') || name.includes('surya')) return 'Sun (Surya)';
  if (name.includes('moon') || name.includes('chandra')) return 'Moon (Chandra)';
  if (name.includes('mars') || name.includes('mangal') || name.includes('kuja')) return 'Mars (Mangal)';
  if (name.includes('mercury') || name.includes('budh') || name.includes('buddha')) return 'Mercury (Budh)';
  if (name.includes('jupiter') || name.includes('guru') || name.includes('brihaspati')) return 'Jupiter (Guru)';
  if (name.includes('venus') || name.includes('shukra') || name.includes('sukra')) return 'Venus (Shukra)';
  if (name.includes('saturn') || name.includes('shani') || name.includes('sani')) return 'Saturn (Shani)';
  if (name.includes('rahu')) return 'Rahu';
  if (name.includes('ketu')) return 'Ketu';
  return planetName;
};

export const AtmakarakaPage: React.FC<{ pageIdx: number, setPage: (idx: number) => void }> = () => {
  const { reportData: data } = useReport();
  const atmakaraka = data?.pages?.page4_atmakaraka?.atmakaraka || data?.page4_atmakaraka?.atmakaraka || data?.atmakaraka;
  if (!data) return null;

  return (
    <div className="font-sans space-y-6 pb-6">
      {/* Title Section */}
      <div className="text-center space-y-3 mt-4 px-2">
        <h2 className="text-2xl md:text-3xl font-semibold page-text tracking-tight leading-tight max-w-xl mx-auto">
          Atmakaraka Insight
        </h2>
        <div className="w-16 h-1 bg-linear-to-r from-orange-400 to-indigo-500 mx-auto rounded-full mt-4" />
      </div>

      <p className="page-text text-[14px] leading-relaxed font-medium max-w-xl mx-auto px-4 text-center">
        Your Atmakaraka is the planet that holds the highest degree in your birth chart. It represents your soul's deepest purpose, the lessons you are destined to learn, and the path of spiritual growth in this lifetime.
      </p>

      {/* Hero Card */}
      <div className="mx-1 p-4 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-indigo-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border border-indigo-100 dark:border-indigo-800/50 shadow-soft relative overflow-hidden group hover:shadow-soft transition-shadow text-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400 opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-400 opacity-5 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[6px] border-white shadow-xl overflow-hidden mb-5 bg-indigo-50 dark:bg-indigo-500/10 relative group-hover:scale-105 transition-transform duration-500">
            <img
              src={getPlanetImage(atmakaraka?.planetName || '')}
              alt={atmakaraka?.planetName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent flex items-end justify-center pb-2">
              <Sparkles className="w-4 h-4 text-white/90" />
            </div>
          </div>

          <span className="text-[11px] font-bold uppercase text-indigo-500 tracking-widest mb-1">
            Your Atmakaraka
          </span>
          <h3 className="text-3xl font-black text-indigo-950 dark:text-indigo-100 mb-6 tracking-tight">
            {getPlanetDisplayName(atmakaraka?.planetName || '')}
          </h3>

          <div className="card-bg/80 p-5 sm:p-6 rounded-2xl border border-indigo-100/50 shadow-soft text-left w-full max-w-lg">
            <h4 className="font-bold page-text text-[13px] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" /> The Soul's Underlying Desire
            </h4>
            <p className="text-[15px] page-text leading-relaxed font-medium">
              {atmakaraka?.soulDesireText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
