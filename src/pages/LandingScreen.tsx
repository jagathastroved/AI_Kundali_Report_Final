import React, { useState } from 'react';
import { Sun, Star, ChevronDown, Compass, User, Clock, Infinity, Globe, Sparkles, Home, Moon, ArrowRight, Heart, Calendar, Book, Diamond, Droplet } from 'lucide-react';
import { BirthDetailsForm } from '../components/forms/BirthDetailsForm';
import KundliIllustration from '../assets/signs/birth_star_pooja.jpg';
import KundaliMatchingImg from '../assets/signs/kundali_matching.jpg';
import AstrologyWheelImg from '../assets/signs/astrology_wheel.jpg';

const faqs = [
  { q: "What is a Kundali and how is it calculated?", a: "A Kundali is your Vedic birth chart, calculated using your exact date, time, and place of birth to map planetary positions at the moment you were born." },
  { q: "What details do I need to generate my Janam Kundli?", a: "You need your date of birth, exact birth time, and birthplace. Accurate details help create a more precise birth chart." },
  { q: "Is an online Kundali accurate?", a: "The chart calculation largely depends on the accuracy of the birth details you enter. Even a small difference in birth time can affect factors such as the Ascendant and house positions." },
  { q: "What if I don't know my exact birth time?", a: "You can still explore limited astrological information, but an exact birth time is important for a detailed Kundali. An astrologer may also help with birth-time rectification." },
  { q: "Are Kundli and Kundali the same?", a: "Yes. Kundli and Kundali are commonly used spellings for the same Vedic birth chart, also known as Janam Kundli or Janam Patrika." },
  { q: "Can a Kundali tell me about my future?", a: "A Kundali is traditionally used to understand planetary patterns, strengths, challenges, and significant life periods rather than treating the future as fixed." },
  { q: "What can I learn from my Kundali?", a: "You can explore areas such as personality, career, relationships, finances, marriage, planetary periods, Yogas, and Doshas." },
  { q: "How many Gunas should match for marriage?", a: "In traditional Ashtakoota Kundali Matching, compatibility is assessed out of 36 Gunas, with 18 commonly considered a basic matching threshold. The complete charts should also be reviewed rather than relying only on the score." },
  { q: "What happens if Kundalis do not match?", a: "A lower matching score does not automatically mean a marriage cannot work. Factors such as Doshas, planetary placements, Dashas, and overall chart compatibility are also considered." },
  { q: "Can Doshas in a Kundali be reduced or remedied?", a: "Vedic Astrology traditionally recommends remedies based on the specific Dosha and its influence in the complete birth chart. Remedies may differ from one person to another." }
];

/**
 * Single-open accordion: openFaqIndex is a single number (or null), so opening
 * one item automatically closes whichever was open before. This is already
 * correct accordion behaviour — no extra state per item is used.
 */
const FaqItem = ({ question, answer, index, isOpen, onToggle }: { question: string, answer: string, index: number, isOpen: boolean, onToggle: () => void }) => {
  return (
    <div className={`w-full border rounded-xl overflow-hidden bg-white transition-colors duration-300 group ${isOpen ? 'border-[#EBE6F3] shadow-md relative' : 'border-slate-100 hover:border-[#EBE6F3] hover:shadow-sm relative'}`}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start sm:items-center justify-between gap-3 px-4 sm:px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B40C3]/40 cursor-pointer"
      >
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[13px] transition-colors ${isOpen ? 'bg-[#6B40C3] text-white' : 'bg-[#F5F2F9] text-[#6B40C3] group-hover:bg-[#EAE4F2]'}`}>
            {index + 1}
          </div>
          <span className={`flex-1 min-w-0 text-[13.5px] sm:text-[15px] font-medium transition-colors leading-snug break-words ${isOpen ? 'text-[#2E2459]' : 'text-slate-600 group-hover:text-slate-900'}`}>
            {question}
          </span>
        </div>
        <div className={`flex-shrink-0 mt-0.5 sm:mt-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#6B40C3]' : 'text-[#A297BD]'}`}>
          <ChevronDown size={18} />
        </div>
      </button>
      <div
        className={`px-4 sm:px-5 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-600 leading-relaxed pl-10 sm:pl-11 text-[13.5px] sm:text-[14px]">{answer}</p>
      </div>
    </div>
  );
};

export const LandingScreen: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="w-full bg-slate-900 text-slate-200 flex flex-col items-center justify-start relative overflow-x-hidden z-10">

      {/* ============ HERO — DARK SECTION ============ */}
      <div className="w-full flex flex-col items-center justify-center px-4 pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20 md:px-8 lg:px-12 relative z-10 bg-[radial-gradient(120%_120%_at_15%_10%,#1b1440_0%,#0f1226_45%,#0b0e1c_100%)]">

        {/* Decorative background — hidden on small screens so it never crowds the content */}
        <div className="hidden md:block absolute top-1/2 left-4 lg:left-10 -translate-y-1/2 opacity-20 pointer-events-none select-none text-indigo-500/10">
          <Sun size={340} className="lg:hidden" strokeWidth={0.5} />
          <Sun size={480} className="hidden lg:block" strokeWidth={0.5} />
        </div>
        <div className="hidden md:block absolute top-1/3 right-4 lg:right-10 -translate-y-1/2 opacity-20 pointer-events-none select-none text-orange-500/15">
          <Star size={220} className="lg:hidden" strokeWidth={0.5} />
          <Star size={320} className="hidden lg:block" strokeWidth={0.5} />
        </div>

        <div className="w-full max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-12 gap-10 lg:gap-12 items-stretch z-10">

          {/* Left Side - Content */}
          <div className="flex flex-col text-left w-full md:col-span-7 relative justify-start md:pr-4">
            <div>
              <span className="inline-flex items-center gap-2 text-amber-300/90 text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                <Sparkles size={14} /> Vedic Astrology, Simplified
              </span>
              <h1 className="text-[28px] leading-[1.15] sm:text-3xl lg:text-4xl xl:text-[42px] font-bold text-white tracking-tight lg:leading-tight mb-5">
                Discover Your True Path Through Kundali
              </h1>
              <p className="text-slate-300 text-[14.5px] sm:text-base leading-relaxed mb-5 relative z-10 max-w-xl">
                Unlock the hidden meanings of your birth chart and discover the cosmic blueprint that guides your journey. Explore how planetary alignments at your exact moment of birth shape your relationships, career path, and spiritual growth, giving you the clarity to navigate life's challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-5 lg:gap-y-6 mt-4 md:mt-auto">
              {[
                { title: "Personalized Kundali Chart", desc: "Access your detailed birth chart based on precise birth details.", Icon: Compass, color: "text-emerald-400", bg: "bg-emerald-900/30", border: "border-emerald-700/50" },
                { title: "Core Personality", desc: "Reveal your strengths, challenges, talents, and true life potential.", Icon: User, color: "text-amber-400", bg: "bg-amber-900/30", border: "border-amber-700/50" },
                { title: "Dasha Timeline", desc: "Understand current and future planetary periods shaping your journey.", Icon: Clock, color: "text-purple-400", bg: "bg-purple-900/30", border: "border-purple-700/50" },
                { title: "Karmic Chakra Analysis", desc: "Uncover karmic patterns and the spiritual lessons guiding your growth.", Icon: Infinity, color: "text-rose-400", bg: "bg-rose-900/30", border: "border-rose-700/50" },
                { title: "Planetary Profiles", desc: "Gain insights into how each planet influences different areas of life.", Icon: Globe, color: "text-blue-400", bg: "bg-blue-900/30", border: "border-blue-700/50" },
                { title: "Influential Signs", desc: "Learn how key zodiac signs affect your personality and life path.", Icon: Sparkles, color: "text-orange-400", bg: "bg-orange-900/30", border: "border-orange-700/50" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start sm:items-center group">
                  <div className={`mr-3.5 sm:mr-4 flex-shrink-0 rounded-full p-2 border ${item.bg} ${item.border} transition-colors duration-300 group-hover:bg-opacity-50`}>
                    <item.Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-indigo-200/90 text-[13.5px] sm:text-[15px] leading-relaxed">
                      <strong className="text-white font-medium">{item.title}</strong> — {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:col-span-5 h-full flex justify-center md:justify-end mt-2 md:mt-0">
            <div className="w-full max-w-md md:max-w-none md:sticky md:top-8">
              <BirthDetailsForm />
            </div>
          </div>
        </div>
      </div>

      {/* ============ ABOUT KUNDLI — LIGHT SECTION ============ */}
      <div className="w-full bg-white border-y border-slate-100 shadow-sm">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-12 pb-10 lg:pt-20 lg:pb-16 text-slate-700">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center md:items-stretch">

            {/* Image */}
            <div className="w-full order-1 md:order-none relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)] group aspect-[16/10] sm:aspect-[4/3] md:aspect-auto md:min-h-[340px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
              <img
                src={KundliIllustration}
                alt="Vedic Kundli Chart Illustration"
                className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center order-2 md:order-none md:py-4">
              <h2 className="text-[26px] sm:text-3xl lg:text-4xl font-serif font-bold text-[#2E2459] mb-5 lg:mb-6 tracking-tight">What Is a Kundli or Birth Chart?</h2>
              <div className="w-16 h-1 bg-amber-400 mb-5 lg:mb-6 rounded-full"></div>
              <p className="mb-5 leading-relaxed text-[14.5px] sm:text-[15px] lg:text-[16px] text-slate-700">
                A Kundli, or <a href="https://www.astroved.com/blogs/how-to-read-birth-chart-vedic-guide" target="_blank" rel="noopener noreferrer" className="text-[#6B40C3] font-medium hover:underline">Birth Chart</a>, is a snapshot of the sky at the exact time and place you were born.
              </p>
              <p className="mb-6 leading-relaxed text-[14.5px] sm:text-[15px] lg:text-[16px] text-slate-700">
                It shows your <a href="https://www.astroved.com/astropedia/en/freetools/lagna-calculator" target="_blank" rel="noopener noreferrer" className="text-[#6B40C3] font-medium hover:underline">Lagna</a>, planets, Houses, <a href="https://www.astroved.com/blogs/what-is-rasi-and-nakshatra" target="_blank" rel="noopener noreferrer" className="text-[#6B40C3] font-medium hover:underline">Nakshatras</a>, Yogas, Doshas, and <a href="https://www.astroved.com/astropedia/en/freetools/dasa-bhukti-calculator" target="_blank" rel="noopener noreferrer" className="text-[#6B40C3] font-medium hover:underline">Dashas</a>, that are believed to influence different areas of your life — such as personality, career, relationships, finances, and well-being. You can discover what may support you, where extra awareness may help, and which life periods could bring important changes through your birth chart.
              </p>
              <p className="leading-relaxed text-[14.5px] sm:text-[15px] lg:text-[16px] text-slate-800 font-medium bg-[#F8F6FA] p-5 sm:p-6 rounded-xl border border-purple-50">
                Think of your Kundali as a personal astrological guide — one that helps you understand yourself better and make more informed choices along the way.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ KEY ELEMENTS — DARK SECTION ============ */}
      <div className="w-full bg-[radial-gradient(120%_120%_at_85%_90%,#1b1440_0%,#0f1226_45%,#0b0e1c_100%)] shadow-sm relative overflow-hidden py-12 lg:py-16">
        <div className="absolute top-1/2 left-6 -translate-y-1/2 opacity-10 pointer-events-none select-none text-indigo-400 hidden md:block">
          <Compass size={260} strokeWidth={0.5} />
        </div>
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex flex-col items-center">

          <div className="text-center mb-8 px-2">
            <h4 className="text-[10px] md:text-[11px] font-bold text-amber-300/90 uppercase tracking-[0.2em] mb-3">See What Your Kundali Says About You</h4>
            <h2 className="text-[24px] sm:text-[28px] md:text-3xl font-serif font-bold text-white tracking-tight mb-4">Key Elements of Your Kundali</h2>
            <div className="w-24 h-[1px] bg-amber-200/60 mx-auto relative flex items-center justify-start">
              <div className="w-[5px] h-[5px] bg-amber-400 rotate-45 -ml-0.5"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full mb-6">
            {[
              { Icon: Star, bg: "#7C4EE4", title: "Lagna & Nakshatra", desc: "The foundational pillars of your astrological identity and emotional nature." },
              { Icon: Globe, bg: "#52C48E", title: "Planetary Placements", desc: "Understand how your unique planetary placements influence decisions." },
              { Icon: Home, bg: "#F4A7C9", title: "The 12 Houses", desc: "Explore the 12 houses linked to career, love, money, and well-being." },
              { Icon: Clock, bg: "#4A7DFF", title: "Planetary Periods", desc: "Favorable and challenging periods (Dashas) that will influence your journey." },
            ].map((card, idx) => (
              <div key={idx} className="bg-white/[0.06] backdrop-blur-sm rounded-[20px] p-6 lg:p-8 flex flex-col items-center text-center shadow-[0_4px_24px_rgba(0,0,0,0.2)] border border-white/10 hover:-translate-y-1 hover:bg-white/[0.09] transition-all duration-300">
                <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white mb-5 shadow-sm" style={{ backgroundColor: card.bg, boxShadow: `0 6px 16px ${card.bg}55` }}>
                  <card.Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold text-[15px] lg:text-[16px] mb-2.5">{card.title}</h3>
                <p className="text-indigo-200/80 text-[13px] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="w-full bg-white/[0.08] border border-white/10 rounded-xl py-3.5 px-5 sm:px-6 flex items-center justify-center gap-3 text-center">
            <User className="text-amber-300 flex-shrink-0" size={18} />
            <p className="text-indigo-100 font-medium text-[13.5px] sm:text-[14px]">
              Get a more personal view of your chart and what it means for you.
            </p>
          </div>
        </div>
      </div>

      {/* ============ HOW TO READ (light, with embedded dark CTA) ============ */}
      <div className="w-full bg-[#FCFBF8] border-b border-slate-200 shadow-sm relative overflow-hidden py-16 lg:py-24">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex flex-col items-center">

          <div className="text-center mb-12 lg:mb-16 px-2">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-amber-300 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-amber-400 rotate-45"></div></div>
              <h4 className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">How to Read Your Kundli</h4>
              <div className="w-8 h-[1px] bg-amber-300 relative"><div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-amber-400 rotate-45"></div></div>
            </div>
            <h2 className="text-[24px] sm:text-[28px] md:text-4xl font-serif text-slate-800 tracking-tight">
              A Simple Guide to <span className="text-[#C58320] font-bold">Understanding Your Birth Chart</span>
            </h2>
          </div>

          {/* 5 Steps — grid on mobile/tablet, row on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row items-start justify-between w-full gap-x-4 gap-y-10 md:gap-4 mb-16 relative">
            {[
              { n: "01", Icon: Sun, title: "Identify your Lagna (Ascendant)", desc: "The foundation of your chart. Even a 4-minute error in birth time can shift it into a different sign, changing your entire chart's house structure.", fill: false },
              { n: "02", Icon: Moon, title: "Check your Moon Sign and Nakshatra", desc: "These reveal your emotional nature, instincts, and inner responses.", fill: true },
              { n: "03", Icon: Home, title: "Explore the 12 Houses", desc: "Each one governs a life area: family, education, career, relationships, finances, health, and growth.", fill: false },
              { n: "04", Icon: Globe, title: "Study your planetary placements", desc: "The sign and house a planet sits in shows where its energy plays out.", fill: false },
              { n: "05", Icon: Sparkles, title: "Look for Yogas, Doshas, and Dashas", desc: "These highlight opportunities, challenges, and key life phases.", fill: false },
            ].map((step, idx, arr) => (
              <div key={idx} className="flex flex-col items-center text-center w-full md:w-1/5 relative group last:col-span-2 sm:last:col-span-1">
                <span className="text-[#C58320] font-serif font-bold text-xl mb-4">{step.n}</span>
                <div className="w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 mb-5 shadow-sm group-hover:scale-110 transition-transform">
                  <step.Icon size={24} strokeWidth={1.5} className={step.fill ? "fill-slate-900" : ""} />
                </div>
                <h3 className="text-slate-900 font-bold text-[13.5px] sm:text-[14px] mb-3 leading-snug px-1">{step.title}</h3>
                <p className="text-slate-500 text-[11.5px] sm:text-[12px] leading-relaxed px-1 sm:px-2">{step.desc}</p>
                {idx < arr.length - 1 && (
                  <div className="hidden md:block absolute top-[74px] -right-6 text-amber-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quote Box */}
          <div className="w-full max-w-4xl bg-[#FFFBF5] border border-amber-200/60 rounded-xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 shadow-sm mb-16 relative overflow-hidden">
            <div className="hidden sm:flex w-16 h-16 rounded-full border border-amber-300 items-center justify-center flex-shrink-0 text-amber-500 bg-white z-10">
              <Compass size={32} strokeWidth={1} />
            </div>
            <div className="hidden sm:block w-1 h-16 bg-amber-400 rounded-full z-10"></div>
            <div className="flex-1 relative z-10">
              <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed mb-1">
                A meaningful reading comes from connecting all five — not from fixating on one planet or placement in isolation.
              </p>
              <p className="text-slate-900 font-bold text-[15px] sm:text-[16px]">
                Think of your chart as one integrated story, not a set of separate predictions.
              </p>
            </div>
            <div className="absolute right-4 sm:right-6 bottom-2 sm:bottom-4 text-amber-500/10 font-serif text-6xl sm:text-8xl leading-none font-bold select-none pointer-events-none">”</div>
          </div>

          {/* CTA Banner — light gold theme, keeps this section fully light */}
          <div className="w-full bg-gradient-to-br from-[#FFF6E0] via-[#FFEFD1] to-[#FDE6BE] rounded-2xl p-8 sm:p-10 md:p-12 relative overflow-hidden shadow-[0_10px_40px_rgba(197,131,32,0.15)] border border-amber-200/70">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-amber-300/20 blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/4 w-24 h-24 rounded-full bg-white/40 blur-2xl pointer-events-none"></div>
            <Compass size={140} strokeWidth={0.6} className="hidden sm:block absolute -right-4 -bottom-6 text-amber-500/15 pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="text-left max-w-lg">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#3B2C6E] mb-3">Want a deeper read?</h3>
                <p className="text-[#6B5A8C] text-[14px] sm:text-[15px] leading-relaxed">
                  Book a consultation or get instant insights above.
                </p>
              </div>
              <button className="flex-shrink-0 bg-[#3B2C6E] hover:bg-[#2E2459] text-white font-bold py-3.5 px-6 rounded-lg transition-colors flex items-center gap-2 text-[14px] sm:text-[15px] shadow-lg shadow-[#3B2C6E]/20">
                <Compass size={18} strokeWidth={2} /> Get Your Kundali Reading <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============ MATCHING & DOSHAS — DARK SECTION ============ */}
      <div className="w-full bg-[radial-gradient(120%_120%_at_15%_15%,#1b1440_0%,#0f1226_45%,#0b0e1c_100%)] relative overflow-hidden py-16 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
        <div className="absolute bottom-0 right-0 w-72 h-72 opacity-10 pointer-events-none select-none text-orange-300 hidden md:block translate-x-1/4 translate-y-1/4">
          <Star size={280} strokeWidth={0.5} />
        </div>
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex flex-col items-center">

          <section className="w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 mb-16 md:mb-20 border-b border-white/10 pb-14 md:pb-16">
            <div className="flex-1 md:pr-8 text-left order-2 md:order-none">
              <h2 className="text-[24px] sm:text-3xl md:text-4xl font-serif font-bold text-white mb-4">Kundali Matching for Marriage (Kundli Milan)</h2>
              <div className="w-12 h-1 bg-amber-400 mb-6 rounded-full"></div>
              <p className="mb-6 leading-relaxed text-indigo-200/90 text-[14.5px] sm:text-[15px]">
                Kundli Milan is the process of comparing two birth charts to check compatibility for marriage. It goes beyond basic zodiac matching — studying Guna matching, emotional compatibility, health, family life, prosperity, and long-term harmony between two souls.
              </p>
              <a href="https://www.astroved.com/astropedia/en/freetools/kundali-matching" target="_blank" rel="noopener noreferrer" className="text-amber-300 font-bold text-[14.5px] sm:text-[15px] hover:text-amber-200 transition-colors flex items-center gap-1 group w-max">
                Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="flex-1 flex justify-center md:justify-end w-full order-1 md:order-none">
              <div className="w-full max-w-[280px] sm:max-w-[360px] aspect-square rounded-full bg-gradient-to-br from-[#FFF6E0] to-[#FDE6BE] shadow-[0_10px_40px_rgba(0,0,0,0.35)] relative flex items-center justify-center p-3">
                <img src={KundaliMatchingImg} alt="Kundali Matching" className="w-full h-full object-cover object-center rounded-full shadow-lg border-4 border-white" />
                <Star size={16} className="absolute top-6 left-6 sm:top-8 sm:left-8 text-white fill-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] animate-pulse" />
                <Star size={12} className="absolute bottom-10 right-4 sm:bottom-12 sm:right-6 text-amber-200 fill-amber-200 drop-shadow-[0_0_6px_rgba(252,211,77,0.8)] animate-pulse" />
              </div>
            </div>
          </section>

          <section className="w-full text-left">
            <h2 className="text-[24px] sm:text-3xl md:text-4xl font-serif font-bold text-white mb-2">Important Doshas in Kundali and Their Remedies</h2>
            <p className="mb-8 sm:mb-10 text-sm text-indigo-300/70 italic">Reviewed by Astrologer Names, 20+ years of Vedic astrology practice</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 w-full">
              {[
                { Icon: Star, title: "Mangal Dosha", sub: "(Manglik)", desc: "Mars in the 1st, 4th, 7th, 8th, or 12th house from Ascendant, Moon, or Venus.", remedy: "Hanuman Chalisa, Mangal puja, charity on Tuesdays.", link: "https://www.astroved.com/instant-pooja/mars-pooja" },
                { Icon: Moon, title: "Kaal Sarp Dosha", sub: "", desc: "All seven planets lie between Rahu and Ketu.", remedy: "Kaal Sarp Puja, Rudrabhishek, Naga pratishta.", link: "https://www.astroved.com/us/specials/kala-sarpa-dosha" },
                { Icon: User, title: "Pitru Dosha", sub: "", desc: "Seen through the Sun touched by Rahu, Ketu, or Saturn near the 9th house.", remedy: "Tarpan, Pitru puja, charity, Shraddha rituals.", link: "https://www.astroved.com/us/specials/tarpanam-ritual-package" },
                { Icon: Infinity, title: "Nadi Dosha", sub: "", desc: "Same Nadi between partners, weighted in matching.", remedy: "Nadi puja, donation, chanting for harmony.", link: "https://www.astroved.com/nadi/nadi-astrology" },
              ].map((card, idx) => (
                <div key={idx} className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.2)] border border-white/10 flex flex-col items-start h-full hover:bg-white/[0.09] transition-colors">
                  <div className="flex items-center gap-4 mb-4 w-full">
                    <div className="w-[42px] h-[42px] rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-amber-300 flex-shrink-0">
                      <card.Icon size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-white font-bold text-[15px] leading-snug">{card.title}{card.sub && <><br /><span className="text-indigo-300 font-normal">{card.sub}</span></>}</h3>
                  </div>
                  <p className="text-indigo-200/80 text-[13px] leading-relaxed mb-4 flex-grow">{card.desc}</p>
                  <div className="mb-4">
                    <span className="text-white font-bold text-[13px] block mb-1">Remedies:</span>
                    <p className="text-indigo-200/80 text-[13px]">{card.remedy}</p>
                  </div>
                  <a href={card.link} target="_blank" rel="noopener noreferrer" className="text-amber-300 font-medium text-[14px] hover:text-amber-200 transition-colors flex items-center gap-1 group mt-auto pt-2 border-t border-white/10 w-full">
                    Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ============ FOOTER SECTIONS — LIGHT ============ */}
      <div className="w-full bg-[#F8F6FA] relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-100/30 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex flex-col items-center">

          <section className="w-full flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-24 mb-16 lg:mb-24">
            <div className="flex-1 text-left order-2 md:order-none">
              <h2 className="text-[26px] sm:text-4xl md:text-[42px] font-serif font-bold text-[#2E2459] mb-4 leading-tight">
                What Makes AstroVed's Kundali Report Different?
              </h2>
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                <div className="w-2 h-2 rotate-45 bg-amber-400"></div>
                <div className="w-32 h-[1px] bg-amber-200"></div>
              </div>

              <p className="mb-5 leading-relaxed text-slate-700 text-[14.5px] sm:text-[15px]">
                Most Kundali reports are generated instantly by software — enter a birth date, get a PDF.
                AstroVed's paid report is different: it's personally drafted by a qualified astrologer with{' '}
                <strong className="text-[#5B438E] font-bold">10+ years of experience</strong>, not an algorithm.
              </p>
              <p className="mb-5 leading-relaxed text-slate-700 text-[14.5px] sm:text-[15px]">
                That means your Ascendant, Moon Sign, Birth Star, Dashas, and planetary placements aren't just listed — they're read together, the way a real astrologer reads a chart, before being written into guidance you can act on.
              </p>
              <p className="mb-6 leading-relaxed text-slate-700 text-[14.5px] sm:text-[15px]">
                And when a Dosha calls for a remedy, we go further: a consultation with an astrologer like Vijayalakshmi, or a pūjā performed on your behalf by our temple priests.
              </p>
              <p className="leading-relaxed font-bold text-[#5B438E] text-[14.5px] sm:text-[15px]">
                From a human hand to yours — not a template.
              </p>
            </div>
            <div className="flex-1 flex justify-center md:justify-end w-full relative order-1 md:order-none">
              <div className="w-full max-w-[300px] sm:max-w-[450px] aspect-square rounded-full mix-blend-multiply opacity-80 relative flex items-center justify-center">
                <img src={AstrologyWheelImg} alt="Astrology Wheel" className="w-[110%] h-[110%] object-cover object-center" />
              </div>
            </div>
          </section>

          {/* Try other tools */}
          <section className="w-full bg-white rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-slate-100 p-6 sm:p-10 md:p-12 mb-12">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
              <div className="w-10 sm:w-16 h-[1px] bg-amber-200"></div>
              <div className="w-2 h-2 rotate-45 border border-amber-400"></div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#2E2459] text-center">Try other tools</h2>
              <div className="w-2 h-2 rotate-45 border border-amber-400"></div>
              <div className="w-10 sm:w-16 h-[1px] bg-amber-200"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
              {[
                { name: 'Kundali Matching', icon: <Heart size={22} />, from: '#FDE8F1', to: '#FBD5E8', text: '#C23B7C' },
                { name: 'Panchang', icon: <Globe size={22} />, from: '#E4F7EE', to: '#C9EFDC', text: '#1F9D63' },
                { name: 'Daily Horoscope', icon: <Droplet size={22} />, from: '#E3F1FF', to: '#C9E5FF', text: '#2568C9' },
                { name: 'Gemstone Finder', icon: <Diamond size={22} />, from: '#FDF0E0', to: '#FBE0BC', text: '#C5761F' },
                { name: 'Auspicious Dates', icon: <Calendar size={22} />, from: '#F1E9FD', to: '#E1CDFA', text: '#7433C4' },
                { name: 'Astrology Blog', icon: <Book size={22} />, from: '#FFF3D6', to: '#FCE4A8', text: '#B8860B' }
              ].map((tool, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center group cursor-pointer rounded-2xl p-4 sm:p-5 border border-slate-100 hover:border-transparent hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div
                    className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                    style={{ background: `linear-gradient(135deg, ${tool.from}, ${tool.to})`, color: tool.text }}
                  >
                    {tool.icon}
                  </div>
                  <h4 className="text-[#2E2459] font-bold text-[12px] sm:text-[13px] md:text-[14px] flex items-center gap-1 group-hover:text-[#6B40C3] transition-colors">
                    {tool.name} <span className="text-amber-400 text-[16px] leading-none block translate-y-[1px] group-hover:translate-x-0.5 transition-transform">›</span>
                  </h4>
                </div>

              ))}
            </div>
          </section>

          {/* FAQs — single-open accordion, forced single column on mobile */}
          <section className="w-full bg-white rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-slate-100 p-6 sm:p-10 md:p-12 relative overflow-hidden">
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none">
              <Sun className="w-full h-full text-[#6B40C3]" />
            </div>

            <div className="flex flex-col items-center justify-center mb-8 sm:mb-10 relative z-10 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-10 sm:w-16 h-[1px] bg-amber-200"></div>
                <div className="w-2 h-2 rotate-45 bg-amber-300"></div>
                <div className="w-10 sm:w-16 h-[1px] bg-amber-200"></div>
              </div>
              <h2 className="text-[22px] sm:text-3xl md:text-[34px] font-serif font-bold text-[#2E2459] leading-tight">
                Frequently Asked Questions<br /><span className="text-[#6B40C3]">About Kundali</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 relative z-10 w-full max-w-5xl mx-auto">
              {faqs.map((faq, idx) => (
                <FaqItem
                  key={idx}
                  index={idx}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFaqIndex === idx}
                  onToggle={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                />
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};