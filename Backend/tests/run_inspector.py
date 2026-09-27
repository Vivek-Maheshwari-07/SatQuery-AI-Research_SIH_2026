import sys
from pathlib import Path

# Fix Python path so it can find the 'app' package when run directly
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.preprocessing.input_inspector import InputInspector
def main():
    if len(sys.argv) < 2:
        print("Usage: python run_inspector.py <path_to_image_1> [path_to_image_2] ...")
        print("Example: python run_inspector.py sample_image.tif")
        sys.exit(1)

    file_paths = sys.argv[1:]
    
    # Check if files exist before processing
    for path in file_paths:
        if not Path(path).exists():
            print(f"Error: File '{path}' does not exist.")
            sys.exit(1)

    print(f"Inspecting {len(file_paths)} image(s)...\n")

    # Initialize the inspector and process the files
    inspector = InputInspector()
    context = inspector.inspect(file_paths)
    
    # Print the resulting standardized InputContext as beautifully formatted JSON
    print("=== EXTRACTED INPUT CONTEXT ===")
    print(context.model_dump_json(indent=2))

if __name__ == "__main__":
    main()
