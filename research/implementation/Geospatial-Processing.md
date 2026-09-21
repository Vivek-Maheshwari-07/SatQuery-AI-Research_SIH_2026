# Geospatial Processing Engine

This document evaluates high-performance raster processing libraries, tile servers, and spatial indexing engines for SatQuery AI.

---

## 🛠️ Core Geospatial Libraries

| Library | Functionality | Performance Notes |
| :--- | :--- | :--- |
| **Rasterio** | GDAL-based raster I/O, windowed slicing, reprojection, metadata parsing. | Fast C-bindings, industry standard in Python. |
| **Shapely** | Planar geometry manipulation (polygons, intersections, unions, bounding boxes). | C++ GEOS backend; vectorized in Shapely 2.0. |
| **GeoPandas** | Tabular geospatial data manipulation, spatial joins, GeoJSON export. | Built on top of Pandas and Shapely. |
| **PyProj** | Cartographic projections and Coordinate Reference System (CRS) transformations. | PROJ C-library wrapper. |
| **TiTiler** | Dynamic Cloud-Optimized GeoTIFF (COG) web tile server. | Built on FastAPI; dynamically renders slippy map tiles on-the-fly. |

---

## ⚡ Large Raster Windowing & Tiling Strategy

When ingesting massive gigapixel satellite scenes:
1. **Windowed Chunking**: Read $512 \times 512$ pixel chips with $20\%$ overlap (to prevent boundary edge artifacts).
2. **Batch Inference**: Run the vision detector across chips in parallel.
3. **Non-Maximum Suppression (NMS)**: Merge detected bounding boxes across overlapping tile boundaries back into global raster coordinates.
4. **GeoJSON Vectorization**: Convert pixel-space predictions back into geographic coordinates ($WGS84$ / $UTM$) using the raster's affine transformation matrix.
