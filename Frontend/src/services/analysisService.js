import { apiClient } from './api';

/**
 * Submits imagery and query payload to backend POST /analyze.
 * Serializes multi-part payload according to CONTRACT.md specification.
 *
 * @param {Object} params
 * @param {Array<File>|File} params.images - Satellite imagery files
 * @param {string} params.query - Natural language query
 * @param {string} params.inputConfiguration - Mode ('single' | 'bitemporal' | 'optical_sar')
 * @param {Array<string>} [params.imageRoles] - Roles matching image order
 * @returns {Promise<any>} Raw backend response JSON
 */
export async function submitAnalysis({
  images,
  query,
  inputConfiguration,
  imageRoles,
}) {
  const formData = new FormData();

  if (query !== undefined && query !== null) {
    formData.append('query', query);
  }

  if (inputConfiguration) {
    formData.append('input_configuration', inputConfiguration);
  }

  if (Array.isArray(images)) {
    images.forEach((file) => {
      formData.append('images', file);
    });
  } else if (images) {
    formData.append('images', images);
  }

  if (imageRoles && Array.isArray(imageRoles)) {
    formData.append('image_roles', JSON.stringify(imageRoles));
  }

  return await apiClient.post('/analyze', formData);
}

export default submitAnalysis;
