import React from 'react';
import Progress from '../ui/Progress';
import { Info } from 'lucide-react';

/**
 * ConfidenceIndicator component following spec section 31.
 * Visualizes model confidence scores with theme-compliant color tiers,
 * percentage values, and qualitative confidence levels.
 *
 * Expected Props / Data Contract:
 * @param {Object} props
 * @param {number} props.value - Confidence score directly from the backend (0.0 to 1.0, or 0 to 100)
 * @param {string} [props.label='Confidence'] - Optional title label
 * @param {string} [props.note] - Optional disclaimer or warning regarding model certainty
 * @param {'sm' | 'md'} [props.size='sm'] - Progress bar size
 * @param {string} [props.className='']
 */
export function ConfidenceIndicator({
  value,
  label = 'Confidence',
  note,
  size = 'sm',
  className = '',
}) {
  // Validate value: if missing, undefined, or NaN, render nothing
  if (value === undefined || value === null || typeof value !== 'number' || Number.isNaN(value)) {
    return null;
  }

  // Normalize normalized ratio between 0 and 1
  const normalized = value <= 1 ? Math.max(0, value) : Math.max(0, Math.min(1, value / 100));
  const percentage = Math.round(normalized * 100);

  // Determine qualitative level and theme variant
  let variant = 'danger';
  let levelText = 'Low';
  let levelBadgeClass = 'text-danger bg-red-50 border-red-200';

  if (normalized >= 0.8) {
    variant = 'success';
    levelText = 'High';
    levelBadgeClass = 'text-success bg-green-50 border-green-200';
  } else if (normalized >= 0.5) {
    variant = 'warning';
    levelText = 'Medium';
    levelBadgeClass = 'text-warning bg-amber-50 border-amber-200';
  }

  return (
    <div className={`flex flex-col gap-1.5 text-left w-full ${className}`}>
      {/* Header with Label, Percentage and Qualitative Level */}
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-text-primary">
          <span>{label}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-text-primary">
            {percentage}%
          </span>
          <span
            className={`px-1.5 py-0.5 text-[10px] font-semibold uppercase rounded border ${levelBadgeClass}`}
          >
            {levelText}
          </span>
        </div>
      </div>

      {/* Progress Bar (using theme tokens only: success, warning, danger) */}
      <Progress
        value={percentage}
        max={100}
        variant={variant}
        size={size}
      />

      {/* Optional Note / Warning */}
      {note && (
        <div className="flex items-start gap-1.5 mt-0.5 text-[11px] text-text-secondary leading-snug">
          <Info className="w-3.5 h-3.5 text-text-muted flex-shrink-0 mt-0.5" />
          <span>{note}</span>
        </div>
      )}
    </div>
  );
}

export default ConfidenceIndicator;
