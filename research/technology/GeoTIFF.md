# GeoTIFF & Geospatial Formats

## 📖 Definition
GeoTIFF is a public domain metadata standard that allows georeferencing information (such as map projections, coordinate systems, ellipsoids, and spatial bounds) to be embedded directly within a standard Tagged Image File Format (TIFF) file. Cloud-Optimized GeoTIFF (COG) is an evolution optimized for HTTP range-request streaming.

---

## 🌟 Why It Matters
Standard image formats (PNG, JPEG) only store pixel color values and lose geographic coordinate references. GeoTIFFs ensure that every pixel is bound to real-world latitude/longitude coordinates and metric spatial units, enabling GIS overlay, accurate area calculation, and multi-sensor alignment.

---

## 🔑 Important Concepts

1. **Georeferencing Metadata**:
   - **Affine Transform**: Maps pixel grid indices $(row, col)$ to geographic/projected coordinates $(x, y)$:
     $$x = a \cdot col + b \cdot row + c$$
     $$y = d \cdot col + e \cdot row + f$$
   - **Coordinate Reference Systems (CRS)**:
     - Geographic CRS: Lat/Long (e.g., WGS 84 / EPSG:4326).
     - Projected CRS: Metric units (e.g., UTM Zones / EPSG:32643).
   - **NoData Values**: Specific numerical marker (e.g., -9999 or 0) indicating missing or invalid sensor readings.

2. **Cloud Optimized GeoTIFF (COG)**:
   - Internal tiling (e.g., 256x256 or 512x512 tile blocks).
   - Built-in downsampled overview pyramids for rapid multi-scale zooming without reading the full file.

---

## 🛠️ Common Techniques
- **Reprojection / Warping**: Transforming rasters between different CRS.
- **Windowed Reading**: Streaming only the requested Region of Interest (ROI) bounding box.
- **VRT (Virtual Raster Format)**: Combining multiple raster files into a single virtual dataset without data duplication.

---

## 🤖 Relevant Models & Tools
- **Python Libraries**: `rasterio`, `GDAL`, `rioxarray`, `geopandas`, `shapely`, `fiona`.
- **GIS Software**: QGIS, ArcGIS, Google Earth Engine.

---

## 🎯 Relevance to SatQuery AI
SatQuery AI must ingest GeoTIFF files, extract spatial bounding coordinates for evidence grounding, calculate real-world physical areas (e.g., square kilometers of deforestation or flood inundation), and export geotagged overlays.

---

## 📚 References
- Open Geospatial Consortium (OGC) GeoTIFF Standard Specification.
- Cloud Optimized GeoTIFF (COG) Implementation Guide (cogeo.org).
- Rasterio Documentation (rasterio.readthedocs.io).
