import React, { useState, useEffect } from 'react';
import { useReport } from '../../context/ReportContext';
import { useTheme } from '../../context/ThemeContext';
import { KundliReportData, PlanetPosition } from '../../types';
import { ArrowLeft, ArrowRight, BookOpen, Compass, RefreshCw, Moon, Sun, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate, Navigate, Outlet, useLocation } from 'react-router-dom';
import { PAGE_TITLES } from '../ui/SharedElements';



// Pie Chart component for representing elements ratio perfectly matching Screenshot 4
const PieChartComponent: React.FC<{ ratios: { name: string; percentage: number }[] }> = ({ ratios }) => {
  const { resolvedTheme } = useTheme();
  let accumulatedAngle = 0;
  const radius = 64;
  const cx = 80;
  const cy = 80;

  // sum percentages to 100 max
  const total = ratios.reduce((sum, r) => sum + r.percentage, 0) || 100;

  const bgColors: { [key: string]: string } = {
    Ether: '#9333EA', // purple-600
    Air: '#FEF08A',   // soft yellow (amber-200)
    Water: '#3B82F6', // blue-500
    Fire: '#EF4444',  // red-500
    Earth: '#10B981', // green-500
  };

  const textColors: { [key: string]: string } = {
    Ether: 'text-purple-600',
    Air: 'text-yellow-700',
    Water: 'text-blue-600',
    Fire: 'text-red-700',
    Earth: 'text-green-600',
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-amber-500/[0.02] border border-light p-5 rounded-3xl">
      <div className="relative w-40 h-40">
        <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90">
          {ratios.map((element, idx) => {
            const val = element.percentage;
            if (val <= 0) return null;

            const sliceAngle = (val / total) * 360;
            const startAngle = accumulatedAngle;
            const endAngle = accumulatedAngle + sliceAngle;
            accumulatedAngle += sliceAngle;

            // Coordinates
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
                stroke={resolvedTheme === 'dark' ? '#0F172A' : '#FCFAF5'}
                strokeWidth="1.5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />
            );
          })}
          {/* Inner hole for warm donut booklet feel */}
          <circle cx="80" cy="80" r="32" fill={resolvedTheme === 'dark' ? '#0F172A' : '#FCFAF2'} />
        </svg>
      </div>

      {/* Legend list matching Screenshot 4 */}
      <div className="space-y-1.5 flex-1 min-w-[120px]">
        {ratios.map((element, idx) => {
          const color = bgColors[element.name] || '#64748B';
          return (
            <div key={idx} className="flex items-center text-xs font-normal page-text">
              <span className="w-3.5 h-3.5 rounded-md mr-2.5 transition-colors" style={{ backgroundColor: color }} />
              <span className="min-w-[50px]">{element.name}:</span>
              <span className={`ml-2 font-mono font-normal ${textColors[element.name] || 'text-slate-500'}`}>{element.percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Booklet Mockup illustration component shown on promo boxes
const BookletMockup: React.FC = () => {
  return (
    <div className="relative group w-32 h-44 flex-shrink-0 perspective-[1000px] select-none pointer-events-none hidden sm:block">
      <div className="w-full h-full bg-gradient-to-br from-[#2D1B7C] via-[#4F46E5] to-[#7C3AED] rounded-r-2xl shadow-[12px_16px_28px_rgba(33,21,92,0.3)] relative overflow-hidden flex flex-col justify-between p-4.5 border-l-[6px] border-l-[#1E115E]/80">
        {/* Ambient spiritual orbs */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#F4742E]/15 rounded-full blur-xl" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#6868F9]/15 rounded-full blur-xl" />

        {/* Top Header */}
        <div className="text-[7.5px] text-[#FDE5A9] font-normal uppercase tracking-widest text-center border-b border-white/10 pb-1.5 font-mono">
          AstroVed
        </div>

        {/* Dynamic Title Text */}
        <div className="my-auto text-center space-y-1 z-10">
          <div className="text-[10px] font-normal text-white leading-tight tracking-tight drop-shadow-md">
            Your Personalised
          </div>
          <div className="text-[12px] font-normal tracking-widest text-[#FCAE3B] uppercase bg-white/5 py-1 px-1.5 rounded border border-white/5 drop-shadow">
            Vedic Kundli
          </div>
          <div className="text-[6.5px] text-indigo-200 font-normal tracking-wider uppercase">
            145+ Pages Report
          </div>
        </div>

        {/* Footer Pt. Rishiraj */}
        <div className="text-center pt-1.5 border-t border-white/10 z-10">
          <span className="text-[6px] text-slate-300 block font-normal">Compiled by</span>
          <span className="text-[7px] text-[#F96D6D] font-normal uppercase tracking-widest">Pt. Rishiraj</span>
        </div>
      </div>
    </div>
  );
};

export const KundliReportBook: React.FC = () => {
  const { reportData, resetReport } = useReport();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    'welcome',
    'birth-star',
    'core-personality',
    'influential-signs',
    'dominant-element',
    'lagna-chart',
    'why-get-report',
    'karmic-chakra',
    'planetary-strengths',
    'planetary-profiles',
    'atmakaraka',
    'dasha-timeline',
    'premium-deliverables'
  ];

  const currentPath = location.pathname.split('/').pop() || 'welcome';
  const currentPage = Math.max(0, routes.indexOf(currentPath));

  const setPage = (idx: number) => {
    navigate(`/report/${routes[idx]}`);
  };
  const nextPage = () => {
    if (currentPage < routes.length - 1) navigate(`/report/${routes[currentPage + 1]}`);
  };
  const prevPage = () => {
    if (currentPage > 0) navigate(`/report/${routes[currentPage - 1]}`);
  };

  const handleResetReport = () => {
    resetReport();
    navigate('/');
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chartType, setChartType] = useState<'north' | 'south'>('north');

  // Track scroll details within page container
  const handleScrollToTop = () => {
    const el = document.getElementById('report-page-scroller');
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    handleScrollToTop();
  }, [location.pathname]);

  if (!reportData) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-transparent flex flex-col lg:flex-row overflow-hidden relative">
      {/* Decorative celestial background sparkles */}
      <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* Mobile Drawer Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-slate-900/40 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Modern Collapsible Table of Contents Navigation Drawer */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 h-screen z-50 lg:z-20 border-r border-default sidebar-bg flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out ${isSidebarOpen
          ? 'translate-x-0 w-[85vw] sm:w-80 shadow-2xl lg:shadow-none lg:w-80 opacity-100'
          : '-translate-x-full lg:translate-x-0 w-[85vw] sm:w-80 lg:w-0 lg:opacity-0 lg:overflow-hidden'
          }`}
      >
        <div className="p-5 border-b border-default sidebar-header-bg flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="text-indigo-600" size={20} />
            <span className="font-semibold text-sm uppercase tracking-wider sidebar-item-text">
              Report Index
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-muted hover:text-slate-800 dark:hover:text-slate-200 p-1 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable checklist items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
          {PAGE_TITLES.map((title, idx) => {
            const isActive = idx === currentPage;
            const isCompleted = idx < currentPage;
            return (
              <button
                key={idx}
                onClick={() => {
                  setPage(idx);
                  handleScrollToTop();
                  if (window.innerWidth < 1024) {
                    setIsSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center px-4 py-2.5 rounded-xl text-left text-xs font-normal transition-all group ${isActive
                  ? 'bg-[#FE7950] text-white shadow-md shadow-[#FE7950]/15'
                  : 'sidebar-item-text sidebar-item-hover'
                  }`}
              >
                <div className={`w-5 h-5 rounded-full mr-3 text-[10px] flex items-center justify-center font-bold border transition-colors ${isActive
                  ? 'border-white/40 bg-white/20 text-white'
                  : isCompleted
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400'
                    : 'border-slate-300 dark:border-slate-600 bg-transparent text-slate-400 group-hover:border-slate-400 dark:group-hover:border-slate-500 font-normal'
                  }`}>
                  {idx + 1}
                </div>
                <span className="flex-1 truncate">{title}</span>
                {idx === PAGE_TITLES.length - 1 && (
                  <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase font-normal font-mono ml-2 tracking-wider ${isActive ? 'bg-orange-500 text-white' : 'bg-orange-500 text-white animate-pulse'
                    }`}>
                    PRO
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Exit booklet back to start form */}
        <div className="p-4 border-t border-default sidebar-header-bg flex justify-center">
          <button
            onClick={handleResetReport}
            className="text-xs font-normal text-muted hover:text-orange-500 hover:text-orange-600 flex items-center space-x-1.5 transition-colors focus:outline-none"
          >
            <RefreshCw size={12} />
            <span>Enter Different Details</span>
          </button>
        </div>
      </aside>

      {/* Main Booklet container view */}
      <main className="flex-1 flex flex-col h-[100dvh] overflow-hidden relative">
        {/* Floating Show Index Button when Sidebar is closed */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-30 p-2 px-3 bg-[#FE7950] hover:bg-[#eb6a42] text-white text-xs font-normal rounded-lg transition-colors flex items-center shadow-lg"
          >
            <BookOpen size={13} className="mr-1.5" />
            <span>Show Index</span>
          </button>
        )}

        {/* Floating Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="absolute top-4 right-4 md:right-8 z-50 p-3 bg-white/90 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl dark:shadow-[0_0_15px_rgba(250,204,21,0.15)] rounded-full transition-all duration-500 hover:scale-110 group flex items-center justify-center overflow-hidden"
          title="Toggle Theme"
        >
          <div className="relative flex items-center justify-center w-6 h-6">
            <Moon
              className={`absolute transition-all duration-500 text-indigo-600 ${theme === 'light'
                ? 'opacity-100 rotate-0 scale-100 group-hover:-rotate-12'
                : 'opacity-0 rotate-90 scale-50'
                }`}
              size={22}
            />
            <Sun
              className={`absolute transition-all duration-500 text-yellow-400 ${theme === 'light'
                ? 'opacity-0 -rotate-90 scale-50'
                : 'opacity-100 rotate-0 scale-100 group-hover:rotate-45'
                }`}
              size={22}
            />
          </div>
        </button>

        {/* Outer PDF Page Body Grid */}
        <section
          id="report-page-scroller"
          className="flex-1 overflow-y-auto px-4 md:px-12 py-8 flex items-start justify-center custom-scrollbar"
        >
          {/* Virtual Booklet Frame centering */}
          <div className="w-full max-w-2xl page-bg border border-default shadow-book rounded-3xl md:rounded-[2rem] flex flex-col p-6 md:p-10 relative select-text min-h-[580px] justify-between page-text overflow-hidden">

            {/* Dynamic Header Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-slate-200/60">
              <motion.div
                className="h-full bg-emerald-500 rounded-r-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentPage + 1) / PAGE_TITLES.length) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>

            <div className="block flex-1">
              {/* Header inside the booklet page */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-light relative">
                {/* Left Logo */}
                <div className="flex-1 flex justify-start">
                  <button
                    onClick={() => { setPage(0); handleScrollToTop(); }}
                    className="cursor-pointer focus:outline-none hover:opacity-80 transition-opacity"
                  >
                    <img
                      src="https://cdn.astroved.com/images/images-av/AstroVed-Logo.svg"
                      alt="Astroved-logo"
                      className="h-6 sm:h-8 w-auto object-contain"
                    />
                  </button>
                </div>

                {/* Center Section Title */}
                <div className="flex-[2] sm:flex-none flex flex-col items-center justify-center text-center px-2">
                  <div className="flex items-center space-x-3 text-slate-400">
                    <div className="hidden sm:block w-6 h-px bg-linear-to-r from-transparent to-[#FE7950] mr-2"></div>
                    <Compass size={14} className="animate-spin" style={{ animationDuration: '25s' }} />
                    <div className="hidden sm:block w-6 h-px bg-gradient-to-l from-transparent to-[#FE7950] ml-2"></div>
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold page-text tracking-[0.15em] sm:tracking-[0.2em] uppercase text-center break-words">
                    {PAGE_TITLES[currentPage]}
                  </span>
                </div>

                {/* Right Balance Placeholder */}
                <div className="flex-1"></div>
              </div>

              {/* Render Page Contents on index */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-6 page-text leading-relaxed text-sm md:text-base font-normal selection:bg-orange-100"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Book Navigator Buttons */}
            <footer className="mt-10 pt-6 border-t border-light flex justify-between items-center">
              <button
                onClick={() => {
                  prevPage();
                  handleScrollToTop();
                }}
                disabled={currentPage === 0}
                className="flex items-center justify-center w-11 h-11 rounded-2xl card-bg border border-default sidebar-item-hover disabled:opacity-30 disabled:cursor-not-allowed shadow-soft transition"
              >
                <ArrowLeft size={16} className="page-text" />
              </button>

              {currentPage < PAGE_TITLES.length - 1 && (
                <button
                  onClick={() => {
                    nextPage();
                    handleScrollToTop();
                  }}
                  disabled={currentPage === PAGE_TITLES.length - 1}
                  className="flex items-center px-6 py-3 rounded-2xl bg-[#6868f9] hover:bg-[#5252e6] text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs font-normal shadow-md tracking-wider transition cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight size={14} className="ml-1.5" />
                </button>
              )}
            </footer>

          </div>
        </section>
      </main>
    </div>
  );
};

