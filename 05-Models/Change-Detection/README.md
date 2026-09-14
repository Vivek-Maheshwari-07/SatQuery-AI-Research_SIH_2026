# Change Detection Models

## 📌 Purpose
This directory tracks deep learning models for bi-temporal remote sensing change detection and segmentation.

---

## 🎯 What Belongs Here
- Siamese CNNs and Siamese Transformers designed for dual-timestamp raster inputs ($T_1, T_2$).
- Binary change detectors, semantic change detectors, and disaster damage quantification networks.

---

## 📊 Models Index

| Model | Type | Backbone | Input Channels | Status |
| :--- | :--- | :--- | :--- | :--- |
| **ChangeFormer** | Siamese Transformer | SegFormer / MiT | $2 \times 3$ (RGB) / Multi-band | To be researched |
| **BIT (Bitemporal Image Transformer)** | Hybrid CNN-Transformer | ResNet-18 + Transformer | $2 \times 3$ (RGB) | To be researched |
| **TinyCD** | Lightweight Siamese Network | Conv-Transformer | $2 \times 3$ (RGB) | Low-latency candidate |
