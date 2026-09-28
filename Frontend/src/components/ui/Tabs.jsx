import React from 'react';

/**
 * Reusable Tabs navigation primitive.
 *
 * @param {Object} props
 * @param {Array<{ id: string, label: string, icon?: React.ComponentType<{ className?: string }>, badge?: string|number, disabled?: boolean }>} props.items
 * @param {string} props.activeTab
 * @param {(id: string) => void} props.onChange
 * @param {'default' | 'pills' | 'underline'} [props.variant='default']
 * @param {string} [props.className='']
 */
export function Tabs({
  items = [],
  activeTab,
  onChange,
  variant = 'default',
  className = '',
}) {
  const containerStyles = {
    default: 'border-b border-border gap-1',
    pills: 'bg-slate-100 p-1 rounded-lg gap-1 border border-border',
    underline: 'border-b-2 border-border gap-6',
  };

  const getItemStyles = (isActive, disabled) => {
    if (disabled) {
      return 'opacity-40 cursor-not-allowed text-text-muted';
    }

    switch (variant) {
      case 'pills':
        return isActive
          ? 'bg-white text-primary font-semibold shadow-xs'
          : 'text-text-secondary hover:text-text-primary hover:bg-slate-200/60';
      case 'underline':
        return isActive
          ? 'text-primary font-semibold border-b-2 border-primary -mb-[2px]'
          : 'text-text-secondary hover:text-text-primary border-b-2 border-transparent -mb-[2px]';
      case 'default':
      default:
        return isActive
          ? 'bg-white text-primary font-semibold border border-border border-b-white -mb-px rounded-t-lg shadow-2xs'
          : 'text-text-secondary hover:text-text-primary hover:bg-slate-50 border border-transparent rounded-t-lg';
    }
  };

  const handleKeyDown = (e, currentIndex) => {
    const enabledTabs = items.filter((t) => !t.disabled);
    if (enabledTabs.length === 0) return;

    let targetTab = null;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const currentEnabledIndex = enabledTabs.findIndex((t) => t.id === items[currentIndex].id);
      const nextIndex = (currentEnabledIndex + 1) % enabledTabs.length;
      targetTab = enabledTabs[nextIndex];
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const currentEnabledIndex = enabledTabs.findIndex((t) => t.id === items[currentIndex].id);
      const prevIndex = (currentEnabledIndex - 1 + enabledTabs.length) % enabledTabs.length;
      targetTab = enabledTabs[prevIndex];
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetTab = enabledTabs[0];
    } else if (e.key === 'End') {
      e.preventDefault();
      targetTab = enabledTabs[enabledTabs.length - 1];
    }

    if (targetTab && onChange) {
      onChange(targetTab.id);
    }
  };

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={`flex items-center flex-wrap ${
        containerStyles[variant] || containerStyles.default
      } ${className}`}
    >
      {items.map((tab, idx) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={tab.disabled}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onClick={() => !tab.disabled && onChange?.(tab.id)}
            className={`inline-flex items-center text-xs md:text-sm px-3.5 py-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${getItemStyles(
              isActive,
              tab.disabled
            )}`}
          >
            {Icon && <Icon className="w-4 h-4 mr-2" />}
            <span>{tab.label}</span>
            {tab.badge !== undefined && tab.badge !== null && (
              <span
                className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                  isActive
                    ? 'bg-primary-soft text-primary'
                    : 'bg-slate-200 text-text-secondary'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
