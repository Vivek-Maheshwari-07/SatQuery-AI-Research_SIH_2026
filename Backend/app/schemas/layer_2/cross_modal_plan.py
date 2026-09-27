from pydantic import BaseModel, Field
from typing import Literal


class CrossModalStep(BaseModel):
    """
    An execution step strictly for Cross-Modal (e.g., Optical + SAR) pipelines.
    Focuses ONLY on multi-modal DAG mapping.
    """
    step_id: str = Field(description="Unique identifier for this execution step.")
    reasoning: str = Field(description="Why this specific capability was chosen for this target.")

    capability: Literal[
        "modality_alignment",
        "modality_fusion",
        "cross_modal_extraction",
        "semantic_segmentation",
        "vqa",
        "evidence_generation"
    ]
    
    target: str | None = Field(default=None, description="Specific object to extract or align.")
    text_prompt: str | None = Field(default=None, description="Specific question for VQA.")
    
    optical_input: str | None = Field(default=None)
    sar_input: str | None = Field(default=None)
    fusion_input: str | None = Field(default=None)

    depends_on: list[str] = Field(default_factory=list)

    output_to: list[str] | str = Field(default="", description="Name of the fused or extracted result produced.")


class CrossModalExecutionPlan(BaseModel):
    """
    Output schema for the CrossModalAgent.
    Strictly defines the workflow execution DAG.
    """
    execution_type: Literal["sequential", "hybrid"]
    strategy_explanation: str = Field(description="A brief explanation of how the pipeline will execute the query end-to-end.")

    steps: list[CrossModalStep] = Field(min_length=2, description="Ordered cross-modal operations (must include fusion/alignment).")
