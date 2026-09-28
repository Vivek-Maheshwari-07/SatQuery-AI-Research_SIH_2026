import React from 'react';
import ModalityBadge from './ModalityBadge';

/**
 * ImageMetadata component following spec section 21.
 * Strictly displays only metadata fields that actually exist in the passed metadata object.
 * Does not show placeholders or "N/A" for missing data.
 *
 * @param {Object} props
 * @param {Object} [props.metadata]
 * @param {string} [props.className='']
 */
export function ImageMetadata({ metadata, className = '' }) {
  if (!metadata || typeof metadata !== 'object') {
    return null;
  }

  // Extract only present fields
  const fields = [];

  if (metadata.sensor) {
    fields.push({ label: 'Sensor', value: metadata.sensor });
  }

  if (metadata.modality) {
    fields.push({
      label: 'Modality',
      value: <ModalityBadge modality={metadata.modality} size="sm" />,
      isCustom: true,
    });
  }

  if (metadata.dimensions) {
    const dim =
      typeof metadata.dimensions === 'object'
        ? `${metadata.dimensions.width || ''} × ${metadata.dimensions.height || ''}`
        : metadata.dimensions;
    fields.push({ label: 'Dimensions', value: dim });
  }

  if (metadata.bands !== undefined && metadata.bands !== null) {
    const bandsVal = Array.isArray(metadata.bands)
      ? metadata.bands.join(', ')
      : `${metadata.bands} band${metadata.bands > 1 ? 's' : ''}`;
    fields.push({ label: 'Bands', value: bandsVal });
  }

  if (metadata.crs || metadata.CRS) {
    fields.push({ label: 'CRS', value: metadata.crs || metadata.CRS });
  }

  if (metadata.resolution) {
    const resVal =
      typeof metadata.resolution === 'number'
        ? `${metadata.resolution}m / px`
        : metadata.resolution;
    fields.push({ label: 'Resolution', value: resVal });
  }

  const acquisition = metadata.acquisitionTime || metadata.acquisition_time || metadata.acquisitionDate;
  if (acquisition) {
    fields.push({
      label: 'Acquisition Time',
      value: typeof acquisition === 'string' ? acquisition : new Date(acquisition).toLocaleString(),
    });
  }

  if (fields.length === 0) {
    return null;
  }

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs bg-slate-50 p-3 rounded-lg border border-border/80 ${className}`}
    >
      {fields.map((field, idx) => (
        <div key={idx} className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-semibold text-text-muted tracking-wider">
            {field.label}
          </span>
          <div className="font-medium text-text-primary text-xs mt-0.5 truncate">
            {field.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageMetadata;
