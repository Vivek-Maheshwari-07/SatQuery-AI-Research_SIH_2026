from typing import Literal
from langgraph.graph import StateGraph, END

from app.schemas.state import AgentState
from app.schemas.layer_1.validator_input import ValidatorInput
from app.agents.layer_1.validator_router import ValidationRouter
from app.agents.layer_2.single_image_agent import SingleImageAgent
from app.agents.layer_2.change_detection_agent import ChangeDetectionAgent
from app.agents.layer_2.cross_modal_agent import CrossModalAgent


class PipelineGraph:
    """
    Connects Layer 1 (Validator) and Layer 2 (Specialist Agents) into a single execution graph.
    """
    def __init__(self):
        # Initialize Agents
        self.validation_router = ValidationRouter()
        self.single_image_agent = SingleImageAgent()
        self.change_detection_agent = ChangeDetectionAgent()
        self.cross_modal_agent = CrossModalAgent()
        
        # Build Graph
        self.graph = self._build_graph()

    def _build_graph(self):
        workflow = StateGraph(AgentState)
        
        # Add Nodes
        workflow.add_node("layer_1_validator", self.node_validator)
        workflow.add_node("single_image_agent", self.node_single_image)
        workflow.add_node("change_detection_agent", self.node_change_detection)
        workflow.add_node("cross_modal_agent", self.node_cross_modal)
        
        # Set Entry Point
        workflow.set_entry_point("layer_1_validator")
        
        # Add Conditional Edges from Validator to Layer 2 Agents
        workflow.add_conditional_edges(
            "layer_1_validator",
            self.route_to_layer_2,
            {
                "single_image_agent": "single_image_agent",
                "change_detection_agent": "change_detection_agent",
                "cross_modal_agent": "cross_modal_agent",
                "invalid": END
            }
        )
        
        # All Layer 2 agents end the current pipeline (to be passed to Layer 3 later)
        workflow.add_edge("single_image_agent", END)
        workflow.add_edge("change_detection_agent", END)
        workflow.add_edge("cross_modal_agent", END)
        
        return workflow.compile()

    # --- Node Definitions ---

    def node_validator(self, state: AgentState) -> dict:
        print("[Layer 1] Validating and Routing...")
        val_input = ValidatorInput(
            user_query=state.get("user_query", ""),  # Assuming we add user_query to state
            input_context=state["input_context"]
        )
        route = self.validation_router.route(val_input)
        
        return {
            "route_to": route.route_to if route.is_input_valid and route.is_query_compatible else "invalid",
            "validation_route": route.model_dump(),
            "current_error": route.routing_reason if not route.is_input_valid else None
        }

    def route_to_layer_2(self, state: AgentState) -> Literal["single_image_agent", "change_detection_agent", "cross_modal_agent", "invalid"]:
        return state.get("route_to", "invalid")

    def node_single_image(self, state: AgentState) -> dict:
        print("[Layer 2] Single Image Implementation Planning...")
        plan = self.single_image_agent.plan(
            user_query=state.get("user_query", ""),
            input_context=state["input_context"]
        )
        return {"execution_plan": plan.model_dump()}

    def node_change_detection(self, state: AgentState) -> dict:
        print("[Layer 2] Change Detection Implementation Planning...")
        plan = self.change_detection_agent.plan(
            user_query=state.get("user_query", ""),
            input_context=state["input_context"]
        )
        return {"execution_plan": plan.model_dump()}

    def node_cross_modal(self, state: AgentState) -> dict:
        print("[Layer 2] Cross Modal Implementation Planning...")
        plan = self.cross_modal_agent.plan(
            user_query=state.get("user_query", ""),
            input_context=state["input_context"]
        )
        return {"execution_plan": plan.model_dump()}

    def run(self, user_query: str, input_context) -> AgentState:
        # Initialize state with query and context
        initial_state = AgentState(
            user_query=user_query,
            input_context=input_context,
            analysis_context={
                "detected_objects": {},
                "segmentation_masks": {},
                "grounding_boxes": {},
                "classifications": {},
                "measurements": {},
                "previous_query_results": []
            }
        )
        
        # Run graph
        final_state = self.graph.invoke(initial_state)
        return final_state
