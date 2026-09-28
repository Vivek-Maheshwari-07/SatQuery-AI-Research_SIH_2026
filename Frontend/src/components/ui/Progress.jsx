import React from 'react';

/**
 * Accessible Progress bar component.
 *
 * @param {Object} props
 * @param {number} props.value - Current progress value
 * @param {number} [props.max=100] - Max progress value
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {'primary' | 'success' | 'warning' | 'danger'} [props.variant='primary']
 * @param {boolean} [props.showLabel=false]
 * @param {string} [props.label]
 * @param {string} [props.className='']
 */
export function Progress({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  label,
  className = '',
}) {
  const percentage = Math.min(Math.max(0, Math.round((value / max) * 100)), 100);

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variantStyles = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
  };

  return (
    <div className={`w-full flex flex-col gap-1.5 text-left ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-xs font-medium text-text-secondary">
          <span>{label}</span>
          {showLabel && <span className="font-semibold text-text-primary">{percentage}%</span>}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={`w-full bg-slate-100 border border-border/60 rounded-full overflow-hidden ${
          sizeStyles[size] || sizeStyles.md
        }`}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${
            variantStyles[variant] || variantStyles.primary
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default Progress;
