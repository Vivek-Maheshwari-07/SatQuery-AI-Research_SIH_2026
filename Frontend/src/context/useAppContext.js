import { useContext } from 'react';
import { AppContext } from './appContextInstance';

/**
 * Custom hook to consume the global AppContext.
 * @returns {{
 *   latestAnalysis: Object | null,
 *   setLatestAnalysis: (analysis: Object) => void,
 *   clearLatestAnalysis: () => void
 * }}
 */
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export default useAppContext;
