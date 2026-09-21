# Visual Grounding Models

## 📌 Purpose
This directory organizes models capable of localizing user-described objects and features into bounding boxes or pixel masks.

---

## 🎯 What Belongs Here
- Open-vocabulary object detectors (Grounding DINO, GLIP, YOLO-World).
- Remote sensing referring expression models (GeoChat Grounding, RS-Grounding).
- Promptable segmentation models (Segment Anything Model - SAM, MobileSAM, GeoSAM).

---

## 📊 Models Index

| Model | Architecture | Modality | Output Type | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Grounding DINO** | Swin Transformer + Text Transformer | RGB | Bounding Boxes $[x_{min}, y_{min}, x_{max}, y_{max}]$ | Baseline candidate |
| **SAM / GeoSAM** | ViT-H/L/B Mask Decoder | RGB / Geospatial | Pixel Segmentation Masks | Specialist tool candidate |
| **Florence-2 Grounding** | Unified DaViT + Transformer | RGB | Phrase Grounding BBoxes | Lightweight candidate |
