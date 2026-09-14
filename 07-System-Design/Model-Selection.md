# Model & Tool Selection Strategy

This document details the routing heuristics and decision matrices used by the agentic controller to select specialist models and GIS tools.

---

## 🧭 Model Selection Decision Matrix

| Identified Task Intent | Input Modalities | Primary Candidate Model | Fallback / Specialist Tool | Output Type |
| :--- | :--- | :--- | :--- | :--- |
| **Open-Ended VQA** | Single Optical (RGB) | GeoChat (7B) | RSVQA Specialist / Florence-2 | Natural Language Text |
| **Visual Grounding / Localization** | Single Optical (RGB) | Grounding DINO | GeoSAM / Florence-2 | Bounding Boxes / Polygons |
| **Dense Scene Captioning** | Single Optical (RGB) | Florence-2 `<MORE_DETAILED_CAPTION>` | GeoChat | Multi-sentence paragraph |
| **Counting / Numerical Estimation** | Single Optical (RGB) | Grounding DINO + Box Count | RS Counting Specialist | Integer count + BBoxes |
| **Bi-Temporal Change Detection** | Dual Optical ($T_1, T_2$) | ChangeFormer | BIT / TinyCD | Binary / Semantic Mask |
| **Bi-Temporal Change VQA** | Dual Optical ($T_1, T_2$) | ChangeFormer + GeoChat | Change-VLM Adapter | Change description + Mask |
| **Cloud-Covered Marine/Urban** | Optical (Cloudy) + SAR (VV/VH) | CROMA Encoder | Dual-branch Cross-Attention | Fused classification / Mask |
| **Spectral Index Analysis** | Multi-Band GeoTIFF (NIR, SWIR) | Deterministic Raster GIS Tool | Python NumPy / Rasterio | Index Map (NDVI / NDWI) |
| **Metric Surface Area Calculation** | Mask + GeoTIFF Metadata | Geospatial Geometry Engine | Rasterio + Shapely | Area ($m^2 / km^2$) |

---

## 🔀 Dynamic Routing Heuristics

1. **Check for Temporal Duality**:
   - If query asks about *"difference"*, *"growth"*, *"expansion"*, *"before vs after"*, route to the **Bi-Temporal Change Engine**.
2. **Check for Cloud Occlusion / SAR Presence**:
   - If optical imagery has high cloud fraction or SAR bands are supplied, activate the **Optical-SAR Cross-Modal Fusion** route.
3. **Check for Grounding / Detection Directives**:
   - If query uses action verbs (*"locate"*, *"find"*, *"highlight"*, *"box"*), route to the **Visual Grounding Pipeline** (e.g. Grounding DINO + SAM).
4. **Deterministic Fallback for Mathematical Tasks**:
   - Never use LLM hallucinated arithmetic for area calculations; always invoke deterministic Python raster algebra tools.
