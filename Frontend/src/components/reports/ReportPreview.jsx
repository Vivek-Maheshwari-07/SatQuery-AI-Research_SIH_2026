import React from 'react';
import {
  FileText,
  Hash,
  Calendar,
  Layers,
  HelpCircle,
  Sparkles,
  Gauge,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import ReportSection from './ReportSection';
import Badge from '../ui/Badge';
import ConfidenceIndicator from '../analysis/ConfidenceIndicator';
import EvidencePanel from '../analysis/EvidencePanel';
import ExecutionTrace from '../analysis/ExecutionTrace';
import MeasurementResult from '../results/MeasurementResult';
import ErrorState from '../ui/ErrorState';
import { formatDate } from '../../utils/formatters';
import { getConfigurationById } from '../../app/analysisConfig';
import { RESULT_COMPONENTS } from '../../utils/resultRenderer';

/**
 * ReportPreview component following spec section 34.
 * Formats a complete multi-modal analytical report in the standardized order:
 * 1. Report Header
 * 2. Analysis Summary
 * 3. Input Information
 * 4. Question
 * 5. Result
 * 6. Measurements
 * 7. Confidence
 * 8. Evidence
 * 9. Execution Summary
 *
 * @param {Object} props
 * @param {Object} props.analysis - Structured analysis payload
 * @param {string} [props.className='']
 */
export function ReportPreview({ analysis, className = '' }) {
  if (!analysis) return null;

  const {
    intent,
    sessionId,
    inputConfiguration = 'single',
    query,
    uploadedFiles = [],
    componentProps = {},
    confidence,
    confidenceNote,
    evidence,
    measurements,
    trace,
    timestamp,
  } = analysis;

  const config = getConfigurationById(inputConfiguration);
  const ResultComponent = intent ? RESULT_COMPONENTS[intent] : null;
  const imageCount = uploadedFiles.length || (inputConfiguration === 'single' ? 1 : 2);

  return (
    <div className={`space-y-5 text-left ${className}`}>
      {/* 1. Report Header */}
      <div className="p-6 bg-white rounded-xl border-2 border-text-primary shadow-brutalist flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-primary block mb-1">
            SatQuery AI · Intelligence Report
          </span>
          <h2 className="text-lg md:text-xl font-semibold text-text-primary">
            Satellite Imagery Analysis Summary
          </h2>
        </div>

        <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-text-secondary">
          {sessionId && (
            <div className="flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-text-muted" />
              <span>ID: {sessionId}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-text-muted text-[11px]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Generated: {formatDate(timestamp || new Date())}</span>
          </div>
        </div>
      </div>

      {/* 2. Analysis Summary */}
      <ReportSection title="Analysis Summary" icon={Sparkles}>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted font-medium">Primary Intent:</span>
            <Badge variant="primary" size="md">
              {intent || 'Analysis'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted font-medium">Mode:</span>
            <Badge variant="neutral" size="md">
              {config.label}
            </Badge>
          </div>
        </div>
      </ReportSection>

      {/* 3. Input Information */}
      <ReportSection title="Input Information" icon={Layers}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-surface rounded-lg border border-border">
            <span className="text-[10px] font-semibold uppercase text-text-muted block">Configuration</span>
            <span className="font-semibold text-text-primary">{config.label}</span>
          </div>
          <div className="p-3 bg-surface rounded-lg border border-border">
            <span className="text-[10px] font-semibold uppercase text-text-muted block">Raster Count</span>
            <span className="font-semibold text-text-primary font-mono">{imageCount} {imageCount === 1 ? 'file' : 'files'}</span>
          </div>
          <div className="p-3 bg-surface rounded-lg border border-border">
            <span className="text-[10px] font-semibold uppercase text-text-muted block">Assigned Sensor Roles</span>
            <span className="font-semibold text-text-primary">{config.roleLabels.join(', ')}</span>
          </div>
        </div>
      </ReportSection>

      {/* 4. Question / Query */}
      {query && (
        <ReportSection title="Question / Referring Query" icon={HelpCircle}>
          <p className="text-sm font-semibold text-text-primary leading-relaxed bg-surface p-3.5 rounded-lg border border-border">
            &ldquo;{query}&rdquo;
          </p>
        </ReportSection>
      )}

      {/* 5. Result View */}
      <ReportSection title="Inference Result" icon={FileText}>
        {ResultComponent ? (
          <ResultComponent {...componentProps} />
        ) : (
          <ErrorState
            title="Unsupported Result Type"
            message={`The backend returned intent "${intent}", which has no matching presentation component.`}
          />
        )}
      </ReportSection>

      {/* 6. Physical Measurements */}
      {measurements && measurements.length > 0 && (
        <ReportSection title="Deterministic Measurements" icon={Gauge}>
          <MeasurementResult measurements={measurements} />
        </ReportSection>
      )}

      {/* 7. Model Confidence */}
      {confidence !== undefined && confidence !== null && (
        <ReportSection title="Confidence Assessment" icon={Gauge}>
          <div className="max-w-md p-3 bg-surface rounded-lg border border-border">
            <ConfidenceIndicator value={confidence} note={confidenceNote} />
          </div>
        </ReportSection>
      )}

      {/* 8. Supporting Evidence */}
      {evidence && Array.isArray(evidence) && evidence.length > 0 && (
        <ReportSection title="Supporting Evidence" icon={ShieldCheck}>
          <EvidencePanel evidence={evidence} />
        </ReportSection>
      )}

      {/* 9. Execution Pipeline Summary */}
      {trace && Array.isArray(trace) && trace.length > 0 && (
        <ReportSection title="Execution Trace" icon={Workflow}>
          <ExecutionTrace steps={trace} />
        </ReportSection>
      )}
    </div>
  );
}

export default ReportPreview;
