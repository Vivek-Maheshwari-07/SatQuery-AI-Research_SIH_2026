# Implementation Status & Roadmap

This document outlines precisely what has been implemented so far, what was done before/after refactoring to FastAPI, and what is left to do.

## 1. What Was Completed Before Refactoring
- Initial LangGraph Pipeline integration.
- Layer 1 (`ValidationRouter`) prompt generation and logical routing.
- Layer 2 (`SingleImageAgent`, `CrossModalAgent`, `ChangeDetectionAgent`) initial structures.
- Pydantic schema validation for LLM responses.

## 2. What Was Upgraded / Fixed (The FastAPI & Architecture Refactor)
- **Framework Replacement**: Flask was entirely removed. The system now uses **FastAPI**.
- **Centralized Core Configuration**: Added `app/core/config.py` using `BaseSettings` to manage API keys and configs atomically.
- **Atomic Router**: Replaced scattered API files with a strict single responsibility endpoint (`app/api/router.py`).
- **Graph Serialization Bug Fix**: `AgentState` was modified to accept JSON dictionaries rather than strict Pydantic objects to prevent LangGraph persistence crashes.
- **LLM Cost/Token Optimization**: Removed excessive Langchain format instructions (`{format_instructions}`). Added minimal few-shot JSON examples in `app/agents/layer_2/prompts.py` reducing token costs by ~60%.
- **LLM Resiliency**: Added a custom 2-attempt Retry Loop inside `app/llms/client.py` to prevent fatal pipeline crashes if the 7B LLM hallucinates slightly.
- **Graph Atomization**: Moved the monolithic graph to `app/graph/builder.py` ensuring the root directory stays clean.
- **Docker Modernization**: Configured `Dockerfile` and `docker-compose.yml` to run `uvicorn` on port `8000`.

## 3. What is Pending: Immediate Next Steps (Layer 3)
1. **Layer 3 Router (Execution Node)**: The LangGraph needs a new node that executes *after* Layer 2.
2. **Mock ML Services Setup**: We need to define atomic Python classes (Services) that map to specific Layer 2 capabilities (e.g., `ObjectDetectionService`, `SemanticSegmentationService`).
3. **Cache / Analysis Context Population**: Passing the output of these services back into `analysis_context` so dependent steps can use them.

## 4. What is Pending: Later / Long-Term
1. **Real ML Weights Integration**: Replacing Mock ML Services with actual YOLO/SAM endpoints or local GPU inference logic.
2. **Frontend UI Connectivity**: Attaching the React/Next.js frontend to the FastAPI `/api/analyze` route.
3. **Database Setup (Vector/RDBMS)**: Storing historical user queries and image embeddings for fast retrieval.
