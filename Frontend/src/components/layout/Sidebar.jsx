import React from 'react';
import { X, Satellite } from 'lucide-react';
import IconButton from '../ui/IconButton';

/**
 * Pure, data-driven Sidebar navigation component.
 *
 * @param {Object} props
 * @param {Array<{ id: string, label: string, path: string, icon: React.ComponentType<{ className?: string }>, badge?: string|number }>} props.items - Navigation item configuration
 * @param {string} props.activeItem - Active item path or ID
 * @param {(item: { id: string, label: string, path: string }) => void} props.onNavigate - Navigation callback
 * @param {boolean} [props.isOpen=false] - Mobile drawer open state
 * @param {() => void} [props.onClose] - Mobile drawer close handler
 * @param {string} [props.className='']
 */
export function Sidebar({
  items = [],
  activeItem,
  onNavigate,
  isOpen = false,
  onClose,
  className = '',
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container (256px wide desktop) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-border flex flex-col transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${className}`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-border flex items-center justify-between bg-surface">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-soft text-primary flex items-center justify-center border border-blue-200 shadow-2xs shrink-0">
              <Satellite className="w-4 h-4" />
            </div>
            <div className="text-left min-w-0">
              <span className="text-sm font-semibold text-text-primary tracking-tight block">
                SatQuery AI
              </span>
              <span className="text-[11px] text-text-muted leading-none block">
                Remote sensing assistant
              </span>
            </div>
          </div>

          {/* Close button for mobile */}
          <div className="md:hidden">
            <IconButton
              icon={X}
              size="sm"
              ariaLabel="Close sidebar"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Navigation Item List */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Main Navigation">
          {items.map((item) => {
            const isActive =
              activeItem === item.path ||
              activeItem === item.id ||
              (item.path !== '/' && activeItem?.startsWith?.(item.path));
            const Icon = item.icon;

            return (
              <button
                key={item.id || item.path}
                type="button"
                onClick={() => {
                  onNavigate?.(item);
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all text-left select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                  isActive
                    ? 'bg-primary-soft text-primary-dark font-semibold shadow-xs border-l-4 border-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {Icon && (
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-primary' : 'text-text-muted'
                      }`}
                    />
                  )}
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge !== null && (
                  <span
                    className={`ml-2 text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'bg-slate-100 text-text-secondary border border-border'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Metadata */}
        <div className="p-4 border-t border-border bg-surface text-left">
          <div className="flex items-center justify-between text-[11px] text-text-muted">
            <span>Mission Control</span>
            <span className="font-mono text-[10px] text-text-secondary">v1.0.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
