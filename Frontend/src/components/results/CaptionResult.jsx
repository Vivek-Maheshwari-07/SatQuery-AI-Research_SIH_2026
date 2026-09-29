import React from 'react';
import { FileText } from 'lucide-react';
import ResultCard from './ResultCard';
import ConfidenceIndicator from '../analysis/ConfidenceIndicator';

/**
 * CaptionResult component following spec section 23.
 * Displays natural language description of satellite imagery.
 *
 * Expected Props / Data Contract:
 * @param {Object} props
 * @param {string} [props.caption] - Natural language caption generated for the scene
 * @param {number} [props.confidence] - Confidence score (0.0 to 1.0 or 0 to 100)
 * @param {'loading' | 'success' | 'empty' | 'error'} [props.status] - Data status
 * @param {string | object} [props.error] - Error details when status is 'error'
 * @param {string} [props.className='']
 */
export function CaptionResult({
  caption,
  confidence,
  status,
  error,
  className = '',
}) {
  const effectiveStatus = status || (caption ? 'success' : 'empty');

  return (
    <ResultCard
      title="Scene Captioning"
      icon={FileText}
      status={effectiveStatus}
      error={error}
      emptyTitle="No caption available"
      emptyDescription="Run scene description analysis on imagery to generate a caption."
      className={className}
    >
      <div className="p-4 bg-surface rounded-lg border border-border text-left space-y-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
          Scene Description
        </span>
        <p className="text-sm md:text-base text-text-primary leading-relaxed">
          {caption}
        </p>

        {confidence !== undefined && confidence !== null && (
          <div className="pt-3 border-t border-border">
            <ConfidenceIndicator value={confidence} />
          </div>
        )}
      </div>
    </ResultCard>
  );
}

export default CaptionResult;
