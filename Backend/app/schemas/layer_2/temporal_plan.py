from pydantic import BaseModel, Field
from typing import Literal


class TemporalStep(BaseModel):
    """
    An execution step strictly for Temporal / Change Detection pipelines.
    Focuses ONLY on temporal DAG mapping.
    """
    step_id: str = Field(description="Unique identifier for this execution step.")
    reasoning: str = Field(description="Why this specific capability was chosen for this target.")

    capability: Literal[
        "change_detection",
        "temporal_comparison",
        "evidence_generation",
    ]
    
    target: str | None = Field(default=None, description="Specific object or change to detect (e.g., 'new buildings').")
    text_prompt: str | None = Field(default=None, description="Specific question for comparison.")
    
    pre_event_input: str = Field(description="Reference to the earlier temporal image or feature map.")
    post_event_input: str = Field(description="Reference to the later temporal image or feature map.")

    depends_on: list[str] = Field(default_factory=list)

    output_to: list[str] | str = Field(default="", description="Name of the change/comparison result produced by this step.")


class TemporalExecutionPlan(BaseModel):
    """
    Output schema for the ChangeDetectionAgent.
    Strictly defines the workflow execution DAG.
    """
    execution_type: Literal["sequential", "hybrid"] = "sequential"
    strategy_explanation: str = Field(description="A brief explanation of how the pipeline will execute the query end-to-end.")

    steps: list[TemporalStep] = Field(min_length=1, description="Ordered temporal execution DAG.")
