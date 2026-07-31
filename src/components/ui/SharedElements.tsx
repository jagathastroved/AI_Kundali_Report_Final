import React from 'react';
import { motion } from 'motion/react';
import { Globe2, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import bookImage from '../../assets/Kundali_Report_book.png';

export const PAGE_TITLES = [
  'Welcome ',
  'Birth Star Analysis',
  'Core Personality',
  'Three Most Influential Signs',
  'Your Dominant Element',
  'Kundli Lagna Chart',
  'Why Get This Report?',
  'Karmic Chakra',
  'Planetary Strengths',
  'Planetary Profiles',
  'Atmakaraka Soul Focal',
  'Current Dasha Timeline',
  'Your Premium Deliverables'
];

export const PieChartComponent: React.FC<{ ratios: { name: string; percentage: number }[] }> = ({ ratios }) => {
  const [hoveredSlice, setHoveredSlice] = React.useState<{ name: string; percentage: number; color: string } | null>(null);
  let accumulatedAngle = 0;
  const radius = 64;
  const cx = 80;
  const cy = 80;

  const total = ratios.reduce((sum, r) => sum + r.percentage, 0) || 100;

  const bgColors: { [key: string]: string } = {
    Ether: '#9333EA',
    Air: '#FEF08A',
    Water: '#3B82F6',
    Fire: '#EF4444',
    Earth: '#10B981',
  };

  const textColors: { [key: string]: string } = {
    Ether: 'text-purple-600 dark:text-purple-400',
    Air: 'text-yellow-600 dark:text-yellow-400',
    Water: 'text-blue-600 dark:text-blue-400',
    Fire: 'text-red-600 dark:text-red-400',
    Earth: 'text-green-600 dark:text-green-400',
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/40 dark:to-slate-900/40 hover:dark:from-slate-800/60 hover:dark:to-slate-900/60 border border-light p-6 sm:p-8 rounded-[2rem] shadow-soft hover:shadow-lg transition-all duration-300">
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 drop-shadow-md flex items-center justify-center" onMouseLeave={() => setHoveredSlice(null)}>
        <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
          {ratios.map((element, idx) => {
            const val = element.percentage;
            if (val <= 0) return null;

            const sliceAngle = (val / total) * 360;
            const startAngle = accumulatedAngle;
            const endAngle = accumulatedAngle + sliceAngle;
            accumulatedAngle += sliceAngle;

            const x1 = cx + radius * Math.cos((startAngle * Math.PI) / 180);
            const y1 = cy + radius * Math.sin((startAngle * Math.PI) / 180);
            const x2 = cx + radius * Math.cos((endAngle * Math.PI) / 180);
            const y2 = cy + radius * Math.sin((endAngle * Math.PI) / 180);

            const largeArcFlag = sliceAngle > 180 ? 1 : 0;
            const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            const color = bgColors[element.name] || '#64748B';

            return (
              <motion.path
                key={idx}
                d={pathData}
                fill={color}
                stroke="currentColor"
                strokeWidth="3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: hoveredSlice?.name === element.name ? 1.05 : 1 }}
                transition={{ duration: 0.3, type: "spring" }}
                onMouseEnter={() => setHoveredSlice({ name: element.name, percentage: element.percentage, color: textColors[element.name] })}
                onClick={() => setHoveredSlice({ name: element.name, percentage: element.percentage, color: textColors[element.name] })}
                className="hover:opacity-90 transition-opacity cursor-pointer text-slate-50 dark:text-slate-900 origin-center"
                style={{ transformOrigin: '80px 80px' }}
              />
            );
          })}
          <circle cx="80" cy="80" r="32" className="fill-slate-50 dark:fill-slate-900/90 pointer-events-none" />
        </svg>

        {/* Center Hover Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {(() => {
            const displaySlice = hoveredSlice || (() => {
              if (!ratios.length) return null;
              const max = ratios.reduce((prev, current) => (prev.percentage > current.percentage) ? prev : current);
              return { name: max.name, percentage: max.percentage, color: textColors[max.name] };
            })();

            if (!displaySlice) return null;

            return (
              <motion.div
                key={displaySlice.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <span className={`block text-[10px] sm:text-xs font-bold uppercase tracking-wider ${displaySlice.color}`}>
                  {displaySlice.name}
                </span>
                <span className={`block text-xl sm:text-2xl font-black ${displaySlice.color}`}>
                  {displaySlice.percentage}%
                </span>
              </motion.div>
            );
          })()}
        </div>
      </div>

      <div className="space-y-2.5 flex-1 min-w-[140px] bg-white/50 dark:bg-slate-800/30 p-4 rounded-2xl border border-light">
        {ratios.map((element, idx) => {
          const color = bgColors[element.name] || '#64748B';
          return (
            <div key={idx} className="flex items-center text-[13px] font-medium page-text group">
              <span className="w-3.5 h-3.5 rounded-full mr-3 shadow-sm transition-transform group-hover:scale-110" style={{ backgroundColor: color }} />
              <span className="min-w-[55px] tracking-wide">{element.name}:</span>
              <span className={`ml-2 font-bold ${textColors[element.name] || 'text-slate-500'}`}>{element.percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const BookletMockup: React.FC = () => {
  return (
    <div className="flex-shrink-0 w-32 sm:w-40 relative flex justify-center items-center sm:ml-2 sm:mb-2">
      <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-glow-zoom" />
      <img
        src={bookImage}
        alt="Premium Kundali Report"
        className="w-full h-auto object-contain drop-shadow-2xl relative z-10 animate-book-zoom"
      />
    </div>
  );
};

export const renderPromoBox = (onNext: () => void, variant: 'combo' | 'remedies' | 'element' | 'planetary' = 'combo') => {
  return (
    <div className="mt-8 bg-gradient-to-br from-rose-950 via-indigo-950 to-purple-950 rounded-[2rem] p-6 sm:p-8 text-white relative overflow-hidden border border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(225,29,72,0.15)] flex flex-col sm:flex-row items-center gap-8 group">
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-500/20 rounded-full filter blur-3xl pointer-events-none group-hover:bg-rose-500/30 transition-all duration-700" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full filter blur-3xl pointer-events-none group-hover:bg-indigo-500/30 transition-all duration-700" />

      {/* Animated Floating Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Star className="absolute top-6 left-1/4 w-4 h-4 text-[#D4AF37]/60 animate-pulse" />
        <Star className="absolute bottom-10 right-1/4 w-6 h-6 text-[#FCAE3B]/40 animate-[spin_4s_linear_infinite]" />
        <Sparkles className="absolute top-12 right-12 w-5 h-5 text-rose-300/50 animate-bounce" />
      </div>

      <BookletMockup />

      <div className="flex-1 space-y-4 sm:space-y-5 relative z-10 flex flex-col justify-center text-center sm:text-left">
        <div>
          <div className="inline-flex items-center space-x-1.5 bg-[#D4AF37]/20 text-[#F3E5AB] px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest border border-[#D4AF37]/50 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Sparkles size={12} className="text-[#FCAE3B]" />
            <span>Get Your Premium Kundali Report</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight drop-shadow-sm px-1 sm:px-0">
            {variant === 'combo' ? 'Unlock Personalized Full Kundali Report'
              : variant === 'element' ? 'Unlock Your Complete Astrological Destiny'
                : variant === 'planetary' ? 'Unlock Your Premium Kundali Report'
                  : 'Get Complete Karmic Remedies & Rituals'}
          </h4>
          <p className="text-slate-300 text-[13px] sm:text-sm font-medium mt-3 leading-relaxed max-w-md sm:mx-0 mx-auto px-2 sm:px-0 opacity-90">
            {variant === 'combo'
              ? 'This summary is just 5% of your full profile. Discover precise timings, career peaks, and personalized gemstone recommendations.'
              : variant === 'element'
                ? 'Your Dominant Element reveals so much about you, but it\'s only the beginning! Buy the full premium report to unlock crucial insights into your future, wealth, health, and much more important cosmic secrets.'
                : variant === 'planetary'
                  ? 'Your planetary shield strengths reveal key cosmic forces, but it\'s only the beginning! Buy the full premium report to unlock deep insights into your destiny, wealth, and life paths.'
                  : 'Discover exact mantras, poojas, and daily rituals scientifically designed to balance your dominant doshas and clear karmic blocks.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 pt-2">
          {/* Primary Action - Buy Now */}
          <a href="https://www.astroved.com/prediction-services-personalized-kundali-report-P88426.aspx?promo=SL_Kundali_Report"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
          >
            <span>Book Your Kundali Report Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};
