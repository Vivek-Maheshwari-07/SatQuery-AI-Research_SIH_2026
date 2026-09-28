import React from 'react';
import { Target } from 'lucide-react';
import ResultCard from './ResultCard';
import ImageViewer from '../visualization/ImageViewer';
import BoundingBoxOverlay from '../visualization/BoundingBoxOverlay';
import ConfidenceIndicator from '../analysis/ConfidenceIndicator';

/**
 * DetectionResult component following spec section 26.
 * Displays object detection results with bounding boxes and backend-provided total count.
 *
 * Expected Props / Data Contract:
 * @param {Object} props
 * @param {Array<{ x1: number, y1: number, x2: number, y2: number, label?: string, confidence?: number }>} [props.detections] - Detected objects array
 * @param {string} [props.image] - Satellite raster image URL or base64 data
 * @param {number|string} [props.total] - Total detections count provided directly by the backend (never recomputed)
 * @param {number} [props.confidence] - Overall detection confidence score (0.0 to 1.0 or 0 to 100)
 * @param {'loading' | 'success' | 'empty' | 'error'} [props.status] - Data status
 * @param {string | object} [props.error] - Error details when status is 'error'
 * @param {string} [props.className='']
 */
export function DetectionResult({
  detections,
  image,
  total,
  confidence,
  status,
  error,
  className = '',
}) {
  const hasData = Boolean(
    image || (detections && detections.length > 0) || total !== undefined
  );
  const effectiveStatus = status || (hasData ? 'success' : 'empty');

  return (
    <ResultCard
      title="Object Detection"
      icon={Target}
      status={effectiveStatus}
      error={error}
      emptyTitle="No detections available"
      emptyDescription="Run object detection on satellite imagery to locate targets."
      className={className}
    >
      <div className="space-y-4 text-left">
        {/* Detection Summary Header */}
        <div className="flex flex-col gap-3 p-3.5 bg-surface rounded-lg border border-border">
          {total !== undefined && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">
                Total Detected
              </span>
              <span className="text-xl font-bold font-mono text-text-primary">
                {total}
              </span>
            </div>
          )}

          {confidence !== undefined && confidence !== null && (
            <div className="pt-2 border-t border-border">
              <ConfidenceIndicator value={confidence} />
            </div>
          )}
        </div>

        {/* Interactive Detection Canvas */}
        {image && (
          <div className="h-96 w-full rounded-lg overflow-hidden border border-border">
            <ImageViewer src={image} alt="Object detection visualization">
              <BoundingBoxOverlay boxes={detections} color="#155EEF" />
            </ImageViewer>
          </div>
        )}
      </div>
    </ResultCard>
  );
}

export default DetectionResult;
