# CDVQA (Change Detection VQA) Dataset

## Official Source
- Repository / Portal: https://github.com/Bob-Z/CDVQA (or corresponding official benchmark repo)
- Hosting Authors: Research community in Remote Sensing & Vision-Language Modeling

## Paper
- "Change Detection Visual Question Answering (CDVQA)" (IEEE TGRS / CVPR Workshop)

## Purpose
A specialized benchmark dataset designed for conversational bi-temporal change detection, enabling models to reason over pairs of multi-temporal remote sensing images and answer questions about surface changes.

## Modalities
- **Optical**: Dual-date co-registered optical / aerial image pairs ($T_1, T_2$).

## Image Type
- Multi-temporal aerial and satellite orthophotos.
- Formats: PNG / GeoTIFF.

## Resolution
- Ground Sampling Distance (GSD): 0.5m – 2.0m.
- Patch Size: 256x256 / 512x512 pixels.

## Annotations
- Binary change masks (changed vs unchanged pixels).
- Semantic change categories (e.g., vegetation-to-urban, bare-ground-to-building).
- Question-Answer pairs detailing specific temporal changes.

## Text Annotations
- Questions inquiring about:
  - Change presence (*"Has new construction occurred in this area?"*)
  - Change type and semantic transformation (*"What replaced the agricultural plot?"*)
  - Change quantification and spatial extent (*"In which direction did the urban area expand?"*)

## Dataset Size
- Multi-temporal image pairs with paired QA items and ground truth change masks. (Exact volume: To be researched / verified from official repo).

## Train / Validation / Test Split
- Pre-defined non-overlapping geographic scene splits.

## License
- Academic Research License (Refer to official repository).

## Download
- Download links and setup scripts available via official repository.

## Evaluation Usage
- VQA Answer Accuracy (Exact Match / F1).
- Change Localization Intersection over Union (IoU) / F1-score.

## Relevance to SatQuery AI
- Directly satisfies **Requirement 3 (Bi-Temporal Change Analysis)** and **Requirement 4 (Change Description / Change-Based VQA)**.

## Notes
- Bridges traditional pixel-level change detection with conversational vision-language reasoning.
