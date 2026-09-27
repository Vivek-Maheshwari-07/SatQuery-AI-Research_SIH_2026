from typing import TypedDict, Optional, Any
from app.schemas.input import InputContext

class ImageAnalysisContext(TypedDict):
    """
    Acts as the 'Image Analysis Cache' or Memory.
    Stores previous execution results to avoid redundant model runs.
    """
    detected_objects: dict[str, Any]      # e.g., {"building": [...], "road": [...]}
    segmentation_masks: dict[str, Any]    # e.g., {"water_mask": ...}
    grounding_boxes: dict[str, Any]       # e.g., {"building_boxes": ...}
    classifications: dict[str, Any]
    measurements: dict[str, Any]
    previous_query_results: list[dict]

class AgentState(TypedDict):
    """
    The central LangGraph State that travels through the entire pipeline.
    """
    # 1. Populated by Input Processing
    user_query: str
    input_context: Optional[InputContext]
    
    # 2. Populated by Layer 1 (Validation & Routing Layer)
    validation_route: Optional[dict]  # Uses raw dict for perfect JSON serialization
    
    # 3. Populated by Layer 2 (Specialist Agents)
    execution_plan: Optional[dict]  # Uses raw dict for perfect JSON serialization
    
    # 4. The Cache / Memory (Checked and updated by Layer 2/3)
    analysis_context: ImageAnalysisContext
    
    # 5. Routing flags and error handling
    route_to: Optional[str]         # e.g., "single_image_agent", "change_detection_agent"
    current_error: Optional[str]
