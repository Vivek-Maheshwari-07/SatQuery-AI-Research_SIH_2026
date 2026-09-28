import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnalysisById } from '../services/historyService';
import { adaptAnalysisResponse } from '../services/analysisAdapter';
import { useAppContext } from '../context/useAppContext';

/**
 * Custom hook to open an existing analysis record by session ID,
 * adapt the payload, store it in global state, and navigate to /results.
 *
 * @returns {{
 *   loading: boolean,
 *   error: string | null,
 *   openAnalysis: (sessionId: string) => Promise<void>
 * }}
 */
export function useOpenAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setLatestAnalysis } = useAppContext();
  const navigate = useNavigate();

  const openAnalysis = useCallback(
    async (sessionId) => {
      setLoading(true);
      setError(null);

      try {
        const rawResponse = await getAnalysisById(sessionId);
        const adapted = adaptAnalysisResponse(rawResponse, []);

        setLatestAnalysis({
          ...adapted,
          query: rawResponse.query || rawResponse.result?.question || rawResponse.result?.query || '',
          inputConfiguration: rawResponse.input_configuration || 'single',
          uploadedFiles: [],
          timestamp: rawResponse.created_at || new Date().toISOString(),
        });

        navigate('/results');
      } catch (err) {
        const message =
          err.data?.error?.message ||
          err.data?.message ||
          err.message ||
          `Failed to load analysis record ${sessionId}.`;
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [setLatestAnalysis, navigate]
  );

  return {
    loading,
    error,
    openAnalysis,
  };
}

export default useOpenAnalysis;
