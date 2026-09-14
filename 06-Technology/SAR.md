# Synthetic Aperture Radar (SAR)

## 📖 Definition
Synthetic Aperture Radar (SAR) is an active microwave remote sensing imaging technique that emits radar pulses and measures the time delay, amplitude, and phase of the backscattered signal. By synthesizing a large virtual antenna through the platform's motion, SAR achieves high-resolution 2D imaging regardless of day/night conditions or atmospheric weather.

---

## 🌟 Why It Matters
Unlike passive optical sensors that rely on solar illumination and are blocked by clouds, fog, and smoke, SAR operates in microwave frequencies (C-band, L-band, X-band, S-band) that penetrate atmospheric obstructions. SAR provides indispensable 24/7 all-weather intelligence for disaster monitoring (floods, landslides), maritime tracking, and surface deformation mapping.

---

## 🔑 Important Concepts

1. **Radar Frequency Bands**:
   - **X-band** (~3 cm): High resolution, sensitive to surface roughness (e.g., TerraSAR-X, COSMO-SkyMed).
   - **C-band** (~5.6 cm): Balanced penetration and resolution (e.g., Sentinel-1, RISAT-1/1A).
   - **S-band** (~9 cm) & **L-band** (~24 cm): Deep canopy and soil penetration (e.g., NISAR - NASA-ISRO SAR mission).

2. **Polarization Modes**:
   - **Single-pol / Dual-pol**: VV (Vertical transmit, Vertical receive), VH (Vertical transmit, Horizontal receive), HH, HV.
   - **Quad-pol**: Full polarimetric matrix providing detailed scattering mechanisms.

3. **Scattering Mechanisms**:
   - **Specular (Mirror) Reflection**: Smooth surfaces (calm water, paved roads) reflect away from the sensor $\to$ appear dark (low backscatter).
   - **Rough Surface (Diffuse) Scattering**: Bare soil, rough water $\to$ moderate backscatter.
   - **Double-Bounce Scattering**: Perpendicular structures (buildings, ships, metallic structures) $\to$ bright returns (high backscatter).
   - **Volume Scattering**: Vegetation canopies, multi-layered forest foliage $\to$ depolarized return (high in VH/HV).

4. **Speckle Noise**:
   - Inherent granular noise arising from coherent wave interference; requires specialized spatial or multitemporal despeckling filters (Lee, Frost, Kuan filters).

---

## 🛠️ Common Techniques
- Radiometric calibration ($\sigma^0$ Sigma Nought backscatter conversion in dB).
- Terrain correction & Range-Doppler geocoding using Digital Elevation Models (DEM).
- Multi-temporal SAR compositing and RGB false-color dual-pol composition ($R = VV, G = VH, B = VV/VH$).

---

## 🤖 Relevant Models & Tools
- **Libraries / Toolboxes**: `ESA SNAP` (Sentinel Application Platform), `PyRAT`, `Sarsen`, `TorchGeo`.
- **Sensors**: Sentinel-1 (ESA), RISAT-1 / EOS-04 (ISRO), NISAR (NASA-ISRO).

---

## 🎯 Relevance to SatQuery AI
Supports **Mandatory Requirement 4 (Optical + SAR Cross-Modal Analysis)**:
- Enables queries on cloud-covered regions.
- Assists in water body segmentation, flood extent mapping, and metallic vessel detection.

---

## 📚 References
- Moreira, A., et al. (2013). *"A tutorial on synthetic aperture radar"*, IEEE Geoscience and Remote Sensing Magazine.
- ESA Sentinel-1 User Handbook / Technical Guides.
- ISRO Space Applications Centre (SAC) NISAR / RISAT science handbooks.
