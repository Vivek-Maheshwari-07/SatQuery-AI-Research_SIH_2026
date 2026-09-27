import pytest
from app.preprocessing.modality_detector import ModalityDetector

def test_optical_modality_rgb():
    modality = ModalityDetector.detect(
        band_count=3,
        dtype="uint8",
        band_descriptions=["red", "green", "blue"],
        color_interpretation=["red", "green", "blue"],
        tags={},
    )
    assert modality == "optical"

def test_optical_modality_single_band():
    modality = ModalityDetector.detect(
        band_count=1,
        dtype="uint8",
        band_descriptions=[],
        color_interpretation=[],
        tags={},
    )
    assert modality == "optical"

def test_sar_modality_sentinel1():
    modality = ModalityDetector.detect(
        band_count=2,
        dtype="float32",
        band_descriptions=["vv", "vh"],
        color_interpretation=["gray", "gray"],
        tags={"sensor": "sentinel-1"},
    )
    assert modality == "sar"

def test_multispectral_modality_bands():
    modality = ModalityDetector.detect(
        band_count=4,
        dtype="uint16",
        band_descriptions=["blue", "green", "red", "nir"],
        color_interpretation=["blue", "green", "red", "undefined"],
        tags={},
    )
    assert modality == "multispectral"

def test_multispectral_modality_band_count_only():
    modality = ModalityDetector.detect(
        band_count=8,
        dtype="uint16",
        band_descriptions=[],
        color_interpretation=[],
        tags={},
    )
    assert modality == "multispectral"

def test_unknown_modality():
    modality = ModalityDetector.detect(
        band_count=2,
        dtype="uint8",
        band_descriptions=["unknown1", "unknown2"],
        color_interpretation=[],
        tags={},
    )
    assert modality == "unknown"
