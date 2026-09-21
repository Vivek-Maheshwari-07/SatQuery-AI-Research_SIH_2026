# Test Cases & Validation Scenarios

This document details concrete test suites and edge scenarios designed to validate system behavior.

---

## 🧪 Test Suite Matrix

### Suite 1: Single-Image VQA & Grounding
- **TC-01 (Direct Presence)**: Ingest port scene $\to$ Query: *"Are there cargo vessels docked?"* $\to$ Expect: Boolean affirmative + Bounding box on vessels.
- **TC-02 (Count Accuracy)**: Ingest airfield $\to$ Query: *"Count all aircraft on the runway."* $\to$ Expect: Exact integer matching ground truth count + Individual bounding boxes.
- **TC-03 (Small Object Grounding)**: Ingest urban area $\to$ Query: *"Locate the circular fuel storage tanks."* $\to$ Expect: Bounding boxes covering all fuel tanks.

### Suite 2: Bi-Temporal Change Detection
- **TC-04 (Urban Expansion)**: Ingest $T_1$ (2020) and $T_2$ (2024) $\to$ Query: *"Highlight newly constructed residential buildings."* $\to$ Expect: Binary change mask isolating new structures + Area calculation.
- **TC-05 (Deforestation Quantification)**: Ingest forest reserve $T_1, T_2$ $\to$ Query: *"Quantify forest loss."* $\to$ Expect: Red-highlighted change mask + Quantified loss in hectares.

### Suite 3: Optical + SAR Multimodal Fusion
- **TC-06 (Cloud Penetration)**: Ingest optical scene with 70% cloud cover + co-registered Sentinel-1 SAR $\to$ Query: *"Detect maritime vessels in the cloud-obscured bay."* $\to$ Expect: SAR double-bounce extraction identifying ships through clouds + Trace explanation.

### Suite 4: Guardrails & Edge Cases
- **TC-07 (Missing Pair Error Handling)**: Submit single image $\to$ Query: *"Compare change from previous year."* $\to$ Expect: Graceful error asking for second timestamp.
- **TC-08 (Irrelevant Prompt)**: Query: *"What is the capital of France?"* $\to$ Expect: Domain guardrail notice clarifying remote sensing focus.
