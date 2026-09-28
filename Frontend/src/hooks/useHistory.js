import { useState, useEffect, useCallback } from 'react';
import { getHistory } from '../services/historyService';

/**
 * Custom hook to fetch and manage previous analysis history records.
 * Fetches data automatically on mount and provides reload functionality.
 *
 * @returns {{
 *   status: 'idle' | 'loading' | 'success' | 'error',
 *   items: Array<Object>,
 *   error: string | null,
 *   reload: () => Promise<void>
 * }}
 */
export function useHistory() {
  const [status, setStatus] = useState('loading');
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const response = await getHistory();
      const list = Array.isArray(response?.items) ? response.items : [];
      setItems(list);
      setStatus('success');
    } catch (err) {
      const message =
        err.data?.error?.message ||
        err.data?.message ||
        err.message ||
        'Unable to load analysis history.';
      setError(message);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    getHistory()
      .then((response) => {
        if (!isMounted) return;
        const list = Array.isArray(response?.items) ? response.items : [];
        setItems(list);
        setStatus('success');
      })
      .catch((err) => {
        if (!isMounted) return;
        const message =
          err.data?.error?.message ||
          err.data?.message ||
          err.message ||
          'Unable to load analysis history.';
        setError(message);
        setStatus('error');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    status,
    items,
    error,
    reload: fetchHistory,
  };
}

export default useHistory;
