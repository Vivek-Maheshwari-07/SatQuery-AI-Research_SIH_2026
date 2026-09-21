# 07 - System Design & Architecture

## 📌 Purpose
This directory organizes system design blueprints, agentic workflow specifications, data flow pipelines, routing heuristics, input validation strategies, and evidence-grounding designs for **SatQuery AI**.

---

## 📂 Contents

| File | Description |
| :--- | :--- |
| [`System-Architecture.md`](System-Architecture.md) | End-to-end multi-layer architecture from user query to multimodal specialist execution and response synthesis. |
| [`Agentic-Workflow.md`](Agentic-Workflow.md) | 10-step agentic execution lifecycle, dynamic routing loops, and tool orchestration specifications. |
| [`Data-Flow.md`](Data-Flow.md) | Ingestion pipelines for single-image and bi-temporal Optical/SAR GeoTIFFs, raster streaming, and response packaging. |
| [`Model-Selection.md`](Model-Selection.md) | Decision matrices and heuristics for selecting specialist models based on task taxonomy and sensor modalities. |
| [`Input-Validation.md`](Input-Validation.md) | Geospatial raster validation, CRS consistency checking, spatial overlap verification, and out-of-domain prompt handling. |
| [`Evidence-and-Confidence.md`](Evidence-and-Confidence.md) | Visual evidence extraction algorithms (heatmaps, masks, boxes) and calibrated confidence scoring design. |

---

## 🎯 What Belongs Here
- Theoretical architecture diagrams, sequence diagrams, pipeline flowcharts, and interface contracts.
- Specifications for the agentic reasoning loop and specialist model coordination.

## 🚫 What Does NOT Belong Here
- Application executable code or microservice implementations.

---

## 👥 How Team Members Should Use This
- Use these blueprints to align all subsystem designs and verify compliance with ISRO PS 26167 deliverables.
