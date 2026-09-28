import React from 'react';
import { PlusCircle, FileText } from 'lucide-react';
import Button from '../ui/Button';

/**
 * AnalysisActions component following spec section 18.
 * Provides next-step actions after analysis completion: starting a new analysis or viewing full reports.
 *
 * @param {Object} props
 * @param {() => void} props.onNewAnalysis - Callback to reset workflow for another query
 * @param {() => void} props.onViewReport - Callback to navigate to report view
 * @param {string} [props.className='']
 */
export function AnalysisActions({
  onNewAnalysis,
  onViewReport,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white rounded-xl border border-border shadow-xs ${className}`}
    >
      <div className="text-xs text-text-secondary text-left">
        <span className="font-semibold text-text-primary">Analysis Completed.</span>{' '}
        Export intelligence summary or formulate a follow-up query.
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto">
        <Button
          variant="outline"
          size="sm"
          icon={PlusCircle}
          onClick={onNewAnalysis}
          className="flex-1 sm:flex-none"
        >
          New Analysis
        </Button>

        <Button
          variant="primary"
          size="sm"
          icon={FileText}
          onClick={onViewReport}
          className="flex-1 sm:flex-none shadow-xs"
        >
          View Full Report
        </Button>
      </div>
    </div>
  );
}

export default AnalysisActions;
