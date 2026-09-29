import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Compact Icon Button component for toolbars, actions, and navigation.
 *
 * @param {Object} props
 * @param {React.ComponentType<{ className?: string }>} props.icon
 * @param {'raised' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} [props.variant='ghost']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.loading=false]
 * @param {boolean} [props.disabled=false]
 * @param {string} props.ariaLabel - Required accessibility label
 * @param {string} [props.title]
 * @param {string} [props.className='']
 * @param {'button' | 'submit' | 'reset'} [props.type='button']
 */
export function IconButton({
  icon: Icon,
  variant = 'ghost',
  size = 'md',
  loading = false,
  disabled = false,
  ariaLabel,
  'aria-label': ariaLabelProp,
  title,
  className = '',
  type = 'button',
  ...rest
}) {
  const isDisabled = disabled || loading;
  const label = ariaLabelProp || ariaLabel || title;

  const baseStyles =
    'inline-flex items-center justify-center rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'w-7 h-7 p-1',
    md: 'w-9 h-9 p-2',
    lg: 'w-11 h-11 p-2.5',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const variantStyles = {
    raised:
      'bg-white text-text-primary border border-border shadow-raised hover:bg-slate-50 hover:text-primary active:translate-y-0.5 disabled:bg-slate-100 disabled:text-text-muted disabled:shadow-none',
    primary:
      'bg-primary text-white hover:bg-primary-dark shadow-sm active:translate-y-0.5 disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none',
    secondary:
      'bg-surface text-text-primary border border-border hover:bg-slate-100 shadow-sm active:translate-y-0.5 disabled:bg-slate-100 disabled:text-text-muted',
    outline:
      'bg-transparent text-text-secondary border border-border hover:bg-primary-soft hover:text-primary hover:border-primary disabled:border-slate-200 disabled:text-text-muted',
    ghost:
      'bg-transparent text-text-secondary hover:bg-slate-100 hover:text-text-primary active:bg-slate-200/60 disabled:text-text-muted disabled:hover:bg-transparent',
    danger:
      'bg-danger text-white hover:bg-red-700 shadow-sm active:translate-y-0.5 disabled:bg-red-200 disabled:text-red-400 disabled:shadow-none',
  };

  return (
    <button
      type={type}
      aria-label={label}
      title={title || ariaLabel}
      disabled={isDisabled}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.ghost
      } ${className}`}
      {...rest}
    >
      {loading ? (
        <Loader2 className={`animate-spin ${iconSizes[size] || iconSizes.md}`} />
      ) : (
        Icon && <Icon className={iconSizes[size] || iconSizes.md} />
      )}
    </button>
  );
}

export default IconButton;
