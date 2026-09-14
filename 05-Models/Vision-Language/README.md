# Vision-Language Foundation Models

## 📌 Purpose
This directory organizes foundational Vision-Language Models (VLMs) evaluated for the reasoning core and visual conversational understanding in SatQuery AI.

---

## 🎯 What Belongs Here
- Open-weights multimodal LLMs (e.g., GeoChat, EarthGPT, Qwen2-VL, Florence-2, PaliGemma, LLaVA-1.5/NeXT).
- Comparative evaluations on instruction-following, parameter efficiency (LoRA/QLoRA), inference speed, and domain adaptation capabilities.

---

## 📊 Models Index

| Model | Parameters | RS Domain Fine-tuned | Grounding Support | License | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GeoChat** | 7B | Yes (High-res aerial) | Yes (Bounding Boxes) | Research / Open | Primary RS VLM candidate |
| **Florence-2** | 0.23B / 0.77B | General (Adaptable) | Yes (Coordinates) | MIT | Primary lightweight candidate |
| **Qwen2-VL** | 2B / 7B | General (High OCR/RS capability) | Yes (Dynamic resolution) | Apache-2.0 | Multimodal reasoning candidate |
| **EarthGPT** | 7B / 13B | Yes (Multi-sensor EO) | Yes (Multi-task) | Academic | Under evaluation |
