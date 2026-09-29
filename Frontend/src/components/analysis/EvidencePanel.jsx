import React from 'react';
import { ShieldCheck, FileCheck } from 'lucide-react';
import Badge from '../ui/Badge';
import Skeleton from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';
import ErrorState from '../ui/ErrorState';

/**
 * Helper to format raw backend snake_case evidence types to human-readable strings.
 * @param {string} type
 * @returns {string}
 */
function formatEvidenceType(type) {
  if (!type) return 'Evidence';
  const typeMap = {
    bounding_box: 'Bounding Box',
    mask: 'Segmentation Mask',
    change_region: 'Change Region',
    detection: 'Object Detection',
    metadata: 'Image Metadata',
    model_output: 'Model Output',
    spectral_band: 'Spectral Band',
  };
  if (typeMap[type]) return typeMap[type];
  return type
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Returns appropriate theme Badge variant for each evidence category.
 * @param {string} type
 * @returns {'primary' | 'success' | 'warning' | 'neutral'}
 */
function getEvidenceBadgeVariant(type) {
  switch (type) {
    case 'bounding_box':
    case 'detection':
      return 'primary';
    case 'mask':
    case 'segmentation':
      return 'success';
    case 'change_region':
      return 'warning';
    default:
      return 'neutral';
  }
}

/**
 * EvidencePanel component following spec section 32.
 * Renders structured visual and model evidence distinctly separated from generated text.
 *
 * Expected Props / Data Contract:
 * @param {Object} props
 * @param {Array<{ type: string, label: string, detail?: string }>} [props.evidence] - Evidence records from backend
 * @param {'loading' | 'success' | 'empty' | 'error'} [props.status] - Data status
 * @param {string | object} [props.error] - Error message if status is 'error'
 * @param {string} [props.title='Visual & Analytical Evidence'] - Panel title
 * @param {string} [props.className='']
 */
export function EvidencePanel({
  evidence,
  status,
  error,
  title = 'Visual & Analytical Evidence',
  className = '',
}) {
  const hasEvidence = Boolean(
    evidence && Array.isArray(evidence) && evidence.length > 0
  );
  const effectiveStatus = status || (hasEvidence ? 'success' : 'empty');

  // 1. Loading State
  if (effectiveStatus === 'loading') {
    return (
      <div className={`p-4 bg-surface rounded-xl border border-border space-y-3 ${className}`}>
        <div className="flex items-center gap-2">
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width="30%" height={16} />
        </div>
        <div className="space-y-2 pt-1">
          <Skeleton variant="rectangular" height={44} />
          <Skeleton variant="rectangular" height={44} />
        </div>
      </div>
    );
  }

  // 2. Error State
  if (effectiveStatus === 'error') {
    return (
      <div className={`rounded-xl border border-red-200 overflow-hidden ${className}`}>
        <ErrorState
          title="Evidence Extraction Failed"
          message={error || 'Unable to retrieve evidence records for this analysis.'}
          className="p-6 bg-red-50/30"
        />
      </div>
    );
  }

  // 3. Empty State
  if (effectiveStatus === 'empty') {
    return (
      <div className={`rounded-xl border border-border/80 overflow-hidden ${className}`}>
        <EmptyState
          icon={FileCheck}
          title="No evidence available"
          description="Supporting visual bounding regions and model evidence will appear here."
          className="p-6 bg-surface/40"
        />
      </div>
    );
  }

  // 4. Success State: Structured list of evidence rows
  return (
    <div
      className={`p-4 bg-surface rounded-xl border-2 border-border/90 text-left shadow-2xs ${className}`}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-border">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
            {title}
          </h4>
        </div>
        <span className="text-[11px] font-mono text-text-muted font-medium">
          {evidence.length} {evidence.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Evidence Items List */}
      <div className="space-y-2">
        {evidence.map((item, index) => {
          const badgeVariant = getEvidenceBadgeVariant(item.type);
          const formattedType = formatEvidenceType(item.type);

          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-white rounded-lg border border-border shadow-2xs hover:border-border/80 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Badge variant={badgeVariant} size="sm" className="flex-shrink-0">
                  {formattedType}
                </Badge>
                <span className="text-xs font-semibold text-text-primary truncate">
                  {item.label}
                </span>
              </div>

              {item.detail && (
                <div className="text-[11px] text-text-secondary font-mono sm:text-right flex-shrink-0">
                  {item.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EvidencePanel;
