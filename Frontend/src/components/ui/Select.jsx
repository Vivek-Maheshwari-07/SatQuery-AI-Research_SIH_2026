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
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;
  const describedBy = error ? errorId : helperText ? helperId : undefined;

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
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`w-full text-sm text-text-primary bg-white border rounded-lg shadow-inset transition-all duration-150 py-2.5 pl-3.5 pr-9 appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:bg-slate-100 disabled:text-text-muted disabled:cursor-not-allowed ${
            error
              ? 'border-danger focus:border-danger'
              : 'border-border focus:border-primary'
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
        <p id={errorId} role="alert" className="text-xs text-danger-strong font-medium">
          {error}
        </p>
      ) : (
        helperText && (
          <p id={helperId} className="text-xs text-text-muted">
            {helperText}
          </p>
        )
      )}
    </div>
  );
}

export default Select;
