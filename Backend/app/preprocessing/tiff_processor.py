from pathlib import Path
from typing import Any
import numpy as np
import rasterio

from app.schemas.input import ImageMetadata
from app.preprocessing.base_processor import FileProcessor
from app.preprocessing.modality_detector import ModalityDetector


class TiffProcessor(FileProcessor):
    """
    Processor specifically for TIFF/GeoTIFF files.
    """
    def process(self, path: Path, image_index: int) -> ImageMetadata:
        with rasterio.open(path) as src:
            band_descriptions = list(src.descriptions)
            color_interpretation = [item.name for item in src.colorinterp]
            tags = src.tags()
            resolution = [
                float(src.res[0]),
                float(src.res[1]),
            ]
            bounds = [
                float(src.bounds.left),
                float(src.bounds.bottom),
                float(src.bounds.right),
                float(src.bounds.top),
            ]
            nodata_ratio = self._calculate_nodata_ratio(src)
            
            # Delegate modality detection
            modality = ModalityDetector.detect(
                band_count=src.count,
                dtype=str(src.dtypes[0]),
                band_descriptions=band_descriptions,
                color_interpretation=color_interpretation,
                tags=tags,
            )

            return ImageMetadata(
                image_id=f"image_{image_index + 1}",
                filename=path.name,
                format="GeoTIFF",
                width=src.width,
                height=src.height,
                bands=src.count,
                dtype=str(src.dtypes[0]),
                modality=modality,
                crs=str(src.crs) if src.crs else None,
                resolution=resolution,
                bounds=bounds,
                nodata=src.nodata,
                nodata_ratio=nodata_ratio,
                band_descriptions=band_descriptions,
                color_interpretation=color_interpretation,
                tags=tags,
            )

    @staticmethod
    def _calculate_nodata_ratio(src) -> float | None:
        if src.nodata is None:
            return None
        data = src.read()
        nodata_pixels = np.all(data == src.nodata, axis=0)
        total_pixels = nodata_pixels.size
        if total_pixels == 0:
            return 0.0
        return float(np.sum(nodata_pixels) / total_pixels)
