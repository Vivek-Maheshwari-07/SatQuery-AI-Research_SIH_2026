import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import DashboardPage from '../pages/Dashboard/DashboardPage';
import AnalyzePage from '../pages/Analyze/AnalyzePage';
import ResultsPage from '../pages/Results/ResultsPage';
import HistoryPage from '../pages/History/HistoryPage';
import ReportsPage from '../pages/Reports/ReportsPage';
import SettingsPage from '../pages/Settings/SettingsPage';

/**
 * Route definitions for all SatQuery AI pages.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/analyze" element={<AnalyzePage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
