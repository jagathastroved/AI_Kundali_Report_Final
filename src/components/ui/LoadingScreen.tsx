import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);

  const messages = [
    "Calculating your birth star...",
    "Analyzing core personality...",
    "Finding your dominant element...",
    "Creating your kundali report chart...",
    "Mapping karmic chakra & planetary strength...",
    "Generating planetary profiles & dasha...",
    "Finalizing cosmic alignments..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx(prev => (prev + 1) % messages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden select-none z-10">
      {/* Background mystical glow for loading */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-orange-500/10 rounded-full blur-[60px] pointer-events-none" />

      {/* Sacred Geometry Kundali Animation */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Outer Dashed Ring (Gold/Orange) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-orange-400/30 border-dashed"
          style={{ borderWidth: '2px' }}
        />

        {/* Middle Ring with Zodiac Signs */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
          className="absolute inset-4 rounded-full border border-indigo-500/20 flex items-center justify-center"
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            const radius = 136; // Distance from center
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-indigo-400/50 shadow-[0_0_10px_rgba(129,140,248,0.6)]"
                style={{ transform: `translate(${x}px, ${y}px) rotate(45deg)` }}
              />
            );
          })}
        </motion.div>

        {/* Inner Glowing Ring (Indigo) */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{
            rotate: { repeat: Infinity, duration: 15, ease: 'linear' },
            scale: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
          }}
          className="absolute inset-16 rounded-full border-2 border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
        />

        {/* Center Pulsing Core */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-orange-400/80 to-indigo-600/80 shadow-[0_0_40px_rgba(249,115,22,0.4)] flex items-center justify-center border border-white/20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            <Star className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" strokeWidth={1} fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* Connecting Mystical Lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[85%] h-[1px] bg-indigo-300 rotate-45" />
          <div className="w-[85%] h-[1px] bg-indigo-300 -rotate-45" />
          <div className="w-[85%] h-[1px] bg-indigo-300 rotate-90" />
          <div className="w-[85%] h-[1px] bg-indigo-300" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10 space-y-3 min-h-[80px]"
      >
        <h2 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-orange-200 via-white to-orange-200 bg-clip-text text-transparent">
          Crafting Your Cosmic Blueprint
        </h2>
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIdx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-[13px] tracking-widest uppercase font-mono font-medium text-indigo-300"
          >
            {messages[msgIdx]}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
