import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Workflow } from 'lucide-react';
import AnalysisHeader from './AnalysisHeader';
import QuerySummary from '../query/QuerySummary';
import ConfidenceIndicator from './ConfidenceIndicator';
import EvidencePanel from './EvidencePanel';
import ExecutionTrace from './ExecutionTrace';
import MeasurementResult from '../results/MeasurementResult';
import ErrorState from '../ui/ErrorState';
import { RESULT_COMPONENTS } from '../../utils/resultRenderer';

/**
 * AnalysisOutput component following spec sections 18, 23-33, and Part 3 item 3.
 * Hierarchical result container:
 * 1. AnalysisHeader (intent badge, session id in mono, input configuration)
 * 2. QuerySummary (if query provided)
 * 3. Primary Answer/Result Card (largest, brutalist)
 * 4. ConfidenceIndicator (if top-level confidence provided)
 * 5. EvidencePanel (if top-level evidence provided)
 * 6. Measurements (if top-level measurements provided and intent != measurement)
 * 7. ExecutionTrace inside collapsible section (audit log)
 *
 * @param {Object} props
 * @param {Object} props.analysis - Adapted analysis result object
 * @param {string} props.analysis.intent - Analysis intent (vqa, grounding, etc.)
 * @param {string} [props.analysis.sessionId] - Session ID
 * @param {string} [props.analysis.inputConfiguration] - Input mode
 * @param {string} [props.analysis.query] - Query string
 * @param {Array<File>} [props.analysis.uploadedFiles] - Uploaded files
 * @param {Object} props.analysis.componentProps - Props for the specific result component
 * @param {number} [props.analysis.confidence] - Confidence score
 * @param {string} [props.analysis.confidenceNote] - Confidence note
 * @param {Array<Object>} [props.analysis.evidence] - Evidence array
 * @param {Array<Object>} [props.analysis.measurements] - Extra physical measurements
 * @param {Array<Object>} [props.analysis.trace] - Execution pipeline steps
 * @param {string} [props.className='']
 */
export function AnalysisOutput({ analysis, className = '' }) {
  // Collapsed by default on mobile (< 1024px), expanded on desktop (>= 1024px)
  const [isTraceExpanded, setIsTraceExpanded] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  if (!analysis) {
    return null;
  }

  const {
    intent,
    sessionId,
    inputConfiguration = 'single',
    query = '',
    uploadedFiles = [],
    componentProps = {},
    confidence,
    confidenceNote,
    evidence = [],
    measurements = [],
    trace = [],
  } = analysis;

  const ResultComponent = intent ? RESULT_COMPONENTS[intent] : null;
  const filesCount = uploadedFiles.length || (inputConfiguration === 'single' ? 1 : 2);

  // Check if child result component handles evidence and confidence internally
  const intentHandlesInternalConfidence =
    intent === 'vqa' ||
    intent === 'captioning' ||
    intent === 'grounding' ||
    intent === 'detection' ||
    intent === 'segmentation' ||
    intent === 'change_analysis' ||
    intent === 'fusion';

  const intentHandlesInternalEvidence =
    intent === 'vqa' ||
    intent === 'grounding' ||
    intent === 'change_analysis' ||
    intent === 'fusion';

  return (
    <div className={`space-y-6 text-left ${className}`}>
      {/* 1. Header with Intent Badge & Session Readout in mono */}
      <AnalysisHeader
        intent={intent}
        sessionId={sessionId}
        inputConfiguration={inputConfiguration}
      />

      {/* 2. Executed Query and Input Summary */}
      {query && (
        <QuerySummary
          query={query}
          inputConfiguration={inputConfiguration}
          filesCount={filesCount}
        />
      )}

      {/* 3. Primary Intent-Specific Result View (largest, brutalist) */}
      {ResultComponent ? (
        <ResultComponent {...componentProps} />
      ) : (
        <ErrorState
          title="Unsupported Result Type"
          message={`The backend returned intent "${intent}", which has no matching presentation component.`}
        />
      )}

      {/* 4. Top-level Confidence Indicator (if not rendered inside result component) */}
      {confidence !== undefined &&
        confidence !== null &&
        !intentHandlesInternalConfidence && (
          <div className="p-4 bg-white rounded-xl border border-border shadow-2xs">
            <ConfidenceIndicator value={confidence} note={confidenceNote} />
          </div>
        )}

      {/* 5. Top-level Evidence Panel (if not rendered inside result component) */}
      {evidence &&
        evidence.length > 0 &&
        !intentHandlesInternalEvidence && (
          <EvidencePanel evidence={evidence} />
        )}

      {/* 6. Extra Physical Measurements (if not already the primary measurement intent) */}
      {measurements && measurements.length > 0 && intent !== 'measurement' && (
        <MeasurementResult measurements={measurements} />
      )}

      {/* 7. Collapsible Execution Trace Audit Log */}
      {trace && trace.length > 0 && (
        <div className="bg-white rounded-xl border border-border overflow-hidden shadow-2xs">
          <button
            type="button"
            aria-expanded={isTraceExpanded}
            onClick={() => setIsTraceExpanded((prev) => !prev)}
            className="w-full flex items-center justify-between px-5 py-3.5 bg-surface hover:bg-slate-100 transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="flex items-center gap-2 font-semibold text-sm text-text-primary">
              <Workflow className="w-4 h-4 text-primary shrink-0" />
              <span>Execution trace (audit log)</span>
              <span className="text-xs font-mono text-text-muted">
                ({trace.length} {trace.length === 1 ? 'step' : 'steps'})
              </span>
            </div>

            <div className="text-text-muted">
              {isTraceExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </button>

          {isTraceExpanded && (
            <div className="p-4 border-t border-border">
              <ExecutionTrace steps={trace} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AnalysisOutput;
