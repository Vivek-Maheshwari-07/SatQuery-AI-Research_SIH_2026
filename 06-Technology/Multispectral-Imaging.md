# Multispectral Imaging

## 📖 Definition
Multispectral imaging captures optical electromagnetic radiation across a discrete number of spectral bands (typically between 3 to 15 bands) ranging from visible light (Blue, Green, Red) to Near-Infrared (NIR), Red-Edge, and Short-Wave Infrared (SWIR).

---

## 🌟 Why It Matters
While standard RGB imagery is restricted to human vision wavelengths (400–700 nm), multispectral sensors capture critical biochemical and physical signatures invisible to the naked eye. Healthy vegetation strongly reflects NIR, water absorbs NIR, and minerals have distinct SWIR absorptions.

---

## 🔑 Important Concepts

1. **Common Spectral Bands (e.g., Sentinel-2 / Landsat-8)**:
   - **Coastal Aerosol / Deep Blue** (B1): Atmospheric scattering, coastal bathymetry.
   - **Visible (B2-Blue, B3-Green, B4-Red)**: True color imagery.
   - **Red-Edge (B5, B6, B7, B8A)**: Chlorophyll content, vegetation stress, crop phenology.
   - **Near-Infrared (NIR - B8)**: Biomass vigor, cellular leaf structure, surface water boundaries.
   - **Short-Wave Infrared (SWIR-1 B11, SWIR-2 B12)**: Moisture content, burn scars, soil composition, cloud-vs-snow discrimination.

2. **Spectral Indices**:
   - **NDVI (Normalized Difference Vegetation Index)**:
     $$\text{NDVI} = \frac{\text{NIR} - \text{Red}}{\text{NIR} + \text{Red}}$$
   - **NDWI (Normalized Difference Water Index)**:
     $$\text{NDWI} = \frac{\text{Green} - \text{NIR}}{\text{Green} + \text{NIR}}$$
   - **NBR (Normalized Burn Ratio)**:
     $$\text{NBR} = \frac{\text{NIR} - \text{SWIR}}{\text{NIR} + \text{SWIR}}$$
   - **NDBI (Normalized Difference Built-up Index)**:
     $$\text{NDBI} = \frac{\text{SWIR} - \text{NIR}}{\text{SWIR} + \text{NIR}}$$

---

## 🛠️ Common Techniques
- False Color Composites (FCC): e.g., Standard NIR False Color ($R = \text{NIR}, G = \text{Red}, B = \text{Green}$).
- Spectral unmixing and band ratio analysis.
- Multispectral pan-sharpening (fusing high-resolution panchromatic band with lower-resolution multispectral bands).

---

## 🤖 Relevant Models & Tools
- **Tools**: `rasterio`, `rioxarray`, `spectral`, `scikit-image`, `GDAL`.
- **Pretrained Encoders**: `SatMAE`, `Prithvi`, `Clay`, `DOFA`.

---

## 🎯 Relevance to SatQuery AI
SatQuery AI requires the capacity to calculate spectral indices on-demand (e.g., via agentic tool execution) to answer questions about vegetation health, drought, water body dynamics, and burn scars.

---

## 📚 References
- Jensen, J. R. *Remote Sensing of the Environment: An Earth Resource Perspective*, Pearson.
- ESA Sentinel-2 MSI Scientific User Guide.
