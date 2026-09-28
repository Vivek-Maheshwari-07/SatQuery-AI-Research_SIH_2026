import { useState, useEffect, useCallback } from 'react';
import { getHealth } from '../services/systemService';

/**
 * Custom hook to monitor system readiness and model health statuses.
 * Fetches status on mount and provides reload function.
 *
 * @returns {{
 *   status: 'idle' | 'loading' | 'success' | 'error',
 *   data: { status: 'ok' | 'degraded' | 'down', models: Array<{ name: string, status: string }> } | null,
 *   error: string | null,
 *   reload: () => Promise<void>
 * }}
 */
export function useSystemStatus() {
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchStatus = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const response = await getHealth();
      setData(response);
      setStatus('success');
    } catch (err) {
      const message =
        err.data?.error?.message ||
        err.data?.message ||
        err.message ||
        'Unable to connect to system health service.';
      setError(message);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    getHealth()
      .then((response) => {
        if (!isMounted) return;
        setData(response);
        setStatus('success');
      })
      .catch((err) => {
        if (!isMounted) return;
        const message =
          err.data?.error?.message ||
          err.data?.message ||
          err.message ||
          'Unable to connect to system health service.';
        setError(message);
        setStatus('error');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    status,
    data,
    error,
    reload: fetchStatus,
  };
}

export default useSystemStatus;
