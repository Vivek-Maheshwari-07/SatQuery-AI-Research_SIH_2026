# Vision-Language Models (VLMs)

## 📖 Definition
Vision-Language Models (VLMs) are multimodal deep learning architectures that integrate computer vision encoders with natural language processing models (typically Large Language Models) to understand, reason over, and generate descriptions or answers about visual inputs through conversational text prompts.

---

## 🌟 Why It Matters
Traditional computer vision models are locked to predefined, closed-set label classes. VLMs enable zero-shot, open-vocabulary understanding and complex contextual reasoning, unlocking conversational interaction with Earth observation data.

---

## 🔑 Important Concepts

1. **Architecture Paradigms**:
   - **Dual-Encoder (Contrastive)**: Separate image encoder and text encoder mapped into a shared embedding space (e.g., CLIP, RemoteCLIP).
   - **Encoder-Decoder with Projection Adapter**: Vision Transformer (ViT) encoder connected to an autoregressive LLM decoder via cross-attention or MLP projection (e.g., LLaVA, GeoChat, Qwen-VL).
   - **Unified Sequence-to-Sequence**: Single unified autoregressive transformer tokenizing both image patches and text sequences (e.g., Florence-2, PaliGemma).

2. **Visual Tokenization**:
   - Patch extraction (e.g., $14 \times 14$ pixel patches in ViT).
   - High-resolution handling via dynamic spatial splitting or multi-scale grid pooling.

3. **Instruction Tuning**:
   - Fine-tuning pretrained models on $(Image, Prompt, Target Response)$ instruction datasets to align the model with complex conversational tasks.

---

## 🛠️ Common Techniques
- LoRA / QLoRA parameter-efficient fine-tuning on remote sensing instruction pairs.
- Prompt engineering with system instructions enforcing structured JSON output for coordinates and confidence.
- Chain-of-thought (CoT) prompting for multi-step geospatial reasoning.

---

## 🤖 Relevant Models & Tools
- **RS-Specific VLMs**: GeoChat, EarthGPT, RSGPT, SkyEyeGPT.
- **Foundation VLMs**: Florence-2, Qwen2-VL, LLaVA-1.5/NeXT, PaliGemma.
- **Frameworks**: Hugging Face `transformers`, `vLLM`, `Ollama`, `DeepSpeed`.

---

## 🎯 Relevance to SatQuery AI
Forms the conversational and reasoning backbone of SatQuery AI for interpreting user queries, generating descriptive captions, answering questions, and coordinating downstream specialist tools.

---

## 📚 References
- Radford, A., et al. (2021). *"Learning Transferable Visual Models From Natural Language Supervision"*, ICML.
- Liu, H., et al. (2023). *"Visual Instruction Tuning (LLaVA)"*, NeurIPS.
- Khattak, M. U., et al. (2024). *"GeoChat: Grounded Large Vision-Language Model for Remote Sensing"*, CVPR.
