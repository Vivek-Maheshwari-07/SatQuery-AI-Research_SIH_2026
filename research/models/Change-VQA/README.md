# Change-VQA Models

## 📌 Purpose
This directory tracks multimodal models capable of reasoning over bi-temporal image pairs to answer conversational questions about temporal transformations.

---

## 🎯 What Belongs Here
- Architectures that combine dual-image encoders with language decoders for temporal reasoning.
- Multimodal conversational models benchmarked on CDVQA and multi-period satellite streams.

---

## 📊 Models Index

| Model | Dual Image Encoder | LLM / Text Backbone | Supported Questions | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Change-VQA Baseline** | Dual ResNet / ViT | Cross-Attention + GRU/Transformer | Change presence, count, type | To be researched |
| **Bi-Temporal VLM Adapter** | Frozen VLM Backbone | Temporal Difference Adapter | Open-ended temporal reasoning | Under investigation |
