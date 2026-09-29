/**
 * Application configuration for satellite analysis input modes.
 * Defines required imagery count, sensor roles, suggestions, and UI badges.
 */
export const ANALYSIS_CONFIGURATIONS = [
  {
    id: 'single',
    label: 'Single Image',
    description: 'VQA, Captioning, Detection, Segmentation, or Grounding on one raster scene',
    requiredImages: 1,
    roles: ['single'],
    roleLabels: ['Single Image'],
    suggestions: [
      'Describe the land-cover and major objects visible in this image.',
      'Highlight the water body referred to in the query.',
    ],
  },
  {
    id: 'bitemporal',
    label: 'Bi-temporal',
    description: 'Multi-date raster comparison to detect terrain, environmental, and infrastructure changes',
    requiredImages: 2,
    roles: ['before', 'after'],
    roleLabels: ['Before (T1)', 'After (T2)'],
    suggestions: [
      'What changed between these two dates, and where did the change occur?',
      'Has the built-up area increased, decreased, or remained unchanged?',
    ],
  },
  {
    id: 'optical_sar',
    label: 'Optical + SAR',
    description: 'Joint multi-sensor fusion combining optical visible spectrum with synthetic aperture radar',
    requiredImages: 2,
    roles: ['optical', 'sar'],
    roleLabels: ['Optical Reflectance', 'SAR Backscatter'],
    suggestions: [
      'Use the optical and SAR images together to identify built-up and water-covered regions.',
    ],
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
