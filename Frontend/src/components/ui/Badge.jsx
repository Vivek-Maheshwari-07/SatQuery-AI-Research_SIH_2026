import React from 'react';

/**
 * Generic Badge component for status, modality, and tags.
 *
 * @param {Object} props
 * @param {'success' | 'warning' | 'danger' | 'neutral' | 'primary' | 'optical' | 'sar' | 'multispectral'} [props.variant='neutral']
 * @param {'sm' | 'md'} [props.size='md']
 * @param {boolean} [props.dot=false]
 * @param {React.ComponentType<{ className?: string }>} [props.icon]
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 */
export function Badge({
  variant = 'neutral',
  size = 'md',
  dot = false,
  icon: Icon,
  children,
  className = '',
  ...rest
}) {
  const variantStyles = {
    neutral: 'bg-surface text-text-secondary border-border',
    primary: 'bg-primary-soft text-primary-dark border-blue-200',
    success: 'bg-success-soft text-success-strong border-green-200',
    warning: 'bg-warning-soft text-warning-strong border-amber-200',
    danger: 'bg-danger-soft text-danger-strong border-red-200',
    optical: 'bg-primary-soft text-primary-dark border-blue-200',
    sar: 'bg-warning-soft text-warning-strong border-amber-200',
    multispectral: 'bg-success-soft text-success-strong border-green-200',
  };

  const dotStyles = {
    neutral: 'bg-text-muted',
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    optical: 'bg-primary',
    sar: 'bg-warning',
    multispectral: 'bg-success',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border tracking-wide uppercase ${
        variantStyles[variant] || variantStyles.neutral
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...rest}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            dotStyles[variant] || dotStyles.neutral
          }`}
        />
      )}
      {Icon && <Icon className={`${iconSizes[size] || iconSizes.md} shrink-0`} />}
      <span>{children}</span>
    </span>
  );
}

export default Badge;
