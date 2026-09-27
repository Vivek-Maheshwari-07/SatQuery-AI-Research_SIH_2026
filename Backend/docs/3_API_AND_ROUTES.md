# API & Routing Guide

This document explains the entry point to the system and how user data triggers the AI pipeline.

## 1. FastAPI Application (`app/main.py`)
This is the root factory. It initializes the FastAPI application, adds global `CORSMiddleware`, and registers the `api_router`. 
It also houses a simple `/health` GET endpoint for checking container liveness.

## 2. API Routes (`app/api/router.py`)
The system avoids multiple chaotic route files. It uses a single, atomic endpoint.

### POST `/api/analyze`
**Purpose**: Accept a natural language query and a satellite image, and run the complete AI pipeline.

**Inputs (Form Data)**:
- `query` (string): The user's text question.
- `image` (file): A binary image upload (e.g., `.tif`, `.png`).

**Atomic Process Flow**:
1. **Receive & Save**: Securely receives the image via FastAPI `UploadFile` and saves it locally to `settings.UPLOAD_FOLDER`.
2. **Inspect**: Calls `InputInspector` (Basic Processing block) to ensure the file exists and extracts modality.
3. **Graph Execution**: Instantiates `PipelineGraph().run(...)`. This sends the data into the LangGraph state orchestration.
4. **Respond**: Extracts the Layer 1 and Layer 2 outputs from the `final_state` dictionary and returns them as a clean JSON response.
5. **Cleanup**: Regardless of success or failure, the `finally` block deletes the temporary image upload.

## 3. Core Config (`app/core/config.py`)
No raw `os.getenv` calls exist inside the logic modules. 
All environment variables (e.g., `GROQ_API_KEY`) are centrally managed and type-checked here using `Pydantic BaseSettings`.
To add a new API key, add it to this file first, and import `settings` in your desired file.
