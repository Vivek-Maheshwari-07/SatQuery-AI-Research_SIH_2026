import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button component with variant styles, loading state, and disabled state.
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.loading=false]
 * @param {boolean} [props.disabled=false]
 * @param {React.ComponentType<{ className?: string }>} [props.icon]
 * @param {'left' | 'right'} [props.iconPosition='left']
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 * @param {'button' | 'submit' | 'reset'} [props.type='button']
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  children,
  className = '',
  type = 'button',
  ariaLabel,
  'aria-label': ariaLabelProp,
  ...rest
}) {
  const isDisabled = disabled || loading;
  const label = ariaLabelProp || ariaLabel;

  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[32px]',
    md: 'text-sm px-4 py-2 gap-2 min-h-[40px]',
    lg: 'text-base px-5 py-2.5 gap-2.5 min-h-[48px]',
  };

  const variantStyles = {
    // Neo-brutalist primary button
    primary:
      'bg-primary text-white border border-primary-dark shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:bg-slate-200 disabled:border-border disabled:text-text-muted disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0',
    secondary:
      'bg-surface text-text-primary border border-border hover:bg-slate-100 hover:border-slate-300 shadow-sm active:translate-y-0.5 disabled:bg-slate-100 disabled:text-text-muted disabled:border-slate-200 disabled:shadow-none disabled:translate-y-0',
    outline:
      'bg-transparent text-text-primary border border-border hover:bg-primary-soft hover:text-primary hover:border-primary active:bg-primary-soft/80 disabled:border-slate-200 disabled:text-text-muted disabled:bg-transparent',
    ghost:
      'bg-transparent text-text-secondary hover:bg-slate-100 hover:text-text-primary active:bg-slate-200/60 disabled:text-text-muted disabled:hover:bg-transparent',
    danger:
      'bg-danger text-white border border-danger-strong shadow-sm hover:bg-red-700 active:translate-y-0.5 disabled:bg-red-100 disabled:border-red-200 disabled:text-red-400 disabled:shadow-none disabled:translate-y-0',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5 shrink-0',
    md: 'w-4 h-4 shrink-0',
    lg: 'w-5 h-5 shrink-0',
  };

  return (
    <button
      type={type}
      aria-label={label}
      disabled={isDisabled}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
      {...rest}
    >
      {loading ? (
        <Loader2 className={`animate-spin ${iconSizes[size] || iconSizes.md}`} />
      ) : (
        Icon && iconPosition === 'left' && (
          <Icon className={iconSizes[size] || iconSizes.md} />
        )
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={iconSizes[size] || iconSizes.md} />
      )}
    </button>
  );
}

export default Button;
