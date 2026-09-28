import React from 'react';
import AnalysisHeader from './AnalysisHeader';
import QuerySummary from '../query/QuerySummary';
import ExecutionTrace from './ExecutionTrace';
import MeasurementResult from '../results/MeasurementResult';
import ErrorState from '../ui/ErrorState';
import { RESULT_COMPONENTS } from '../../utils/resultRenderer';

/**
 * AnalysisOutput component following spec sections 18, 23-33, and 55.
 * Reusable container that unifies the standard analysis result presentation across
 * the Analyze, Results, and History workflows.
 *
 * @param {Object} props
 * @param {Object} props.analysis - Adapted analysis result object
 * @param {string} props.analysis.intent - Analysis intent (vqa, grounding, etc.)
 * @param {string} [props.analysis.sessionId] - Session ID
 * @param {string} [props.analysis.inputConfiguration] - Input mode
 * @param {string} [props.analysis.query] - Query string
 * @param {Array<File>} [props.analysis.uploadedFiles] - Uploaded files
 * @param {Object} props.analysis.componentProps - Props for the specific result component
 * @param {Array<Object>} [props.analysis.measurements] - Extra physical measurements
 * @param {Array<Object>} [props.analysis.trace] - Execution pipeline steps
 * @param {string} [props.className='']
 */
export function AnalysisOutput({ analysis, className = '' }) {
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
    measurements = [],
    trace = [],
  } = analysis;

  const ResultComponent = intent ? RESULT_COMPONENTS[intent] : null;
  const filesCount = uploadedFiles.length || (inputConfiguration === 'single' ? 1 : 2);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 1. Header with Intent Badge & Session Readout */}
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

      {/* 3. Primary Intent-Specific Result View */}
      {ResultComponent ? (
        <ResultComponent {...componentProps} />
      ) : (
        <ErrorState
          title="Unsupported Result Type"
          message={`The backend returned intent "${intent}", which has no matching presentation component.`}
        />
      )}

      {/* 4. Extra Physical Measurements (if not already the primary measurement intent) */}
      {measurements && measurements.length > 0 && intent !== 'measurement' && (
        <MeasurementResult measurements={measurements} />
      )}

      {/* 5. Execution Pipeline Trace */}
      {trace && trace.length > 0 && <ExecutionTrace steps={trace} />}
    </div>
  );
}

export default AnalysisOutput;
