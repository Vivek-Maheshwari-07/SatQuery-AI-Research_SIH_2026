from app.schemas.layer_2.temporal_plan import TemporalExecutionPlan
from app.schemas.input import InputContext
from app.llms.client import LLMClient
from app.agents.layer_2.prompts import (
    TEMPORAL_SYSTEM_PROMPT,
    build_layer_2_user_prompt
)


class ChangeDetectionAgent:
    """
    Level-2 Agent 3.
    Acts as an initializer and orchestrator to call the LLM for generating 
    Temporal/Change Detection execution plans.
    """

    def __init__(self, llm_client: LLMClient | None = None):
        self.llm_client = llm_client or LLMClient()

    def plan(self, user_query: str, input_context: InputContext) -> TemporalExecutionPlan:
        user_prompt = build_layer_2_user_prompt(user_query)

        execution_plan: TemporalExecutionPlan = self.llm_client.generate_structured_output(
            system_prompt=TEMPORAL_SYSTEM_PROMPT,
            user_prompt=user_prompt,
            response_model=TemporalExecutionPlan
        )

        return execution_plan
