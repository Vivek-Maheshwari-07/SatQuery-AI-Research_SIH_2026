import os
import shutil
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.core.config import settings
from app.graph.builder import PipelineGraph
from app.preprocessing.input_inspector import InputInspector

# Create the router
api_router = APIRouter()

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_FOLDER, exist_ok=True)

@api_router.post("/analyze")
async def analyze_image(
    query: str = Form(...),
    image: UploadFile = File(...)
):
    """
    Central API endpoint.
    Takes a query and an image, processes them through the AI pipeline, 
    and returns the orchestrated execution plan.
    """
    if not image.filename:
        raise HTTPException(status_code=400, detail="No selected file")
        
    # Save the file temporarily
    file_path = os.path.join(settings.UPLOAD_FOLDER, image.filename)
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save image: {e}")

    try:
        # 1. Inspect Input Image
        inspector = InputInspector()
        input_context = inspector.inspect([file_path])
        if not input_context.input_valid:
            raise HTTPException(status_code=400, detail=f"Image validation failed: {input_context.errors}")
            
        # 2. Run Pipeline Graph
        pipeline = PipelineGraph()
        final_state = pipeline.run(user_query=query, input_context=input_context)
        
        # 3. Format Response
        route_obj = final_state.get('validation_route')
        
        return {
            'layer_1_routing': {
                'route_selected': route_obj.get('route_to') if route_obj else final_state.get('route_to'),
                'reasoning': route_obj.get('routing_reason') if route_obj else None,
                'error': final_state.get('current_error')
            },
            'layer_2_execution_plan': final_state.get('execution_plan')
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline execution failed: {str(e)}")
    finally:
        # Clean up temporary file
        if os.path.exists(file_path):
            os.remove(file_path)
