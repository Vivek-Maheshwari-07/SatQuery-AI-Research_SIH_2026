# 05 - AI & Deep Learning Models

## 📌 Purpose
This directory organizes technical evaluations, architectural analyses, inference requirements, and integration studies for deep learning models evaluated for **SatQuery AI (PS 26167)**.

---

## 🎯 What Belongs Here
- Model documentation covering vision backbones, multimodal VLMs, grounding detectors, change detection networks, and fusion layers.
- Reusable model analysis templates.
- Inference benchmarks (latency, VRAM footprints, batch throughput).

## 🚫 What Does NOT Belong Here
- ❌ **No heavy model weight checkpoints** (`.pt`, `.bin`, `.safetensors`, `.onnx`). Link to Hugging Face or Zenodo weights instead.

---

## 📊 Model Research Tracking

| Model | Task | Modality | Dataset | License | Performance | GitHub | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **GeoChat** | RS VQA & Grounding | Optical RGB | GeoChat-Instruct | Apache-2.0 / Open-Source | High QA accuracy | [Link](Vision-Language/README.md) | RS fine-tuned LLaVA backbone |
| **Florence-2** | Multi-task Vision (Caption/Grounding/OCR) | RGB | FLD-5B pretraining | MIT | SOTA lightweight multi-task | [Link](Vision-Language/README.md) | Highly efficient, prompt-guided |
| **Grounding DINO** | Text-Guided Visual Grounding | RGB | COCO, O365, GoldG | Apache-2.0 | SOTA open-set grounding | [Link](Grounding/README.md) | Fast zero-shot detection |
| **ChangeFormer** | Bi-Temporal Change Detection | Bi-temporal Optical | LEVIR-CD, DSIFN | MIT / Academic | High F1 change segmentation | [Link](Change-Detection/README.md) | Transformer-based siamese head |
| **CROMA** | Optical + SAR Representation | Sentinel-1 & 2 | Large-scale S1/S2 pairs | Open-source | Cross-modal feature alignment | [Link](Optical-SAR/README.md) | Foundation encoder for fusion |

---

## 📝 Standard Model Documentation Template

Use this template when adding detailed model documentation:

```markdown
# Model Name

## Task
- [e.g., Visual Question Answering, Text-Guided Grounding, Change Detection]

## Model Type
- [e.g., Vision-Language Foundation Model, Siamese Transformer, Dual-Encoder]

## Input
- Modality: [Optical RGB, Multispectral bands, SAR VV/VH]
- Formats: [Image Tensor, GeoTIFF array, Text string prompt]
- Expected Resolution: [e.g., 512x512, Native resolution]

## Output
- Output Format: [Text string response, Bounding Box coordinates, Segmentation Mask tensor, Logits]

## Architecture
- Visual Backbone: [e.g., ViT-Large, Swin-B, ResNet50]
- Text / LLM Backbone: [e.g., Vicuna-7B, LLaMA-3-8B, Qwen-2-7B]
- Fusion / Projection: [e.g., Cross-attention, Perceiver Resampler, MLP adapter]

## Training / Fine-tuning
- Pre-training strategy: [Contrastive, Masked Autoencoding, Supervised instruction-tuning]
- Supervised Fine-Tuning (SFT) data: [Datasets used]

## Dataset
- [Benchmark datasets used for training and validation]

## Remote Sensing Compatibility
- [Native RS support vs General-domain requiring domain adaptation]

## Multispectral Support
- [Supports >3 bands natively OR requires 3-band RGB reduction]

## SAR Support
- [Direct dual-pol input OR requires preprocessing/channel mapping]

## Inference Requirements
- GPU Memory (VRAM): [e.g., 8 GB, 16 GB, 24 GB]
- Precision: [FP32, FP16, BF16, INT8/INT4 quantization]
- Latency (approx.): [ms per query]

## License
- [e.g., Apache-2.0, MIT, LLaMA Community License, Non-commercial]

## Official Repository
- [GitHub URL]

## Paper
- [arXiv / Conference link]

## Strengths
- [Key advantages and capabilities]

## Limitations
- [Failure points, compute intensity, resolution constraints]

## Relevance to SatQuery AI
- [Mapping to PS 26167 requirements]

## Integration Difficulty
- [Low / Medium / High - rationale]
```

---

## 📂 Subdirectories

- [`VQA/`](VQA/README.md) – Remote Sensing Question Answering models.
- [`Captioning/`](Captioning/README.md) – Dense scene captioning and description models.
- [`Grounding/`](Grounding/README.md) – Text-guided visual grounding and referring expression models.
- [`Change-Detection/`](Change-Detection/README.md) – Bi-temporal change detection architectures.
- [`Change-VQA/`](Change-VQA/README.md) – Temporal change question answering models.
- [`Optical-SAR/`](Optical-SAR/README.md) – Cross-modal fusion models (Sentinel-1 SAR + Sentinel-2 Optical).
- [`Vision-Language/`](Vision-Language/README.md) – Multimodal foundation models (GeoChat, Florence-2, Qwen-VL, EarthGPT).
