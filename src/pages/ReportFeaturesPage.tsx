import React from 'react';
import { Star, ArrowRight, BookOpen, Compass, ShieldCheck, PieChart, Sparkles, TrendingUp } from 'lucide-react';
import { BookletMockup } from '../components/ui/SharedElements';
import { useNavigate } from 'react-router-dom';


export const ReportFeaturesPage: React.FC<{ pageIdx: number, setPage: (idx: number) => void }> = () => {
  const navigate = useNavigate();

  // Helper to attach icons based on the index to our dynamic content
  const iconList = [BookOpen, Compass, ShieldCheck, PieChart, Sparkles, TrendingUp];
  const styleList = [
    { gradient: 'from-amber-50 to-orange-50 dark:from-slate-800/20 dark:to-transparent hover:dark:from-orange-900/40 hover:dark:to-slate-800/40', iconColor: 'text-orange-500', iconBg: 'bg-orange-100 dark:bg-orange-900/30', borderColor: 'border-orange-200 dark:border-slate-700/60' },
    { gradient: 'from-emerald-50 to-teal-50 dark:from-slate-800/20 dark:to-transparent hover:dark:from-teal-900/40 hover:dark:to-slate-800/40', iconColor: 'text-teal-600', iconBg: 'bg-teal-100 dark:bg-teal-900/30', borderColor: 'border-teal-200 dark:border-slate-700/60' },
    { gradient: 'from-blue-50 to-indigo-50 dark:from-slate-800/20 dark:to-transparent hover:dark:from-indigo-900/40 hover:dark:to-slate-800/40', iconColor: 'text-indigo-500', iconBg: 'bg-indigo-100 dark:bg-indigo-900/30', borderColor: 'border-indigo-200 dark:border-slate-700/60' },
    { gradient: 'from-purple-50 to-fuchsia-50 dark:from-slate-800/20 dark:to-transparent hover:dark:from-fuchsia-900/40 hover:dark:to-slate-800/40', iconColor: 'text-fuchsia-600', iconBg: 'bg-fuchsia-100 dark:bg-fuchsia-900/30', borderColor: 'border-fuchsia-200 dark:border-slate-700/60' },
    { gradient: 'from-pink-50 to-rose-50 dark:from-slate-800/20 dark:to-transparent hover:dark:from-rose-900/40 hover:dark:to-slate-800/40', iconColor: 'text-rose-500', iconBg: 'bg-rose-100 dark:bg-rose-900/30', borderColor: 'border-rose-200 dark:border-slate-700/60' },
    { gradient: 'from-yellow-50 to-amber-50 dark:from-slate-800/20 dark:to-transparent hover:dark:from-amber-900/40 hover:dark:to-slate-800/40', iconColor: 'text-amber-600', iconBg: 'bg-amber-100 dark:bg-amber-900/30', borderColor: 'border-amber-200 dark:border-slate-700/60' }
  ];

  const featuresList = [
    { title: 'Your Kundli and its Calculation', description: 'Learn about yourself by knowing your special Kundli. Also, you will get 21 horoscope charts about different life parts.' },
    { title: 'Elements of your Kundli', description: 'Find out about your panchang and the predictions and remedies based on it. Also, get to know about your birth nakshatra. See which of the five elements (5 tattva) affects you the most.' },
    { title: 'Doshas and Remedies for you', description: 'Get predictions and remedies to follow for the dosha present in your Kundli, such as Manglik dosha, kalsarpa dosha, and many more.' },
    { title: 'In-depth analysis of your kundli', description: 'Know yourself through 11 detailed reports on key life parts. From your Lagna report to Career, Wealth & Finances, Marriage & relationship. Also, know your past life lessons and suggestions so that you do not make the same mistakes.' },
    { title: 'Detailed Kundli Predictions', description: 'Get detailed predictions, possible planet challenges in your kundli, and ways to fix them.' },
    { title: 'Dasha Predictions for the next 8 years', description: 'This report gives predictions and remedies for the next 6-8 years. Know about coming good and bad times, and how to handle them well.' }
  ];

  const features = featuresList.map((feat, idx) => ({
    ...feat,
    ...styleList[idx],
    Icon: iconList[idx]
  }));

  return (
    <div className="space-y-10 pb-10">
      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-br from-slate-900 to-indigo-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 card-bg/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex-1 space-y-4 relative z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full card-bg/10 border border-white/20 text-xs font-semibold tracking-wider uppercase text-orange-300">
            Premium Insight
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight drop-shadow-soft">
            Here we have prepared your in-depth personalized Premium Kundli Report
          </h2>
          <p className="text-sm sm:text-base text-indigo-100 leading-relaxed max-w-lg">
            Know your future predictions and remedies for the next 6 to 8 years. Also, get an in-depth Kundli analysis of your important life areas.
          </p>
        </div>
        <div className="flex-shrink-0 scale-100 sm:scale-110 relative z-10 transform sm:origin-right flex justify-center w-full sm:w-auto mb-6 sm:mb-0 sm:mt-0 order-first sm:order-last">
          <BookletMockup />
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold page-text tracking-tight mb-2">What you will get in this report?</h3>
          <p className="text-[14px] text-muted font-medium">Discover the comprehensive chapters included in your premium analysis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
          {features.map((feature, idx) => {
            const { Icon } = feature;
            return (
              <div
                key={idx}
                className={`flex flex-col p-6 rounded-3xl bg-gradient-to-br ${feature.gradient} border ${feature.borderColor} shadow-soft hover:shadow-soft transition-all duration-300 group hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h4 className="text-[16px] font-bold page-text mb-2 tracking-tight group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">{feature.title}</h4>
                <p className="text-[13.5px] page-text leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card-bg-secondary border border-default rounded-3xl p-6 sm:p-8 shadow-soft space-y-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 border-2 border-white shadow-soft">
              <img src="https://ui-avatars.com/api/?name=Dhaval+Motghare&background=6366f1&color=fff&size=150" alt="Dhaval Motghare" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold page-text text-lg">Dhaval Motghare</h4>
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-2">Premium Insight</span>
            </div>
          </div>
          <div className="flex space-x-1 card-bg px-3 py-1.5 rounded-full shadow-soft border border-light">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-[#FCAE3B] fill-[#FCAE3B]" />)}
          </div>
        </div>
        <p className="text-[14px] page-text leading-relaxed font-medium italic">
          "One of the most detailed and useful kundli report I have come across. It provides simple and effective remedies that are easy to follow. I am really satisfied after using it. Thanks for creating this useful kundli report !!!"
        </p>
      </div>

      <div className="pt-4 px-1 sm:px-0">
        <a
          href="https://www.astroved.com/prediction-services-personalized-kundali-report-P88426.aspx?promo=SL_Kundali_Report"
          className="w-full block relative group overflow-hidden bg-slate-900 text-white font-bold text-[15px] sm:text-lg py-4 sm:py-5 rounded-2xl shadow-xl flex items-center justify-center gap-2 sm:gap-3 transition-transform hover:-translate-y-1 active:scale-95"
        >
          {/* Animated gradient background for button */}
          <div className="absolute inset-0 bg-linear-to-r from-orange-500 via-rose-500 to-indigo-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>

          <span className="relative z-10 tracking-wide flex items-center justify-center gap-1.5 sm:gap-2 w-full px-1">
            <span className="text-center leading-tight">Get Your Kundli Report</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform shrink-0" />
          </span>
        </a>
      </div>

    </div>
  );
};
