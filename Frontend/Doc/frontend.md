# SatQuery AI — Frontend UI Architecture Specification

## 1. Frontend Goal

Build a **premium SaaS-grade React frontend** for SatQuery AI.

The visual language should combine:

* **Neo-morphism** for controlled depth and soft surfaces.
* **Neo-brutalism** for important actions, cards, controls and data emphasis.
* Clean enterprise SaaS layout.
* White-first interface.
* Blue as the primary brand/accent color.
* High information density without looking crowded.
* Strong typography hierarchy.
* Minimal visual noise.
* No unnecessary decorative illustrations.
* No emoji.
* No excessive gradients.
* No random shadows.
* No generic "AI dashboard" appearance.

The final UI should feel like a **real commercial geospatial AI SaaS product**, not a college-project dashboard.

---

# 2. Strict Design Rules

## Color System

Use a centralized Tailwind/theme color system.

### Primary

```text
White
#FFFFFF
```

### Brand Blue

Use a premium deep blue rather than bright default Tailwind blue.

Suggested:

```text
Primary:     #155EEF
Primary Dark:#0B3AA4
Primary Soft:#EAF2FF
```

### Supporting colors

```text
Text Primary:    #0F172A
Text Secondary:  #475569
Text Muted:      #64748B
Border:          #D9E2F0
Surface:         #F8FAFC
Success:         #16A34A
Warning:         #D97706
Danger:          #DC2626
```

Do not introduce random colors inside individual components.

All colors must come from the central theme/design tokens.

---

# 3. Visual Language

## Neo-morphism

Use it selectively.

Examples:

* input controls
* small utility controls
* selected navigation items
* floating tool panels
* compact status controls

Avoid making the entire application look like soft inflated plastic.

---

## Neo-brutalism

Use it selectively for:

* primary CTA
* analysis cards
* result blocks
* important metrics
* selected states
* tool cards
* action panels

Characteristics:

```text
Strong border
Clear geometry
Controlled offset shadow
High contrast
Minimal decoration
```

Example:

```text
border: 1px solid
border-radius: 12px
shadow: controlled hard/soft offset
```

Do not use exaggerated meme-style brutalism.

The goal is:

**Neo-brutalist structure + premium SaaS refinement.**

---

# 4. Strict Component Rule

## ONE COMPONENT = ONE RESPONSIBILITY

Every React component must perform one clear UI responsibility.

Bad:

```text
AnalysisDashboard.jsx
```

containing:

* sidebar
* navbar
* upload
* query box
* map
* results
* confidence
* history
* report
* footer

Do NOT build components like this.

Instead:

```text
Sidebar
Topbar
ImageUploader
QueryInput
AnalysisModeSelector
MapViewer
ResultCard
ConfidenceBadge
EvidencePanel
ExecutionTrace
ReportCard
```

Each component should do one thing.

---

# 5. Components Must Be Data-Driven

This is STRICT.

### NO dummy data.

Do not write:

```js
const fakeResults = [...]
```

Do not write:

```js
const sampleImages = [...]
```

Do not write:

```js
const dummyAnalysis = {...}
```

Do not hardcode fake:

```text
87% confidence
12 objects detected
23.4 km² area
Agricultural land
```

Do not create fake cards just to make the UI look populated.

---

# 6. Props-First Architecture

Every reusable component receives its data through props.

Example:

```jsx
<ResultCard
  title={result.title}
  value={result.value}
  confidence={result.confidence}
  evidence={result.evidence}
/>
```

The component must not decide where the data comes from.

The parent/page/container provides the data.

---

# 7. Empty States Are Allowed

When real data is unavailable, show a proper empty state.

Example:

```text
No analysis available
Upload imagery and submit a query to begin analysis.
```

That is NOT dummy data.

It is UI state.

---

# 8. Loading States Are Allowed

Use real loading state props:

```jsx
<ResultCard loading={isLoading} />
```

Do not invent fake results while loading.

Use:

```text
Skeleton
Spinner
Progress indicator
```

instead.

---

# 9. Error States Are Required

Every major data component should support:

```text
loading
success
empty
error
```

Example:

```jsx
<AnalysisResult
  status="error"
  error={error}
/>
```

---

# 10. No Emoji

Do not use emoji anywhere in the application.

Use **Lucide React** icons only.

Example:

```jsx
import {
  Upload,
  Search,
  Map,
  Layers,
  Settings,
  Download,
  ChevronRight
} from "lucide-react";
```

No:

```text
🚀
🛰️
🤖
📊
🔍
```

---

# 11. Icon Rules

Use Lucide icons consistently.

Icons should:

* have consistent stroke width
* use appropriate size
* never replace important text
* not be randomly decorative

Typical sizes:

```text
16px → compact controls
18px → normal controls
20px → navigation
24px → major action
```

---

# 12. Recommended React Folder Structure

Use a feature-oriented structure rather than putting everything into one components folder.

```text
src/
│
├── app/
│   ├── App.jsx
│   ├── routes.jsx
│   └── providers.jsx
│
├── assets/
│   └── ...
│
├── components/
│   │
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── IconButton.jsx
│   │   ├── Input.jsx
│   │   ├── Textarea.jsx
│   │   ├── Select.jsx
│   │   ├── Badge.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   ├── Tooltip.jsx
│   │   ├── Tabs.jsx
│   │   ├── Progress.jsx
│   │   ├── Skeleton.jsx
│   │   ├── EmptyState.jsx
│   │   └── ErrorState.jsx
│   │
│   ├── layout/
│   │   ├── AppShell.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.jsx
│   │   ├── PageContainer.jsx
│   │   └── PageHeader.jsx
│   │
│   ├── imagery/
│   │   ├── ImageUploader.jsx
│   │   ├── ImagePreview.jsx
│   │   ├── ImageMetadata.jsx
│   │   ├── ModalityBadge.jsx
│   │   └── ImageComparison.jsx
│   │
│   ├── query/
│   │   ├── QueryInput.jsx
│   │   ├── QuerySuggestions.jsx
│   │   ├── QueryStatus.jsx
│   │   └── QuerySummary.jsx
│   │
│   ├── analysis/
│   │   ├── AnalysisHeader.jsx
│   │   ├── AnalysisStatus.jsx
│   │   ├── AnalysisResult.jsx
│   │   ├── ConfidenceIndicator.jsx
│   │   ├── EvidencePanel.jsx
│   │   ├── ExecutionTrace.jsx
│   │   └── AnalysisActions.jsx
│   │
│   ├── visualization/
│   │   ├── ImageViewer.jsx
│   │   ├── MapViewer.jsx
│   │   ├── BoundingBoxOverlay.jsx
│   │   ├── SegmentationOverlay.jsx
│   │   ├── ChangeOverlay.jsx
│   │   └── CoordinateDisplay.jsx
│   │
│   ├── results/
│   │   ├── VQAResult.jsx
│   │   ├── CaptionResult.jsx
│   │   ├── GroundingResult.jsx
│   │   ├── DetectionResult.jsx
│   │   ├── SegmentationResult.jsx
│   │   ├── ChangeDetectionResult.jsx
│   │   ├── FusionResult.jsx
│   │   └── MeasurementResult.jsx
│   │
│   └── reports/
│       ├── ReportPreview.jsx
│       ├── ReportSection.jsx
│       └── ReportActions.jsx
│
├── pages/
│   ├── Dashboard/
│   │   └── DashboardPage.jsx
│   │
│   ├── Analyze/
│   │   └── AnalyzePage.jsx
│   │
│   ├── Results/
│   │   └── ResultsPage.jsx
│   │
│   ├── History/
│   │   └── HistoryPage.jsx
│   │
│   ├── Reports/
│   │   └── ReportsPage.jsx
│   │
│   └── Settings/
│       └── SettingsPage.jsx
│
├── hooks/
│   ├── useAnalysis.js
│   ├── useImageUpload.js
│   └── useQuery.js
│
├── services/
│   ├── api.js
│   ├── analysisService.js
│   └── imageService.js
│
├── context/
│   └── AppContext.jsx
│
├── utils/
│   ├── formatters.js
│   └── validators.js
│
└── styles/
    └── globals.css
```

---

# 13. Application Layout

The application should use:

```text
AppShell
│
├── Sidebar
│
└── Main Content
    │
    ├── Topbar
    │
    └── PageContainer
```

The layout should remain consistent across all pages.

Do not create a separate sidebar implementation for every page.

---

# 14. Sidebar

Responsibility:

**Navigation only.**

It should receive:

```jsx
<Sidebar
  items={navigationItems}
  activeItem={activeRoute}
  onNavigate={handleNavigate}
/>
```

The Sidebar should NOT contain:

* analysis logic
* API calls
* fake statistics
* page-specific data

Navigation items should come from props/config.

---

# 15. Topbar

Responsibility:

* page-level navigation context
* user/application controls
* global actions

Props example:

```jsx
<Topbar
  title={pageTitle}
  subtitle={pageSubtitle}
  actions={actions}
/>
```

No hardcoded page-specific content.

---

# 16. Page Structure

Every page should follow:

```text
Page
│
├── PageHeader
│
├── Primary Content
│
└── Secondary Content
```

Use consistent spacing.

Example:

```text
PageContainer
    PageHeader
    ContentGrid
        MainColumn
        SideColumn
```

---

# 17. Pages

## Dashboard Page

Purpose:

Give the user a high-level view of the system.

Possible real-data sections:

```text
System Status
Recent Analyses
Supported Imagery
Recent Activity
Analysis Summary
```

Only render sections for which real backend data exists.

No fake metrics.

---

# 18. Analyze Page

This is the primary workflow.

Structure:

```text
Analyze Page

Page Header

┌──────────────────────────────────────────┐
│ Image / Dataset Input                    │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Query Input                              │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Analysis Configuration                   │
└──────────────────────────────────────────┘

                 Analyze

After execution:

┌──────────────────────────────────────────┐
│ Visual Evidence                          │
├──────────────────────────────────────────┤
│ Answer / Analysis                        │
├──────────────────────────────────────────┤
│ Confidence                               │
├──────────────────────────────────────────┤
│ Execution Trace                          │
└──────────────────────────────────────────┘
```

The Analyze page should compose components.

It should NOT implement their internal UI.

---

# 19. ImageUploader

Responsibility:

Only handle image/file selection.

Props:

```jsx
<ImageUploader
  files={files}
  acceptedTypes={acceptedTypes}
  multiple={multiple}
  onFilesSelected={onFilesSelected}
  onRemove={onRemove}
  disabled={disabled}
  loading={loading}
/>
```

Supported UI states:

```text
idle
dragging
uploading
success
error
```

Do not put analysis logic inside it.

---

# 20. ImagePreview

Responsibility:

Display uploaded imagery.

Props:

```jsx
<ImagePreview
  src={image.src}
  alt={image.alt}
  metadata={image.metadata}
  overlays={image.overlays}
/>
```

It must support actual backend-provided imagery.

No placeholder satellite image.

---

# 21. ImageMetadata

Display actual metadata:

```text
Dimensions
Bands
CRS
Resolution
Modality
Acquisition Time
Sensor
```

Only display fields that actually exist.

Do not invent metadata.

---

# 22. QueryInput

Responsibility:

Collect natural-language query.

Props:

```jsx
<QueryInput
  value={query}
  onChange={setQuery}
  onSubmit={handleSubmit}
  loading={loading}
  disabled={disabled}
  error={error}
/>
```

Do not put predefined fake queries into the UI.

If suggestions are implemented, they must come from props/backend configuration.

---

# 23. Analysis Result

The result system must be modular.

Do NOT create one giant result component.

Use:

```text
VQAResult
CaptionResult
GroundingResult
DetectionResult
SegmentationResult
ChangeDetectionResult
FusionResult
MeasurementResult
```

The orchestrator/page determines which result component is rendered.

---

# 24. VQAResult

Input:

```jsx
<VQAResult
  question={question}
  answer={answer}
  confidence={confidence}
  evidence={evidence}
/>
```

Display:

```text
Question
Answer
Confidence
Evidence
```

Do not fabricate confidence.

---

# 25. GroundingResult

Input:

```jsx
<GroundingResult
  query={query}
  boxes={boxes}
  image={image}
  confidence={confidence}
/>
```

Display actual bounding boxes on the image.

Grounding must be visually connected to the actual image.

---

# 26. DetectionResult

Props:

```jsx
<DetectionResult
  detections={detections}
  image={image}
  total={total}
  confidence={confidence}
/>
```

Do not calculate fake counts in the UI.

---

# 27. SegmentationResult

Props:

```jsx
<SegmentationResult
  image={image}
  mask={mask}
  classes={classes}
  statistics={statistics}
/>
```

The UI displays the model result.

It should not perform segmentation.

---

# 28. ChangeDetectionResult

Must support two images.

```jsx
<ChangeDetectionResult
  imageBefore={imageBefore}
  imageAfter={imageAfter}
  changeMask={changeMask}
  changeRegions={changeRegions}
  description={description}
  confidence={confidence}
/>
```

Recommended visualization:

```text
Before          After
  │               │
  └──────┬────────┘
         ↓
    Change Map
         ↓
   Change Summary
```

---

# 29. Optical + SAR Fusion Result

The UI must clearly communicate that these are different modalities.

Example:

```text
Optical Evidence
SAR Evidence
Joint Analysis
Confidence
```

Props:

```jsx
<FusionResult
  optical={optical}
  sar={sar}
  fusedResult={fusedResult}
  evidence={evidence}
  confidence={confidence}
/>
```

Do not visually represent SAR as if it were ordinary RGB imagery.

---

# 30. MeasurementResult

Measurement values must come from backend/deterministic processing.

Examples:

```text
Area
Distance
Percentage
Object Count
```

Props:

```jsx
<MeasurementResult
  measurements={measurements}
/>
```

No frontend-generated fake measurements.

---

# 31. ConfidenceIndicator

Responsibility:

Only visualize confidence.

```jsx
<ConfidenceIndicator
  value={confidence}
  label={label}
/>
```

Do not calculate confidence in this component.

Backend/model pipeline provides it.

---

# 32. EvidencePanel

Evidence should be clearly separated from generated language.

Possible evidence:

```text
Bounding Box
Segmentation Mask
Change Region
Detection
Image Region
Metadata
Model Evidence
```

Props:

```jsx
<EvidencePanel
  evidence={evidence}
/>
```

---

# 33. ExecutionTrace

Show the agent execution pipeline.

Example:

```text
Query Inspection
      ↓
Input Validation
      ↓
VQA
      ↓
Grounding
      ↓
Evidence Validation
      ↓
Response Composition
```

This must come from actual execution data.

Props:

```jsx
<ExecutionTrace
  steps={steps}
  status={status}
/>
```

No fake pipeline steps.

---

# 34. Report Page

Report page should consume actual analysis output.

Structure:

```text
Report Header

Analysis Summary

Input Information

Question

Result

Visual Evidence

Measurements

Confidence

Execution Summary

Export Actions
```

Components:

```text
ReportPreview
ReportSection
ReportActions
```

---

# 35. History Page

History must display actual backend records.

```jsx
<HistoryTable
  items={history}
  loading={loading}
  error={error}
  onSelect={onSelect}
/>
```

Never create:

```js
[
  {
    id: 1,
    query: "What changed?",
    date: "Today"
  }
]
```

just for UI demonstration.

---

# 36. Settings Page

Settings should contain only real application settings.

Examples:

```text
Model Configuration
Display Preferences
Analysis Preferences
API Configuration
```

Only implement settings that actually exist.

Do not create fake toggles.

---

# 37. UI Primitive Components

The `components/ui` folder contains reusable primitives.

Each primitive must have one responsibility.

### Button

```jsx
<Button
  variant="primary"
  size="md"
  loading={loading}
  disabled={disabled}
  onClick={onClick}
>
  Analyze
</Button>
```

Variants should be centralized.

Example:

```text
primary
secondary
outline
ghost
danger
```

---

# 38. Card

```jsx
<Card
  variant="default"
  padding="md"
>
  ...
</Card>
```

Variants:

```text
default
elevated
brutalist
soft
```

Do not manually style every card differently.

---

# 39. Badge

```jsx
<Badge
  variant="success"
>
  Ready
</Badge>
```

The badge should be generic.

---

# 40. Modal

```jsx
<Modal
  open={open}
  title={title}
  onClose={onClose}
>
  {children}
</Modal>
```

No application logic.

---

# 41. Tabs

```jsx
<Tabs
  items={items}
  activeTab={activeTab}
  onChange={onChange}
/>
```

Generic only.

---

# 42. Skeleton

Every major data-heavy component should support skeleton loading.

Example:

```jsx
<ResultCard loading />
```

Do not display fake content during loading.

---

# 43. EmptyState

Generic:

```jsx
<EmptyState
  icon={Search}
  title="No analysis available"
  description="Run an analysis to see results."
  action={action}
/>
```

---

# 44. API/Data Separation

React components must NOT directly contain backend implementation logic.

Preferred architecture:

```text
Page
 ↓
Hook
 ↓
Service
 ↓
API
 ↓
Backend
```

Example:

```text
AnalyzePage
    ↓
useAnalysis()
    ↓
analysisService
    ↓
api.js
    ↓
Backend
```

---

# 45. Component Data Flow

The correct direction is:

```text
Backend
   ↓
Service
   ↓
Hook
   ↓
Page
   ↓
Component Props
   ↓
UI
```

Never:

```text
Component
   ↓
fake data
```

---

# 46. Component Contract

Every component should clearly define:

```text
Props
Expected data shape
Events
Loading state
Error state
Empty state
Visual variants
```

Example:

```jsx
<ResultCard
  title={result.title}
  value={result.value}
  status={result.status}
  confidence={result.confidence}
  loading={loading}
  error={error}
/>
```

---

# 47. No Component-Level API Calls

Avoid:

```jsx
function ResultCard() {
  fetch("/api/results");
}
```

Instead:

```text
Page
 ↓
Hook
 ↓
Service
 ↓
Props
 ↓
ResultCard
```

This keeps components reusable.

---

# 48. Tailwind Rules

Use Tailwind consistently.

Do not create random inline styles.

Avoid excessive arbitrary values:

```text
mt-[17px]
px-[13px]
shadow-[...]
```

Prefer design tokens and reusable classes.

Create reusable Tailwind patterns for:

```text
page container
card
button
input
section
heading
muted text
status
```

---

# 49. Responsive Design

The application must support:

```text
Desktop
Laptop
Tablet
Mobile
```

Primary target:

```text
Desktop SaaS application
```

But layouts must collapse properly.

Example:

Desktop:

```text
Sidebar | Main Content
```

Mobile:

```text
Topbar
Main Content
```

Do not allow horizontal overflow.

---

# 50. Typography

Use a clean modern SaaS font.

Recommended:

```text
Inter
```

Typography hierarchy:

```text
Page title
Section title
Card title
Body
Secondary
Metadata
```

Avoid excessive font weights.

---

# 51. Spacing

Use consistent spacing scale.

Prefer:

```text
4
8
12
16
20
24
32
40
48
```

Do not randomly use different spacing values.

---

# 52. Borders

Use subtle blue-gray borders.

Primary application border:

```text
#D9E2F0
```

Selected/active states can use primary blue.

Avoid heavy black borders everywhere.

Neo-brutalism should be controlled rather than cartoonish.

---

# 53. Shadows

Use shadows intentionally.

Neo-morphic:

```text
soft shadow
```

Neo-brutalist:

```text
controlled offset shadow
```

Do not put large shadows on every element.

---

# 54. Page Composition Rule

Pages compose components.

Components do not compose entire pages.

Correct:

```text
AnalyzePage
    ├── PageHeader
    ├── ImageUploader
    ├── QueryInput
    ├── AnalysisStatus
    ├── ImageViewer
    ├── ResultCard
    └── ExecutionTrace
```

Incorrect:

```text
AnalyzePage.jsx
    └── 1000 lines of UI
```

---

# 55. Reusability Rule

If the same visual pattern appears twice:

**extract it into a component.**

For example:

```text
ResultCard
```

should be reusable for:

```text
VQA
Caption
Change
Fusion
Measurement
```

where appropriate.

---

# 56. Do Not Over-Abstract

Do not create components such as:

```text
UniversalCardManager
DynamicEverything
SmartUIEngine
GenericAnalysisRenderer
```

unless there is a real requirement.

Component abstraction should solve an actual repeated UI problem.

---

# 57. Icons

Use:

```text
lucide-react
```

Only.

Examples:

```jsx
Upload
Search
Map
Layers
Image
Database
Settings
History
FileText
Download
ChevronRight
ChevronDown
Check
X
AlertCircle
Loader2
Eye
Maximize2
```

No manually drawn SVG icons unless specifically required.

---

# 58. Accessibility

Every interactive component should support:

```text
keyboard navigation
focus state
aria-label where required
visible focus indicator
semantic buttons
semantic inputs
```

Do not use:

```jsx
<div onClick={...}>
```

when a button is appropriate.

---

# 59. Final UI Quality Standard

The UI should communicate:

```text
Professional
Scientific
Geospatial
AI-powered
Enterprise
Premium
Reliable
```

It should NOT communicate:

```text
College project
Template dashboard
Generic AI wrapper
Over-designed landing page
Toy application
```

---

# 60. Most Important Rule

The UI developer must understand this:

> **Do not build the interface around imaginary data. Build the interface around the actual data contracts.**

Every displayed value must originate from:

```text
Backend/API
User input
Actual application state
Actual model result
Actual configuration
```

Nothing else.

---

# 61. Development Order

Build in this order.

### Phase 1 — Foundation

```text
Tailwind setup
Theme
Typography
Spacing
Colors
Button
Input
Card
Badge
Tabs
Modal
Skeleton
EmptyState
ErrorState
```

### Phase 2 — Application Shell

```text
AppShell
Sidebar
Topbar
PageContainer
PageHeader
Responsive layout
```

### Phase 3 — Analyze Workflow

```text
ImageUploader
ImagePreview
ImageMetadata
QueryInput
AnalysisStatus
AnalysisActions
```

### Phase 4 — Visualization

```text
ImageViewer
MapViewer
BoundingBoxOverlay
SegmentationOverlay
ChangeOverlay
CoordinateDisplay
```

### Phase 5 — Results

```text
VQAResult
CaptionResult
GroundingResult
DetectionResult
SegmentationResult
ChangeDetectionResult
FusionResult
MeasurementResult
```

### Phase 6 — Explainability

```text
ConfidenceIndicator
EvidencePanel
ExecutionTrace
```

### Phase 7 — Pages

```text
Dashboard
Analyze
Results
History
Reports
Settings
```

### Phase 8 — Polish

```text
Responsive behavior
Loading states
Error states
Empty states
Accessibility
Transitions
Spacing consistency
Visual consistency
```

---

# 62. Definition of Done

The frontend is considered complete only when:

* Every page has a defined purpose.
* Every page is composed from reusable components.
* Components have one responsibility.
* Components receive data through props.
* No dummy data exists.
* No fake metrics exist.
* No fake analysis results exist.
* No fake history records exist.
* No fake satellite imagery exists.
* Loading states exist.
* Empty states exist.
* Error states exist.
* API data can be plugged in without redesigning components.
* Lucide is used for icons.
* No emoji exists in the UI.
* Tailwind is used consistently.
* White + blue premium visual system is consistent.
* Neo-morphism is controlled.
* Neo-brutalism is controlled.
* Desktop layout is polished.
* Responsive behavior works.
* Components are reusable.
* Pages only compose components.
* Backend/model logic is not embedded inside UI components.

---

# 63. Golden Rule for the UI Developer

**One component → one responsibility.**

**One page → composition of components.**

**One data source → real application state/API.**

**No data → empty state.**

**Data loading → skeleton/loading state.**

**API failure → error state.**

**No dummy data.**

**No dummy elements pretending to be real functionality.**

**No emoji.**

**Lucide icons only.**

**Tailwind-first styling.**

**Premium white + blue SaaS visual language.**

**Neo-morphism + controlled neo-brutalism.**

**The UI must be ready to consume real SatQuery AI backend/model outputs without rewriting the component architecture.**
