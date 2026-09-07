import React, { useState } from 'react';
import { Sun, Star, ChevronDown, Sparkles, CheckCircle } from 'lucide-react';
import { BirthDetailsForm } from '../components/forms/BirthDetailsForm';
import BirthChartImg from '../assets/tools/birth_chart.jpg';
import horoscopeMatching from '../assets/tools/horoscope.jpg';
import MoonSignImg from '../assets/tools/moon_sign.jpg';
import MarriageCompatibilityImg from '../assets/tools/marriage_compatibility.jpg';
import LagnaCalculatorImg from '../assets/tools/lagna_calculator.jpg';
import kundaliFeatureImg from '../assets/images/kundali_feature_graphic.jpg';

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
    <div className={`w-full border rounded-xl overflow-hidden transition-colors duration-300 group ${isOpen ? 'bg-[#1A1D36] border-[#2E2459] shadow-md relative' : 'bg-[#12152B] border-white/5 hover:border-white/10 hover:bg-[#161930] relative'}`}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start sm:items-center justify-between gap-3 px-4 sm:px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 cursor-pointer"
      >
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[13px] transition-colors ${isOpen ? 'bg-amber-400 text-[#0F1226]' : 'bg-white/5 text-amber-400/80 group-hover:bg-white/10'}`}>
            {index + 1}
          </div>
          <span className={`flex-1 min-w-0 text-[13.5px] sm:text-[15px] font-medium transition-colors leading-snug break-words ${isOpen ? 'text-amber-400' : 'text-gray-300 group-hover:text-white'}`}>
            {question}
          </span>
        </div>
        <div className={`flex-shrink-0 mt-0.5 sm:mt-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-400' : 'text-gray-500 group-hover:text-gray-400'}`}>
          <ChevronDown size={18} />
        </div>
      </button>
      <div
        className={`px-4 sm:px-5 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-400 leading-relaxed pl-10 sm:pl-11 text-[13.5px] sm:text-[14px]">{answer}</p>
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
                Unlock the hidden meanings of your birth chart. Gain deep insights into your personality, destiny, and life's true purpose.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 lg:gap-y-8 mt-6 md:mt-6">
              {[
                { title: "Personalized Kundali Chart", desc: "Access your detailed birth chart based on precise birth details." },
                { title: "Core Personality", desc: "Reveal your strengths, challenges, talents, and true life potential." },
                { title: "Dasha Timeline", desc: "Understand current and future planetary periods shaping your journey." },
                { title: "Karmic Chakra Analysis", desc: "Uncover karmic patterns and the spiritual lessons guiding your growth." },
                { title: "Planetary Profiles", desc: "Gain insights into how each planet influences different areas of life." },
                { title: "Influential Signs", desc: "Learn how key zodiac signs affect your personality and life path." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start group">
                  <div className="mr-4 mt-0.5 flex-shrink-0 rounded-full p-1.5 border border-indigo-500/30 bg-indigo-500/10 transition-colors duration-300 group-hover:bg-indigo-500/20">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-[15px] sm:text-[16px] mb-1.5">{item.title}</h3>
                    <p className="text-indigo-200/80 text-[13.5px] sm:text-[14px] leading-relaxed pr-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:col-span-5 h-full flex flex-col justify-center items-center md:items-end mt-2 md:mt-0">
            <div className="w-full max-w-md md:max-w-none">
              <BirthDetailsForm />
            </div>
          </div>
        </div>
      </div>

      {/* ============ ARTICLE SECTION 1 — LIGHT ============ */}
      <div className="w-full bg-slate-50 relative overflow-hidden py-12 lg:py-16 border-t border-slate-200">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10 text-left">
          <div>
            <h2 className="text-[24px] sm:text-[28px] md:text-3xl font-bold text-[#2E2459] mb-6 tracking-tight">What Is a Kundli or Birth Chart?</h2>
            <div className="space-y-6 text-slate-700 text-[15px] sm:text-[16px] leading-[1.8]">
              <p>
                A Kundli, or <a href="https://www.astroved.com/blogs/how-to-read-birth-chart-vedic-guide" target="_blank" rel="noopener noreferrer" className="text-[#6B40C3] font-medium underline underline-offset-4 decoration-[#6B40C3]/30 hover:decoration-[#6B40C3] transition-colors">Birth Chart</a>, is a snapshot of the sky at the exact time and place you were born.
              </p>
              <p>
                It shows your <a href="https://www.astroved.com/astropedia/en/freetools/lagna-calculator" target="_blank" rel="noopener noreferrer" className="text-[#6B40C3] font-medium underline underline-offset-4 decoration-[#6B40C3]/30 hover:decoration-[#6B40C3] transition-colors">Lagna</a>, planets, Houses, <a href="https://www.astroved.com/blogs/what-is-rasi-and-nakshatra" target="_blank" rel="noopener noreferrer" className="text-[#6B40C3] font-medium underline underline-offset-4 decoration-[#6B40C3]/30 hover:decoration-[#6B40C3] transition-colors">Nakshatras</a>, Yogas, Doshas, and <a href="https://www.astroved.com/astropedia/en/freetools/dasa-bhukti-calculator" target="_blank" rel="noopener noreferrer" className="text-[#6B40C3] font-medium underline underline-offset-4 decoration-[#6B40C3]/30 hover:decoration-[#6B40C3] transition-colors">Dashas</a>, that are believed to influence different areas of your life - such as personality, career, relationships, finances, and well-being. You can discover what may support you, where extra awareness may help, and which life periods could bring important changes through your birth chart.
              </p>
              <p>
                Think of your Kundali as a personal astrological guide - one that helps you understand yourself better and make more informed choices along the way.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ ARTICLE SECTION 2 — DARK ============ */}
      <div className="w-full bg-[#0F1226] relative overflow-hidden py-12 lg:py-16">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[100px] translate-x-1/4 pointer-events-none"></div>
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10 text-left">

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-x-10 lg:gap-x-16 gap-y-8 items-center lg:items-start">

            {/* 1. Title */}
            <h2 className="text-[24px] sm:text-[28px] md:text-3xl font-bold text-[#FDE047] tracking-tight lg:col-start-1 lg:row-start-1 lg:mb-2 lg:self-end">
              See What Your Kundali Says About You
            </h2>

            {/* 2. Image (Between Title and Content on Mobile, Right Column on Desktop) */}
            <div className="relative lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] mx-auto lg:ml-auto lg:mr-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-purple-500/20 rounded-2xl blur-xl mix-blend-screen"></div>
                <img src={kundaliFeatureImg} alt="Kundali Birth Chart" className="relative w-full h-auto rounded-2xl shadow-2xl border border-white/10 object-cover" />
              </div>
            </div>

            {/* 3. Content */}
            <div className="space-y-6 text-[#D1D5DB] text-[15px] sm:text-[16px] leading-[1.8] lg:col-start-1 lg:row-start-2 lg:self-start">
              <p>
                No two birth charts are the same. Your free Kundli report is created from your birth details and helps you discover:
              </p>
              <ul className="list-disc pl-6 space-y-3 marker:text-[#FDE047]">
                <li>Your Lagna, Rasi, and Nakshatra</li>
                <li>Your unique <a href="https://www.astroved.com/blogs/how-planets-influence-daily-life" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 decoration-white/50 hover:decoration-white transition-colors">planetary placements</a></li>
                <li>Significant Yogas and Doshas</li>
                <li><a href="https://www.astroved.com/blogs/effects-of-planets-in-different-houses" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 decoration-white/50 hover:decoration-white transition-colors">12 Houses</a> and Patterns linked to career, love, money, and well-being</li>
                <li>Important planetary periods that may influence your journey</li>
              </ul>
              <p className="font-semibold text-white pt-2">
                Get a more personal view of your chart - and what it may mean for you.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* ============ ARTICLE SECTION 3 — LIGHT ============ */}
      <div className="w-full bg-slate-50 relative overflow-hidden py-12 lg:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10 text-left">
          <div>
            <h2 className="text-[24px] sm:text-[28px] md:text-3xl font-bold text-[#2E2459] mb-6 tracking-tight">How to Read Your Kundli: A Simple Guide to Understanding Your Birth Chart</h2>
            <div className="space-y-6 text-slate-700 text-[15px] sm:text-[16px] leading-[1.8]">
              <p>
                Your Kundli is more than a set of planetary positions - it's a symbolic map of your personality, patterns, strengths, and potential. You don't need to decode everything at once. Start with these five essentials:
              </p>
              <ul className="list-decimal pl-6 space-y-4 marker:text-[#6B40C3] marker:font-bold">
                <li><strong className="text-slate-900">Identify your Lagna (Ascendant)</strong> - the foundation of your chart. Even a 4-minute error in birth time can shift it into a different sign, changing your entire chart's house structure - which is why exact birth time matters so much.</li>
                <li><strong className="text-slate-900">Check your Moon Sign and Nakshatra</strong> - these reveal your emotional nature, instincts, and inner responses.</li>
                <li><strong className="text-slate-900">Explore the 12 Houses</strong> - each one governs a life area: family, education, career, relationships, finances, health, and growth.</li>
                <li><strong className="text-slate-900">Study your planetary placements</strong> - the sign and house a planet sits in shows where its energy plays out.</li>
                <li><strong className="text-slate-900">Look for Yogas, Doshas, and Dashas</strong> - these highlight opportunities, challenges, and key life phases.</li>
              </ul>
              <p className="pt-2">
                A meaningful reading comes from connecting all five - not from fixating on one planet or placement in isolation. Think of your chart as one integrated story, not a set of separate predictions.
              </p>
              <p className="font-semibold text-slate-900">
                Want a deeper read? <a href="#" className="text-[#6B40C3] underline underline-offset-4 decoration-[#6B40C3]/30 hover:decoration-[#6B40C3] transition-colors">Book a consultation</a> or get instant insights above.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ ARTICLE SECTION 4 — DARK ============ */}
      <div className="w-full bg-[#0F1226] relative overflow-hidden py-12 lg:py-16">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10 text-left">
          <div>
            <h2 className="text-[24px] sm:text-[28px] md:text-3xl font-bold text-[#FDE047] mb-6 tracking-tight">Kundali Matching for Marriage (Kundli Milan)</h2>
            <div className="space-y-6 text-[#D1D5DB] text-[15px] sm:text-[16px] leading-[1.8]">
              <p>
                <a href="https://www.astroved.com/astropedia/en/freetools/kundali-matching" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 decoration-white/50 hover:decoration-white transition-colors">Kundli Milan</a> is the process of comparing two birth charts to check compatibility for marriage. It goes beyond basic zodiac matching - studying Guna matching, emotional compatibility, health, family life, prosperity, and long-term harmony between two charts.
              </p>
              <p>
                A good match isn't about chasing a "perfect" score. It's about understanding where the relationship flows naturally, where adjustments may be needed, and how both charts support a life together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ ARTICLE SECTION 5 — LIGHT ============ */}
      <div className="w-full bg-slate-50 relative overflow-hidden py-12 lg:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10 text-left">
          <div>
            <h2 className="text-[24px] sm:text-[28px] md:text-3xl font-bold text-[#2E2459] mb-2 tracking-tight">Important Doshas in Kundali and Their Remedies</h2>
            <p className="text-slate-500 text-sm italic mb-8">Reviewed by [Astrologer Name], X+ years in Vedic astrology practice</p>

            <div className="space-y-6 text-slate-700 text-[15px] sm:text-[16px] leading-[1.8]">
              <p className="mb-6">
                A Dosha isn't a verdict - it's a gentle nudge from your chart. Our tradition pairs every Dosha with a path to relief, and none should be read alone.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-[18px] sm:text-[20px] font-bold text-[#2E2459] mb-2">Mangal Dosha (Manglik)</h3>
                  <p className="mb-2">Mars in the 1st, 4th, 7th, 8th, or 12th house from Ascendant, Moon, or Venus. Closer to half of all charts carry it, which is why our sages left gentle exceptions - Mars in its own sign, blessed by Jupiter, or both partners sharing it.</p>
                  <p className="mb-2"><strong className="text-slate-900">Remedies:</strong> <a href="https://www.astroved.com/instant-pooja/mars-pooja" target="_blank" rel="noopener noreferrer" className="text-[#6B40C3] font-medium underline underline-offset-4 decoration-[#6B40C3]/30 hover:decoration-[#6B40C3] transition-colors">Instant poojas</a> like Kumbh Vivah, red coral (with guidance), Hanuman Chalisa on Tuesdays.</p>
                  <p><a href="#" className="text-[#6B40C3] font-semibold hover:text-[#4F2D96] transition-colors">→ Calculate Mangal Dosha</a></p>
                </div>

                <div>
                  <h3 className="text-[18px] sm:text-[20px] font-bold text-[#2E2459] mb-2">Kaal Sarp Dosha</h3>
                  <p className="mb-2">All seven planets between Rahu and Ketu. A later addition to our texts, weighed differently across traditions.</p>
                  <p className="mb-2"><strong className="text-slate-900">Remedy:</strong> <a href="https://www.astroved.com/us/specials/kala-sarpa-dosha" target="_blank" rel="noopener noreferrer" className="text-[#6B40C3] font-medium underline underline-offset-4 decoration-[#6B40C3]/30 hover:decoration-[#6B40C3] transition-colors">Kaal Sarp Puja</a> at Trimbakeshwar, a silver Naga pendant.</p>
                  <p><a href="#" className="text-[#6B40C3] font-semibold hover:text-[#4F2D96] transition-colors">→ Calculate Kaal Sarp Dosha</a></p>
                </div>

                <div>
                  <h3 className="text-[18px] sm:text-[20px] font-bold text-[#2E2459] mb-2">Pitru Dosha</h3>
                  <p className="mb-2">Seen through the Sun touched by Rahu, Ketu, or Saturn near the 9th house - our bond with those who came before.</p>
                  <p className="mb-2"><strong className="text-slate-900">True remedy:</strong> <a href="https://www.astroved.com/us/specials/tarpanam-ritual-package" target="_blank" rel="noopener noreferrer" className="text-[#6B40C3] font-medium underline underline-offset-4 decoration-[#6B40C3]/30 hover:decoration-[#6B40C3] transition-colors">Tarpan</a>, a simple offering of water and sesame.</p>
                  <p><a href="#" className="text-[#6B40C3] font-semibold hover:text-[#4F2D96] transition-colors">→ Check Pitru Dosha</a></p>
                </div>

                <div>
                  <h3 className="text-[18px] sm:text-[20px] font-bold text-[#2E2459] mb-2">Nadi Dosha</h3>
                  <p className="mb-2">Same Nadi between partners, weighted heaviest in matching (8 of 36 points). Often eased when the Moon sign differs, even if <a href="https://www.astroved.com/nadi/nadi-astrology" target="_blank" rel="noopener noreferrer" className="text-[#6B40C3] font-medium underline underline-offset-4 decoration-[#6B40C3]/30 hover:decoration-[#6B40C3] transition-colors">Nadi</a> matches.</p>
                  <p><a href="#" className="text-[#6B40C3] font-semibold hover:text-[#4F2D96] transition-colors">→ Calculate Nadi Dosha</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ ARTICLE SECTION 6 — DARK ============ */}
      <div className="w-full bg-[#0F1226] relative overflow-hidden py-12 lg:py-16">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10 text-left">
          <div>
            <h2 className="text-[24px] sm:text-[28px] md:text-3xl font-bold text-[#FDE047] mb-6 tracking-tight">What Makes AstroVed's Kundali Report Different?</h2>
            <div className="space-y-6 text-[#D1D5DB] text-[15px] sm:text-[16px] leading-[1.8]">
              <p>
                Most Kundali reports are generated instantly by software - enter a birth date, get a PDF. AstroVed's paid report is different: it's personally drafted by a qualified astrologer with <strong className="text-white">10+ years of experience</strong>, not an algorithm.
              </p>
              <p>
                That means your Ascendant, Moon Sign, Birth Star, Doshas, and planetary placements aren't just listed - they're read together, the way a real astrologer reads a chart, before being written into guidance you can act on.
              </p>
              <p>
                And when a Dosha calls for a remedy, we go further: a consultation with an astrologer like Vijayalakshmi, or a puja performed on your behalf by our temple priests.
              </p>
              <p className="font-bold text-[#FDE047]">
                From a human hand to yours - not a template.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ TOOLS SECTION ============ */}
      <div className="w-full bg-white relative overflow-hidden py-12 lg:py-16 border-t border-slate-200">

        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10 flex flex-col items-center">

          {/* Try other tools */}
          <section className="w-full mb-12">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#2E2459] text-center">Try other tools</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-6 md:gap-8 lg:gap-10">
              {[
                { name: 'Birth Chart', image: BirthChartImg, url: 'https://www.astroved.com/astropedia/en/freetools/birth-chart' },
                { name: 'Horoscope Matching', image: horoscopeMatching, url: 'https://www.astroved.com/astropedia/en/freetools/horoscope-matching' },
                { name: 'Moon Sign Calculator', image: MoonSignImg, url: 'https://www.astroved.com/astropedia/en/freetools/moon-sign-calculator' },
                { name: 'Nakshatra Porutham', image: MarriageCompatibilityImg, url: 'https://www.astroved.com/astropedia/en/freetools/nakshatra-porutham' },
                { name: 'Lagna Calculator', image: LagnaCalculatorImg, url: 'https://www.astroved.com/astropedia/en/freetools/lagna-calculator' }
              ].map((tool, idx) => (
                <a
                  key={idx}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <div
                    className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] rounded-full flex items-center justify-center mb-4 sm:mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] group-hover:scale-105 group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden"
                  >
                    <img src={tool.image} alt={tool.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-[#2E2459] font-semibold text-[13px] sm:text-[14px] md:text-[15px] group-hover:text-[#6B40C3] transition-colors leading-tight max-w-[140px]">
                    {tool.name}
                  </h4>
                </a>

              ))}
            </div>
          </section>

          {/* FAQs — single-open accordion, forced single column on mobile */}
        </div>
      </div>

      {/* ============ FAQ SECTION — DARK ============ */}
      <div className="w-full bg-[#0F1226] relative overflow-hidden py-12 lg:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10 flex flex-col items-center">
          <section className="w-full relative overflow-hidden py-12">
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none">
              <Sun className="w-full h-full text-amber-400" />
            </div>

            <div className="flex flex-col items-center justify-center mb-8 sm:mb-10 relative z-10 text-center">

              <h2 className="text-[22px] sm:text-3xl md:text-[34px] font-serif font-bold text-white leading-tight">
                Frequently Asked Questions<br /><span className="text-[#FDE047]">About Kundali</span>
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