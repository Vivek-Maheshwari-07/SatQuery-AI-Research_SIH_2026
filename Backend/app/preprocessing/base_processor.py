from abc import ABC, abstractmethod
from pathlib import Path

from app.schemas.input import ImageMetadata


class FileProcessor(ABC):
    """
    Base class for processing image files.
    """
    @abstractmethod
    def process(self, path: Path, image_index: int) -> ImageMetadata:
        pass
