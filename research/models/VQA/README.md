# VQA Models for Remote Sensing

## 📌 Purpose
This directory tracks deep learning models specialized for Visual Question Answering (VQA) on satellite and aerial imagery.

---

## 🎯 What Belongs Here
- Model reviews, weight links, input/output schemas, and benchmark accuracy for RS-VQA models.
- Comparison of discriminative classification-based VQA vs generative autoregressive VLM architectures.

---

## 📊 Models Index

| Model | Architecture | Backbone | Task | RS Native | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **RSVQA Base** | ResNet + RNN/LSTM | ResNet-152 | Classification VQA | Yes | Documented |
| **EarthVQA Model** | ViT + Transformer Decoder | ViT-Base | Generative VQA | Yes | To be researched |
| **GeoChat (VQA Mode)** | LLaVA-style RS VLM | CLIP ViT-L/14 + Vicuna-7B | Open-ended RS VQA | Yes | Recommended for evaluation |
