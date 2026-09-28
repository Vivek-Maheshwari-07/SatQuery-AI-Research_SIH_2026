# Backend Data Contract: SatQuery AI API

> **PROPOSED - must be confirmed with the backend team**

This document establishes the formal client-server communication contract between the SatQuery AI React frontend and the backend analysis orchestration pipeline.

---

## 1. Analysis Request & Response (POST /analyze)

- **Endpoint**: `POST /analyze`
- **Content-Type**: `multipart/form-data`

### Request Form Fields

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `query` | `string` | Yes | Natural language query, question, or referring instruction |
| `input_configuration` | `string` | Yes | Sensor/temporal layout: `"single"` \| `"bitemporal"` \| `"optical_sar"` |
| `images` | `File` \| `File[]` | Yes | One or two binary image rasters (GeoTIFF, PNG, JPEG) |
| `image_roles` | `string` (JSON array) | Yes | JSON string array of roles corresponding to `images` in exact order, e.g. `["single"]`, `["before", "after"]`, or `["optical", "sar"]` |

### Response Schema (JSON)

```json
{
  "session_id": "string",
  "status": "success" | "error",
  "error": null | {
    "message": "string",
    "code": "string"
  },
  "intent": "vqa" | "grounding" | "change_analysis" | "segmentation" | "detection" | "fusion" | "captioning" | "measurement",
  "result": {
    // Intent-specific fields matching frontend result component contracts
  },
  "confidence": 0.94,
  "confidence_note": "Optional disclaimer or sensor certainty note",
  "evidence": [
    {
      "type": "bounding_box" | "mask" | "change_region" | "detection" | "metadata" | "model_output",
      "label": "string",
      "detail": "string"
    }
  ],
  "measurements": [
    {
      "label": "string",
      "value": "string" | 0,
      "unit": "string",
      "description": "string"
    }
  ],
  "previews": [
    {
      "role": "single" | "before" | "after" | "optical" | "sar",
      "url": "https://... or data:image/png;base64,..."
    }
  ],
  "execution_trace": [
    {
      "layer": "string",
      "name": "string",
      "status": "success" | "error" | "pending" | "skipped",
      "detail": "string"
    }
  ]
}
```

---

## 2. System Health Check (GET /health)

- **Endpoint**: `GET /health`
- **Response**:
```json
{
  "status": "ok" | "degraded" | "down",
  "models": [
    {
      "name": "VQA Engine (InternVL-2)",
      "status": "ready" | "unavailable"
    },
    {
      "name": "Grounding & Detection (Grounding DINO)",
      "status": "ready" | "unavailable"
    },
    {
      "name": "Semantic Segmentation (SAM-Geo)",
      "status": "ready" | "unavailable"
    },
    {
      "name": "Change Detection (ChangeFormer)",
      "status": "ready" | "unavailable"
    },
    {
      "name": "Optical-SAR Fusion (Cross-Attention)",
      "status": "ready" | "unavailable"
    }
  ]
}
```

---

## 3. Analysis History (GET /history)

- **Endpoint**: `GET /history`
- **Response**:
```json
{
  "items": [
    {
      "session_id": "sess_8943",
      "query": "Identify all aircraft parked on the terminal apron",
      "intent": "detection",
      "input_configuration": "single",
      "created_at": "2026-09-28T16:30:00Z",
      "status": "success" | "error"
    }
  ]
}
```

---

## 4. Retrieve Analysis by ID (GET /analysis/{session_id})

- **Endpoint**: `GET /analysis/{session_id}`
- **Response**: Exactly identical JSON response shape as `POST /analyze`.
