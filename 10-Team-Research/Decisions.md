# Architectural Decision Records (ADRs)

This document tracks fundamental architectural decisions, evaluated alternatives, and recorded rationale.

---

## 🏛️ ADR Index

- **ADR-001**: [Agentic Specialist Ensemble vs Monolithic Black-Box VLM](#adr-001-agentic-specialist-ensemble-vs-monolithic-black-box-vlm)
- **ADR-002**: [Native Multi-Band GeoTIFF Processing with Rasterio](#adr-002-native-multi-band-geotiff-processing-with-rasterio)
- **ADR-003**: [Dual-Branch Optical + SAR Fusion Architecture](#adr-003-dual-branch-optical--sar-fusion-architecture)

---

### ADR-001: Agentic Specialist Ensemble vs Monolithic Black-Box VLM
- **Status**: Accepted
- **Context**: Monolithic general VLMs lack pixel-accurate segmentation, fail on exact bi-temporal change masking, and struggle with multi-band GeoTIFFs.
- **Decision**: Adopt an **Agentic Controller Pattern** (orchestrating specialized vision backbones: Grounding DINO, ChangeFormer, SAM, and GIS raster tools) with a centralized reasoning trace.
- **Consequences**: Greater modularity, verifiable execution trace, superior pixel grounding, but requires orchestration state management.

---

### ADR-002: Native Multi-Band GeoTIFF Processing with Rasterio
- **Status**: Accepted
- **Context**: Converting multi-band satellite rasters into 8-bit RGB destroys scientific radiometric depth (NIR, SWIR, SAR backscatter).
- **Decision**: Retain GeoTIFF georeferencing metadata and spectral bands natively via `rasterio` / `GDAL`, converting dynamically to RGB only for visual foundation model consumption when necessary.
- **Consequences**: Preserves full radiometric accuracy for spectral indices and GIS measurements.

---

### ADR-003: Dual-Branch Optical + SAR Fusion Architecture
- **Status**: Accepted
- **Context**: ISRO PS 26167 mandatorily requires cross-modal optical + SAR analysis.
- **Decision**: Utilize intermediate feature-level cross-attention (inspired by CROMA) to align Sentinel-1 SAR and Sentinel-2 optical embeddings.
- **Consequences**: Robust analysis even under severe cloud occlusions.
