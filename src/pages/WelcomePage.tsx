import React from 'react';
import { useReport } from '../context/ReportContext';

import { Star, Compass, Sparkles, Globe2, Clock, RefreshCw } from 'lucide-react';
export const WelcomePage: React.FC<{ pageIdx: number, setPage: (idx: number) => void }> = () => {
  const { reportData: data } = useReport();
  if (!data) return null;

  return (
    <div className="space-y-10 text-center pb-6 font-sans mt-4">


      {/* Title Section */}
      <div className="space-y-4 relative">

        <h2 className="text-[14px] md:text-base font-bold page-text tracking-[0.2em] uppercase">
          Namaste {data?.birthDetails?.name}
        </h2>
        <div className="w-16 h-1 bg-linear-to-r from-orange-400 to-indigo-500 mx-auto rounded-full mt-2" />
      </div>

      {/* User Name Pill */}
      <div className="inline-flex items-center px-4 py-2 rounded-full card-bg-secondary border border-default shadow-soft mt-4">
        <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
        <span className="page-text font-bold text-sm">
          Prepared exclusively for <span className="text-indigo-600 dark:text-indigo-400"> {data?.birthDetails?.name?.charAt(0).toUpperCase() + data?.birthDetails?.name?.slice(1).toLowerCase()}</span>
        </span>
      </div>

      {/* Introductory Text */}
      <p className="page-text text-[14.5px] max-w-lg mx-auto text-justify leading-relaxed font-medium">
        Your cosmic blueprint is uniquely yours. Through advanced AI and Vedic astrological analysis, we've mapped the celestial forces present at your birth to reveal powerful insights into your personality, destiny, karmic journey, and life's true purpose.
      </p>

      <div className="pt-8 w-full max-w-3xl mx-auto">
        <h3 className="text-[12px] font-semibold text-muted uppercase tracking-[0.15em] mb-8 text-center">
          Inside Your Report
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 text-left">
          {[
            { title: "Personalized Kundali Chart", desc: "Your unique cosmic blueprint revealed through the precise planetary positions at the moment of your birth.", icon: <Star size={16} /> },
            { title: "Core Personality", desc: "Discover the traits, strengths, motivations, and potential that define your true self.", icon: <Sparkles size={16} /> },
            { title: "Dasha Timeline", desc: "Explore the planetary periods shaping key events, opportunities, and transformations in your life.", icon: <Clock size={16} /> },
            { title: "Karmic Chakra Analysis", desc: "Uncover karmic influences and spiritual lessons guiding your personal evolution.", icon: <RefreshCw size={16} /> },
            { title: "Planetary Profiles", desc: "Understand how each planet influences your personality, relationships, career, and destiny.", icon: <Globe2 size={16} /> },
            { title: "Influential Signs", desc: "Reveal the zodiac energies that most strongly shape your character and life path.", icon: <Compass size={16} /> }
          ].map((item, id) => (
            <div key={id} className="flex items-start gap-4 group p-4 -m-4 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:shadow-sm transition-all duration-300">
              <div className="w-9 h-9 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0 mt-0.5 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                {item?.icon}
              </div>
              <div>
                <h4 className="text-[14px] font-semibold page-text dark:group-hover:text-white transition-colors">{item?.title}</h4>
                <p className="text-[13px] text-muted mt-1 leading-relaxed dark:group-hover:text-slate-300 transition-colors">{item?.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
