const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Generic API client wrapper.
 * Reads backend base URL from VITE_API_BASE_URL environment variable.
 */
export const apiClient = {
  /**
   * Generic POST method with error handling.
   * @param {string} endpoint - API path (e.g., '/analyze')
   * @param {FormData|object} data - Payload data
   * @param {RequestInit} [options] - Optional fetch configuration overrides
   * @returns {Promise<any>} Response JSON
   */
  async post(endpoint, data, options = {}) {
    const cleanBaseUrl = BASE_URL.replace(/\/+$/, '');
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${cleanBaseUrl}${cleanEndpoint}`;

    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;

    const headers = {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...options.headers,
    };

    const body = isFormData ? data : (data !== undefined ? JSON.stringify(data) : undefined);

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
      ...options,
    });

    if (!response.ok) {
      let errorData = null;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      const error = new Error(errorData?.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    return await response.json();
  },
};
