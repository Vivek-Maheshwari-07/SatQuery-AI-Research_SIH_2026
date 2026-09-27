import pytest
from unittest.mock import patch
from app.preprocessing.input_inspector import InputInspector
from app.schemas.input import ImageMetadata

def test_input_inspector_empty():
    inspector = InputInspector()
    context = inspector.inspect([])
    assert context.input_valid is False
    assert context.image_count == 0
    assert "No input images provided" in context.errors[0]

@patch("pathlib.Path.exists")
@patch("app.preprocessing.tiff_processor.TiffProcessor.process")
def test_input_inspector_valid_tiff(mock_process, mock_exists):
    mock_exists.return_value = True
    mock_meta = ImageMetadata(
        image_id="image_1",
        filename="test.tif",
        format="GeoTIFF",
        width=100,
        height=100,
        bands=3,
        dtype="uint8"
    )
    mock_process.return_value = mock_meta

    inspector = InputInspector()
    context = inspector.inspect(["/fake/path/test.tif"])
    
    assert context.input_valid is True
    assert context.image_count == 1
    assert context.images[0].filename == "test.tif"
    assert context.images[0].format == "GeoTIFF"

@patch("pathlib.Path.exists")
def test_input_inspector_invalid_extension(mock_exists):
    mock_exists.return_value = True

    inspector = InputInspector()
    context = inspector.inspect(["/fake/path/test.txt"])
    
    assert context.input_valid is False
    assert len(context.errors) == 1
    assert "Unsupported file extension" in context.errors[0]

@patch("pathlib.Path.exists")
def test_input_inspector_file_not_found(mock_exists):
    mock_exists.return_value = False

    inspector = InputInspector()
    context = inspector.inspect(["/fake/path/missing.tif"])
    
    assert context.input_valid is False
    assert len(context.errors) == 1
    assert "File does not exist" in context.errors[0]
