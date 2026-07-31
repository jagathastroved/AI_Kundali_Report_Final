import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Star, Moon, Sun, Sparkles, Compass } from 'lucide-react';

const icons = [Star, Moon, Sun, Sparkles, Compass];
const colors = [
  'text-white',
  'text-amber-300',
  'text-yellow-200',
  'text-cyan-200'
];

export const AstrologyBackground: React.FC = () => {
  // Generate random astrology icons to float in the background
  const elements = useMemo(() => {
    // Minimal amount of icons (only 15) so it's not overwhelming
    return Array.from({ length: 15 }).map((_, i) => {
      const Icon = icons[Math.floor(Math.random() * icons.length)];
      const colorClass = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 16 + 16; // 16 to 32px sizes
      const startX = Math.random() * 100; // vw
      const startY = Math.random() * 100; // vh
      const duration = Math.random() * 40 + 60; // Very slow and graceful
      const delay = Math.random() * 10;
      const opacity = Math.random() * 0.4 + 0.4; // Bright but not glaring (0.4 to 0.8)

      return { id: i, Icon, colorClass, size, startX, startY, duration, delay, opacity };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Clean, subtle, slowly rotating starry overlay */}
      <motion.div
        className="absolute inset-[-50%] opacity-40 mix-blend-screen"
        animate={{ rotate: 360 }}
        transition={{ duration: 250, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 40px 70px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 160px 120px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
            radial-gradient(3px 3px at 300px 250px, #fde047, rgba(0,0,0,0))
          `,
          backgroundSize: '250px 250px'
        }}
      />

      {/* Floating Astrology Icons - Minimal, Bright, Slow */}
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className={`absolute ${el.colorClass} drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] select-none`}
          style={{
            x: el.startX + "vw",
            y: el.startY + "vh",
          }}
          animate={{
            y: [el.startY + "vh", ((el.startY - 15 + 100) % 100) + "vh", el.startY + "vh"],
            rotate: [0, 90, 180],
            opacity: [el.opacity, el.opacity * 0.5, el.opacity] // Gentle, slow twinkle
          }}
          transition={{
            y: { duration: el.duration, delay: el.delay, repeat: Infinity, ease: "linear" },
            rotate: { duration: el.duration * 1.5, delay: el.delay, repeat: Infinity, ease: "linear" },
            opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <el.Icon size={el.size} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
};
