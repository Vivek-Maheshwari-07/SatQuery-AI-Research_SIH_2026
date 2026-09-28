/**
 * Helper to determine if a File object can be rendered natively in web browsers.
 * @param {File} file
 * @returns {boolean}
 */
function isBrowserDisplayableFile(file) {
  if (!file) return false;
  const name = file.name?.toLowerCase() || '';
  const type = file.type?.toLowerCase() || '';
  return (
    type.startsWith('image/png') ||
    type.startsWith('image/jpeg') ||
    type.startsWith('image/webp') ||
    type.startsWith('image/svg') ||
    name.endsWith('.png') ||
    name.endsWith('.jpg') ||
    name.endsWith('.jpeg') ||
    name.endsWith('.webp')
  );
}

/**
 * Resolves an imagery source URL from backend previews or uploaded browser-displayable files.
 * Returns undefined if neither is available (e.g., GeoTIFF without server preview).
 *
 * @param {Array<{ role?: string, url: string }>} previews - Previews array from backend response
 * @param {Array<File>} uploadedFiles - Files array uploaded by user
 * @param {string} role - Target role identifier ('single' | 'before' | 'after' | 'optical' | 'sar')
 * @param {number} fallbackIndex - Index in uploadedFiles as fallback
 * @returns {string | undefined}
 */
function resolveImageSource(previews, uploadedFiles, role, fallbackIndex) {
  // 1. Check backend-provided displayable preview for this role or index
  if (Array.isArray(previews)) {
    const matchingPreview = previews.find((p) => p.role === role);
    if (matchingPreview?.url) {
      return matchingPreview.url;
    }
    if (previews[fallbackIndex]?.url) {
      return previews[fallbackIndex].url;
    }
  }

  // 2. Fall back to uploaded file if browser-displayable
  if (Array.isArray(uploadedFiles) && uploadedFiles[fallbackIndex]) {
    const file = uploadedFiles[fallbackIndex];
    if (isBrowserDisplayableFile(file)) {
      try {
        return URL.createObjectURL(file);
      } catch {
        return undefined;
      }
    }
  }

  return undefined;
}

/**
 * Adapts raw backend POST /analyze JSON response into strictly typed frontend props.
 * This adapter is the single source of truth for translating backend responses into
 * presentation-layer component props.
 *
 * @param {Object} response - Raw JSON response from backend
 * @param {Array<File>} [uploadedFiles=[]] - Uploaded imagery files from client
 * @returns {{
 *   intent: string,
 *   componentProps: Object,
 *   confidence?: number,
 *   confidenceNote?: string,
 *   evidence?: Array<Object>,
 *   measurements?: Array<Object>,
 *   trace?: Array<Object>,
 *   sessionId?: string
 * }}
 */
export function adaptAnalysisResponse(response, uploadedFiles = []) {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid backend response payload: expected an object.');
  }

  const {
    session_id: sessionId,
    intent,
    result = {},
    confidence: topConfidence,
    confidence_note: topConfidenceNote,
    evidence: topEvidence,
    measurements: topMeasurements,
    previews = [],
    execution_trace: topTrace,
  } = response;

  const confidence = topConfidence ?? result.confidence;
  const confidenceNote = topConfidenceNote ?? result.confidence_note;
  const evidence = topEvidence ?? result.evidence;
  const measurements = topMeasurements ?? result.measurements;
  const trace = topTrace ?? result.execution_trace;

  // Resolve component-specific props based on backend intent
  let componentProps = {};

  switch (intent) {
    case 'vqa':
      componentProps = {
        question: result.question || response.query,
        answer: result.answer,
        confidence,
        evidence,
      };
      break;

    case 'captioning':
      componentProps = {
        caption: result.caption,
        confidence,
      };
      break;

    case 'grounding':
      componentProps = {
        query: result.query || response.query,
        boxes: result.boxes,
        image: result.image || resolveImageSource(previews, uploadedFiles, 'single', 0),
        confidence,
        evidence,
      };
      break;

    case 'detection':
      componentProps = {
        detections: result.detections,
        image: result.image || resolveImageSource(previews, uploadedFiles, 'single', 0),
        total: result.total,
        confidence,
      };
      break;

    case 'segmentation':
      componentProps = {
        image: result.image || resolveImageSource(previews, uploadedFiles, 'single', 0),
        mask: result.mask,
        classes: result.classes,
        statistics: result.statistics,
        confidence,
      };
      break;

    case 'change_analysis':
      componentProps = {
        imageBefore:
          result.imageBefore ||
          resolveImageSource(previews, uploadedFiles, 'before', 0),
        imageAfter:
          result.imageAfter ||
          resolveImageSource(previews, uploadedFiles, 'after', 1),
        changeMask: result.changeMask,
        changeRegions: result.changeRegions,
        description: result.description,
        confidence,
        evidence,
      };
      break;

    case 'fusion':
      componentProps = {
        optical: result.optical || {
          src: resolveImageSource(previews, uploadedFiles, 'optical', 0),
          label: 'Optical Modality',
        },
        sar: result.sar || {
          src: resolveImageSource(previews, uploadedFiles, 'sar', 1),
          label: 'Synthetic Aperture Radar',
        },
        fusedResult: result.fusedResult,
        evidence,
        confidence,
      };
      break;

    case 'measurement':
      componentProps = {
        measurements: result.measurements || measurements,
      };
      break;

    default:
      // Pass raw result through for unexpected or custom intents
      componentProps = {
        ...result,
        confidence,
        evidence,
      };
      break;
  }

  return {
    intent,
    componentProps,
    confidence,
    confidenceNote,
    evidence,
    measurements,
    trace,
    sessionId,
  };
}

export default adaptAnalysisResponse;
