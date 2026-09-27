from app.schemas.layer_2.cross_modal_plan import CrossModalExecutionPlan
from app.schemas.input import InputContext
from app.llms.client import LLMClient
from app.agents.layer_2.prompts import (
    CROSS_MODAL_SYSTEM_PROMPT,
    build_layer_2_user_prompt
)


class CrossModalAgent:
    """
    Level-2 Agent 2.
    Acts as an initializer and orchestrator to call the LLM for generating 
    Cross-Modal (SAR + Optical) execution plans.
    """

    def __init__(self, llm_client: LLMClient | None = None):
        self.llm_client = llm_client or LLMClient()

    def plan(self, user_query: str, input_context: InputContext) -> CrossModalExecutionPlan:
        user_prompt = build_layer_2_user_prompt(user_query)

        execution_plan: CrossModalExecutionPlan = self.llm_client.generate_structured_output(
            system_prompt=CROSS_MODAL_SYSTEM_PROMPT,
            user_prompt=user_prompt,
            response_model=CrossModalExecutionPlan
        )

        return execution_plan
