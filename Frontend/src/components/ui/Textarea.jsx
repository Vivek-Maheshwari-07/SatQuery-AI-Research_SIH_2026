import React, { useId } from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Textarea component with label, error state, and helper text.
 *
 * @param {Object} props
 * @param {string} [props.id]
 * @param {string} [props.label]
 * @param {string} [props.error]
 * @param {string} [props.helperText]
 * @param {boolean} [props.disabled=false]
 * @param {number} [props.rows=4]
 * @param {string} [props.className='']
 */
export function Textarea({
  id,
  label,
  error,
  helperText,
  disabled = false,
  rows = 4,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || generatedId;

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

      <div className="relative">
        <textarea
          id={inputId}
          rows={rows}
          disabled={disabled}
          className={`w-full text-sm text-text-primary bg-white border rounded-lg transition-all duration-150 p-3 placeholder:text-text-muted focus:outline-none focus:ring-2 resize-y disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed ${
            error
              ? 'border-danger focus:border-danger focus:ring-danger/20'
              : 'border-border focus:border-primary focus:ring-primary/15'
          } ${className}`}
          {...rest}
        />

        {error && (
          <div className="absolute right-3 top-3 pointer-events-none text-danger">
            <AlertCircle className="w-4 h-4" />
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-danger font-medium">{error}</p>
      ) : (
        helperText && <p className="text-xs text-text-muted">{helperText}</p>
      )}
    </div>
  );
}

export default Textarea;
