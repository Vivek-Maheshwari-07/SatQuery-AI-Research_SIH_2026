from pathlib import Path

from app.schemas.input import ImageMetadata, InputContext
from app.preprocessing.base_processor import FileProcessor
from app.preprocessing.tiff_processor import TiffProcessor
from app.preprocessing.png_processor import PngProcessor
from app.preprocessing.other_extension_processor import OtherExtensionProcessor


class InputInspector:
    """
    Deterministic input inspection layer.

    Responsibilities:
    - Validate files
    - Delegate format extraction to specific processor classes
    - Compile validation results
    """

    def __init__(self):
        self.processors: dict[str, FileProcessor] = {
            ".tif": TiffProcessor(),
            ".tiff": TiffProcessor(),
            ".png": PngProcessor(),
            ".jpg": OtherExtensionProcessor(),
            ".jpeg": OtherExtensionProcessor(),
        }

    @property
    def SUPPORTED_EXTENSIONS(self) -> set[str]:
        return set(self.processors.keys())

    def inspect(self, file_paths: list[str]) -> InputContext:
        images: list[ImageMetadata] = []
        warnings: list[str] = []
        errors: list[str] = []

        if not file_paths:
            return InputContext(
                input_valid=False,
                image_count=0,
                images=[],
                errors=["No input images provided"],
            )

        for index, file_path in enumerate(file_paths):
            try:
                metadata = self._inspect_file(
                    file_path=file_path,
                    image_index=index,
                )
                images.append(metadata)
            except Exception as exc:
                errors.append(f"Failed to inspect '{file_path}': {exc}")

        input_valid = len(errors) == 0 and len(images) == len(file_paths)

        return InputContext(
            input_valid=input_valid,
            image_count=len(images),
            images=images,
            warnings=warnings,
            errors=errors,
        )

    def _inspect_file(self, file_path: str, image_index: int) -> ImageMetadata:
        path = Path(file_path)

        if not path.exists():
            raise FileNotFoundError(f"File does not exist: {file_path}")

        extension = path.suffix.lower()
        processor = self.processors.get(extension)

        if not processor:
            raise ValueError(f"Unsupported file extension: {extension}")

        return processor.process(path, image_index)