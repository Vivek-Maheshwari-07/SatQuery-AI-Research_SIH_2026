# Evaluation Benchmarks

This document documents standard remote sensing benchmarks evaluated for SatQuery AI.

---

## 🏛️ 1. VRSBench Benchmark

- **What It Evaluates**: Multi-task vision-language capabilities in high-resolution remote sensing, including Visual Question Answering (VQA), Referring Expression Visual Grounding (VG), and Image Captioning.
- **Expected Input**: Single optical aerial/satellite RGB patch ($512 \times 512$ pixels) + task prompt / question.
- **Expected Output**:
  - VQA: Open-ended or closed-set answer string.
  - Grounding: Bounding box coordinates $[x_{min}, y_{min}, x_{max}, y_{max}]$.
  - Captioning: Multi-sentence scene summary.
- **Relevant Metrics**: VQA Accuracy (OA/AA), Grounding mIoU, Precision@0.5, Captioning CIDEr, BLEU-4, METEOR.
- **Mapping to SatQuery AI**: Benchmarks Single-Image VQA (FR-01), Grounding (FR-02), and Captioning (FR-02).

---

## 🏛️ 2. RSVQA Benchmark

- **What It Evaluates**: Visual question answering on low-resolution (Sentinel-2, 10m) and high-resolution (aerial, 0.15m) remote sensing imagery.
- **Expected Input**: Satellite/aerial image + categorical or counting question.
- **Expected Output**: Answer label (Presence Yes/No, Count number, Rural/Urban, Comparison).
- **Relevant Metrics**: Overall Accuracy (OA), Average Accuracy (AA), Question-Type Accuracy.
- **Mapping to SatQuery AI**: Tests satellite-level overhead perspective reasoning and small object count estimation (FR-01).

---

## 🏛️ 3. CDVQA (Change Detection VQA) Benchmark

- **What It Evaluates**: Multi-temporal reasoning and conversational change understanding across dual-date remote sensing pairs.
- **Expected Input**: Co-registered bi-temporal image pair $(T_1, T_2)$ + change-focused natural language question.
- **Expected Output**: Textual explanation of detected change + binary/semantic change localization.
- **Relevant Metrics**: VQA Accuracy / BLEU score, Change Mask F1-score, Intersection over Union (IoU).
- **Mapping to SatQuery AI**: Validates Bi-Temporal Change Detection (FR-03) and Change-VQA (FR-04).

---

## 🏛️ 4. ISRO / SAC Evaluation Data Scenarios

- **What It Evaluates**: Practical operational scenarios on Indian satellite constellations (Resourcesat, Cartosat, RISAT/EOS-04, NISAR simulated data).
- **Expected Input**: Multi-spectral GeoTIFFs (LISS-4, AWiFS, Sentinel-2 equivalent) and SAR C/S/L-band data.
- **Expected Output**: Fused multi-sensor insights, disaster damage delineation, agricultural crop metrics.
- **Relevant Metrics**: F1-score, Precision/Recall, Execution Trace Fidelity, User Interpretability.
- **Mapping to SatQuery AI**: Validates end-to-end mission readiness for ISRO real-world use cases.
