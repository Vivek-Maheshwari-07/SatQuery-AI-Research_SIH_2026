# RSVQA Dataset

## Official Source
- Portal / Repository: https://rsvqa.sylvainlobry.com/
- Hosting Authors: Sylvain Lobry, Devis Tuia et al. (University of Wageningen / EPFL)

## Paper
- "RSVQA: Visual Question Answering for Remote Sensing Data" (IEEE TGRS, 2020)

## Purpose
The foundational benchmark that established Visual Question Answering (VQA) specifically for Earth Observation and Remote Sensing imagery.

## Modalities
- **Optical**: RGB and multispectral aerial & satellite imagery.

## Image Type
- Low Resolution (LR): Sentinel-2 imagery (10m GSD, 256x256 pixels).
- High Resolution (HR): Aerial orthophotos (0.15m GSD, 512x512 pixels).
- Format: GeoTIFF / PNG.

## Resolution
- RSVQA-LR: 10m Ground Sampling Distance (Sentinel-2).
- RSVQA-HR: 0.15m Ground Sampling Distance (Aerial).

## Annotations
- OpenStreetMap (OSM) aligned geographic ground truth annotations.

## Text Annotations
- Automatically and semi-automatically generated Question-Answer pairs categorized into:
  - **Presence** (*"Is there a building?"*)
  - **Count** (*"How many residential buildings are there?"*)
  - **Comparison** (*"Are there more trees than buildings?"*)
  - **Rural / Urban Classification**

## Dataset Size
- RSVQA-LR: 772 images, ~77,200 QA pairs.
- RSVQA-HR: 10,659 images, >1,000,000 QA pairs across HR1 and HR2 splits.

## Train / Validation / Test Split
- Pre-defined geographic splits ensuring zero spatial overlap between training and testing tiles.

## License
- Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0).

## Download
- Official download page: https://rsvqa.sylvainlobry.com/

## Evaluation Usage
- VQA classification accuracy: Overall Accuracy (OA), Average Accuracy (AA), and per-question-type accuracy.

## Relevance to SatQuery AI
- Directly maps to **Requirement 1 (Single-Image Remote Sensing VQA)**.

## Notes
- Gold standard baseline for remote sensing VQA benchmarking.
