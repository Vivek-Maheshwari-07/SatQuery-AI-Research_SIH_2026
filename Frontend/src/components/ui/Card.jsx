import React from 'react';

/**
 * Multi-variant Card primitive.
 * Supports default SaaS (flat white + 1px border), elevated, neo-brutalist (spec section 3), and soft neo-morphic styling.
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
    // Clean enterprise SaaS card: flat white surface + 1px Border (#D9E2F0), no shadow
    default:
      'bg-white border border-border text-text-primary',

    // Elevated surface with subtle 0 1px 3px shadow
    elevated:
      'bg-white border border-border shadow-elevated text-text-primary',

    // Neo-brutalism: 1px ink/primary-dark border + brutal shadow; hover/active translations
    brutalist:
      'bg-white border border-ink shadow-brutal text-text-primary hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',

    // Neo-morphism: Controlled depth, soft surfaces, raised shadow
    soft:
      'bg-surface border border-border shadow-raised text-text-primary',
  };

  const interactiveStyles = onClick
    ? 'cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
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
