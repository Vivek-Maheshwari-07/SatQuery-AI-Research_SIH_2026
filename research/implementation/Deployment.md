# Deployment & Infrastructure Research

This document reviews containerization, GPU hardware allocation, local edge setups, and cloud hosting architectures for SatQuery AI.

---

## 🐳 Containerization Strategy

- **Base Image**: `nvidia/cuda:12.2.0-runtime-ubuntu22.04`
- **Geospatial Dependencies**: GDAL, PROJ, GEOS system binaries installed prior to Python virtualenv setup.
- **Docker Compose Setup**:
  - `satquery-frontend`: Lightweight NGINX web server serving static frontend assets.
  - `satquery-backend`: FastAPI application server handling request routing and GIS routines.
  - `satquery-model-worker`: Dedicated GPU worker hosting PyTorch vision backbones and VLM runtimes.
  - `satquery-redis`: In-memory cache for tile cache and task queue states.

---

## 💻 Hardware Requirements & GPU Profiles

| Deployment Profile | Target Hardware | Model Configuration | Intended Environment |
| :--- | :--- | :--- | :--- |
| **Minimum / Hackathon Demo** | Single NVIDIA GPU (8 GB - 12 GB VRAM e.g. RTX 3060 / 4060) | Florence-2 (0.7B) + Grounding DINO + ChangeFormer (FP16/INT8) | Local Developer Laptop |
| **Standard Server** | 1x NVIDIA RTX 4090 / A5000 (24 GB VRAM) | GeoChat (7B AWQ) + Full Specialist Ensemble | Hackathon Presentation Rig |
| **Enterprise / Cloud** | Multi-GPU (e.g. 2x NVIDIA A100 / H100) | Full precision RS-VLMs + Concurrent multi-user tile streaming | Cloud Production Cluster |
