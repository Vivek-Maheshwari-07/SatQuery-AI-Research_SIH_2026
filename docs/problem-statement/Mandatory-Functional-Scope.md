# Mandatory Functional Scope

This document details the mandatory technical and functional capabilities mandated by ISRO Problem Statement 26167.

---

## 1. Single-Image Remote Sensing VQA
- **Direct Queries**: Answering factual questions on presence/absence (*"Is there a runway in the image?"*).
- **Count & Numerical Reasoning**: Object counting under overhead perspective (*"How many cargo ships are docked in the harbor?"*).
- **Attribute Classification**: State, color, material, condition (*"What is the condition of the agricultural fields?"*).
- **Spatial Reasoning**: Orientation, proximity, relative locations (*"Are the storage tanks located to the north-east of the industrial plant?"*).

---

## 2. Text-Guided Grounding & Scene Captioning
- **Text-Guided Grounding**: Given arbitrary natural language descriptions, locate target objects/zones and predict precise bounding boxes $[x_{min}, y_{min}, x_{max}, y_{max}]$ or polygonal coordinates.
- **Scene Captioning**: Generate multi-sentence descriptive summaries covering predominant LULC classes, human infrastructure, environmental features, and geographic characteristics.

---

## 3. Bi-Temporal Change Detection & Change-VQA
- **Change Segmentation**: Ingest paired co-registered rasters ($T_1, T_2$) and produce binary or multi-class change masks.
- **Change-VQA**: Handle queries inquiring about temporal transformations (*"What infrastructure was constructed between 2021 and 2024?"*, *"How much forest area was cleared?"*).
- **Disaster Assessment**: Pre- vs post-event flood inundation, earthquake destruction, or wildfire burn scar quantification.

---

## 4. Optical + SAR Cross-Modal Analysis
- **Sensor Complementarity**:
  - **Optical (Multispectral)**: Rich spectral reflection signatures, visible color, vegetation indices (NDVI), water indices (NDWI).
  - **SAR (Synthetic Aperture Radar)**: All-weather, day/night capability, penetration through cloud/smoke, sensitive to dielectric properties, surface roughness, and double-bounce geometric structures.
- **Joint Analysis Capabilities**:
  - Cloud-penetrating urban and flood mapping.
  - Cross-sensor feature validation to avoid false positives.

---

## 5. Agentic Model & Tool Orchestration
- **Dynamic Task Decomposition**: Breaking down high-level user goals into structured sub-tasks.
- **Tool / Specialist Model Selection**: Autonomous invocation of specialized models (VLM, change detector, grounding model, raster index tools) rather than relying on a single monolithic black-box.
- **Intermediate Verification**: Verifying sub-task outputs before passing to downstream modules.

---

## 6. Evidence Grounding, Confidence & Execution Trace
- **Visual Evidence**: Returning localized visual cues (heatmaps, highlighted overlays, bounding boxes) tied directly to text answers.
- **Calibrated Confidence**: Quantifying certainty levels for each classification, count, or localization step.
- **Step-by-Step Trace**: Exposing the complete chain of reasoning, tool calls, and inputs/outputs to ensure end-to-end transparency.
