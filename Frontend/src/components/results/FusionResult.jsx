import React from 'react';
import { Sparkles, Radio } from 'lucide-react';
import ResultCard from './ResultCard';
import ModalityBadge from '../imagery/ModalityBadge';
import ImageViewer from '../visualization/ImageViewer';
import ConfidenceIndicator from '../analysis/ConfidenceIndicator';
import EvidencePanel from '../analysis/EvidencePanel';

/**
 * FusionResult component following spec section 29.
 * Displays multi-modal Optical + SAR fused intelligence analysis.
 *
 * Expected Props / Data Contract:
 * @param {Object} props
 * @param {string | { src?: string, label?: string, description?: string }} [props.optical] - Optical imagery source or object
 * @param {string | { src?: string, label?: string, description?: string }} [props.sar] - SAR radar imagery source or object
 * @param {string | { summary?: string, analysis?: string }} [props.fusedResult] - Joint multi-modal fused intelligence
 * @param {Array<{ type: string, label: string, detail?: string }>} [props.evidence] - Supporting evidence payload
 * @param {number} [props.confidence] - Confidence score (0.0 to 1.0 or 0 to 100)
 * @param {'loading' | 'success' | 'empty' | 'error'} [props.status] - Data status
 * @param {string | object} [props.error] - Error details when status is 'error'
 * @param {string} [props.className='']
 */
export function FusionResult({
  optical,
  sar,
  fusedResult,
  evidence,
  confidence,
  status,
  error,
  className = '',
}) {
  const hasData = Boolean(optical || sar || fusedResult);
  const effectiveStatus = status || (hasData ? 'success' : 'empty');

  const opticalSrc = typeof optical === 'string' ? optical : optical?.src;
  const opticalLabel = typeof optical === 'object' ? optical?.label : 'Visible Spectrum';
  const opticalDesc = typeof optical === 'object' ? optical?.description : null;

  const sarSrc = typeof sar === 'string' ? sar : sar?.src;
  const sarLabel = typeof sar === 'object' ? sar?.label : 'Synthetic Aperture Radar';
  const sarDesc = typeof sar === 'object' ? sar?.description : null;

  const fusedText =
    typeof fusedResult === 'string'
      ? fusedResult
      : fusedResult?.analysis || fusedResult?.summary || null;

  const hasEvidence = Boolean(
    evidence && Array.isArray(evidence) && evidence.length > 0
  );

  return (
    <ResultCard
      title="Optical + SAR Multi-Modal Fusion"
      icon={Sparkles}
      status={effectiveStatus}
      error={error}
      emptyTitle="No fusion result"
      emptyDescription="Upload both Optical and SAR modalities to perform fused multi-sensor analysis."
      className={className}
    >
      <div className="space-y-6 text-left">
        {/* Multi-modal Evidence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. Optical Evidence */}
          <div className="p-3.5 bg-surface rounded-xl border border-border flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-text-primary">
                Optical Evidence
              </span>
              <ModalityBadge modality="Optical" size="sm" />
            </div>

            {opticalSrc ? (
              <div className="h-64 w-full rounded-lg overflow-hidden border border-border">
                <ImageViewer src={opticalSrc} alt="Optical Evidence Raster" />
              </div>
            ) : (
              <div className="h-64 w-full rounded-lg bg-slate-100 flex items-center justify-center text-xs text-text-muted">
                No optical raster provided
              </div>
            )}

            <div className="text-[11px] text-text-secondary">
              <span className="font-semibold text-text-primary">{opticalLabel}</span>
              {opticalDesc && <p className="mt-0.5">{opticalDesc}</p>}
            </div>
          </div>

          {/* 2. SAR Evidence (Radar Screen High-Contrast Theme) */}
          <div className="p-3.5 bg-slate-950 rounded-xl border-2 border-amber-500/40 flex flex-col gap-2.5 text-slate-100 shadow-md">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>SAR Evidence</span>
              </div>
              <ModalityBadge modality="SAR" size="sm" />
            </div>

            {sarSrc ? (
              <div className="h-64 w-full rounded-lg overflow-hidden border border-amber-500/30">
                <ImageViewer src={sarSrc} alt="SAR Radar Raster" />
              </div>
            ) : (
              <div className="h-64 w-full rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-slate-400">
                No SAR raster provided
              </div>
            )}

            <div className="text-[11px] text-slate-300">
              <span className="font-semibold text-amber-300">{sarLabel}</span>
              {sarDesc && <p className="mt-0.5 text-slate-400">{sarDesc}</p>}
            </div>
          </div>
        </div>

        {/* 3. Joint Analysis Narrative and Confidence */}
        {fusedText && (
          <div className="p-4 bg-primary/5 rounded-xl border-2 border-primary/20 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
              Joint Analysis
            </span>
            <p className="text-sm md:text-base font-medium text-text-primary leading-relaxed">
              {fusedText}
            </p>

            {confidence !== undefined && confidence !== null && (
              <div className="pt-3 border-t border-primary/15">
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

export default FusionResult;
