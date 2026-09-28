import React from 'react';
import { Layers, FileCode } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { ANALYSIS_CONFIGURATIONS } from '../../app/analysisConfig';

const SUPPORTED_FORMATS = [
  { ext: '.tif / .tiff', label: 'Cloud-Optimized GeoTIFF', badge: 'GeoTIFF' },
  { ext: '.png', label: 'Portable Network Graphics', badge: 'PNG' },
  { ext: '.jpg / .jpeg', label: 'Joint Photographic Experts Group', badge: 'JPEG' },
];

/**
 * SupportedInputCard component following spec section 17.
 * Displays real configuration specifications for input modes and accepted raster formats.
 *
 * @param {Object} props
 * @param {string} [props.className='']
 */
export function SupportedInputCard({ className = '' }) {
  return (
    <Card variant="default" padding="md" className={`text-left space-y-4 ${className}`}>
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Layers className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-bold text-text-primary">
          Supported Configurations & Modalities
        </h2>
      </div>

      {/* Input Configurations */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">
          Input Modes
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {ANALYSIS_CONFIGURATIONS.map((cfg) => (
            <div
              key={cfg.id}
              className="p-2.5 bg-surface rounded-lg border border-border flex flex-col justify-between gap-1"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-semibold text-text-primary">
                  {cfg.label}
                </span>
                <Badge variant="neutral" size="sm">
                  {cfg.requiredImages} {cfg.requiredImages === 1 ? 'file' : 'files'}
                </Badge>
              </div>
              <p className="text-[11px] text-text-secondary leading-snug">
                {cfg.roleLabels.join(' + ')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Accepted Formats */}
      <div className="space-y-2 pt-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">
          Accepted Formats
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {SUPPORTED_FORMATS.map((fmt) => (
            <div
              key={fmt.ext}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-border rounded-md text-xs font-medium text-text-primary"
            >
              <FileCode className="w-3.5 h-3.5 text-text-muted" />
              <span>{fmt.ext}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default SupportedInputCard;
