import React from 'react';
import { Sun, Star } from 'lucide-react';
import { BirthDetailsForm } from '../components/forms/BirthDetailsForm';

export const LandingScreen: React.FC = () => {
  return (
    <div className="min-h-[100dvh] lg:h-screen w-full bg-transparent text-slate-200 flex items-center justify-center px-4 py-10 lg:py-4 md:px-12 relative overflow-y-auto overflow-x-hidden lg:overflow-hidden z-10">
      <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-20 pointer-events-none select-none text-indigo-500/10">
        <Sun size={480} strokeWidth={0.5} />
      </div>
      <div className="absolute top-1/3 right-10 -translate-y-1/2 opacity-20 pointer-events-none select-none text-orange-500/15">
        <Star size={320} strokeWidth={0.5} />
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center z-10">

        {/* Left Side - Content */}
        <div className="flex flex-col text-left w-full mt-8 lg:mt-0 lg:pr-8">
          <h1 className="text-3xl lg:text-4xl xl:text-[45px] font-bold text-white tracking-tight leading-tight mb-5">
            Discover Your True Path Through Kundali
          </h1>
          <p className="text-slate-300 text-[15px] sm:text-base leading-relaxed mb-8">
            Unlock the hidden meanings of your birth chart. Gain deep insights into your personality, destiny, and life's true purpose.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 lg:gap-y-8">
            {[
              { title: "Personalized Kundali Chart", desc: "Access your detailed birth chart based on precise birth details." },
              { title: "Core Personality", desc: "Reveal your strengths, challenges, talents, and true life potential." },
              { title: "Dasha Timeline", desc: "Understand current and future planetary periods shaping your journey." },
              { title: "Karmic Chakra Analysis", desc: "Uncover karmic patterns and the spiritual lessons guiding your growth." },
              { title: "Planetary Profiles", desc: "Gain insights into how each planet influences different areas of life." },
              { title: "Influential Signs", desc: "Learn how key zodiac signs affect your personality and life path." }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0 bg-indigo-900/50 rounded-full p-1.5 border border-indigo-700/50">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div>
                  <h4 className="text-white font-medium text-[15px]">{item.title}</h4>
                  <p className="text-indigo-200/80 text-[13px] mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full flex justify-center lg:justify-end mt-12 lg:mt-0">
          <BirthDetailsForm />
        </div>
      </div>
    </div>
  );
};
