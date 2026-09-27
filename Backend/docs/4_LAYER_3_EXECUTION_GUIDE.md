# Layer 3 Execution Guide (Pending Implementation)

This document is extremely critical. It defines exactly how **Layer 3 (Model Execution / Inference Routing)** must be built and tightly coupled to the outputs of Layer 2. 

## 1. The Core Concept
Layer 2 outputs a DAG (Directed Acyclic Graph) in JSON format.
Example step:
```json
{
  "step_id": "step_1",
  "capability": "object_detection",
  "target": "vegetation",
  "depends_on": [],
  "output_to": "vegetation_mask"
}
```
Layer 3's job is to read this JSON, resolve dependencies, and call a real Python class to execute it.

## 2. Abstraction Strategy (How to build it)
To maintain our strict SRP (Single Responsibility) and OOP standards, **DO NOT write a massive `if/else` block** inside the graph node.

Instead, create an `app/services/` folder. Every capability string maps to exactly one Service Class.

### Step 2.1: The Service Interface
Create `app/services/base.py`:
```python
from abc import ABC, abstractmethod

class BaseMLService(ABC):
    @abstractmethod
    def execute(self, step_data: dict, current_context: dict) -> dict:
        pass
```

### Step 2.2: Concrete Services
Create specific classes for each capability (e.g., `app/services/vision/object_detection.py`):
```python
class ObjectDetectionService(BaseMLService):
    def execute(self, step_data: dict, current_context: dict):
        # 1. Read target (e.g., 'vegetation')
        # 2. Call mock model or YOLO API here
        # 3. Return the exact structure to append to state
        return {"detected_boxes": [...]}
```

### Step 2.3: The Execution Router
Create a mapping registry (`app/services/registry.py`):
```python
SERVICE_MAP = {
    "object_detection": ObjectDetectionService(),
    "semantic_segmentation": SemanticSegmentationService(),
    # ...
}
```

## 3. LangGraph Integration (The Execution Node)
Inside `app/graph/builder.py`, you will create a new node `node_execute_layer_3`.

**Flow of the node:**
1. Retrieve `execution_plan` from `AgentState`.
2. Loop over `plan["steps"]`.
3. Check `depends_on`. If a step depends on a previous output (e.g., `vegetation_mask`), pull that data from `state["analysis_context"]`.
4. Lookup the service: `service = SERVICE_MAP.get(step["capability"])`.
5. Run the service: `result = service.execute(step, state["analysis_context"])`.
6. Save the output back to state: `state["analysis_context"][step["output_to"]] = result`.

## 4. Tightly Coupled Data Flow Summary
`User API POST` -> `Router` -> `LangGraph` -> `Validator (Layer 1)` -> `Planner (Layer 2 JSON DAG)` -> `Execution Node (Layer 3)` -> `Service Registry Mapping` -> `Atomic Service Execute()` -> `Update state[analysis_context]` -> `Return Final State to User`.
