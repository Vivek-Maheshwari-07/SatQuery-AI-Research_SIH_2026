# Model Serving & Integration Research

This document reviews inference engines, quantization techniques, and GPU memory optimization strategies for serving remote sensing VLMs and specialist vision backbones.

---

## 🚀 Model Serving Engines

| Serving Engine | Primary Advantage | Supported Models | Trade-offs |
| :--- | :--- | :--- | :--- |
| **vLLM** | PagedAttention, high throughput, continuous batching. | LLaVA, Qwen2-VL, Mistral, LLaMA | Best for autoregressive VLMs |
| **Ollama** | Ultra-lightweight local deployment, simple API. | LLaVA, Qwen-VL, LLaMA-3 | Minimal configuration, moderate throughput |
| **Hugging Face Transformers / Accelerate** | Maximum flexibility, native PyTorch execution. | Any custom PyTorch architecture (GeoChat, CROMA) | Requires manual batching & memory tuning |
| **ONNX Runtime / TensorRT** | Optimized FP16/INT8 graph execution for vision encoders. | Grounding DINO, ChangeFormer, SAM | High inference speed for specialist vision heads |

---

## 💾 Quantization & Memory Strategies

- **AWQ / GPTQ (4-bit)**: Reduces 7B parameter models from ~14GB VRAM to ~4.5GB VRAM with negligible degradation.
- **BitsAndBytes (8-bit / 4-bit NF4)**: Zero-effort loading of large VLM backbones on consumer GPUs (e.g. RTX 3060 / 4070 / T4).
- **Model Partitioning**:
  - Keep lightweight vision backbones (Grounding DINO, Florence-2) in GPU memory.
  - Offload heavy LLM controller weights to quantized runtime.
