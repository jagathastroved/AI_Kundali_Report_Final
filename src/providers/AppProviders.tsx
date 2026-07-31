import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { ReportProvider } from '../context/ReportContext';
import { BrowserRouter } from 'react-router-dom';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/kundali-report">
        <ReportProvider>
          {children}
        </ReportProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
