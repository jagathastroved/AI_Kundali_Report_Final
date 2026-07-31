import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useReport } from '../context/ReportContext';
import { LandingScreen } from '../pages/LandingScreen';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { ErrorScreen } from '../components/ui/ErrorScreen';
import { KundliReportBook } from '../components/report/KundliReportBook';
import * as Pages from '../pages';

const PageWrapper: React.FC<{ component: React.ComponentType<{ pageIdx: number, setPage: (idx: number) => void }>, pageIdx: number }> = ({ component: Component, pageIdx }) => {
  const { reportData, error } = useReport();
  if (error) return <Navigate to="/error" replace />;
  if (!reportData) return <Navigate to="/" replace />;
  return <Component pageIdx={pageIdx} setPage={() => { }} />;
};

export const AppRoutes: React.FC = () => {
  const { error, resetReport } = useReport();
  const navigate = useNavigate();

  const handleRetry = () => {
    resetReport();
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/generating" element={error ? <Navigate to="/error" replace /> : <LoadingScreen />} />
      <Route path="/error" element={<ErrorScreen errorMsg={error || undefined} onRetry={handleRetry} />} />
      <Route path="/report" element={<KundliReportBook />}>
        <Route path="welcome" element={<PageWrapper component={Pages.WelcomePage} pageIdx={0} />} />
        <Route path="birth-star" element={<PageWrapper component={Pages.BirthStarPage} pageIdx={1} />} />
        <Route path="core-personality" element={<PageWrapper component={Pages.CorePersonalityPage} pageIdx={2} />} />
        <Route path="influential-signs" element={<PageWrapper component={Pages.BigThreeSignsPage} pageIdx={3} />} />
        <Route path="dominant-element" element={<PageWrapper component={Pages.FiveGreatElementsPage} pageIdx={4} />} />
        <Route path="lagna-chart" element={<PageWrapper component={Pages.LagnaChartPage} pageIdx={5} />} />
        <Route path="why-get-report" element={<PageWrapper component={Pages.ReportFeaturesPage} pageIdx={6} />} />
        <Route path="karmic-chakra" element={<PageWrapper component={Pages.KarmicChakraPage} pageIdx={7} />} />
        <Route path="planetary-strengths" element={<PageWrapper component={Pages.PlanetaryStrengthsPage} pageIdx={8} />} />
        <Route path="planetary-profiles" element={<PageWrapper component={Pages.PlanetaryProfilesPage} pageIdx={9} />} />
        <Route path="atmakaraka" element={<PageWrapper component={Pages.AtmakarakaPage} pageIdx={10} />} />
        <Route path="dasha-timeline" element={<PageWrapper component={Pages.DashaWheelPage} pageIdx={11} />} />
        <Route path="premium-deliverables" element={<PageWrapper component={Pages.PremiumDeliverablesPage} pageIdx={12} />} />
        <Route index element={<Navigate to="welcome" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
