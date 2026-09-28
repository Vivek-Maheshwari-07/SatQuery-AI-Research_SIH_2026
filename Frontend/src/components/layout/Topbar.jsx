import React from 'react';
import { Menu } from 'lucide-react';
import IconButton from '../ui/IconButton';

/**
 * Topbar component following spec section 15.
 * Provides page context, global actions, and mobile navigation trigger.
 *
 * @param {Object} props
 * @param {string} [props.title] - Current section or page title
 * @param {string} [props.subtitle] - Supporting subtitle
 * @param {React.ReactNode} [props.actions] - Global or page actions slot
 * @param {() => void} [props.onToggleSidebar] - Mobile sidebar toggle callback
 * @param {string} [props.className='']
 */
export function Topbar({
  title,
  subtitle,
  actions,
  onToggleSidebar,
  className = '',
}) {
  return (
    <header
      className={`h-16 bg-white border-b border-border px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile menu trigger button */}
        {onToggleSidebar && (
          <div className="md:hidden">
            <IconButton
              icon={Menu}
              size="md"
              variant="ghost"
              ariaLabel="Toggle sidebar menu"
              onClick={onToggleSidebar}
            />
          </div>
        )}

        {/* Page/Section Title */}
        {(title || subtitle) && (
          <div className="flex flex-col text-left truncate">
            {title && (
              <h2 className="text-sm sm:text-base font-semibold text-text-primary truncate">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[11px] text-text-muted truncate hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Global Actions Slot */}
      {actions && (
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {actions}
        </div>
      )}
    </header>
  );
}

export default Topbar;
