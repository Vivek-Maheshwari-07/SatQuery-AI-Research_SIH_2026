import { apiClient } from './api';

/**
 * Fetches system health and model readiness status from backend GET /health.
 * @returns {Promise<{ status: 'ok' | 'degraded' | 'down', models: Array<{ name: string, status: 'ready' | 'unavailable' }> }>}
 */
export async function getHealth() {
  return await apiClient.get('/health');
}

export default {
  getHealth,
};
