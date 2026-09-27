from pydantic import BaseModel, Field
from typing import Literal

class ValidationRoute(BaseModel):
    """
    Output of Layer 1. 
    Strictly responsible for validating the query against inputs and routing.
    Does NOT extract capabilities or build implementation logic.
    """
    is_input_valid: bool = Field(description="Are the images technically valid?")
    is_query_compatible: bool = Field(description="Can the query be answered with the given images?")
    
    route_to: Literal[
        "single_image_agent",
        "change_detection_agent",
        "cross_modal_agent",
        "invalid_request_agent"
    ] = Field(description="Which Layer 2 specialist agent should handle this?")
    
    routing_reason: str = Field(description="Brief reason for this routing decision.")
