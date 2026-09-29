import React from 'react';
import { Scan } from 'lucide-react';
import ResultCard from './ResultCard';
import ImageViewer from '../visualization/ImageViewer';
import BoundingBoxOverlay from '../visualization/BoundingBoxOverlay';
import ConfidenceIndicator from '../analysis/ConfidenceIndicator';
import EvidencePanel from '../analysis/EvidencePanel';

/**
 * GroundingResult component following spec section 25.
 * Displays visual grounding / localization of queries on satellite imagery.
 *
 * Expected Props / Data Contract:
 * @param {Object} props
 * @param {string} [props.query] - Referring natural language expression localized in the image
 * @param {Array<{ x1: number, y1: number, x2: number, y2: number, label?: string, confidence?: number }>} [props.boxes] - Normalized bounding boxes (0-1)
 * @param {string} [props.image] - Satellite raster image URL or base64 data
 * @param {number} [props.confidence] - Confidence score (0.0 to 1.0 or 0 to 100)
 * @param {Array<{ type: string, label: string, detail?: string }>} [props.evidence] - Supporting visual evidence payload
 * @param {'loading' | 'success' | 'empty' | 'error'} [props.status] - Data status
 * @param {string | object} [props.error] - Error details when status is 'error'
 * @param {string} [props.className='']
 */
export function GroundingResult({
  query,
  boxes,
  image,
  confidence,
  evidence,
  status,
  error,
  className = '',
}) {
  const hasData = Boolean(image || (boxes && boxes.length > 0) || query);
  const effectiveStatus = status || (hasData ? 'success' : 'empty');

  const hasEvidence = Boolean(
    evidence && Array.isArray(evidence) && evidence.length > 0
  );

  return (
    <ResultCard
      title="Visual Grounding"
      icon={Scan}
      status={effectiveStatus}
      error={error}
      emptyTitle="No grounding result"
      emptyDescription="Submit a visual grounding expression to localize features."
      className={className}
    >
      <div className="space-y-4 text-left">
        {/* Referring query & metadata */}
        <div className="flex flex-col gap-3 p-3.5 bg-surface rounded-xl border border-border">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block mb-0.5">
              Target Expression
            </span>
            <p className="text-sm font-semibold text-text-primary">
              {query || 'Localized visual region'}
            </p>
          </div>

          {confidence !== undefined && confidence !== null && (
            <div className="pt-2 border-t border-border">
              <ConfidenceIndicator value={confidence} />
            </div>
          )}
        </div>

        {/* Interactive Image Canvas with Bounding Boxes */}
        {image && (
          <div className="h-96 w-full rounded-lg overflow-hidden border border-border">
            <ImageViewer src={image} alt={query || 'Grounding result'}>
              <BoundingBoxOverlay boxes={boxes} />
            </ImageViewer>
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

export default GroundingResult;
