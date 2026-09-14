# Contributing to SatQuery AI Research

Thank you for contributing to the **SatQuery AI Research Knowledge Base**. This repository serves as the central source of truth for problem statement analysis, literature review, model benchmarking, architecture design, and technical decisions for our Smart India Hackathon 2026 project.

---

## 📌 Core Principles

1. **Repository Scope**:
   - This repository is **strictly for research, documentation, benchmarks, concepts, and architectural design**.
   - **Do NOT** commit application implementation code (frontend, backend, microservices, pipeline scripts). Application development belongs in the dedicated product/code repository.

2. **Factual Integrity**:
   - Keep all research strictly factual and evidence-based.
   - **Do NOT fabricate** model performance figures, benchmark metrics, dataset statistics, paper results, or URLs.
   - If a metric or source is not verified yet, clearly mark it as `To be researched` or `Source required`.
   - Clearly differentiate between **verified facts**, **reported benchmarks**, and **team working hypotheses / assumptions**.

3. **Source Citation**:
   - Always link to official sources (arXiv papers, IEEE/CVF proceedings, official GitHub repositories, ISRO/SAC portals, Hugging Face models, Zenodo/IEEE Dataport datasets).

---

## 📁 Directory Structure & Organization

When adding research, ensure it is placed in the appropriate directory:

| Directory | Purpose |
| :--- | :--- |
| `01-Problem-Statement/` | Official ISRO PS 26167 details, requirements, scope, sample queries |
| `02-SIH-Guidelines/` | Hackathon rules, submission milestones, rubrics, judging criteria |
| `03-Datasets/` | Remote sensing dataset documentation, metadata, splits, and access links |
| `04-Research-Papers/` | Academic paper summaries, analysis, and literature reviews |
| `05-Models/` | Model architecture analyses, weights specifications, and inference feasibility |
| `06-Technology/` | Foundational concepts (SAR, multispectral, GeoTIFF, VLMs, agentic AI) |
| `07-System-Design/` | High-level system architecture, agentic orchestration, data pipelines |
| `08-Evaluation/` | Benchmarks, evaluation metrics, test cases, and validation strategies |
| `09-Implementation-Research/` | Feasibility studies for tech stacks, frameworks, geospatial engines |
| `10-Team-Research/` | Team notes, meeting minutes, architecture decision records (ADRs), ideas |
| `References/` | Curated lists of official links, papers, datasets, tools, and libraries |

---

## 📝 Document Formatting & Templates

- Follow the standard templates provided in the respective directory READMEs:
  - Dataset documentation template: [`03-Datasets/README.md`](03-Datasets/README.md)
  - Paper review template: [`04-Research-Papers/README.md`](04-Research-Papers/README.md)
  - Model analysis template: [`05-Models/README.md`](05-Models/README.md)
- Use standard GitHub Flavored Markdown (GFM).
- Use clear headings (`#`, `##`, `###`), structured lists, and markdown tables.
- Use relative Markdown links when referencing files within this repository.

---

## 🚫 What NOT to Commit

- ❌ **No Secrets or Credentials**: Never commit `.env` files, API keys, tokens, or cloud credentials.
- ❌ **No Large Datasets**: Do not commit raw raster files (`.tif`, `.tiff`, `.h5`, `.nc`), compressed archives (`.zip`, `.tar.gz`), or large image folders. Document download links and storage paths instead.
- ❌ **No Model Checkpoints**: Do not commit model weights (`.pt`, `.pth`, `.bin`, `.safetensors`, `.onnx`). Document Hugging Face or Zenodo repository links.
- ❌ **No Application Implementation Code**: Keep scripts or prototype code in scratch folders or dedicated implementation repos.

---

## 🔄 Workflow for Adding Research

1. **Check Existing Documentation**: Avoid duplicate reviews by checking existing README tables.
2. **Create / Edit Documents**:
   - Use meaningful file naming conventions (e.g., `Paper-Title-Year.md`, `Model-Name.md`).
   - Fill all template sections thoroughly.
3. **Update Index Tables**:
   - Whenever you add a new paper, model, or dataset note, update the summary table in the respective directory's `README.md`.
4. **Review & Merge**:
   - Ensure markdown links render correctly.
   - Verify all links and citations.
