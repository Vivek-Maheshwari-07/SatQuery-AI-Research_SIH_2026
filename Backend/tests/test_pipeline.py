import os
import sys
import json
import argparse
from app.graph.builder import PipelineGraph
from app.preprocessing.input_inspector import InputInspector

def main():
    # Make sure GROQ_API_KEY is set
    if not os.getenv("GROQ_API_KEY"):
        print("ERROR: GROQ_API_KEY is not set. Please set it to run the pipeline.")
        return

    parser = argparse.ArgumentParser(description="Test the Satellite Image Agent Pipeline")
    parser.add_argument("--query", type=str, required=True, help="The user's text query")
    parser.add_argument("--image", type=str, required=True, help="Path to the satellite image file")
    args = parser.parse_args()

    user_query = args.query
    image_path = args.image

    print("========================================")
    print(f"USER QUERY: {user_query}")
    print(f"IMAGE FILE: {image_path}")
    print("========================================")

    # 1. Inspect Input
    print("Inspecting Input Image...")
    inspector = InputInspector()
    try:
        input_context = inspector.inspect([image_path])
        if not input_context.input_valid:
            print(f"Input Validation Failed: {input_context.errors}")
            return
        
        modality = input_context.images[0].modality
        print(f"Image Modality detected: {modality.capitalize()}")
    except Exception as e:
        print(f"Failed to inspect image: {e}")
        return

    # 2. Initialize Pipeline
    pipeline = PipelineGraph()

    # 3. Run Pipeline
    print("\nRunning pipeline...\n")
    final_state = pipeline.run(user_query=user_query, input_context=input_context)
    
    print("\n--- [LAYER 1 OUTPUT: Validation & Route] ---")
    route_obj = final_state.get('validation_route')
    if route_obj:
        print(f"Route Selected: {route_obj.get('route_to')}")
        print(f"Reasoning: {route_obj.get('routing_reason')}")
    else:
        print(f"Route Selected: {final_state.get('route_to')}")
    print(f"Current Error (if any): {final_state.get('current_error')}")

    print("\n--- [LAYER 2 OUTPUT: Execution Plan DAG] ---")
    execution_plan = final_state.get('execution_plan')
    if execution_plan:
        print(json.dumps(execution_plan, indent=2))
    else:
        print("No execution plan generated.")

if __name__ == "__main__":
    main()
