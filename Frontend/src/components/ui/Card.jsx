import React from 'react';

/**
 * Multi-variant Card primitive.
 * Supports default SaaS, elevated, neo-brutalist (spec section 3), and soft neo-morphic styling.
 *
 * @param {Object} props
 * @param {'default' | 'elevated' | 'brutalist' | 'soft'} [props.variant='default']
 * @param {'none' | 'sm' | 'md' | 'lg'} [props.padding='md']
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 * @param {() => void} [props.onClick]
 */
export function Card({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  onClick,
  ...rest
}) {
  const baseStyles = 'rounded-xl transition-all duration-150 text-left';

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3.5',
    md: 'p-5',
    lg: 'p-7',
  };

  const variantStyles = {
    // Clean enterprise SaaS card with subtle border and crisp shadow
    default:
      'bg-white border border-border shadow-xs text-text-primary',

    // Elevated surface with refined deeper shadow
    elevated:
      'bg-white border border-border shadow-elevated text-text-primary',

    // Neo-brutalism: Strong border, clear geometry, controlled hard offset shadow, high contrast
    brutalist:
      'bg-white border-2 border-text-primary shadow-brutalist text-text-primary hover:shadow-brutalist-hover hover:translate-x-0.5 hover:translate-y-0.5',

    // Neo-morphism: Controlled depth, soft surfaces, gentle diffused shadow
    soft:
      'bg-surface border border-slate-200/80 shadow-soft text-text-primary',
  };

  const interactiveStyles = onClick
    ? 'cursor-pointer select-none active:scale-[0.99]'
    : '';

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.default} ${
        paddingStyles[padding] || paddingStyles.md
      } ${interactiveStyles} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
