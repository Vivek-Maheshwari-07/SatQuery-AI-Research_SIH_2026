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
  ...rest
}) {
  const isDisabled = disabled || loading;

  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-primary text-white border border-primary hover:bg-primary-dark hover:border-primary-dark focus:ring-primary shadow-sm active:translate-y-0.5 disabled:bg-slate-300 disabled:border-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:translate-y-0',
    secondary:
      'bg-surface text-text-primary border border-border hover:bg-slate-100 hover:border-slate-300 focus:ring-primary shadow-sm active:translate-y-0.5 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:shadow-none disabled:translate-y-0',
    outline:
      'bg-transparent text-text-primary border border-border hover:bg-primary-soft hover:text-primary hover:border-primary focus:ring-primary disabled:border-slate-200 disabled:text-slate-400 disabled:bg-transparent',
    ghost:
      'bg-transparent text-text-secondary hover:bg-slate-100 hover:text-text-primary focus:ring-slate-400 disabled:text-slate-300 disabled:hover:bg-transparent',
    danger:
      'bg-danger text-white border border-danger hover:bg-red-700 hover:border-red-700 focus:ring-danger shadow-sm active:translate-y-0.5 disabled:bg-red-200 disabled:border-red-200 disabled:text-red-400 disabled:shadow-none disabled:translate-y-0',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <button
      type={type}
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
      {children}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={iconSizes[size] || iconSizes.md} />
      )}
    </button>
  );
}

export default Button;
