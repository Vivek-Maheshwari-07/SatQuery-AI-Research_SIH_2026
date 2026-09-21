# Agentic AI & Tool Orchestration

## 📖 Definition
Agentic AI refers to an autonomous computational framework where a reasoning model (such as a Large Language Model or Vision-Language Model) acts as an intelligent controller capable of interpreting high-level user intents, formulating multi-step execution plans, dynamically calling external tools/APIs, evaluating intermediate observations, and iterating to achieve a goal.

---

## 🌟 Why It Matters
No single monolithic model excels at every specialized remote sensing task (e.g. general conversational reasoning, exact pixel segmentation, bi-temporal change detection, SAR despeckling, and GIS raster math). An agentic architecture enables SatQuery AI to decompose complex, compound queries and orchestrate the right specialist model or geospatial tool for each specific step.

---

## 🔑 Important Concepts

1. **Reasoning Paradigms**:
   - **ReAct (Reason + Act)**: Interleaving thought generation, action execution (tool call), and observation evaluation in a continuous feedback loop.
   - **Plan-and-Solve**: Generating a complete directed acyclic graph (DAG) of sub-tasks up-front and executing dependencies sequentially or in parallel.

2. **Tool Definition & Calling**:
   - Defining specialist models (e.g., `run_grounding_dino`, `compute_ndvi`, `run_change_former`, `calculate_surface_area`) as structured JSON schemas with typed parameters.

3. **Self-Correction & Reflection**:
   - Evaluating intermediate outputs (e.g., verifying if bounding boxes were detected; if zero boxes found, trying lower threshold or alternative prompt).

4. **Execution Tracing**:
   - Logging every step: query parsing $\to$ tool selection $\to$ input parameters $\to$ raw observation $\to$ final synthesis for complete auditability.

---

## 🛠️ Common Techniques
- Dynamic function calling via structured output schemas (JSON Mode).
- Guardrails for input validation and out-of-domain query handling.
- Deterministic fallback routes for high-confidence simple tasks.

---

## 🤖 Relevant Models & Tools
- **Frameworks**: LangChain, LangGraph, LlamaIndex, Semantic Kernel, CrewAI, AutoGen.
- **Agent Engines**: Local LLM controllers (Qwen2-7B-Instruct, LLaMA-3-8B-Instruct) with structured JSON function calling.

---

## 🎯 Relevance to SatQuery AI
Directly addresses **Mandatory Requirement 5 (Agentic Model/Tool Orchestration)** and **Requirement 7 (Auditable Execution Trace)**.

---

## 📚 References
- Yao, S., et al. (2022). *"ReAct: Synergizing Reasoning and Acting in Language Models"*, ICLR.
- Wang, L., et al. (2023). *"A Survey on Large Language Model based Autonomous Agents"*, Frontiers of Computer Science.
