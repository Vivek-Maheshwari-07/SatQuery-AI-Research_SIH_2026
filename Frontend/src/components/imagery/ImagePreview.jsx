import React, { useState, useEffect } from 'react';
import { X, FileCode, Eye } from 'lucide-react';
import IconButton from '../ui/IconButton';
import ImageMetadata from './ImageMetadata';

import Badge from '../ui/Badge';

/**
 * Formats byte sizes into human readable units.
 * @param {number} bytes
 * @returns {string}
 */
function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * ImagePreview component following spec section 20.
 * Displays uploaded imagery thumbnails, metadata, and controls without fake placeholders.
 *
 * @param {Object} props
 * @param {string} [props.src]
 * @param {File} [props.file]
 * @param {string} [props.alt]
 * @param {string} [props.roleLabel] - Optional sensor/temporal role badge (e.g. 'Before (T1)', 'SAR')
 * @param {Object} [props.metadata]
 * @param {Array} [props.overlays]
 * @param {() => void} [props.onRemove]
 * @param {string} [props.className='']
 */
export function ImagePreview({
  src,
  file,
  alt,
  roleLabel,
  metadata,
  overlays,
  onRemove,
  className = '',
}) {
  const [objectUrl, setObjectUrl] = useState('');
  const isTiff = file?.name?.toLowerCase().endsWith('.tif') || file?.name?.toLowerCase().endsWith('.tiff');

  useEffect(() => {
    if (!file || src) {
      return;
    }

    const createdUrl = URL.createObjectURL(file);
    const timer = setTimeout(() => {
      setObjectUrl(createdUrl);
    }, 0);

    return () => {
      clearTimeout(timer);
      URL.revokeObjectURL(createdUrl);
    };
  }, [file, src]);

  const previewSrc = src || objectUrl;
  const fileName = file?.name || alt || 'Satellite Imagery';
  const fileSize = file?.size ? formatFileSize(file.size) : null;

  return (
    <div
      className={`relative flex flex-col bg-white border border-border rounded-xl shadow-xs overflow-hidden text-left transition-all duration-150 ${className}`}
    >
      {/* Top action / remove header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-surface border-b border-border">
        <div className="min-w-0 pr-2 flex items-center gap-2">
          {roleLabel && (
            <Badge variant="primary" size="sm" className="flex-shrink-0">
              {roleLabel}
            </Badge>
          )}
          <div className="min-w-0">
            <p className="text-xs font-semibold text-text-primary truncate" title={fileName}>
              {fileName}
            </p>
            {fileSize && (
              <p className="text-[10px] text-text-muted font-mono">{fileSize}</p>
            )}
          </div>
        </div>

        {onRemove && (
          <IconButton
            icon={X}
            size="sm"
            variant="ghost"
            ariaLabel={`Remove ${fileName}`}
            onClick={onRemove}
            className="text-text-muted hover:text-danger hover:bg-red-50 -mr-1"
          />
        )}
      </div>

      {/* Thumbnail visual presentation */}
      <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
        {isTiff ? (
          // GeoTIFF specialized visual representation
          <div className="flex flex-col items-center justify-center p-4 text-center text-slate-300">
            <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center mb-2 text-primary-soft">
              <FileCode className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              GeoTIFF Dataset
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 truncate max-w-xs">
              {fileName}
            </span>
          </div>
        ) : previewSrc ? (
          <img
            src={previewSrc}
            alt={fileName}
            className="w-full h-full object-contain select-none"
          />
        ) : (
          <div className="text-text-muted text-xs flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            <span>Ready for analysis</span>
          </div>
        )}

        {overlays && (
          <div className="absolute inset-0 pointer-events-none">
            {overlays}
          </div>
        )}
      </div>

      {/* Real Metadata fields (if available) */}
      {metadata && (
        <div className="p-3 border-t border-border">
          <ImageMetadata metadata={metadata} />
        </div>
      )}
    </div>
  );
}

export default ImagePreview;
