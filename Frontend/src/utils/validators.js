import { getConfigurationById } from '../app/analysisConfig.js';

/**
 * Validates imagery files and query for the selected input configuration.
 *
 * @param {Object} params
 * @param {Array<File>} params.files - Uploaded image files
 * @param {string} params.query - User query string
 * @param {string} params.inputConfiguration - Selected configuration ID ('single' | 'bitemporal' | 'optical_sar')
 * @returns {{ valid: boolean, error: string | null }}
 */
export function validateAnalysisInput({ files = [], query = '', inputConfiguration = 'single' }) {
  const config = getConfigurationById(inputConfiguration);
  const fileCount = Array.isArray(files) ? files.length : 0;
  const trimmedQuery = typeof query === 'string' ? query.trim() : '';

  if (fileCount === 0) {
    return {
      valid: false,
      error: `Please upload ${config.requiredImages === 1 ? 'a satellite image' : `${config.requiredImages} images`} to begin analysis.`,
    };
  }

  if (fileCount !== config.requiredImages) {
    if (config.id === 'bitemporal') {
      return {
        valid: false,
        error: 'Bi-temporal analysis needs exactly 2 images (before and after).',
      };
    }
    if (config.id === 'optical_sar') {
      return {
        valid: false,
        error: 'Optical + SAR fusion needs exactly 2 images (optical and SAR).',
      };
    }
    return {
      valid: false,
      error: `${config.label} analysis requires exactly ${config.requiredImages} ${config.requiredImages === 1 ? 'image' : 'images'}. Currently have ${fileCount}.`,
    };
  }

  if (!trimmedQuery) {
    return {
      valid: false,
      error: 'Please enter a natural language query or question to analyze.',
    };
  }

  return {
    valid: true,
    error: null,
  };
}

export default validateAnalysisInput;
