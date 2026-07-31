import React from 'react';
import { useReport } from '../context/ReportContext';
import { PlanetPosition } from '../types';
import { planetImages } from '../constants/planetImages';
import { Lightbulb } from 'lucide-react';


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

export const PlanetaryProfilesPage: React.FC<{ pageIdx: number, setPage: (idx: number) => void }> = ({ pageIdx, setPage }) => {
  const { reportData: data } = useReport();
  const planetaryStrengths = data?.pages?.page8_planets_1 ? {
    planets: [
      ...(data.pages.page8_planets_1.planets || []),
      ...(data.pages.page8_planets_2?.planets || []),
      ...(data.pages.page8_planets_3?.planets || [])
    ].reduce((acc: any, p: any) => { acc[p.planet.toLowerCase()] = p; return acc; }, {})
  } : data?.planetaryStrengths;
  if (!data) return null;

  const planetKeys = ['sun', 'moon', 'mercury', 'jupiter', 'venus', 'mars', 'saturn', 'rahu', 'ketu'];

  // A mapping to get the correct image key. For keys like 'mercury', it maps to 'buddha'
  const imageKeyMap: Record<string, string> = {
    sun: 'surya', moon: 'moon', mercury: 'buddha', jupiter: 'guru', venus: 'sukra',
    mars: 'mars', saturn: 'sani', rahu: 'rahu', ketu: 'ketu'
  };

  return (
    <div className="space-y-8 pb-6">

      {/* Title Section */}
      <div className="text-center space-y-3 mt-4">
        <h2 className="text-2xl md:text-3xl font-semibold page-text tracking-tight leading-tight max-w-xl mx-auto">
          Planetary Profiles
        </h2>
        <div className="w-16 h-1 bg-linear-to-r from-orange-400 to-indigo-500 mx-auto rounded-full mt-4" />
      </div>

      <p className="page-text text-[14px] leading-relaxed font-medium text-center max-w-2xl mx-auto px-2">
        An in-depth analysis of how each planet's placement in your chart influences your character and life path.
      </p>

      {/* List all planets dynamically based on the payload */}
      <div className="space-y-6 pt-4 font-sans px-1">
        {planetKeys.map((key) => {
          const planet: PlanetPosition = planetaryStrengths?.planets[key];
          if (!planet) return null;

          const imgKey = imageKeyMap[key] || 'surya';
          const imgSrc = planetImages[imgKey];

          return (
            <div key={key} className="p-5 sm:p-6 rounded-3xl card-bg border border-light shadow-soft relative overflow-hidden flex flex-col gap-4 sm:gap-5 group hover:shadow-lg hover:border-indigo-100 hover:bg-gradient-to-br hover:from-indigo-50/50 hover:to-white dark:hover:from-indigo-900/40 dark:hover:to-slate-800/80 transition-all duration-300 hover:-translate-y-1 cursor-default">

              {/* Header: Image + Name */}
              <div className="flex items-center gap-3 sm:gap-4 border-b border-light pb-4 group-hover:border-indigo-50 transition-colors duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-full overflow-hidden border border-default shadow-soft card-bg-secondary flex items-center justify-center group-hover:scale-105 group-hover:border-indigo-200 group-hover:shadow-soft transition-all duration-300">
                  {imgSrc ? (
                    <img src={imgSrc} alt={planet?.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">🪐</span>
                  )}
                </div>
                <div>
                  <h3 className="text-[17px] sm:text-lg font-bold page-text tracking-tight leading-tight group-hover:text-indigo-950 dark:text-indigo-100 dark:group-hover:text-white transition-colors duration-300">
                    {getPlanetDisplayName(planet?.name || '')}
                  </h3>
                  <span className="text-[11px] sm:text-[12px] uppercase tracking-widest text-indigo-500 font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-300">
                    {getPlanetDisplayName(key)}
                  </span>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-3 sm:p-3.5 bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl border border-light flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-center group-hover:card-bg group-hover:border-indigo-50 group-hover:shadow-[0_2px_10px_-4px_rgba(79,70,229,0.1)] transition-all duration-300 overflow-hidden">
                  <span className="text-[11px] sm:text-[11px] uppercase font-semibold text-muted tracking-wider sm:mb-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors duration-300">Natal Sign</span>
                  <span className="font-semibold page-text text-[14px] leading-none group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300 truncate" title={planet?.sign}>{planet?.sign}</span>
                </div>
                <div className="p-3 sm:p-3.5 bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl border border-light flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-center group-hover:card-bg group-hover:border-indigo-50 group-hover:shadow-[0_2px_10px_-4px_rgba(79,70,229,0.1)] transition-all duration-300 overflow-hidden">
                  <span className="text-[11px] sm:text-[11px] uppercase font-semibold text-muted tracking-wider sm:mb-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors duration-300">Degree</span>
                  <span className="font-semibold page-text text-[14px] whitespace-nowrap font-mono group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">
                    {planet?.degree || (data?.pages?.page5_kundali_chart || data?.page5_kundali_chart)?.planet_positions?.find((p: any) => p.planet === ((planet as any).planet || planet?.name))?.degree || '-'}
                  </span>
                </div>
                <div className="p-3 sm:p-3.5 bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl border border-light flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-center group-hover:card-bg group-hover:border-indigo-50 group-hover:shadow-[0_2px_10px_-4px_rgba(79,70,229,0.1)] transition-all duration-300 overflow-hidden">
                  <span className="text-[11px] sm:text-[11px] uppercase font-semibold text-muted tracking-wider sm:mb-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors duration-300">Nakshatra</span>
                  <span className="font-semibold page-text text-[14px] leading-none group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300 truncate" title={planet?.nakshatra}>{planet?.nakshatra}</span>
                </div>
                <div className="p-3 sm:p-3.5 bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl border border-light flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-center group-hover:card-bg group-hover:border-indigo-50 group-hover:shadow-[0_2px_10px_-4px_rgba(79,70,229,0.1)] transition-all duration-300 overflow-hidden">
                  <span className="text-[11px] sm:text-[11px] uppercase font-semibold text-muted tracking-wider sm:mb-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors duration-300">House</span>
                  <span className="font-semibold page-text text-[14px] leading-none group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300 truncate">{planet?.house} House</span>
                </div>
              </div>

              {/* Description */}
              <div className="text-[14.5px] sm:text-[15px] page-text leading-relaxed md:leading-loose font-medium bg-indigo-50/30 dark:bg-indigo-900/10 p-4 sm:p-5 rounded-2xl border border-indigo-100/50 dark:border-indigo-800/30">
                {planet?.description}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
