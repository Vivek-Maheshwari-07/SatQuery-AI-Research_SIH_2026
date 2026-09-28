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
 * HistoryTable component following spec sections 35 and 58.
 * Displays interactive, keyboard-accessible table of past analysis sessions.
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

  // 2. Loading State (Skeleton Rows)
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
          title="No analyses yet"
          description="Analyses executed on the Analyze page will be automatically saved in your history."
        />
      </div>
    );
  }

  // 4. Success State: Interactive Table
  return (
    <div
      className={`w-full bg-white rounded-xl border border-border shadow-xs overflow-hidden text-left ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-surface text-text-muted uppercase font-bold text-[10px] tracking-wider border-b border-border">
            <tr>
              <th scope="col" className="py-3.5 px-4 font-semibold">
                Query / Question
              </th>
              <th scope="col" className="py-3.5 px-4 font-semibold">
                Intent
              </th>
              <th scope="col" className="py-3.5 px-4 font-semibold hidden md:table-cell">
                Configuration
              </th>
              <th scope="col" className="py-3.5 px-4 font-semibold hidden sm:table-cell">
                Date & Time
              </th>
              <th scope="col" className="py-3.5 px-4 font-semibold">
                Status
              </th>
              <th scope="col" className="py-3.5 px-4 font-semibold text-right">
                <span className="sr-only">Open</span>
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
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors focus:bg-primary-soft/30 focus:outline-none"
                >
                  {/* Query */}
                  <td className="py-3.5 px-4 font-medium text-text-primary max-w-xs sm:max-w-sm md:max-w-md truncate">
                    <span title={item.query}>{item.query || '—'}</span>
                    <span className="block text-[10px] text-text-muted font-mono mt-0.5 sm:hidden">
                      {formatDate(item.created_at)}
                    </span>
                  </td>

                  {/* Intent */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge variant={intentConfig.variant} size="sm">
                      {intentConfig.label}
                    </Badge>
                  </td>

                  {/* Configuration */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-text-secondary hidden md:table-cell font-medium">
                    {config.label}
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-text-muted hidden sm:table-cell font-mono text-[11px]">
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
