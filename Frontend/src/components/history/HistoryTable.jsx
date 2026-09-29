import React from 'react';
import { History, ChevronRight } from 'lucide-react';
import Badge from '../ui/Badge';
import Skeleton from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';
import ErrorState from '../ui/ErrorState';
import { formatDate } from '../../utils/formatters';
import { getConfigurationById } from '../../app/analysisConfig';

/**
 * Maps backend intent to friendly badge variant and label.
 * @param {string} intent
 */
function getIntentBadgeConfig(intent) {
  switch (intent) {
    case 'vqa':
      return { variant: 'primary', label: 'VQA' };
    case 'grounding':
      return { variant: 'primary', label: 'Grounding' };
    case 'detection':
      return { variant: 'primary', label: 'Detection' };
    case 'segmentation':
      return { variant: 'success', label: 'Segmentation' };
    case 'change_analysis':
      return { variant: 'warning', label: 'Change Detection' };
    case 'fusion':
      return { variant: 'warning', label: 'Optical + SAR' };
    case 'captioning':
      return { variant: 'neutral', label: 'Captioning' };
    case 'measurement':
      return { variant: 'neutral', label: 'Measurement' };
    default:
      return { variant: 'neutral', label: intent || 'Analysis' };
  }
}

/**
 * HistoryTable component following spec sections 35, 58, and Part 3 item 7.
 * Sticky header, zebra-free with hairline borders, hover and focus-visible states,
 * dates in mono font, and stacked card view on mobile.
 *
 * @param {Object} props
 * @param {Array<Object>} [props.items=[]] - History records
 * @param {boolean} [props.loading=false] - Loading state
 * @param {string|null} [props.error=null] - Error message
 * @param {(item: Object) => void} props.onSelect - Item selection callback
 * @param {() => void} [props.onRetry] - Error retry callback
 * @param {string} [props.className='']
 */
export function HistoryTable({
  items = [],
  loading = false,
  error = null,
  onSelect,
  onRetry,
  className = '',
}) {
  // 1. Error State
  if (error) {
    return (
      <div className={`rounded-xl border border-red-200 overflow-hidden ${className}`}>
        <ErrorState
          title="Unable to load history"
          message={error}
          onRetry={onRetry}
          retryLabel="Reload History"
        />
      </div>
    );
  }

  // 2. Loading State (Skeleton Cards / Rows)
  if (loading) {
    return (
      <div className={`w-full bg-white rounded-xl border border-border shadow-xs overflow-hidden ${className}`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Skeleton variant="text" width="25%" height={16} />
          <Skeleton variant="text" width="10%" height={16} />
        </div>
        <div className="divide-y divide-border">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className="p-4 flex items-center justify-between gap-4">
              <div className="space-y-2 w-1/2">
                <Skeleton variant="text" width="90%" height={14} />
                <Skeleton variant="text" width="40%" height={12} />
              </div>
              <Skeleton variant="text" width="15%" height={24} />
              <Skeleton variant="text" width="20%" height={14} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. Empty State
  if (!items || items.length === 0) {
    return (
      <div className={`rounded-xl border border-border overflow-hidden ${className}`}>
        <EmptyState
          icon={History}
          graticule={true}
          title="No analyses yet"
          description="Analyses executed on the Analyze page will be automatically recorded in your audit history."
        />
      </div>
    );
  }

  // 4. Success State
  return (
    <div
      className={`w-full bg-white rounded-xl border border-border shadow-xs overflow-hidden text-left ${className}`}
    >
      {/* Mobile Stacked Cards View (< 768px) */}
      <div className="md:hidden divide-y divide-border">
        {items.map((item) => {
          const intentConfig = getIntentBadgeConfig(item.intent);
          const config = getConfigurationById(item.input_configuration);
          const isSuccess = item.status === 'success' || !item.status;

          return (
            <button
              key={item.session_id}
              type="button"
              onClick={() => onSelect?.(item)}
              className="w-full p-4 flex flex-col gap-2.5 text-left hover:bg-slate-50 active:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant={intentConfig.variant} size="sm">
                    {intentConfig.label}
                  </Badge>
                  <span className="text-[11px] text-text-muted font-medium">
                    {config.label}
                  </span>
                </div>
                <Badge variant={isSuccess ? 'success' : 'danger'} size="sm" dot>
                  {isSuccess ? 'Completed' : 'Failed'}
                </Badge>
              </div>

              <p className="text-sm font-semibold text-text-primary line-clamp-2">
                {item.query || 'Visual query analysis'}
              </p>

              <div className="flex items-center justify-between text-xs text-text-muted pt-1 border-t border-slate-100 font-mono text-[11px]">
                <span>{formatDate(item.created_at)}</span>
                <span className="text-primary flex items-center font-sans font-medium">
                  View Result <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Desktop & Tablet Table View (>= 768px) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-surface text-text-muted uppercase font-semibold text-[11px] tracking-wider border-b border-border sticky top-0 z-10">
            <tr>
              <th scope="col" className="py-3.5 px-4">
                Query / Instruction
              </th>
              <th scope="col" className="py-3.5 px-4">
                Intent
              </th>
              <th scope="col" className="py-3.5 px-4">
                Configuration
              </th>
              <th scope="col" className="py-3.5 px-4">
                Date & Time
              </th>
              <th scope="col" className="py-3.5 px-4">
                Status
              </th>
              <th scope="col" className="py-3.5 px-4 text-right">
                <span className="sr-only">Open Result</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => {
              const intentConfig = getIntentBadgeConfig(item.intent);
              const config = getConfigurationById(item.input_configuration);
              const isSuccess = item.status === 'success' || !item.status;

              return (
                <tr
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
                  className="hover:bg-slate-50/90 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                >
                  {/* Query */}
                  <td className="py-3.5 px-4 font-medium text-text-primary max-w-sm truncate">
                    <span title={item.query}>{item.query || '—'}</span>
                  </td>

                  {/* Intent */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge variant={intentConfig.variant} size="sm">
                      {intentConfig.label}
                    </Badge>
                  </td>

                  {/* Configuration */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-text-secondary font-medium">
                    {config.label}
                  </td>

                  {/* Date in Mono */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-text-muted font-mono text-[11px]">
                    {formatDate(item.created_at)}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge
                      variant={isSuccess ? 'success' : 'danger'}
                      size="sm"
                      dot
                    >
                      {isSuccess ? 'Completed' : 'Failed'}
                    </Badge>
                  </td>

                  {/* Chevron Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <ChevronRight className="w-4 h-4 text-text-muted inline" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryTable;
