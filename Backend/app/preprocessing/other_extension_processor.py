from pathlib import Path
import numpy as np

from app.schemas.input import ImageMetadata
from app.preprocessing.base_processor import FileProcessor


class OtherExtensionProcessor(FileProcessor):
    """
    Processor for other standard image extensions (e.g. JPG, JPEG).
    """
    def process(self, path: Path, image_index: int) -> ImageMetadata:
        try:
            from PIL import Image
        except ImportError as exc:
            raise RuntimeError("Pillow is required for standard image inspection") from exc

        with Image.open(path) as image:
            if image.mode == "RGB":
                bands = 3
            elif image.mode == "RGBA":
                bands = 4
            elif image.mode in {"L", "I", "F"}:
                bands = 1
            else:
                bands = len(image.getbands())

            return ImageMetadata(
                image_id=f"image_{image_index + 1}",
                filename=path.name,
                format=path.suffix.lower().replace(".", "").upper(),
                width=image.width,
                height=image.height,
                bands=bands,
                dtype=str(np.asarray(image).dtype),
                modality="optical",
                crs=None,
                resolution=None,
                bounds=None,
                nodata=None,
                nodata_ratio=None,
                band_descriptions=list(image.getbands()),
                color_interpretation=[],
                tags={},
                warnings=["Standard image format does not provide geospatial metadata."],
            )
