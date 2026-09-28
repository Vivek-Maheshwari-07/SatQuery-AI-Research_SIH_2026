import React from 'react';
import { Send } from 'lucide-react';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

/**
 * Natural language Query Input component following spec section 22.
 * Collects multimodal queries with keyboard shortcut submission (Ctrl+Enter / Cmd+Enter).
 *
 * @param {Object} props
 * @param {string} props.value - Query text value
 * @param {(e: React.ChangeEvent<HTMLTextAreaElement>) => void} props.onChange - Text change callback
 * @param {() => void} [props.onSubmit] - Submit handler
 * @param {boolean} [props.loading=false] - Analysis running state
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.error] - Input validation error message
 * @param {string} [props.placeholder] - Textarea placeholder
 * @param {string} [props.className='']
 */
export function QueryInput({
  value,
  onChange,
  onSubmit,
  loading = false,
  disabled = false,
  error,
  placeholder = 'Ask a question or enter analysis instructions about the uploaded satellite imagery...',
  className = '',
}) {
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!disabled && !loading && onSubmit) {
        onSubmit();
      }
    }
  };

  const isSubmitDisabled = disabled || loading || !value || !value.trim();

  return (
    <div className={`w-full flex flex-col gap-3 ${className}`}>
      <div className="relative">
        <Textarea
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          disabled={disabled || loading}
          error={error}
          rows={3}
          placeholder={placeholder}
          className="pr-4 pb-12 font-sans"
        />

        {/* Floating action row inside or beneath textarea */}
        <div className="absolute right-2.5 bottom-2.5 flex items-center gap-2">
          <span className="hidden sm:inline-block text-[11px] text-text-muted select-none mr-1">
            <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono">
              Ctrl
            </kbd>{' '}
            +{' '}
            <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono">
              Enter
            </kbd>
          </span>

          <Button
            variant="primary"
            size="sm"
            loading={loading}
            disabled={isSubmitDisabled}
            onClick={onSubmit}
            icon={Send}
            iconPosition="right"
          >
            Submit Query
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QueryInput;
