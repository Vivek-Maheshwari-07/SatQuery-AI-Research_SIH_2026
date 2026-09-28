import React, { useState, useCallback } from 'react';
import { AppContext } from './appContextInstance';

/**
 * Global AppProvider holding persistent session state, latest analysis results,
 * and shared user parameters across routes (e.g., Analyze -> Results -> Reports).
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function AppProvider({ children }) {
  const [latestAnalysis, setLatestAnalysisState] = useState(null);

  const setLatestAnalysis = useCallback((analysisData) => {
    setLatestAnalysisState(analysisData);
  }, []);

  const clearLatestAnalysis = useCallback(() => {
    setLatestAnalysisState(null);
  }, []);

  const value = {
    latestAnalysis,
    setLatestAnalysis,
    clearLatestAnalysis,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
