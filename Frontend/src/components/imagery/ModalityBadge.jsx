import React from 'react';
import Badge from '../ui/Badge';

/**
 * ModalityBadge component following spec section 29.
 * Communicates imaging modality (Optical, SAR, Multispectral) with appropriate styling.
 *
 * @param {Object} props
 * @param {string} props.modality - Modality type ('Optical', 'SAR', 'Multispectral', etc.)
 * @param {'sm' | 'md'} [props.size='sm']
 * @param {string} [props.className='']
 */
export function ModalityBadge({
  modality,
  size = 'sm',
  className = '',
}) {
  if (!modality) return null;

  const normalized = String(modality).toLowerCase().trim();

  let variant = 'neutral';
  let label = modality;

  if (normalized.includes('optical') || normalized === 'rgb') {
    variant = 'primary';
    label = 'Optical';
  } else if (normalized.includes('sar') || normalized.includes('radar')) {
    variant = 'warning';
    label = 'SAR';
  } else if (normalized.includes('multi') || normalized.includes('hyper')) {
    variant = 'success';
    label = 'Multispectral';
  }

  return (
    <Badge variant={variant} size={size} dot className={className}>
      {label}
    </Badge>
  );
}

export default ModalityBadge;
