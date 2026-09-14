# Optical-SAR Cross-Modal Models

## 📌 Purpose
This directory tracks deep learning models capable of joint processing, representation learning, and cross-modal fusion between Optical (multispectral/RGB) and Synthetic Aperture Radar (SAR) imagery.

---

## 🎯 What Belongs Here
- Cross-modal encoders trained on paired Sentinel-1 (SAR) and Sentinel-2 (Optical) data.
- Cloud-penetration models, SAR-to-optical translation networks, and dual-encoder multimodal architectures.

---

## 📊 Models Index

| Model | Optical Input | SAR Input | Fusion Strategy | Official Code / Link | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CROMA** | 12-band Sentinel-2 | Dual-pol Sentinel-1 (VV/VH) | Cross-Attention Foundation Encoder | NeurIPS 2023 | High priority candidate |
| **DOFA** | Multispectral | SAR / Thermal | Dynamic Wavelength Attention | CVPR 2024 | To be researched |
| **DSEN2-SAR** | RGB / NIR | Sentinel-1 VV/VH | Deep Fusion Super-Resolution | IEEE TGRS | To be researched |
