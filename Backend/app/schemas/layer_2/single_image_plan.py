from pydantic import BaseModel, Field
from typing import Literal


class SingleImageStep(BaseModel):
    """
    An execution step strictly for Single Image pipelines.
    Focuses ONLY on DAG mapping (inputs -> capability -> outputs).
    """
    step_id: str = Field(description="Unique identifier for this execution step.")
    reasoning: str = Field(description="Why this specific capability was chosen for this target.")

    capability: Literal[
        "vqa",
        "captioning",
        "grounding",
        "object_detection",
        "counting",
        "semantic_segmentation",
        "instance_segmentation",
        "classification",
        "measurement",
        "geospatial_extraction",
        "evidence_generation",
    ]

    target: str | None = Field(default=None, description="Specific object to detect/segment (e.g., 'buildings', 'road').")
    text_prompt: str | None = Field(default=None, description="Specific question or prompt for VQA or Captioning.")

    depends_on: list[str] = Field(default_factory=list, description="IDs of previous steps required before this step.")

    input_from: list[str] = Field(default_factory=list, description="References to state/results (e.g., ['image_1', 'step_1_output']).")

    output_to: list[str] | str = Field(default="", description="Name(s) of the result produced by this step.")


class SingleImageExecutionPlan(BaseModel):
    """
    Output schema for the SingleImageAgent.
    Strictly defines the workflow execution DAG.
    """
    execution_type: Literal["single_step", "sequential", "parallel", "hybrid"]
    strategy_explanation: str = Field(description="A brief explanation of how the pipeline will execute the query end-to-end.")

    steps: list[SingleImageStep] = Field(min_length=1, description="Ordered execution DAG for a single image.")
