from app.schemas.layer_1.validator_input import ValidatorInput
from app.schemas.layer_1.validation_route import ValidationRoute
from app.llms.client import LLMClient
from app.agents.layer_1.prompts import (
    LEVEL_1_ROUTER_SYSTEM_PROMPT,
    build_level_1_user_prompt
)


class ValidationRouter:
    """
    Layer 1: Input Validation & Routing Layer.
    Acts as a gatekeeper to validate inputs and route to the correct Layer 2 agent.
    """
    
    def __init__(self, llm_client: LLMClient | None = None):
        self.llm_client = llm_client or LLMClient()

    def route(self, validator_input: ValidatorInput) -> ValidationRoute:
        image_count = validator_input.input_context.image_count
        modalities = [img.modality for img in validator_input.input_context.images]

        user_prompt = build_level_1_user_prompt(
            user_query=validator_input.user_query,
            image_count=image_count,
            modalities=modalities
        )

        route_decision: ValidationRoute = self.llm_client.generate_structured_output(
            system_prompt=LEVEL_1_ROUTER_SYSTEM_PROMPT,
            user_prompt=user_prompt,
            response_model=ValidationRoute
        )

        return route_decision
