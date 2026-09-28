import { useState, useCallback } from 'react';
import { submitAnalysis } from '../services/analysisService';
import { adaptAnalysisResponse } from '../services/analysisAdapter';
import { useAppContext } from '../context/useAppContext';

/**
 * Custom hook for managing the lifecycle and execution of satellite imagery analysis.
 *
 * @returns {{
 *   status: 'idle' | 'loading' | 'success' | 'error',
 *   data: Object | null,
 *   error: string | null,
 *   runAnalysis: (params: {
 *     images: Array<File> | File,
 *     query: string,
 *     inputConfiguration: string,
 *     imageRoles?: Array<string>
 *   }) => Promise<Object>,
 *   reset: () => void
 * }}
 */
export function useAnalysis() {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { setLatestAnalysis } = useAppContext();

  const runAnalysis = useCallback(
    async ({ images, query, inputConfiguration, imageRoles }) => {
      setStatus('loading');
      setError(null);
      setData(null);

      try {
        const rawResponse = await submitAnalysis({
          images,
          query,
          inputConfiguration,
          imageRoles,
        });

        // Check if backend returned an application-level error
        if (rawResponse?.status === 'error' || rawResponse?.error) {
          const errorMessage =
            rawResponse.error?.message ||
            (typeof rawResponse.error === 'string' ? rawResponse.error : 'Analysis processing error');
          const err = new Error(errorMessage);
          setError(errorMessage);
          setStatus('error');
          throw err;
        }

        // Adapt response to component contract
        const uploadedArray = Array.isArray(images) ? images : [images].filter(Boolean);
        const adaptedData = adaptAnalysisResponse(rawResponse, uploadedArray);

        // Store in global context for other pages (Results, Reports)
        setLatestAnalysis({
          ...adaptedData,
          query,
          inputConfiguration,
          uploadedFiles: uploadedArray,
          timestamp: new Date().toISOString(),
        });

        setData(adaptedData);
        setStatus('success');
        return adaptedData;
      } catch (err) {
        const errorMessage =
          err.data?.error?.message ||
          err.data?.message ||
          err.message ||
          'Failed to communicate with analysis server. Please verify backend connection and try again.';
        setError(errorMessage);
        setStatus('error');
        throw err;
      }
    },
    [setLatestAnalysis]
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
  }, []);

  return {
    status,
    data,
    error,
    runAnalysis,
    reset,
  };
}

export default useAnalysis;
