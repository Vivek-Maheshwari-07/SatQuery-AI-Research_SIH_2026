import React from 'react';
import { MessageSquareText } from 'lucide-react';
import ResultCard from './ResultCard';
import ConfidenceIndicator from '../analysis/ConfidenceIndicator';
import EvidencePanel from '../analysis/EvidencePanel';

/**
 * VQAResult component following spec section 24.
 * Displays Visual Question Answering results derived from satellite imagery.
 *
 * Expected Props / Data Contract:
 * @param {Object} props
 * @param {string} [props.question] - The query or question posed about the scene
 * @param {string} [props.answer] - The synthesized model answer
 * @param {number} [props.confidence] - Confidence score (0.0 to 1.0 or 0 to 100)
 * @param {Array<{ type: string, label: string, detail?: string }>} [props.evidence] - Supporting evidence payload
 * @param {'loading' | 'success' | 'empty' | 'error'} [props.status] - Data status
 * @param {string | object} [props.error] - Error details when status is 'error'
 * @param {string} [props.className='']
 */
export function VQAResult({
  question,
  answer,
  confidence,
  evidence,
  status,
  error,
  className = '',
}) {
  const effectiveStatus =
    status || (question || answer ? 'success' : 'empty');

  const hasEvidence = Boolean(
    evidence && Array.isArray(evidence) && evidence.length > 0
  );

  return (
    <ResultCard
      title="Visual Question Answering"
      icon={MessageSquareText}
      status={effectiveStatus}
      error={error}
      emptyTitle="No VQA result"
      emptyDescription="Ask a question about the satellite scene to generate an answer."
      className={className}
    >
      <div className="space-y-4 text-left">
        {/* Question block */}
        {question && (
          <div className="p-3.5 bg-surface rounded-lg border border-border">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">
              Question
            </span>
            <p className="text-sm font-medium text-text-primary leading-relaxed">
              {question}
            </p>
          </div>
        )}

        {/* Answer block */}
        {answer && (
          <div className="p-4 bg-primary/5 rounded-lg border-2 border-primary/20 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
              Answer
            </span>
            <p className="text-base font-semibold text-text-primary leading-normal">
              {answer}
            </p>

            {confidence !== undefined && confidence !== null && (
              <div className="pt-2 border-t border-primary/15">
                <ConfidenceIndicator value={confidence} />
              </div>
            )}
          </div>
        )}

        {/* Evidence Panel: rendered only if evidence prop provided */}
        {hasEvidence && (
          <div className="pt-2">
            <EvidencePanel evidence={evidence} />
          </div>
        )}
      </div>
    </ResultCard>
  );
}

export default VQAResult;
