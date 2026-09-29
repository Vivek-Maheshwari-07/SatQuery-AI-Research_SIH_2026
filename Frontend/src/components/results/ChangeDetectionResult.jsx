import React from 'react';
import { GitCompare } from 'lucide-react';
import ResultCard from './ResultCard';
import MapViewer from '../visualization/MapViewer';
import ChangeOverlay from '../visualization/ChangeOverlay';
import ConfidenceIndicator from '../analysis/ConfidenceIndicator';
import EvidencePanel from '../analysis/EvidencePanel';

/**
 * ChangeDetectionResult component following spec section 28.
 * Displays bi-temporal multi-date comparison with change masks and narrative summary.
 *
 * Expected Props / Data Contract:
 * @param {Object} props
 * @param {string} [props.imageBefore] - Pre-event satellite raster image URL or base64 data
 * @param {string} [props.imageAfter] - Post-event satellite raster image URL or base64 data
 * @param {string | ImageData} [props.changeMask] - Change detection highlight mask
 * @param {Array<object>} [props.changeRegions] - Vector change polygons/regions from backend
 * @param {string} [props.description] - Natural language summary of detected changes
 * @param {number} [props.confidence] - Confidence score (0.0 to 1.0 or 0 to 100)
 * @param {Array<{ type: string, label: string, detail?: string }>} [props.evidence] - Supporting visual evidence payload
 * @param {'loading' | 'success' | 'empty' | 'error'} [props.status] - Data status
 * @param {string | object} [props.error] - Error details when status is 'error'
 * @param {string} [props.className='']
 */
export function ChangeDetectionResult({
  imageBefore,
  imageAfter,
  changeMask,
  // eslint-disable-next-line no-unused-vars
  changeRegions,
  description,
  confidence,
  evidence,
  status,
  error,
  className = '',
}) {
  const hasData = Boolean(
    imageBefore || imageAfter || changeMask || description
  );
  const effectiveStatus = status || (hasData ? 'success' : 'empty');

  const hasEvidence = Boolean(
    evidence && Array.isArray(evidence) && evidence.length > 0
  );

  // Prepare images array for MapViewer
  const images = [];
  if (imageBefore) {
    images.push({
      src: imageBefore,
      label: 'Before (T1)',
      alt: 'Pre-event satellite imagery (T1)',
    });
  }
  if (imageAfter) {
    images.push({
      src: imageAfter,
      label: 'After (T2)',
      alt: 'Post-event satellite imagery (T2)',
      overlays: changeMask ? (
        <ChangeOverlay changeMask={changeMask} opacity={0.65} />
      ) : null,
    });
  }

  return (
    <ResultCard
      title="Bi-Temporal Change Detection"
      icon={GitCompare}
      status={effectiveStatus}
      error={error}
      emptyTitle="No change detection result"
      emptyDescription="Upload pre and post event imagery to perform change analysis."
      className={className}
    >
      <div className="space-y-4 text-left">
        {/* Dual-raster comparison viewer */}
        {images.length > 0 && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-secondary">
                Spatial Alignment & Mask Overlay
              </span>
              {changeMask && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-danger-soft text-danger-strong border border-red-200">
                  <span className="w-2 h-2 rounded-full bg-danger"></span>
                  Changed Area
                </span>
              )}
            </div>
            <MapViewer images={images} layout="side-by-side" />
          </div>
        )}

        {/* Change description narrative and confidence */}
        {description && (
          <div className="p-4 bg-surface rounded-xl border border-border space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
              Change Summary
            </span>
            <p className="text-sm md:text-base text-text-primary leading-relaxed">
              {description}
            </p>

            {confidence !== undefined && confidence !== null && (
              <div className="pt-3 border-t border-border">
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

export default ChangeDetectionResult;
