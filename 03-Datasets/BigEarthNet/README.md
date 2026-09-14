# BigEarthNet (BigEarthNet-MM)

## Official Source
- Portal: https://bigearth.net/
- Hosting Institution: Technische Universität Berlin (Remote Sensing Image Analysis group) & European Space Agency (ESA)

## Paper
- "BigEarthNet-MM: A Large-Scale, Multimodal, Multilabel Benchmark Dataset for Remote Sensing Image Analysis and Its Benchmark on Few-Shot Classification" (IEEE GRSM / IEEE TGRS)

## Purpose
A benchmark archive designed for large-scale multi-modal remote sensing representation learning, multi-label classification, and cross-sensor fusion analysis.

## Modalities
- **Optical**: Sentinel-2 (12 spectral bands excluding Band 10 atmospheric band)
- **SAR**: Sentinel-1 (Dual-polarization: VV, VH backscattering coefficients)

## Image Type
- Sentinel-1 and Sentinel-2 Level-2A surface reflectance tiles
- Formats: GeoTIFF

## Resolution
- Ground Sampling Distance (GSD): 10m (B2, B3, B4, B8), 20m (B5, B6, B7, B8A, B11, B12, VV, VH), 60m (B1, B9)
- Patch Dimensions: 120x120 pixels (10m bands) corresponding to a 1.2 km x 1.2 km ground footprint

## Annotations
- Land Cover Multi-labels based on CORINE Land Cover (CLC) 2018 nomenclature (43 original classes / 19 relaxed classes)

## Text Annotations
- Multi-label classification tags (no conversational free-text VQA in the original raw dataset)

## Dataset Size
- Total Patches: 590,326 pairs of Sentinel-1 and Sentinel-2 image patches
- Geographic Extent: 10 European countries

## Train / Validation / Test Split
- Standard recommended splits provided in official repository (Train: ~70%, Validation: ~10%, Test: ~20% with non-overlapping geographic tiles)

## License
- Community Data License Agreement - Permissive (CDLA-Permissive-1.0)

## Download
- Official download portal: https://bigearth.net/

## Evaluation Usage
- Multi-label land cover classification (F1-score, Precision, Recall, Mean Average Precision).
- Pre-training backbone models for multimodal optical-SAR fusion.

## Relevance to SatQuery AI
- Directly supports **Mandatory Requirement 4 (Optical + SAR Cross-Modal Analysis)** and multispectral band handling.

## Notes
- Provides a premier benchmark for multimodal pre-training and alignment between Sentinel-1 radar backscatter and Sentinel-2 optical bands.
