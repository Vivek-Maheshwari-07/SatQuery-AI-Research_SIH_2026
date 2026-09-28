import React from 'react';
import { Layers, FileCode } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { ANALYSIS_CONFIGURATIONS } from '../../app/analysisConfig';

const ACCEPTED_EXTENSIONS = [
  { ext: '.tif / .tiff', format: 'GeoTIFF / Cloud-Optimized GeoTIFF', mime: 'image/tiff' },
  { ext: '.png', format: 'Portable Network Graphics (PNG)', mime: 'image/png' },
  { ext: '.jpg / .jpeg', format: 'JPEG Raster Imagery', mime: 'image/jpeg' },
];

/**
 * SupportedInputSettingsCard component following spec section 36.
 * Read-only reference of all operational input configurations and accepted formats.
 *
 * @param {Object} props
 * @param {string} [props.className='']
 */
export function SupportedInputSettingsCard({ className = '' }) {
  return (
    <Card variant="default" padding="md" className={`text-left space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Layers className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-bold text-text-primary">Supported Input Configurations</h2>
      </div>

      {/* Configurations Breakdown */}
      <div className="space-y-3">
        {ANALYSIS_CONFIGURATIONS.map((cfg) => (
          <div
            key={cfg.id}
            className="p-3 bg-surface rounded-lg border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-text-primary">{cfg.label}</span>
                <span className="text-[10px] font-mono text-text-muted">id: {cfg.id}</span>
              </div>
              <p className="text-[11px] text-text-secondary mt-0.5">{cfg.description}</p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Badge variant="primary" size="sm">
                {cfg.requiredImages} {cfg.requiredImages === 1 ? 'image' : 'images'}
              </Badge>
              <Badge variant="neutral" size="sm">
                {cfg.roleLabels.join(' + ')}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* File Formats Table */}
      <div className="pt-2 border-t border-border space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">
          Accepted File Formats & MIME Types
        </span>
        <div className="divide-y divide-border border border-border rounded-lg overflow-hidden bg-surface">
          {ACCEPTED_EXTENSIONS.map((item) => (
            <div
              key={item.ext}
              className="flex items-center justify-between p-2.5 bg-white text-xs"
            >
              <div className="flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-text-muted" />
                <span className="font-semibold text-text-primary">{item.format}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-text-muted">{item.mime}</span>
                <span className="font-mono text-xs text-primary font-medium">{item.ext}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default SupportedInputSettingsCard;
