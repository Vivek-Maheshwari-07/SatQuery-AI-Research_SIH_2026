# Backend Architecture Research

This document reviews server-side frameworks, asynchronous concurrency models, streaming communication protocols, and task queues for SatQuery AI.

---

## ⚡ Framework Evaluation

| Framework | Language | Concurrency / Async | Geospatial Ecosystem | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **FastAPI** | Python | Native AsyncIO / ASGI | Direct integration with `rasterio`, `shapely`, `torch` | ⭐ **Top Recommendation** |
| **Django + Ninja** | Python | Async support | GeoDjango built-in ORM | Heavyweight |
| **Go / Gin** | Go | Goroutines (high throughput) | Requires CGo bindings for GDAL | Less seamless with PyTorch models |

---

## 📡 Communication Protocols

1. **Server-Sent Events (SSE)**:
   - Unidirectional streaming from server to client.
   - Ideal for streaming agent thoughts, intermediate tool steps, and progressive text tokens.

2. **WebSockets**:
   - Full-duplex bidirectional communication; useful for collaborative multi-user map sessions.

3. **RESTful Endpoints**:
   - Standard multipart file upload endpoints for GeoTIFFs and static asset retrieval.

---

## 🗄️ Caching & Background Task Execution
- **Redis**: Caching frequently computed raster tiles, spectral indices, and embedding vectors.
- **Celery / ARQ**: Handling long-running tasks (e.g. processing a 10,000x10,000 pixel GeoTIFF mosaic) asynchronously without blocking HTTP requests.
