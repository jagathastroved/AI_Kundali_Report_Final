import React from 'react';
import { useReport } from '../context/ReportContext';
import { Star, Sparkles } from 'lucide-react';
import { PieChartComponent, renderPromoBox } from '../components/ui/SharedElements';
import { elementImages } from '../constants/elementImages';

export const FiveGreatElementsPage: React.FC<{ pageIdx: number, setPage: (idx: number) => void }> = ({ pageIdx, setPage }) => {
  const { reportData: data } = useReport();
  let elementAnalysis: any = data?.elementAnalysis;
  let pieChartRatios: any[] = data?.elementAnalysis?.ratios || [];
  let descriptionCards = data?.elementAnalysis?.ratios || [];

  if (data?.pages?.page2_elemental_balance) {
    const p2 = data.pages.page2_elemental_balance;
    elementAnalysis = {
      description: '',
      dominant: p2.title.replace('Your dominant elements are ', '')
    };
    pieChartRatios = Object.entries(p2.pie_chart || {}).map(([name, percentage]) => ({
      name,
      percentage: percentage as number
    }));
    descriptionCards = p2.element_cards?.map((c: any) => ({
      name: c.name,
      percentage: c.percent,
      description: c.description
    })) || [];
  }
  if (!data) return null;

  return (
    <div className="space-y-8 pb-6">

      {/* Title Section */}
      <div className="text-center space-y-3 mt-4">

        <h2 className="text-2xl md:text-3xl font-semibold page-text tracking-tight leading-tight max-w-xl mx-auto">
          Can you see how your qualities are connected to the blessings of nature?
        </h2>
      </div>

      <div className="px-4">
        <p className="page-text text-[14.5px] sm:text-[15px] leading-relaxed md:leading-loose font-medium text-left md:text-center max-w-2xl mx-auto opacity-90">
          The universe operates through five elemental forces: Fire, Earth, Air, Water, and Ether. Their influence within your chart reveals the energies that drive your personality, decisions, and life experiences. {elementAnalysis?.description}
        </p>
      </div>

      <div className="space-y-4 font-sans px-1 pt-2">
        {/* Fire Element */}
        <div className="flex flex-row items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-red-50/80 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-red-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border border-red-100 shadow-soft group hover:-translate-y-1">
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-100 flex items-center justify-center shadow-inner border border-white overflow-hidden p-1.5 sm:p-2 group-hover:scale-105 transition-transform duration-300">
            <img src={elementImages.fire} alt="Fire" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-bold text-red-900 dark:text-red-300 text-[14px] sm:text-[15px] uppercase tracking-wider">Fire Element (Agni)</h4>
            <p className="text-[13px] sm:text-[14px] page-text font-medium leading-relaxed opacity-90">Represents passion, determination, confidence, and the drive to pursue your goals with purpose.</p>
          </div>
        </div>

        {/* Earth Element */}
        <div className="flex flex-row items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-green-50/80 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-green-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border border-green-100 shadow-soft group hover:-translate-y-1">
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-100 flex items-center justify-center shadow-inner border border-white overflow-hidden p-1.5 sm:p-2 group-hover:scale-105 transition-transform duration-300">
            <img src={elementImages.earth} alt="Earth" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-bold text-green-900 dark:text-green-300 text-[14px] sm:text-[15px] uppercase tracking-wider">Earth Element (Prithvi)</h4>
            <p className="text-[13px] sm:text-[14px] page-text font-medium leading-relaxed opacity-90">Embodies stability, practicality, resilience, and the ability to build strong foundations in life.</p>
          </div>
        </div>

        {/* Air Element */}
        <div className="flex flex-row items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-50/80 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-amber-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border border-amber-100 shadow-soft group hover:-translate-y-1">
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-100 flex items-center justify-center shadow-inner border border-white overflow-hidden p-1.5 sm:p-2 group-hover:scale-105 transition-transform duration-300">
            <img src={elementImages.air} alt="Air" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-bold text-[#A16207] dark:text-amber-300 text-[14px] sm:text-[15px] uppercase tracking-wider">Air Element (Vayu)</h4>
            <p className="text-[13px] sm:text-[14px] page-text font-medium leading-relaxed opacity-90">Reflects curiosity, adaptability, intellect, and the power of communication and ideas.</p>
          </div>
        </div>

        {/* Water Element */}
        <div className="flex flex-row items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-blue-50/80 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-blue-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border border-blue-100 shadow-soft group hover:-translate-y-1">
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 flex items-center justify-center shadow-inner border border-white overflow-hidden p-1.5 sm:p-2 group-hover:scale-105 transition-transform duration-300">
            <img src={elementImages.water} alt="Water" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-bold text-blue-900 dark:text-blue-300 text-[14px] sm:text-[15px] uppercase tracking-wider">Water Element (Jala)</h4>
            <p className="text-[13px] sm:text-[14px] page-text font-medium leading-relaxed opacity-90">Signifies emotional depth, intuition, compassion, and a natural connection to feelings and creativity.</p>
          </div>
        </div>

        {/* Ether Element */}
        <div className="flex flex-row items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-50/80 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-purple-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border border-purple-100 shadow-soft group hover:-translate-y-1">
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-purple-200 flex items-center justify-center shadow-inner border border-white overflow-hidden p-1.5 sm:p-2 group-hover:scale-105 transition-transform duration-300">
            <img src={elementImages.ether} alt="Ether" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-bold text-purple-900 dark:text-purple-300 text-[14px] sm:text-[15px] uppercase tracking-wider">Ether Element (Akasha)</h4>
            <p className="text-[13px] sm:text-[14px] page-text font-medium leading-relaxed opacity-90">Represents spiritual awareness, higher consciousness, wisdom, and connection to the universal flow.</p>
          </div>
        </div>
      </div>

      {/* --- INSERTED FROM ELEMENTAL BALANCE PAGE --- */}
      <div className="pt-8 mt-8 border-t border-light">

        <div className="text-center space-y-2 mb-8">
          <p className="text-[12px] text-muted font-medium uppercase tracking-widest">Yogi Metrology</p>
          <h2 className="text-2xl font-semibold page-text tracking-tight leading-tight">
            Dominant Element Assessment
          </h2>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#FEF6E4] to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-orange-900/40 hover:dark:to-slate-800/40 transition-all duration-300 border-l-4 border-l-[#FE7950] border border-[#FDE5A9] shadow-soft mb-10 flex flex-row items-center justify-between gap-4 transform transition-transform hover:scale-[1.01]">
          <div className="flex-1">
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-800/60 dark:text-amber-400/80 uppercase tracking-widest block mb-1">Your Dominant Elements</span>
            <span className="text-[18px] sm:text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FE7950] to-orange-500 leading-tight block">
              {elementAnalysis?.dominant || 'Ether and Air'}
            </span>
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 card-bg rounded-full flex items-center justify-center shadow-soft border border-orange-100 flex-shrink-0 text-orange-400">
            <Sparkles className="w-5 h-5 sm:w-7 sm:h-7" />
          </div>
        </div>

        <div className="py-4 bg-slate-50/50 rounded-3xl border border-light mb-8 p-4">
          <PieChartComponent ratios={pieChartRatios} />
        </div>

        <div className="space-y-5">
          {descriptionCards.slice(0, 2).map((element: any, idx: number) => {
            const ElementIcon = idx === 0 ? Star : Sparkles;

            return (
              <div
                key={idx}
                className="p-6 rounded-3xl card-bg border border-default shadow-soft hover:shadow-soft transition-shadow relative overflow-hidden group"
              >
                {/* Subtle background glow */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40 ${idx === 0 ? 'bg-orange-400' : 'bg-blue-400'}`} />

                <div className="flex flex-row justify-between items-center border-b border-light pb-3 mb-3 relative z-10 gap-2">
                  <span className="text-[13px] sm:text-sm font-bold page-text uppercase tracking-wider flex items-center">
                    <ElementIcon className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${idx === 0 ? 'text-orange-500' : 'text-blue-500'}`} />
                    {element.name} Dominance
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold card-bg page-text px-3 py-1 rounded-full font-mono shadow-inner">
                    Ratio {element.percentage}%
                  </span>
                </div>
                <p className="text-[14.5px] sm:text-[15px] page-text leading-relaxed md:leading-loose font-medium opacity-90 relative z-10 pl-1" dangerouslySetInnerHTML={{ __html: `As per your precise Vedic sidereal coordinates, you are highly <span class="font-bold page-text">${element.name.toLowerCase()}</span> element dominated. This signifies that you ${element.description.toLowerCase()}` }} />
              </div>
            );
          })}
        </div>
        {/* Premium Insert Promo */}
        <div className="pt-6">
          {renderPromoBox(() => setPage(pageIdx + 1), 'element')}
        </div>
      </div>
    </div>
  );
};
