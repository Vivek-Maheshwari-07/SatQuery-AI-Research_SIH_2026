from app.schemas.layer_2.single_image_plan import SingleImageExecutionPlan
from app.schemas.input import InputContext
from app.llms.client import LLMClient
from app.agents.layer_2.prompts import (
    SINGLE_IMAGE_SYSTEM_PROMPT,
    build_layer_2_user_prompt
)


class SingleImageAgent:
    """
    Level-2 Agent 1.
    Acts as an initializer and orchestrator to call the LLM for generating 
    Single Image execution plans.
    """

    def __init__(self, llm_client: LLMClient | None = None):
        self.llm_client = llm_client or LLMClient()

    def plan(self, user_query: str, input_context: InputContext) -> SingleImageExecutionPlan:
        user_prompt = build_layer_2_user_prompt(user_query)

        # Call LLM for Structured Output
        execution_plan: SingleImageExecutionPlan = self.llm_client.generate_structured_output(
            system_prompt=SINGLE_IMAGE_SYSTEM_PROMPT,
            user_prompt=user_prompt,
            response_model=SingleImageExecutionPlan
        )

        return execution_plan
