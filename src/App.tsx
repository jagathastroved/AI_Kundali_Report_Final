import React from 'react';
import { AstrologyBackground } from './components/animations/AstrologyBackground';
import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <AppProviders>
      <main className="min-h-screen bg-indigo-950 text-slate-200 font-sans relative overflow-hidden">
        {/* Global Background from generating page */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange-500/10 rounded-full filter blur-3xl pointer-events-none" />

        <AstrologyBackground />

        <div className="relative z-10 h-full">
          <AppRoutes />
        </div>
      </main>
    </AppProviders>
  );
}
