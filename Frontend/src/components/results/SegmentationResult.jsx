import React from 'react';
import { Layers } from 'lucide-react';
import ResultCard from './ResultCard';
import ImageViewer from '../visualization/ImageViewer';
import SegmentationOverlay from '../visualization/SegmentationOverlay';
import ConfidenceIndicator from '../analysis/ConfidenceIndicator';

/**
 * SegmentationResult component following spec section 27.
 * Displays semantic segmentation masks and land cover / feature distributions.
 *
 * Expected Props / Data Contract:
 * @param {Object} props
 * @param {string} [props.image] - Base satellite raster image URL or base64 data
 * @param {string | ImageData} [props.mask] - Segmentation mask (base64 PNG string or ImageData)
 * @param {Array<{ name: string, color?: string, percentage?: number | string }>} [props.classes] - Segmentation class breakdowns
 * @param {object} [props.statistics] - Area or pixel statistics from backend
 * @param {number} [props.confidence] - Optional segmentation model confidence score
 * @param {'loading' | 'success' | 'empty' | 'error'} [props.status] - Data status
 * @param {string | object} [props.error] - Error details when status is 'error'
 * @param {string} [props.className='']
 */
export function SegmentationResult({
  image,
  mask,
  classes,
  statistics,
  confidence,
  status,
  error,
  className = '',
}) {
  const hasData = Boolean(
    image || mask || (classes && classes.length > 0) || statistics
  );
  const effectiveStatus = status || (hasData ? 'success' : 'empty');

  return (
    <ResultCard
      title="Semantic Segmentation"
      icon={Layers}
      status={effectiveStatus}
      error={error}
      emptyTitle="No segmentation result"
      emptyDescription="Run semantic segmentation on imagery to generate land-use masks."
      className={className}
    >
      <div className="space-y-4 text-left">
        {/* Classes Legend if provided by backend */}
        {classes && Array.isArray(classes) && classes.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 p-3 bg-surface rounded-lg border border-border">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted mr-1">
              Classes:
            </span>
            {classes.map((cls, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-2 py-1 bg-white border border-border rounded text-xs text-text-primary"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: cls.color || '#155EEF' }}
                />
                <span className="font-medium">{cls.name}</span>
                {cls.percentage !== undefined && (
                  <span className="text-text-muted font-mono text-[11px]">
                    {cls.percentage}
                    {typeof cls.percentage === 'number' ? '%' : ''}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Confidence Indicator if provided */}
        {confidence !== undefined && confidence !== null && (
          <div className="p-3 bg-surface rounded-lg border border-border">
            <ConfidenceIndicator value={confidence} />
          </div>
        )}

        {/* Interactive Mask Viewer */}
        {image && (
          <div className="h-96 w-full rounded-lg overflow-hidden border border-border">
            <ImageViewer src={image} alt="Semantic segmentation visualization">
              <SegmentationOverlay mask={mask} color="#155EEF" opacity={0.45} />
            </ImageViewer>
          </div>
        )}

        {/* Backend statistics summary if provided */}
        {statistics && typeof statistics === 'object' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {Object.entries(statistics).map(([key, val]) => (
              <div key={key} className="p-2.5 bg-surface rounded border border-border">
                <span className="text-[10px] uppercase font-bold text-text-muted block truncate">
                  {key.replace(/_/g, ' ')}
                </span>
                <span className="text-xs font-mono font-semibold text-text-primary">
                  {String(val)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </ResultCard>
  );
}

export default SegmentationResult;
