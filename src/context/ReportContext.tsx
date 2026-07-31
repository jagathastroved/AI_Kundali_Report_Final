import React, { createContext, useContext, useState, useEffect } from 'react';
import { BirthDetails, KundliReportData } from '../types';
import fallbackReport from '../mocks/fallBackReport.json';

interface ReportContextType {
  birthDetails: BirthDetails | null;
  reportData: KundliReportData | null;
  isLoading: boolean;
  isGenerated: boolean;
  error: string | null;
  submitBirthDetails: (details: BirthDetails, apiData?: any, apiError?: any) => Promise<void>;
  resetReport: () => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(() => {
    const saved = localStorage.getItem('astro_birth_details');
    return saved ? JSON.parse(saved) : null;
  });

  const [reportData, setReportData] = useState<KundliReportData | null>(() => {
    const saved = localStorage.getItem('astro_report_data');
    return saved ? JSON.parse(saved) : null;
  });

  const [isGenerated, setIsGenerated] = useState<boolean>(() => {
    return !!localStorage.getItem('astro_report_data');
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (birthDetails) {
      localStorage.setItem('astro_birth_details', JSON.stringify(birthDetails));
    } else {
      localStorage.removeItem('astro_birth_details');
    }
  }, [birthDetails]);

  useEffect(() => {
    if (reportData) {
      localStorage.setItem('astro_report_data', JSON.stringify(reportData));
      setIsGenerated(true);
    } else {
      localStorage.removeItem('astro_report_data');
      setIsGenerated(false);
    }
  }, [reportData]);

  const submitBirthDetails = async (details: BirthDetails, apiData?: any, apiError?: any) => {
    setIsLoading(true);
    setError(null);
    setBirthDetails(details);

    try {
      if (apiError) throw apiError;

      // Construct a tailored local report using static data
      const localData = JSON.parse(JSON.stringify(fallbackReport));
      localData.birthDetails = details;
      localData.birthStar.description = `Hello, ${details.name}! Based on your birth details of ${details.day}/${details.month}/${details.year} in ${details.city}, ${localData.birthStar.description}`;

      // Simulate network delay for UI consistency
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const finalData = apiData ? { ...localData, ...apiData } : localData;

      setReportData(finalData);
    } catch (err: any) {
      console.error('Error generating report:', err);
      setError(err?.message || 'An error occurred while generating the report.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetReport = () => {
    setBirthDetails(null);
    setReportData(null);
    setError(null);
    localStorage.removeItem('astro_birth_details');
    localStorage.removeItem('astro_report_data');
  };

  return (
    <ReportContext.Provider
      value={{
        birthDetails,
        reportData,
        isLoading,
        isGenerated,
        error,
        submitBirthDetails,
        resetReport,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
};
