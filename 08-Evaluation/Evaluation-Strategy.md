# Comprehensive Evaluation Strategy

This document outlines the systematic evaluation methodology for validating SatQuery AI across its components and end-to-end pipelines.

---

## 🎯 Multi-Tier Evaluation Protocol

```mermaid
flowchart TD
    T1["Tier 1: Specialist Model Benchmarks<br/>(Grounding mIoU, VQA Accuracy, Change F1)"] --> T2["Tier 2: Agentic Routing Verification<br/>(Task Classification Accuracy, Tool Call Schema Validation)"]
    T2 --> T3["Tier 3: End-to-End Pipeline Evaluation<br/>(Visual Evidence Correctness, Trace Completeness, User Latency)"]
    T3 --> T4["Tier 4: Robustness & Stress Testing<br/>(Cloud Occlusion, Extreme GSD, Noise, Edge Prompts)"]
```

---

## 📋 Evaluation Tiers

### Tier 1: Specialist Model Benchmarking
- Validate each model module independently against standardized academic test splits (VRSBench, RSVQA, CDVQA, BigEarthNet-MM).
- Establish baseline scores without the agentic wrapper.

### Tier 2: Agentic Routing & Tool Execution
- Formulate a test set of 200 diverse prompts (including ambiguous and multi-step queries).
- Measure **Router Accuracy**: Did the controller invoke the correct tool pipeline?
- Validate schema compliance for generated tool arguments.

### Tier 3: End-to-End Pipeline Performance
- Measure full turnaround time from prompt submission to response visualization.
- Verify visual evidence alignment (e.g. ensure bounding boxes match the entities described in text).
- Validate execution trace clarity and confidence calibration.

### Tier 4: Edge Cases & Robustness
- Stress test with noisy SAR speckle, cloud-covered optical tiles, extreme aspect ratios, and mismatched spatial coordinates.
