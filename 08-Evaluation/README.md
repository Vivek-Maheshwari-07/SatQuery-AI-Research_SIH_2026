# 08 - Evaluation & Benchmarks

## 📌 Purpose
This directory establishes the comprehensive evaluation framework, standard remote sensing benchmarks, quantitative mathematical metrics, and test suites for validating **SatQuery AI**.

---

## 📂 Contents

| File | Description |
| :--- | :--- |
| [`Benchmarks.md`](Benchmarks.md) | In-depth breakdown of standard benchmarks: VRSBench, RSVQA, CDVQA, and ISRO/SAC evaluation data expectations. |
| [`Metrics.md`](Metrics.md) | Mathematical formulation of evaluation metrics across VQA, Visual Grounding, Change Detection, and Captioning. |
| [`Evaluation-Strategy.md`](Evaluation-Strategy.md) | Multi-stage evaluation protocol covering component-level testing, agentic routing verification, and end-to-end user flows. |
| [`Test-Cases.md`](Test-Cases.md) | Curated collection of unit test scenarios, multi-modal edge cases, and reasoning stress tests. |

---

## 🎯 What Belongs Here
- Benchmark dataset specifications, expected inputs/outputs, and metric formulas.
- Unit and integration test case definitions.

## 🚫 What Does NOT Belong Here
- ❌ **No fabricated benchmark scores or invented results.** If official scores are not yet calculated/verified, mark as `To be researched`.

---

## 👥 How Team Members Should Use This
- Use this directory to validate model performance objectively against standardized academic baselines.
