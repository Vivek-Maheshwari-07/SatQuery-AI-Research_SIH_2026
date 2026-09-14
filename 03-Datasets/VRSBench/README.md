# VRSBench Dataset

## Official Source
- Repository: https://github.com/Visual-RS/VRSBench
- Hosting Authors: Wuhan University / Visual-RS Team

## Paper
- "VRSBench: A Versatile Vision-Language Benchmark Dataset for Remote Sensing Image Understanding" (arXiv / CVPR)

## Purpose
A versatile multimodal benchmark designed to evaluate Vision-Language Models (VLMs) on high-resolution remote sensing imagery across multiple tasks: Visual Question Answering (VQA), Visual Grounding (VG), and Image Captioning.

## Modalities
- **Optical**: High-resolution RGB satellite and aerial imagery.

## Image Type
- Sensor: High-resolution aerial and spaceborne optical sensors.
- Format: PNG / JPEG with JSON metadata.

## Resolution
- Ground Sampling Distance (GSD): Very high resolution (sub-meter to 2m).
- Image Dimensions: 512x512 pixels.

## Annotations
- Multi-task annotations:
  1. Object bounding boxes with category tags.
  2. Dense scene captions.
  3. Visual question-answering pairs.
  4. Referring expression grounding bounding boxes.

## Text Annotations
- VQA questions covering presence, count, color, position, comparison.
- Referring expressions for visual grounding.
- Multi-sentence descriptive scene captions.

## Dataset Size
- Images: 29,614 images
- Annotations: Detailed text prompts, bounding boxes, QA pairs, and caption descriptions.

## Train / Validation / Test Split
- Standard benchmark splits provided by the authors for cross-validation and leaderboard evaluation.

## License
- Open-access academic license (refer to official repository).

## Download
- Download instructions and scripts available on official repository: https://github.com/Visual-RS/VRSBench

## Evaluation Usage
- VQA: Accuracy / Open-ended match.
- Visual Grounding: mIoU, Precision@0.5.
- Captioning: BLEU-1 to BLEU-4, METEOR, ROUGE-L, CIDEr.

## Relevance to SatQuery AI
- Directly covers **Requirement 1 (Single-Image VQA)** and **Requirement 2 (Text-Guided Grounding & Scene Captioning)**.

## Notes
- Highly structured benchmark with synchronized multi-task annotations on identical images.
