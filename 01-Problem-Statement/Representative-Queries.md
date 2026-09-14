# Representative Remote Sensing Queries

This document categorizes sample queries that represent the target operational scenarios for SatQuery AI.

---

## 🗂️ 1. Single-Image VQA Queries

| Category | Example Query | Expected Output Format |
| :--- | :--- | :--- |
| **Object Presence** | *"Is there an operational solar power plant in this region?"* | Boolean answer + Confidence + Visual Grounding Overlay |
| **Counting** | *"How many aircraft are parked on the tarmac?"* | Exact count integer + Individual Bounding Boxes + Confidence |
| **LULC Identification** | *"What is the dominant land cover class in the southern quadrant?"* | Class name (e.g., Dense Forest / Urban Residential) + Area % |
| **Spatial Relations** | *"Is the residential cluster situated adjacent to the riverbank?"* | Textual explanation + Highlighted spatial relation map |

---

## 🗺️ 2. Visual Grounding & Captioning Queries

| Category | Example Query | Expected Output Format |
| :--- | :--- | :--- |
| **Target Grounding** | *"Locate all oil storage tanks with floating roofs."* | Set of Bounding Boxes $[x_{min}, y_{min}, x_{max}, y_{max}]$ + Count |
| **Feature Localization**| *"Highlight the agricultural fields undergoing irrigation."* | Segmentation mask / polygon coordinates |
| **Comprehensive Caption**| *"Describe the overall geography, infrastructure, and activity in this image."* | Multi-sentence structured paragraph describing terrain, infrastructure, and human activity |

---

## ⏳ 3. Bi-Temporal Change Analysis & Change-VQA

| Category | Example Query | Expected Output Format |
| :--- | :--- | :--- |
| **Urban Sprawl** | *"What new buildings or roads were constructed between image T1 and T2?"* | Textual summary + Binary/Classified Change Mask + Area in sq km |
| **Deforestation / Vegetation** | *"How much forest canopy has been lost between the two timestamps?"* | Quantified loss percentage/hectares + Deforestation Heatmap |
| **Disaster Damage Assessment**| *"Identify the flood extent and damaged infrastructure after the monsoon event."* | Inundation Polygon Overlay + Damaged Assets List + Severity Index |

---

## 🛰️ 4. Optical + SAR Cross-Modal Queries

| Category | Example Query | Expected Output Format |
| :--- | :--- | :--- |
| **Cloud-Penetrating Analysis** | *"The optical image is 60% cloud-covered. Use the co-registered SAR image to map the coastline and detect anchored vessels."* | SAR-derived vessel detections + Coastline vector overlay + Verification trace |
| **Cross-Sensor Fusion** | *"Analyze the soil moisture and vegetation vigor by combining Sentinel-2 NDVI with Sentinel-1 SAR backscatter."* | Fused multimodal analysis summary + Multi-channel composite visualization |

---

## 🧠 5. Multi-Step & Agentic Tool Queries

| Category | Example Query | Expected Output Format |
| :--- | :--- | :--- |
| **Composite Multi-Step Analysis**| *"Check if there are any illegal mining activities in the protected zone: compare 2023 vs 2024 images, verify vegetation loss, and detect heavy machinery."* | Full agentic execution trace (3 steps) + Change Mask + Object Bounding Boxes + Comprehensive Report |
