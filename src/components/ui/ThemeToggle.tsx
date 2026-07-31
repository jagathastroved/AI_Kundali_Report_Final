import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-surface/50 border border-border shadow-lg text-text hover:bg-surface hover:scale-105 transition-all duration-300 flex items-center justify-center group"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180, scale: theme === 'dark' ? 1 : 0 }}
        className="absolute"
      >
        <Moon className="w-5 h-5 text-accent-primary group-hover:text-accent-secondary transition-colors" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : -180, scale: theme === 'light' ? 1 : 0 }}
        className={theme === 'light' ? 'relative' : 'absolute'}
      >
        <Sun className="w-5 h-5 text-accent-secondary group-hover:text-accent-primary transition-colors" />
      </motion.div>
    </button>
  );
};
