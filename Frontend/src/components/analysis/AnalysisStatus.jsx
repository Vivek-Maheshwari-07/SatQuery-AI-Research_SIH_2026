import React from 'react';
import { Loader2 } from 'lucide-react';
import ErrorState from '../ui/ErrorState';

/**
 * AnalysisStatus component following spec sections 8, 9, and 18.
 * Displays real indeterminate loading spinner during pipeline execution,
 * failure alert with retry on error, or renders nothing during idle/success states.
 *
 * @param {Object} props
 * @param {'idle' | 'loading' | 'success' | 'error'} props.status - Current pipeline execution status
 * @param {string | Error | object} [props.error] - Error message or object when status is 'error'
 * @param {() => void} [props.onRetry] - Optional retry handler
 * @param {string} [props.className='']
 */
export function AnalysisStatus({
  status,
  error,
  onRetry,
  className = '',
}) {
  if (status === 'loading') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`flex flex-col items-center justify-center p-8 bg-surface/70 border border-primary/20 rounded-xl text-center space-y-3 ${className}`}
      >
        <div className="w-10 h-10 rounded-full bg-primary-soft border border-primary/20 flex items-center justify-center text-primary shadow-2xs">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-text-primary">
            Analyzing Imagery
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Processing neural model inference and multi-modal grounding...
          </p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={className}>
        <ErrorState
          title="Analysis Failed"
          message={error || 'An error occurred during query processing. Please check server status and retry.'}
          onRetry={onRetry}
          retryLabel="Retry Analysis"
        />
      </div>
    );
  }

  return null;
}

export default AnalysisStatus;
