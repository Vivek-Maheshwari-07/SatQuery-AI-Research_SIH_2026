# SatQuery AI — Frontend

SatQuery AI is an enterprise remote sensing and Earth observation (EO) assistant designed for researchers, geospatial analysts, and defense personnel. The platform processes vision-language instructions across optical, SAR (synthetic aperture radar), and bi-temporal satellite datasets, executing Visual Question Answering (VQA), object detection, visual grounding, semantic segmentation, and change detection.

---

## Tech Stack

- **Framework**: React 19 (Vite)
- **Routing**: React Router 7
- **Styling**: Tailwind CSS with custom geospatial "Mission Control" design tokens
- **Typography**: Self-hosted Inter Variable & JetBrains Mono Variable (`@fontsource-variable/*`)
- **Icons**: Lucide React (Lucide icons only, no emojis or manual SVGs)
- **Linter & Code Quality**: Oxlint
- **Build Tool**: Vite

---

## Setup & Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env.local` file in the `Frontend/` root:
```bash
cp .env.example .env.local
```
Set `VITE_API_BASE_URL` to your backend server endpoint (e.g., `http://localhost:5000`).

### 3. Development Server
```bash
npm run dev
```

### 4. Code Quality & Linting
```bash
npm run lint
```

### 5. Production Build
```bash
npm run build
```

### 6. Preview Production Build
```bash
npm run preview
```

---

## Folder Structure

```text
src/
├── app/               # Application configuration, navigation models, providers, routes
├── components/
│   ├── analysis/      # Analysis header, output stack, execution trace, mode selector, confidence
│   ├── dashboard/     # High-level overview cards, health monitor, quick-start actions
│   ├── history/       # Accessible history table and responsive stacked cards
│   ├── imagery/       # Raster dropzone, validation, image preview, metadata tags
│   ├── layout/        # AppShell, Topbar, Sidebar navigation, and PageContainers
│   ├── query/         # Natural language query input, suggestion chips, query summary
│   ├── reports/       # Intelligence report preview, section wrappers, and export actions
│   ├── results/       # Specialized intent result cards (VQA, Caption, Grounding, Change, Fusion, etc.)
│   ├── settings/      # Live API connection tester and supported input configuration cards
│   ├── ui/            # Reusable design primitives (Button, Card, Badge, Modal, Tabs, Select, etc.)
│   └── visualization/ # Interactive image viewer (pan/zoom), coordinate HUD, bounding box, masks
├── context/           # AppContext for active analysis session state
├── hooks/             # Custom hooks (useAnalysis, useHistory, useSystemStatus, useImageUpload, etc.)
├── pages/             # Thin page components composing modular UI features
├── services/          # Pure API clients, endpoint calls, and contract documentation
├── styles/            # Global stylesheet, graticule grid, and media print definitions
└── utils/             # Formatters, schema validators, and result renderers
```

---

## Data Flow Architecture

Data flows strictly unidirectionally through explicit layers:

$$\text{Backend API} \longrightarrow \text{Service Layer} \longrightarrow \text{Adapter} \longrightarrow \text{Custom Hook} \longrightarrow \text{Page Component} \longrightarrow \text{Presentational Props}$$

1. **Backend API**: Emits standard JSON responses adhering to the contract.
2. **Services (`src/services/`)**: Make HTTP requests using `api.js` and return raw backend JSON.
3. **Adapters (`src/services/analysisAdapter.js`)**: Transform backend payloads into stable internal UI models, guaranteeing component decoupling.
4. **Hooks (`src/hooks/`)**: Manage request lifecycle, loading flags, error boundaries, and refresh triggers.
5. **Pages (`src/pages/`)**: Thin orchestrators that bind hooks and pass data down as props.
6. **Components (`src/components/`)**: Pure UI presentation handling loading skeletons, empty states, and error alerts.

---

## Backend Contract

The SatQuery frontend data contracts are documented in [CONTRACT.md](src/services/CONTRACT.md).

> **Note**: The backend schema is currently marked as **PROPOSED** until formally validated and confirmed with the backend research team.

---

## Design System: "Mission Control"

The user interface implements the **Mission Control** theme — clean, white, scientific, and trustworthy.

### 1. Controlled Style Allocation
- **Neo-Brutalism** (1px ink/primary-dark border + brutal shadow; hover: `translate(-1px, -1px)` with shadow; active: `translate(2px, 2px)` with no shadow):
  - Primary Action Button (Analyze)
  - ResultCard container (largest card)
  - MeasurementResult metric tiles
  - Selected AnalysisModeSelector tab
- **Neo-Morphism**:
  - Form Inputs, Textarea, Select (`shadow-inset`)
  - IconButton and ImageViewer floating zoom toolbar (`shadow-raised`)
  - Active Sidebar navigation item
  - Badge status pills (`bg-*-soft` with `text-*-strong` for WCAG AA compliance)
- **Everything Else**:
  - Flat white surface + 1px Border (`#D9E2F0`), no shadow.
  - Brutal shadows appear on at most one element per visual group.

### 2. Geospatial Identity
- **Graticule Background (`bg-graticule`)**: A subtle 24px faint grid behind ImageViewer, ImageUploader dropzone, and page-level EmptyState areas.
- **Self-Hosted Typography**: Inter Variable for sans body/headers; JetBrains Mono Variable for coordinates, CRS, resolution, session IDs, bounding box coordinates, and measurement numbers.

---

## Docker Deployment

To build and run the production image with Nginx:

```bash
docker build -t satquery-frontend .
docker run -p 80:80 satquery-frontend
```
