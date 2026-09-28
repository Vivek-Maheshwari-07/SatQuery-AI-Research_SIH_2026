# Backend Data Contract: Analysis API (POST /analyze)

> **PROPOSED - must be confirmed with the backend team**

This document establishes the formal client-server communication contract between the SatQuery AI React frontend and the FastAPI/Python analysis orchestration pipeline.

---

## 1. Request Specification

- **Endpoint**: `POST /analyze`
- **Content-Type**: `multipart/form-data`

### Form Fields

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `query` | `string` | Yes | Natural language query, question, or referring instruction |
| `input_configuration` | `string` | Yes | Sensor/temporal layout: `"single"` \| `"bitemporal"` \| `"optical_sar"` |
| `images` | `File` \| `File[]` | Yes | One or two binary image rasters (GeoTIFF, PNG, JPEG) |
| `image_roles` | `string` (JSON array) | Yes | JSON string array of roles corresponding to `images` in exact order, e.g. `["single"]`, `["before", "after"]`, or `["optical", "sar"]` |

---

## 2. Response Specification

- **Status Code**: `200 OK` (success or application-level error payload), `4xx/5xx` on network/server errors
- **Content-Type**: `application/json`

### Schema

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

### Intent Result Payloads

1. **`vqa`**: `{ "question": "string", "answer": "string" }`
2. **`captioning`**: `{ "caption": "string" }`
3. **`grounding`**: `{ "query": "string", "boxes": [{ "x1": 0, "y1": 0, "x2": 1, "y2": 1, "label": "string", "confidence": 0.95 }] }`
4. **`detection`**: `{ "detections": [{ "x1": 0, "y1": 0, "x2": 1, "y2": 1, "label": "string", "confidence": 0.9 }], "total": 12 }`
5. **`segmentation`**: `{ "mask": "base64/url", "classes": [{ "name": "Water", "color": "#0284C7", "percentage": 45 }], "statistics": { ... } }`
6. **`change_analysis`**: `{ "changeMask": "base64/url", "description": "string", "changeRegions": [ ... ] }`
7. **`fusion`**: `{ "fusedResult": "string", "optical": { "label": "Sentinel-2" }, "sar": { "label": "Sentinel-1" } }`
8. **`measurement`**: `{ "measurements": [{ "label": "Runway Length", "value": 3200, "unit": "m" }] }`
