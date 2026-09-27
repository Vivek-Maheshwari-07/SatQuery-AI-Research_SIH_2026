from typing import Any


class ModalityDetector:
    """
    Analyzes image metadata to determine the sensor modality.
    """

    @staticmethod
    def detect(
        band_count: int,
        dtype: str,
        band_descriptions: list[str | None],
        color_interpretation: list[str],
        tags: dict[str, Any],
    ) -> str:
        metadata_text = " ".join(
            [
                str(item)
                for item in [
                    *band_descriptions,
                    *color_interpretation,
                    *tags.values(),
                ]
                if item is not None
            ]
        ).lower()

        # Explicit SAR hints
        sar_keywords = [
            "sar",
            "sentinel-1",
            "sentinel1",
            "radar",
            "vv",
            "vh",
            "hh",
            "hv",
        ]
        if any(keyword in metadata_text for keyword in sar_keywords):
            return "sar"

        # Multispectral hints
        multispectral_keywords = [
            "multispectral",
            "rededge",
            "red edge",
            "nir",
            "swir",
            "green",
            "red",
            "blue",
        ]
        if any(keyword in metadata_text for keyword in multispectral_keywords):
            if band_count > 3:
                return "multispectral"

        # Basic RGB / optical heuristic
        if band_count in {1, 3, 4}:
            return "optical"
        if band_count > 3:
            return "multispectral"

        return "unknown"
