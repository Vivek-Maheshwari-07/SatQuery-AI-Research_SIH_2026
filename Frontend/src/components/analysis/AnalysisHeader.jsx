import React from 'react';
import { Sparkles, Hash, Layers } from 'lucide-react';
import Badge from '../ui/Badge';
import { getConfigurationById } from '../../app/analysisConfig';

/**
 * Format raw intent code into human readable name.
 * @param {string} intent
 */
function formatIntentName(intent) {
  if (!intent) return 'Analysis Result';
  const intentMap = {
    vqa: 'Visual Question Answering',
    grounding: 'Visual Grounding',
    detection: 'Object Detection',
    segmentation: 'Semantic Segmentation',
    change_analysis: 'Change Detection',
    fusion: 'Optical + SAR Fusion',
    captioning: 'Scene Captioning',
    measurement: 'Physical Measurement',
  };
  return intentMap[intent] || intent.replace(/_/g, ' ').toUpperCase();
}

/**
 * AnalysisHeader component following spec section 18.
 * Displays top-level metadata for completed analysis: intent badge, session ID, and mode.
 *
 * @param {Object} props
 * @param {string} props.intent - Backend intent identifier
 * @param {string} [props.sessionId] - Session / analysis run identifier
 * @param {string} [props.inputConfiguration] - Mode identifier ('single' | 'bitemporal' | 'optical_sar')
 * @param {string} [props.className='']
 */
export function AnalysisHeader({
  intent,
  sessionId,
  inputConfiguration,
  className = '',
}) {
  const config = getConfigurationById(inputConfiguration);
  const formattedIntent = formatIntentName(intent);

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-xl border-2 border-text-primary shadow-brutalist text-left ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-primary-soft text-primary flex items-center justify-center border border-primary/20">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-text-primary">
              {formattedIntent}
            </h2>
            <Badge variant="primary" size="sm">
              {intent}
            </Badge>
          </div>
          {sessionId && (
            <div className="flex items-center gap-1 text-[11px] text-text-muted font-mono mt-0.5">
              <Hash className="w-3 h-3" />
              <span>Session: {sessionId}</span>
            </div>
          )}
        </div>
      </div>

      {config && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface border border-border rounded-lg text-xs text-text-secondary font-medium">
          <Layers className="w-3.5 h-3.5 text-text-muted" />
          <span>{config.label} Mode</span>
        </div>
      )}
    </div>
  );
}

export default AnalysisHeader;
