# Technical and Functional Requirements (PS 26167)

---

## 📋 1. Functional Requirements

### FR-01: Single-Image Visual Question Answering (VQA)
- Accept single satellite/aerial images (Optical/SAR) along with user text questions.
- Answer queries spanning object presence, count estimation, attribute classification, spatial relations, and land-use/land-cover (LULC) categorization.

### FR-02: Text-Guided Visual Grounding & Scene Captioning
- Detect and pinpoint objects or regions mentioned in the prompt with bounding boxes and/or polygonal segmentation masks.
- Produce structured, comprehensive textual summaries detailing scene contents, terrain composition, and anomalies.

### FR-03: Bi-Temporal Change Detection & Change-VQA
- Ingest pairs of co-registered images acquired at timestamps $T_1$ and $T_2$.
- Accurately isolate significant surface variations (urban expansion, deforestation, water body fluctuations, disaster damage).
- Answer contextual natural language questions regarding "what changed, where, and how much".

### FR-04: Cross-Modal Optical & SAR Fusion
- Support complementary joint analysis of optical and SAR pairs over identical Regions of Interest (ROI).
- Leverage SAR penetration for cloud-obscured scenes, water boundary delineation, and surface roughness analysis alongside optical spectral indices.

### FR-05: Agentic Query Decomposition & Tool Orchestration
- Parse free-form multi-part queries into executable sub-tasks.
- Route sub-tasks dynamically to specialized models (e.g., Grounding DINO, SAM/GeoSAM, change detectors, spectral index calculators).

### FR-06: Evidence Grounding & Confidence Estimation
- Accompany every natural language claim with visual evidence overlays (masks, bounding boxes, or heatmap visualizations).
- Output explicit confidence metrics reflecting model certainty.

### FR-07: Transparent Execution Trace
- Return an auditable, step-by-step reasoning trace illustrating:
  1. Query intent extraction
  2. Input metadata validation
  3. Tool/model selection rationale
  4. Intermediate calculations & visual verification
  5. Final synthesis

---

## ⚙️ 2. Non-Functional Requirements

- **Accuracy & Robustness**: Resilient to sensor noise (SAR speckle), cloud occlusions, spatial resolution discrepancies, and extreme aspect ratios.
- **Latency & Responsiveness**: Sub-second to few-second response times for typical VQA/captioning queries; efficient batch processing for high-resolution scenes.
- **Interoperability**: Native handling of standard geospatial raster formats (GeoTIFF, NetCDF, HDF5, JPEG2000) preserving coordinate reference systems (CRS) and spatial metadata.
- **Auditability**: Explainable, verifiable AI pipelines suitable for scientific and defense decision support.
