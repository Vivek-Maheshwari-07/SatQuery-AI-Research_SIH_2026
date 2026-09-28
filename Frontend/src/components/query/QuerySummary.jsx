import React from 'react';
import { MessageSquare, Image as ImageIcon } from 'lucide-react';
import { getConfigurationById } from '../../app/analysisConfig';

/**
 * QuerySummary component following spec section 18.
 * Displays a concise readout of the user's executed query and image payload.
 *
 * @param {Object} props
 * @param {string} props.query - Executed natural language query
 * @param {string} [props.inputConfiguration] - Selected input mode
 * @param {number} [props.filesCount=1] - Number of imagery files analyzed
 * @param {string} [props.className='']
 */
export function QuerySummary({
  query,
  inputConfiguration,
  filesCount = 1,
  className = '',
}) {
  const config = getConfigurationById(inputConfiguration);

  return (
    <div
      className={`p-3.5 bg-surface rounded-xl border border-border text-left space-y-2 ${className}`}
    >
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-text-muted text-[10px]">
          <MessageSquare className="w-3.5 h-3.5 text-primary" />
          <span>Executed Query</span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-text-secondary font-medium">
          <ImageIcon className="w-3.5 h-3.5 text-text-muted" />
          <span>
            {filesCount} {filesCount === 1 ? 'image' : 'images'} ({config?.label || 'Raster'})
          </span>
        </div>
      </div>

      <p className="text-xs md:text-sm font-semibold text-text-primary leading-relaxed">
        &ldquo;{query}&rdquo;
      </p>
    </div>
  );
}

export default QuerySummary;
