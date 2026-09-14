# Evaluation Criteria Analysis (PS 26167)

This document analyzes the evaluation expectations and key grading dimensions for ISRO Problem Statement 26167.

---

## 🎯 1. Evaluation Dimensions

### A. Task Accuracy & Correctness
- **VQA Accuracy**: Exact match and semantic similarity of generated answers compared to ground truth.
- **Visual Grounding Quality**: Mean Average Precision (mAP) and Intersection over Union (IoU $\ge 0.5$) for localized bounding boxes and masks.
- **Change Detection Precision/Recall**: F1-score, Precision, Recall, and Overall Accuracy (OA) on bi-temporal change masks.
- **Caption Quality**: Standard Natural Language Generation (NLG) metrics: BLEU-4, METEOR, ROUGE-L, CIDEr, and SPICE.

### B. Multimodal & Domain Handling
- Ability to process native geospatial formats (GeoTIFFs with multi-band configurations).
- Effective cross-modal fusion of optical and SAR data (e.g., cloud mitigation, backscatter-assisted edge detection).
- Adaptation to remote sensing challenges: overhead perspective, small dense objects, scale variance, and illumination differences.

### C. Agentic Autonomy & Workflow Orchestration
- Accurate query decomposition into sensible reasoning steps.
- Correct selection and invocation of specialist models and tools without hallucinations.
- Resilience in handling ambiguous or out-of-scope queries (graceful failure and clarification prompts).

### D. Explainability, Confidence & Evidence
- Visual grounding fidelity: ensuring that textual answers are backed by precise visual regions/masks.
- Confidence calibration: reliability of confidence scores (avoiding overconfident incorrect predictions).
- Quality and clarity of the step-by-step execution trace.

### E. System Usability & Performance
- Scalability to large satellite tiles (tiling / windowing strategies).
- Latency and compute efficiency during inference.
