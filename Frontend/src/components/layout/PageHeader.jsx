import React from 'react';
import Button from '../ui/Button';

/**
 * Standardized PageHeader component following spec sections 16 & 50.
 *
 * @param {Object} props
 * @param {string} props.title - Main page title
 * @param {string} [props.subtitle] - Supporting descriptive text
 * @param {React.ReactNode} [props.badge] - Optional status badge or indicator
 * @param {React.ReactNode | Array<{ label: string, onClick: () => void, variant?: string, icon?: any, disabled?: boolean, loading?: boolean }>} [props.actions]
 * @param {string} [props.className='']
 */
export function PageHeader({
  title,
  subtitle,
  badge,
  actions,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-border ${className}`}
    >
      <div className="flex flex-col gap-1 text-left">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            {title}
          </h1>
          {badge && <div>{badge}</div>}
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-text-secondary">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 flex-wrap">
          {Array.isArray(actions)
            ? actions.map((action, idx) => (
                <Button
                  key={idx}
                  variant={action.variant || 'primary'}
                  size="sm"
                  icon={action.icon}
                  loading={action.loading}
                  disabled={action.disabled}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))
            : actions}
        </div>
      )}
    </div>
  );
}

export default PageHeader;
