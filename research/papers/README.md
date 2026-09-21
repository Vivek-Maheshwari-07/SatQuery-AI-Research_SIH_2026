# 04 - Research Papers

## 📌 Purpose
This directory organizes literature reviews, scientific paper analyses, and foundational methodologies across Remote Sensing, Vision-Language Models, Visual Question Answering, Grounding, Change Detection, and Optical-SAR Multimodal Fusion.

---

## 🎯 What Belongs Here
- Structured reviews of academic papers from top venues (CVPR, ICCV, ECCV, NeurIPS, IEEE TGRS, IEEE JSTARS, ISPRS).
- Reusable paper summary templates.
- Categorized folders mapping to core technical tasks.

## 🚫 What Does NOT Belong Here
- Downloaded copyrighted PDF files (link to open arXiv / IEEE URLs instead).
- Application code or raw training data.

---

## 📊 Paper Research Tracking

| Paper | Year | Task | Dataset | Method | Result | Link | Relevance |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **VRSBench** | 2024 | RS VLM / Multi-task | VRSBench | Multi-task vision-language benchmark | Baseline benchmarks established | [Link](Remote-Sensing-VLM/README.md) | High |
| **RSVQA** | 2020 | Remote Sensing VQA | RSVQA-LR / HR | Visual QA on Sentinel-2 and aerial images | Benchmark accuracy established | [Link](Remote-Sensing-VQA/README.md) | High |
| **GeoChat** | 2024 | RS Grounded VLM | GeoChat-Instruct | Grounded VLM for remote sensing | High instruction following | [Link](Remote-Sensing-VLM/README.md) | High |
| **EarthGPT / RSGPT** | 2023-2024 | Multimodal RS Assistant | Multi-dataset | Multi-modal VLM for Earth observation | Open-ended RS reasoning | [Link](Remote-Sensing-VLM/README.md) | High |
| **ChangeCLIP / ChangeBind** | 2023-2024 | Change Detection / VQA | LEVIR-CD, CDVQA | Vision-language bi-temporal change modeling | State-of-the-art change reasoning | [Link](Change-Detection/README.md) | High |

---

## 📝 Standard Paper Review Template

When reviewing a research paper, create a markdown file within the relevant subcategory using this template:

```markdown
# Paper Title

## Authors
- [Author 1, Author 2, ...]

## Year
- [Year]

## Publication / Venue
- [e.g., IEEE TGRS, CVPR, arXiv]

## Paper Link
- [arXiv / DOI link]

## Code Repository
- [Official GitHub Repository Link]

## Dataset
- [Datasets used for training and evaluation]

## Problem Addressed
- [Clear statement of the scientific/engineering challenge]

## Proposed Method
- [High-level overview of the novel contribution]

## Architecture
- [Detailed explanation of model backbone, encoders, fusion modules, and heads]

## Key Techniques
- [e.g., Cross-attention, contrastive learning, adapter tuning, masked modeling]

## Results
- [Quantitative benchmark results reported in the paper (do not fabricate)]

## Advantages
- [Key technical strengths and novelties]

## Limitations
- [Failure cases, computational overhead, data dependencies]

## Relevance to SatQuery AI
- [Direct applicability to PS 26167 functional requirements]

## Team Notes
- [Actionable takeaways, integration feasibility, or adaptation ideas]
```

---

## 📂 Subdirectories

- [`Remote-Sensing-VLM/`](Remote-Sensing-VLM/README.md) – Specialized Vision-Language Models tuned on satellite/aerial domains.
- [`Vision-Language-Models/`](Vision-Language-Models/README.md) – Foundational general-domain VLMs (LLaVA, CLIP, BLIP-2, Qwen-VL, Florence-2).
- [`Remote-Sensing-VQA/`](Remote-Sensing-VQA/README.md) – Visual Question Answering frameworks for Earth Observation.
- [`Image-Captioning/`](Image-Captioning/README.md) – Remote sensing scene description and caption generation models.
- [`Visual-Grounding/`](Visual-Grounding/README.md) – Text-guided object localization, bounding box detection, and segmentation.
- [`Change-Detection/`](Change-Detection/README.md) – Bi-temporal change detection, change captioning, and change VQA.
- [`Optical-SAR-Fusion/`](Optical-SAR-Fusion/README.md) – Cross-modal fusion of optical and Synthetic Aperture Radar imagery.
- [`Multimodal-Remote-Sensing/`](Multimodal-Remote-Sensing/README.md) – Multi-sensor, hyperspectral, and multi-temporal remote sensing literature.
