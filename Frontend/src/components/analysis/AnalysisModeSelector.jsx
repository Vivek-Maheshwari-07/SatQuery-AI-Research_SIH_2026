import React from 'react';

/**
 * AnalysisModeSelector component following spec section 18.
 * Allows user to switch between single-image, bi-temporal, and optical+SAR configurations.
 * Selected tab features controlled neo-brutalist emphasis.
 *
 * @param {Object} props
 * @param {Array<{ id: string, label: string, disabled?: boolean }>} props.options - List of configuration options
 * @param {string} props.value - Currently selected configuration id
 * @param {(id: string) => void} props.onChange - Selection change callback
 * @param {boolean} [props.disabled=false] - Disable interaction while analysis is running
 * @param {string} [props.className='']
 */
export function AnalysisModeSelector({
  options = [],
  value,
  onChange,
  disabled = false,
  className = '',
}) {
  const handleKeyDown = (e, currentIndex) => {
    const enabledOptions = options.filter((o) => !o.disabled && !disabled);
    if (enabledOptions.length === 0) return;

    let targetOption = null;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const currentIdx = enabledOptions.findIndex((o) => o.id === options[currentIndex].id);
      const nextIdx = (currentIdx + 1) % enabledOptions.length;
      targetOption = enabledOptions[nextIdx];
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIdx = enabledOptions.findIndex((o) => o.id === options[currentIndex].id);
      const prevIdx = (currentIdx - 1 + enabledOptions.length) % enabledOptions.length;
      targetOption = enabledOptions[prevIdx];
    }

    if (targetOption && onChange) {
      onChange(targetOption.id);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Input Mode Selector"
      className={`grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl border border-border ${className}`}
    >
      {options.map((opt, idx) => {
        const isSelected = value === opt.id;
        const isDisabled = disabled || opt.disabled;

        return (
          <button
            key={opt.id}
            role="tab"
            type="button"
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            disabled={isDisabled}
            onClick={() => !isDisabled && onChange(opt.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`py-2 px-2.5 text-xs font-semibold rounded-lg transition-all text-center select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              isSelected
                ? 'bg-white text-primary border border-primary-dark shadow-brutal-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-slate-200/60'
            } ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default AnalysisModeSelector;
