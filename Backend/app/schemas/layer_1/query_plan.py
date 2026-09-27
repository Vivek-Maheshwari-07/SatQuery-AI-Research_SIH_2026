from typing import Literal

from pydantic import BaseModel, Field

class ExtractedEntity(BaseModel):
    """
    Important entities extracted from the user's query.

    Examples:
    - "ships" -> target_object
    - "water" -> target_object
    - "Ahmedabad" -> location
    - "2023" -> date
    """

    entity_type: Literal[
        "target_object",
        "location",
        "date",
        "other",
    ]

    value: str = Field(
        min_length=1,
        description=(
            "The exact word or phrase extracted from the query."
        ),
    )

class QueryPlan(BaseModel):
    """
    Level-1 Query Planner output.

    Responsibility:
    - Understand what the user wants.
    - Identify the primary task.
    - Extract important entities.
    - Identify required capabilities.
    - Identify the expected output.

    NOT responsible for:
    - Selecting a specific ML model.
    - Selecting model checkpoints.
    - Defining preprocessing implementation.
    - Executing tools.
    - Defining the exact execution sequence.

    Those responsibilities belong to Level 2 / Level 3.
    """

    intent: Literal[
        "question_answering",
        "captioning",
        "localization",
        "detection",
        "counting",
        "segmentation",
        "measurement",
        "change_analysis",
        "classification",
        "comparison",
        "geospatial_analysis",
        "multi_task",
        "unknown",
    ] = Field(
        description=(
            "The primary intent of the user's request."
        )
    )

    task: str = Field(
        min_length=1,
        description=(
            "A concise description of the requested task "
            "without selecting a specific model or service."
        )
    )

    target: str | None = Field(
        default=None,
        description=(
            "Primary object, class, region, or phenomenon "
            "the user is asking about."
        )
    )

    required_capabilities: list[
        Literal[
            "vqa",
            "captioning",
            "grounding",
            "object_detection",
            "counting",
            "semantic_segmentation",
            "instance_segmentation",
            "change_detection",
            "image_comparison",
            "classification",
            "measurement",
            "geospatial_extraction",
            "evidence_generation",
        ]
    ] = Field(
        default_factory=list,
        description=(
            "Capabilities required to answer the query. "
            "These describe WHAT is needed, not WHICH model "
            "should be used."
        ),
    )

    images_required: int = Field(
        default=1,
        ge=1,
        description=(
            "Minimum number of images required for this task."
        ),
    )

    requires_temporal_pair: bool = Field(
        default=False,
        description=(
            "Whether the task requires images from different "
            "time points."
        ),
    )

    requires_cross_modal_pair: bool = Field(
        default=False,
        description=(
            "Whether the task requires complementary modalities "
            "such as optical + SAR."
        ),
    )

    required_outputs: list[
        Literal[
            "text_answer",
            "caption",
            "bounding_boxes",
            "masks",
            "object_count",
            "change_regions",
            "change_description",
            "classification",
            "area",
            "percentage",
            "distance",
            "coordinates",
            "visual_evidence",
        ]
    ] = Field(
        default_factory=list,
        description=(
            "Outputs required to satisfy the user's request."
        ),
    )

    extracted_entities: list[ExtractedEntity] = Field(
        default_factory=list,
        description=(
            "Important entities extracted from the user's query."
        ),
    )

    routing_reason: str = Field(
        min_length=1,
        description=(
            "Short explanation of why these capabilities "
            "are required for the query."
        ),
    )