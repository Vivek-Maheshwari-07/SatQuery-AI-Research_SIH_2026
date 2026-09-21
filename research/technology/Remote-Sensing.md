# Remote Sensing Fundamentals

## 📖 Definition
Remote Sensing is the science and art of acquiring information about the Earth's surface, atmosphere, and oceans from a distance, typically via sensors mounted on satellite, airborne (aircraft/drones), or spaceborne platforms measuring reflected or emitted electromagnetic radiation.

---

## 🌟 Why It Matters
Earth Observation (EO) remote sensing enables continuous, systematic monitoring of global terrestrial and marine environments. It provides crucial data for climate change tracking, disaster mitigation, agricultural monitoring, urban planning, defense surveillance, and natural resource management.

---

## 🔑 Important Concepts

1. **Resolution Types**:
   - **Spatial Resolution**: Ground Sampling Distance (GSD) representing the physical area covered by a single pixel (e.g., 0.3m for WorldView-3, 10m for Sentinel-2, 30m for Landsat-8/9).
   - **Spectral Resolution**: Number and width of electromagnetic wavelength bands captured (panchromatic, multispectral, hyperspectral).
   - **Temporal Resolution**: Revisit time of the satellite platform over the same geographic location.
   - **Radiometric Resolution**: Bit depth representing sensor sensitivity to subtle differences in reflected energy (e.g., 8-bit, 12-bit, 16-bit).

2. **Viewing Geometry & Perspective**:
   - Nadir (orthogonal overhead) vs off-nadir viewing angles.
   - Geometric distortions (terrain displacement, shadow projection, foreshortening).

---

## 🛠️ Common Techniques
- Atmospheric correction (converting Top-of-Atmosphere / TOA to Surface Reflectance / BOA).
- Orthorectification and radiometric calibration.
- Multi-temporal co-registration and spatial resampling.
- Spatial tiling / chip windowing for processing massive gigapixel rasters.

---

## 🤖 Relevant Models & Tools
- **Libraries**: `GDAL`, `rasterio`, `shapely`, `pyproj`, `geopandas`, `xarray`, `TorchGeo`.
- **Sensors**: Sentinel-2 (ESA), Landsat-8/9 (USGS/NASA), Resourcesat-2/2A (ISRO), Cartosat-2/3 (ISRO), PlanetScope.

---

## 🎯 Relevance to SatQuery AI
SatQuery AI must accommodate diverse spatial resolutions, overhead viewpoints, dense object packing (e.g., ships, storage tanks), and orthorectified multi-band geospatial data structures.

---

## 📚 References
- Lillesand, T., Kiefer, R. W., & Chipman, J. *Remote Sensing and Image Interpretation*, Wiley.
- NASA Applied Remote Sensing Training Program (ARSET) documentation.
- ISRO / NRSC Earth Observation handbook and Bhuvan data portal specifications.
