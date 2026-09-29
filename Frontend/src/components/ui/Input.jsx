import React, { useId } from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Text Input component with label, helper text, error state, and icon support.
 *
 * @param {Object} props
 * @param {string} [props.id]
 * @param {string} [props.label]
 * @param {string} [props.error]
 * @param {string} [props.helperText]
 * @param {boolean} [props.disabled=false]
 * @param {React.ComponentType<{ className?: string }>} [props.leftIcon]
 * @param {React.ComponentType<{ className?: string }>} [props.rightIcon]
 * @param {string} [props.className='']
 * @param {string} [props.type='text']
 */
export function Input({
  id,
  label,
  error,
  helperText,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  type = 'text',
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const describedBy = error ? errorId : helperText ? helperId : undefined;

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-text-primary uppercase tracking-wider"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {LeftIcon && (
          <div className="absolute left-3 pointer-events-none text-text-muted">
            <LeftIcon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          type={type}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`w-full text-sm text-text-primary bg-white border rounded-lg shadow-inset transition-all duration-150 py-2.5 placeholder:text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:bg-slate-100 disabled:text-text-muted disabled:cursor-not-allowed ${
            LeftIcon ? 'pl-9' : 'pl-3.5'
          } ${RightIcon || error ? 'pr-9' : 'pr-3.5'} ${
            error
              ? 'border-danger focus:border-danger text-danger'
              : 'border-border focus:border-primary'
          } ${className}`}
          {...rest}
        />

        {error ? (
          <div className="absolute right-3 pointer-events-none text-danger">
            <AlertCircle className="w-4 h-4" />
          </div>
        ) : (
          RightIcon && (
            <div className="absolute right-3 pointer-events-none text-text-muted">
              <RightIcon className="w-4 h-4" />
            </div>
          )
        )}
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

export default Input;
