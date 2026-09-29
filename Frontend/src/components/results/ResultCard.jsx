import React from 'react';
import Card from '../ui/Card';
import Skeleton from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';
import ErrorState from '../ui/ErrorState';

/**
 * ResultCard component following spec sections 9, 23, 42, 55.
 * Shared wrapper for all analysis result components ensuring consistent handling of
 * loading, error, empty, and success UI states.
 *
 * @param {Object} props
 * @param {string} [props.title] - Result card heading title
 * @param {'loading' | 'success' | 'empty' | 'error'} [props.status='success'] - Current data state
 * @param {string | Error | object} [props.error] - Error message/object when status is 'error'
 * @param {React.ReactNode} props.children - Real content rendered when status is 'success'
 * @param {React.ComponentType<{ className?: string }>} [props.icon] - Lucide icon component
 * @param {string} [props.emptyTitle] - Custom title for empty state
 * @param {string} [props.emptyDescription] - Custom description for empty state
 * @param {() => void} [props.onRetry] - Retry callback for error state
 * @param {string} [props.className='']
 */
export function ResultCard({
  title,
  status = 'success',
  error,
  children,
  icon: Icon,
  emptyTitle,
  emptyDescription,
  onRetry,
  className = '',
}) {
  // 1. Loading State: Render pure pulsing skeleton shapes (no fake content)
  if (status === 'loading') {
    return (
      <Card variant="brutalist" padding="md" className={`w-full ${className}`}>
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
          {Icon && <Skeleton variant="circular" width={28} height={28} />}
          <Skeleton variant="text" width="40%" height={20} />
        </div>
        <div className="space-y-3">
          <Skeleton variant="rectangular" height={160} />
          <div className="space-y-2 pt-2">
            <Skeleton variant="text" width="85%" height={16} />
            <Skeleton variant="text" width="65%" height={16} />
          </div>
        </div>
      </Card>
    );
  }

  // 2. Error State: Standardized failure message
  if (status === 'error') {
    return (
      <Card variant="brutalist" padding="none" className={`w-full overflow-hidden ${className}`}>
        {title && (
          <div className="flex items-center gap-2.5 px-5 py-3 border-b border-border bg-slate-50 font-semibold text-sm text-text-primary">
            {Icon && <Icon className="w-4 h-4 text-text-secondary" />}
            <span>{title}</span>
          </div>
        )}
        <ErrorState
          title={title ? `${title} Error` : 'Analysis Failed'}
          message={error || 'An error occurred while computing the analysis result.'}
          onRetry={onRetry}
          className="border-0 rounded-none bg-transparent"
        />
      </Card>
    );
  }

  // 3. Empty State: No data available
  if (status === 'empty') {
    return (
      <Card variant="brutalist" padding="none" className={`w-full overflow-hidden ${className}`}>
        {title && (
          <div className="flex items-center gap-2.5 px-5 py-3 border-b border-border bg-slate-50 font-semibold text-sm text-text-primary">
            {Icon && <Icon className="w-4 h-4 text-text-secondary" />}
            <span>{title}</span>
          </div>
        )}
        <EmptyState
          icon={Icon}
          title={emptyTitle || 'No analysis data available'}
          description={emptyDescription || 'Provide input imagery and submit a query to view results.'}
          className="border-0 rounded-none bg-transparent"
        />
      </Card>
    );
  }

  // 4. Success State: Render children in brutalist card
  return (
    <Card variant="brutalist" padding="md" className={`w-full ${className}`}>
      {title && (
        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-text-primary">
          <div className="flex items-center gap-2.5 font-semibold text-sm md:text-base text-text-primary tracking-tight">
            {Icon && <Icon className="w-5 h-5 text-primary flex-shrink-0" />}
            <span>{title}</span>
          </div>
        </div>
      )}
      <div className="w-full">{children}</div>
    </Card>
  );
}

export default ResultCard;
