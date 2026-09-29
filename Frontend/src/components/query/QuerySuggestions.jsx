import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * QuerySuggestions component that renders suggested query chips for the active input mode.
 *
 * @param {Object} props
 * @param {string[]} [props.suggestions=[]]
 * @param {(suggestion: string) => void} props.onSelectSuggestion
 * @param {string} [props.className='']
 */
export function QuerySuggestions({
  suggestions = [],
  onSelectSuggestion,
  className = '',
}) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className={`flex flex-col gap-1.5 text-left ${className}`}>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
        <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
        <span>Sample queries</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectSuggestion?.(item)}
            className="text-left text-xs bg-surface hover:bg-primary-soft hover:text-primary hover:border-blue-300 text-text-secondary border border-border rounded-lg px-2.5 py-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            "{item}"
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuerySuggestions;
