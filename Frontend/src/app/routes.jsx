import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Skeleton from '../components/ui/Skeleton';

const DashboardPage = lazy(() => import('../pages/Dashboard/DashboardPage'));
const AnalyzePage = lazy(() => import('../pages/Analyze/AnalyzePage'));
const ResultsPage = lazy(() => import('../pages/Results/ResultsPage'));
const HistoryPage = lazy(() => import('../pages/History/HistoryPage'));
const ReportsPage = lazy(() => import('../pages/Reports/ReportsPage'));
const SettingsPage = lazy(() => import('../pages/Settings/SettingsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFoundPage'));

function PageLoadingFallback() {
  return (
    <PageContainer className="space-y-6 animate-pulse">
      <div className="flex flex-col gap-2">
        <Skeleton width="40%" height={32} />
        <Skeleton width="60%" height={16} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
      <Skeleton className="h-80 rounded-xl w-full" />
    </PageContainer>
  );
}

/**
 * Route definitions for all SatQuery AI pages with code-splitting.
 */
export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
