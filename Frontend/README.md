# SatQuery AI — Frontend

An intelligent Earth Observation (EO) and geospatial satellite analytics platform. SatQuery AI enables analysts and researchers to perform natural language visual question answering (VQA), object detection, visual grounding, segmentation, and bi-temporal change detection on satellite imagery.

---

## Tech Stack

- **Framework**: React 19 (Vite)
- **Routing**: React Router 7
- **Styling**: Tailwind CSS with custom geospatial theme tokens
- **Icons**: Lucide React
- **Linter & Code Quality**: Oxlint
- **Typography**: Inter

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
├── app/               # Application configuration, providers, and route definitions
├── components/
│   ├── analysis/      # Result output stacks, execution traces, headers, and status cards
│   ├── dashboard/     # Modular widgets for high-level system overview and metrics
│   ├── history/       # Accessible history table and query inspection
│   ├── imagery/       # Raster dropzone, file validation, previews, and metadata tags
│   ├── layout/        # AppShell, Topbar, Sidebar navigation, and PageContainers
│   ├── query/         # Natural language query input with keyboard shortcut dispatch
│   ├── reports/       # Intelligence report preview, section wrappers, and export actions
│   ├── results/       # Specialized intent cards (VQA, Caption, Grounding, Change, Fusion, etc.)
│   ├── settings/      # Live API connection tester and configuration cards
│   ├── ui/            # Reusable design primitives (Button, Card, Badge, Modal, Tabs, etc.)
│   └── visualization/ # Canvas overlays, image viewer with zoom/pan, and coordinates
├── context/           # React context for global analysis state
├── hooks/             # Custom hooks (useAnalysis, useHistory, useSystemStatus, etc.)
├── pages/             # Thin page components composing modular UI features
├── services/          # Pure API clients, endpoint calls, and contract documentation
├── styles/            # Global stylesheet and media print definitions
└── utils/             # Formatters, schema validators, and result renderers
```

---

## How Data Flows

Data flows strictly in one unidirectional pipeline:

$$\text{Backend API} \longrightarrow \text{Service Layer} \longrightarrow \text{Adapter} \longrightarrow \text{Custom Hook} \longrightarrow \text{Page Component} \longrightarrow \text{Presentational Props}$$

1. **Backend API**: Emits standard JSON responses.
2. **Services (`src/services/`)**: Make HTTP requests using `api.js` and return raw backend JSON.
3. **Adapters (`src/services/analysisAdapter.js`)**: Transform backend payloads into stable internal UI models, guaranteeing component decoupling.
4. **Hooks (`src/hooks/`)**: Manage request lifecycle, loading flags, error boundaries, and refresh triggers.
5. **Pages (`src/pages/`)**: Thin orchestrators that bind hooks and pass data down as props.
6. **Components (`src/components/`)**: Pure UI presentation handling loading skeletons, empty states, and error alerts.

---

## Backend Contract

The SatQuery frontend data contracts are documented in [CONTRACT.md](src/services/CONTRACT.md).

> **Note**: The backend schema is marked as **PROPOSED** until formally validated and confirmed with the backend research team.

---

## Core Design Rules

1. **No Dummy Data**: All displayed metrics, status badges, history items, and results originate from real APIs or user actions.
2. **One Component, One Job**: Components do not fetch data directly; they receive props and render specific visual responsibilities.
3. **Theme Tokens Only**: Colors, borders, and shadows derive exclusively from tailored Tailwind design tokens (no arbitrary hardcoded hex values).
4. **Icons**: Lucide React only. No manually drawn SVGs or emojis in the UI.
5. **State Completeness**: Every data-driven component provides explicit loading, empty, and error fallback states.

---

## Docker Deployment

To build and run the production image with Nginx:

```bash
docker build -t satquery-frontend .
docker run -p 80:80 satquery-frontend
```
