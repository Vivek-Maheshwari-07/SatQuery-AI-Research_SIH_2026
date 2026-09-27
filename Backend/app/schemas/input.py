from typing import Any

from pydantic import BaseModel, Field


class ImageMetadata(BaseModel):
    image_id: str

    filename: str
    format: str

    width: int
    height: int
    bands: int

    dtype: str

    modality: str = "unknown"

    crs: str | None = None
    resolution: list[float] | None = None
    bounds: list[float] | None = None

    nodata: Any | None = None
    nodata_ratio: float | None = None

    band_descriptions: list[str | None] = Field(default_factory=list)

    color_interpretation: list[str] = Field(default_factory=list)

    acquisition_time: str | None = None

    tags: dict[str, Any] = Field(default_factory=dict)

    valid: bool = True
    warnings: list[str] = Field(default_factory=list)


class InputContext(BaseModel):
    input_valid: bool

    image_count: int

    images: list[ImageMetadata] = Field(default_factory=list)

    warnings: list[str] = Field(default_factory=list)

    errors: list[str] = Field(default_factory=list)