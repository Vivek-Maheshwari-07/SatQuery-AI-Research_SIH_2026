import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

/**
 * Error State component following spec sections 9 & 61.
 * Standardizes API and system failure feedback across all pages.
 *
 * @param {Object} props
 * @param {React.ComponentType<{ className?: string }>} [props.icon=AlertTriangle]
 * @param {string} [props.title='Unable to complete operation']
 * @param {string | Error} props.message
 * @param {() => void} [props.onRetry]
 * @param {string} [props.retryLabel='Retry']
 * @param {string} [props.className='']
 */
export function ErrorState({
  icon: Icon = AlertTriangle,
  title = 'Unable to complete operation',
  message,
  onRetry,
  retryLabel = 'Retry',
  className = '',
}) {
  const errorMessage =
    typeof message === 'string'
      ? message
      : message?.message || 'An unexpected error occurred. Please try again.';

  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center text-center p-8 border border-red-200 rounded-xl bg-red-50/40 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center text-danger mb-4 shadow-2xs">
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="text-sm md:text-base font-semibold text-text-primary mb-1">
        {title}
      </h3>

      <p className="text-xs md:text-sm text-text-secondary max-w-sm mb-6">
        {errorMessage}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          icon={RefreshCw}
          className="hover:border-danger hover:text-danger hover:bg-red-50"
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
}

export default ErrorState;
