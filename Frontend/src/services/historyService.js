import { apiClient } from './api';

/**
 * Fetches previous analysis history items from backend GET /history.
 * @returns {Promise<{ items: Array<Object> }>}
 */
export async function getHistory() {
  return await apiClient.get('/history');
}

/**
 * Retrieves past analysis record by session ID from backend GET /analysis/{session_id}.
 * @param {string} sessionId
 * @returns {Promise<Object>}
 */
export async function getAnalysisById(sessionId) {
  if (!sessionId) {
    throw new Error('Session ID is required to fetch analysis record.');
  }
  return await apiClient.get(`/analysis/${encodeURIComponent(sessionId)}`);
}

export default {
  getHistory,
  getAnalysisById,
};
