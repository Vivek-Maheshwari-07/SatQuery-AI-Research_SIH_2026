# Input Validation & Guardrails

This document specifies the validation criteria, data integrity checks, and error-handling guardrails for SatQuery AI.

---

## 🛡️ 1. Geospatial Raster Validation

Before passing rasters to deep learning models, the input pipeline performs automated validation:

1. **Format & Header Integrity**:
   - Verify raster format (GeoTIFF, COG, PNG, JPEG).
   - Ensure raster is not corrupted and dimensions ($H \times W \times C$) are valid.

2. **Spatial Reference Consistency (for Multi-Temporal & Multi-Sensor Pairs)**:
   - **CRS Alignment**: Verify that both rasters share identical Coordinate Reference Systems (or trigger automated on-the-fly GDAL reprojection).
   - **Spatial Footprint Overlap**: Calculate bounding box intersection (IoU $> 0.8$ required for direct pair inference).
   - **Pixel Resolution Alignment**: Check Ground Sampling Distance (GSD) equality; resample via bilinear/bicubic interpolation if mismatched.

3. **Radiometric Check & Normalization**:
   - Detect data type (uint8, uint16, float32).
   - Handle NoData pixels and NaN masks.
   - Scale pixel values to expected model dynamic ranges (e.g. $[0, 1]$ or $[0, 255]$).

---

## 🛑 2. Query Guardrails & Out-of-Domain Handling

| Condition | Detected Issue | System Guardrail Action |
| :--- | :--- | :--- |
| **Temporal Query on Single Image** | User asks for change detection but uploads only 1 timestamp. | Prompt user: *"Change detection requires two images (T1 and T2). Please upload a secondary timestamp raster."* |
| **SAR Query on RGB Image** | User asks for radar dielectric analysis on standard optical photo. | Warn user about missing radar channels or route to optical approximation. |
| **Out-of-Domain / Non-Geospatial Query** | User asks generic trivia unrelated to remote sensing. | Politely decline or clarify system domain boundaries. |
| **Adversarial / Injection Prompt** | Prompt injection attempting to bypass agent tool schemas. | Sanitize input and enforce strict JSON schema decoding. |
