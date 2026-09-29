import React from 'react';
import { Menu } from 'lucide-react';
import IconButton from '../ui/IconButton';
import Badge from '../ui/Badge';
import { useSystemStatus } from '../../hooks/useSystemStatus';

/**
 * Topbar component following spec section 15.
 * Provides page context, global actions, connection status badge, and mobile navigation trigger.
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
  const { status: systemStatus, data: healthData } = useSystemStatus();

  const renderConnectionBadge = () => {
    if (systemStatus === 'loading') {
      return (
        <Badge variant="neutral" size="sm" dot>
          Connecting
        </Badge>
      );
    }
    if (systemStatus === 'success' && healthData?.status === 'ok') {
      return (
        <Badge variant="success" size="sm" dot>
          System Ready
        </Badge>
      );
    }
    if (systemStatus === 'success' && healthData?.status === 'degraded') {
      return (
        <Badge variant="warning" size="sm" dot>
          Degraded
        </Badge>
      );
    }
    // If backend is down or unreachable, show neutral Backend Offline (never fake online)
    return (
      <Badge variant="neutral" size="sm" dot>
        Backend Offline
      </Badge>
    );
  };

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
              ariaLabel="Toggle sidebar navigation"
              onClick={onToggleSidebar}
            />
          </div>
        )}

        {/* Page/Section Title */}
        {(title || subtitle) && (
          <div className="flex flex-col text-left truncate">
            {title && (
              <h1 className="text-sm sm:text-base font-semibold text-text-primary truncate">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-[12px] text-text-muted truncate hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Global Actions Slot & Status Badge */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-center">
          {renderConnectionBadge()}
        </div>
        {actions && (
          <div className="flex items-center gap-2.5">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}

export default Topbar;
