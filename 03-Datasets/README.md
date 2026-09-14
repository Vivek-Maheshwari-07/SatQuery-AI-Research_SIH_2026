# 03 - Remote Sensing Datasets

## 📌 Purpose
This directory manages documentation, metadata, format specifications, download references, and benchmark splits for multimodal remote sensing datasets relevant to **SatQuery AI (PS 26167)**.

---

## 🎯 What Belongs Here
- Structured documentation of remote sensing datasets covering Optical, SAR, VQA, Captioning, Visual Grounding, and Bi-Temporal Change Detection.
- Reusable dataset templates, format descriptions (GeoTIFF, COCO json, etc.), and benchmark splits.

## 🚫 What Does NOT Belong Here
- ❌ **No raw imagery or large dataset files** (`.tif`, `.zip`, `.tar.gz`, `.h5`). Keep datasets in local storage or external cloud buckets, never in git.

---

## 📊 Dataset Research Tracking

| Dataset | Modality | Task | Images | Annotations | Benchmark | Link |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **BigEarthNet** | Optical (Sentinel-2) & SAR (Sentinel-1) | Multi-label Land Cover Classification | 590,326 pairs | CORINE Land Cover (CLC) labels | BigEarthNet-MM | [`BigEarthNet/`](BigEarthNet/README.md) |
| **VRSBench** | Optical (High-Resolution Aerial/Satellite) | VQA, Visual Grounding, Captioning | 29,614 images | Multi-task bounding boxes, QA pairs, captions | VRSBench Benchmark | [`VRSBench/`](VRSBench/README.md) |
| **RSVQA** | Optical (High & Low Resolution Sentinel-2 / Aerial) | Remote Sensing Visual Question Answering | Multiple subsets (LR/HR) | Yes/No, Counting, Comparison, Rural/Urban | RSVQA Benchmark | [`RSVQA/`](RSVQA/README.md) |
| **CDVQA** | Bi-temporal Optical (Multi-period) | Change Detection Visual Question Answering | Dual-date pairs | Change questions, change descriptions, binary masks | CDVQA Benchmark | [`CDVQA/`](CDVQA/README.md) |

---

## 📝 Reusable Dataset Documentation Template

When adding a new dataset to this directory, use the following standardized template:

```markdown
# Dataset Name

## Official Source
- URL / Portal: [Official Link](URL)
- Hosting Institution / Authors: [Institution Name]

## Paper
- Title: [Paper Title]
- Citation / arXiv: [Paper URL]

## Purpose
[High-level summary of dataset goals and target tasks]

## Modalities
- Optical (RGB / Multispectral bands)
- SAR (Polarizations: VV, VH, HH, HV)
- Elevation / DEM (if applicable)

## Image Type
- Satellite / Airborne sensor: [e.g., Sentinel-2, Landsat, Gaofen, Aerial]
- Format: [e.g., GeoTIFF, PNG, JPEG]

## Resolution
- Ground Sampling Distance (GSD): [e.g., 0.5m, 10m, 20m]
- Patch Size: [e.g., 256x256, 512x512, 1024x1024]

## Annotations
- Type: [Multi-label, Bounding boxes, Segmentation masks, None]
- Categories: [Number of classes and class list]

## Text Annotations
- Text Modality: [VQA pairs, Scene captions, Grounding expressions, Change descriptions]
- Volume: [Number of QA pairs or captions]

## Dataset Size
- Total Images / Patches: [Count]
- Total Disk Size: [GB/TB]

## Train / Validation / Test Split
- Train: [Count / %]
- Validation: [Count / %]
- Test: [Count / %]

## License
- License Type: [e.g., CC BY 4.0, OpenRAIL, Non-commercial]

## Download
- Source Link / Script: [Download Portal / Instructions]

## Evaluation Usage
- Primary evaluation metrics supported: [e.g., Accuracy, mIoU, BLEU-4, CIDEr]

## Relevance to SatQuery AI
- Direct applicability to PS 26167 requirements.

## Notes
- Practical considerations (e.g. cloud masking, coordinate reference systems, pre-processing).
```
