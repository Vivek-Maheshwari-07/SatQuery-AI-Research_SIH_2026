import VQAResult from '../components/results/VQAResult';
import GroundingResult from '../components/results/GroundingResult';
import ChangeDetectionResult from '../components/results/ChangeDetectionResult';
import SegmentationResult from '../components/results/SegmentationResult';
import DetectionResult from '../components/results/DetectionResult';
import FusionResult from '../components/results/FusionResult';
import CaptionResult from '../components/results/CaptionResult';
import MeasurementResult from '../components/results/MeasurementResult';

/**
 * Mapping of backend intent strings to real analysis result component definitions.
 * Following spec section 23 & orchestrator dispatcher.
 */
export const RESULT_COMPONENTS = {
  vqa: VQAResult,
  grounding: GroundingResult,
  change_analysis: ChangeDetectionResult,
  segmentation: SegmentationResult,
  detection: DetectionResult,
  fusion: FusionResult,
  captioning: CaptionResult,
  measurement: MeasurementResult,
};

export default RESULT_COMPONENTS;
