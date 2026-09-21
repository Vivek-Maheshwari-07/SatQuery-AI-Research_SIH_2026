# Evidence Grounding & Confidence Estimation

This document defines the methodologies for visual evidence extraction and calibrated confidence estimation in SatQuery AI.

---

## 🎯 1. Evidence-Grounded Output

To ensure user trust and mission-critical reliability, SatQuery AI never outputs ungrounded text assertions. Every factual claim is paired with visual evidence artifacts:

### Types of Visual Evidence

1. **Bounding Box Grounding**:
   - For discrete object queries (aircraft, ships, storage tanks, bridges).
   - Coordinate format: $[x_{min}, y_{min}, x_{max}, y_{max}]$ normalized $[0, 1000]$ or native pixel coordinates, accompanied by georeferenced GeoJSON bounds.

2. **Pixel-Level Segmentation & Change Masks**:
   - For spatial extent queries (flood inundation, deforestation, urban expansion).
   - High-contrast color-coded binary or multi-class raster overlays with transparency channel.

3. **Saliency & Attention Heatmaps**:
   - For open-ended VQA queries where discrete bounding boxes are not applicable (e.g. *"Why is this soil classified as arid?"*).
   - Grad-CAM / Cross-Attention heatmaps highlighting image regions influencing the language model's generation.

---

## 📊 2. Confidence Estimation Strategy

Confidence scoring provides quantitative certainty across model outputs.

### Multi-Component Confidence Scoring

$$\text{Overall Confidence} = w_1 \cdot C_{det} + w_2 \cdot C_{vlm} + w_3 \cdot C_{spatial}$$

Where:
- $C_{det}$: Detection/Grounding score (softmax logit / IoU score from the object detector).
- $C_{vlm}$: Language model token probability / sequence entropy.
- $C_{spatial}$: Sensor metadata consistency score (e.g. penalizing if cloud cover $> 30\%$ or resolution is degraded).
- $w_1, w_2, w_3$: Normalized task-specific weighting factors.

### Confidence Tiers & User Presentation

| Confidence Range | Badge Level | Description / Action |
| :--- | :--- | :--- |
| **0.85 – 1.00** | 🟢 **High Confidence** | Direct presentation of findings with green badge. |
| **0.65 – 0.84** | 🟡 **Moderate Confidence** | Output provided with yellow advisory; suggestion to cross-verify. |
| **< 0.65** | 🔴 **Low Confidence** | System explicitly cautions the user, indicates potential ambiguity or sensor limitations. |
