import React, { useId } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

/**
 * Reusable Select component.
 *
 * @param {Object} props
 * @param {string} [props.id]
 * @param {string} [props.label]
 * @param {Array<{ value: string|number, label: string, disabled?: boolean }|string>} [props.options=[]]
 * @param {string|number} [props.value]
 * @param {(e: React.ChangeEvent<HTMLSelectElement>) => void} [props.onChange]
 * @param {string} [props.placeholder]
 * @param {string} [props.error]
 * @param {string} [props.helperText]
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.className='']
 */
export function Select({
  id,
  label,
  options = [],
  value,
  onChange,
  placeholder,
  error,
  helperText,
  disabled = false,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const selectId = id || generatedId;

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-semibold text-text-primary uppercase tracking-wider"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full text-sm text-text-primary bg-white border rounded-lg transition-all duration-150 py-2.5 pl-3.5 pr-9 appearance-none focus:outline-none focus:ring-2 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed ${
            error
              ? 'border-danger focus:border-danger focus:ring-danger/20'
              : 'border-border focus:border-primary focus:ring-primary/15'
          } ${className}`}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt, idx) => {
            const isObject = typeof opt === 'object' && opt !== null;
            const optVal = isObject ? opt.value : opt;
            const optLabel = isObject ? opt.label : opt;
            const optDisabled = isObject ? opt.disabled : false;

            return (
              <option key={idx} value={optVal} disabled={optDisabled}>
                {optLabel}
              </option>
            );
          })}
        </select>

        <div className="absolute right-3 pointer-events-none text-text-muted flex items-center">
          {error ? (
            <AlertCircle className="w-4 h-4 text-danger mr-1" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </div>

      {error ? (
        <p className="text-xs text-danger font-medium">{error}</p>
      ) : (
        helperText && <p className="text-xs text-text-muted">{helperText}</p>
      )}
    </div>
  );
}

export default Select;
