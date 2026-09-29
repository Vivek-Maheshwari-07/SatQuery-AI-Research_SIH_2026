import React from 'react';
import { History, ArrowRight, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Skeleton from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';
import ErrorState from '../ui/ErrorState';
import { formatRelativeTime } from '../../utils/formatters';

/**
 * RecentAnalysesCard component following spec section 17.
 * Displays the 5 most recent analyses with direct navigation to their results.
 *
 * @param {Object} props
 * @param {Array<Object>} [props.items=[]]
 * @param {boolean} [props.loading=false]
 * @param {string|null} [props.error=null]
 * @param {(item: Object) => void} props.onSelect
 * @param {() => void} [props.onRetry]
 * @param {() => void} props.onViewAll
 * @param {string} [props.className='']
 */
export function RecentAnalysesCard({
  items = [],
  loading = false,
  error = null,
  onSelect,
  onRetry,
  onViewAll,
  className = '',
}) {
  const recentItems = items.slice(0, 5);

  if (error) {
    return (
      <Card variant="default" padding="none" className={`overflow-hidden ${className}`}>
        <div className="flex items-center justify-between p-4 border-b border-border bg-slate-50 text-left">
          <div className="flex items-center gap-2 font-semibold text-sm text-text-primary">
            <History className="w-4 h-4 text-primary" />
            <span>Recent Analyses</span>
          </div>
        </div>
        <ErrorState
          title="Could not load recent runs"
          message={error}
          onRetry={onRetry}
          retryLabel="Retry"
          className="border-0 rounded-none bg-transparent"
        />
      </Card>
    );
  }

  if (loading) {
    return (
      <Card variant="default" padding="md" className={`space-y-4 text-left ${className}`}>
        <div className="flex items-center justify-between border-b border-border pb-3">
          <Skeleton variant="text" width="30%" height={18} />
          <Skeleton variant="text" width="15%" height={18} />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((idx) => (
            <div key={idx} className="flex items-center justify-between py-2">
              <div className="space-y-1 w-2/3">
                <Skeleton variant="text" width="90%" height={14} />
                <Skeleton variant="text" width="40%" height={11} />
              </div>
              <Skeleton variant="text" width="15%" height={20} />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card variant="default" padding="md" className={`space-y-4 text-left ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-text-primary">Recent Analyses</h2>
        </div>

        {items.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            icon={ArrowRight}
            onClick={onViewAll}
            className="text-xs text-primary hover:bg-primary-soft"
          >
            View All ({items.length})
          </Button>
        )}
      </div>

      {/* Items List */}
      {recentItems.length > 0 ? (
        <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
          {recentItems.map((item) => (
            <div
              key={item.session_id}
              role="button"
              tabIndex={0}
              onClick={() => onSelect?.(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect?.(item);
                }
              }}
              className="p-3 bg-white hover:bg-slate-50/90 cursor-pointer transition-colors flex items-center justify-between gap-3 focus:bg-primary-soft/30 focus:outline-none"
            >
              <div className="min-w-0 pr-2">
                <p className="text-xs font-semibold text-text-primary truncate" title={item.query}>
                  {item.query || 'Visual Analysis'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="primary" size="sm">
                    {item.intent || 'analysis'}
                  </Badge>
                  <span className="text-[10px] text-text-muted font-mono">
                    {formatRelativeTime(item.created_at)}
                  </span>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={History}
          title="No recent analyses"
          description="Your executed query records will be shown here."
          className="py-6 border-dashed"
        />
      )}
    </Card>
  );
}

export default RecentAnalysesCard;
