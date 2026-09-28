/**
 * Application configuration for satellite analysis input modes.
 * Defines required imagery count, sensor roles, and UI badges.
 */
export const ANALYSIS_CONFIGURATIONS = [
  {
    id: 'single',
    label: 'Single Image',
    description: 'VQA, Captioning, Detection, Segmentation, or Grounding on one raster scene',
    requiredImages: 1,
    roles: ['single'],
    roleLabels: ['Single Image'],
  },
  {
    id: 'bitemporal',
    label: 'Bi-temporal',
    description: 'Multi-date raster comparison to detect terrain, environmental, and infrastructure changes',
    requiredImages: 2,
    roles: ['before', 'after'],
    roleLabels: ['Before (T1)', 'After (T2)'],
  },
  {
    id: 'optical_sar',
    label: 'Optical + SAR',
    description: 'Joint multi-sensor fusion combining optical visible spectrum with synthetic aperture radar',
    requiredImages: 2,
    roles: ['optical', 'sar'],
    roleLabels: ['Optical', 'SAR'],
  },
];

export const DEFAULT_ANALYSIS_CONFIGURATION = 'single';

/**
 * Returns configuration object by identifier.
 * @param {string} id
 */
export function getConfigurationById(id) {
  return (
    ANALYSIS_CONFIGURATIONS.find((config) => config.id === id) ||
    ANALYSIS_CONFIGURATIONS[0]
  );
}

export default ANALYSIS_CONFIGURATIONS;
