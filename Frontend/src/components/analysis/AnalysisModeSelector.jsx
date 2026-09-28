import React from 'react';
import Tabs from '../ui/Tabs';

/**
 * AnalysisModeSelector component following spec section 18.
 * Allows user to switch between single-image, bi-temporal, and optical+SAR configurations.
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
  const items = options.map((opt) => ({
    id: opt.id,
    label: opt.label,
    disabled: disabled || opt.disabled,
  }));

  return (
    <div className={`w-full ${className}`}>
      <Tabs
        items={items}
        activeTab={value}
        onChange={onChange}
        variant="pills"
        className="w-full justify-start sm:w-auto inline-flex"
      />
    </div>
  );
}

export default AnalysisModeSelector;
