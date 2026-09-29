import React from 'react';
import { Inbox } from 'lucide-react';
import Button from './Button';

/**
 * Empty State component following spec sections 7 & 43.
 * Represents UI state when no user data is loaded (not fake data).
 *
 * @param {Object} props
 * @param {React.ComponentType<{ className?: string }>} [props.icon=Inbox]
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {React.ReactNode | { label: string, onClick: () => void, variant?: 'primary'|'secondary'|'outline' }} [props.action]
 * @param {boolean} [props.graticule=false]
 * @param {string} [props.className='']
 */
export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  graticule = false,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 md:p-12 border border-dashed border-border rounded-xl ${
        graticule ? 'bg-graticule bg-surface' : 'bg-surface/50'
      } ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-white border border-border shadow-raised flex items-center justify-center text-text-muted mb-4">
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="text-sm md:text-base font-semibold text-text-primary mb-1">
        {title}
      </h3>

      {description && (
        <p className="text-xs md:text-sm text-text-secondary max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}

      {action && (
        <div>
          {React.isValidElement(action) ? (
            action
          ) : typeof action === 'object' && action.label ? (
            <Button
              variant={action.variant || 'primary'}
              size="sm"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
