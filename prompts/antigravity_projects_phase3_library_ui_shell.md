# ANTIGRAVITY — PROJECTS PHASE 3
# PROJECT LIBRARY + UI SHELL

---

# STATUS

PHASE 2 — APPROVED ✅

The backend Project Core Data Layer is implemented and verified.

Current verified data:

```text
MongoDB
  ↓
projects
  ↓
1 project
  ↓
VoltGrid AU
```

Available API:

```text
GET /api/projects
GET /api/projects/[slug]
```

We are now implementing:

# PHASE 3 — PROJECT LIBRARY + UI SHELL

---

# 🎯 OBJECTIVE

Build the first real learner-facing Projects experience.

Scope:

```text
API
 ↓
/projects
 ↓
Project Library
 ↓
VoltGrid AU project card
 ↓
/projects/voltgrid-au
 ↓
Project Detail UI Shell
```

This phase establishes the visual information architecture.

It does NOT build the detailed architecture animation yet.

---

# 🔒 NON-NEGOTIABLE PROTECTION

DO NOT MODIFY:

## FUNDAMENTAL 50

- existing questions
- question data
- InteractionRegistry
- interactive components
- Framer Motion animation components
- animation timing
- animation behavior
- question mappings
- `/questions`
- `/questions/[id]`

## HOMEPAGE

DO NOT MODIFY:

- Hero
- Hero animations
- Navbar
- homepage layout
- Fundamental 50 section
- glassmorphic styling
- existing homepage animations
- existing homepage content

## SQL

DO NOT:

- modify SQL Lab
- modify SQL routes
- modify SQL data
- create SQL features

---

# 🚫 DO NOT BUILD YET

Do NOT implement:

- detailed architecture animation
- animated data packets
- Bronze/Silver/Gold animated pipeline
- architecture node interaction
- scenario animation
- interview mode
- progress tracking
- bookmarks
- project search engine
- project filtering system
- additional projects
- database mutations
- admin UI

Those belong to later phases.

---

# STEP 1 — INSPECT EXISTING UI SYSTEM

Before implementation, inspect:

```text
app/
components/
components/ui/
lib/
```

Identify reusable:

- Card
- Badge
- Button
- Tabs
- layout components
- typography
- container utilities
- existing motion utilities
- responsive patterns

Reuse existing components where appropriate.

Do not duplicate existing shadcn/ui components.

---

# STEP 2 — CREATE PROJECT LIBRARY ROUTE

Create:

```text
app/projects/page.tsx
```

The page must consume:

```text
GET /api/projects
```

Do NOT hardcode VoltGrid project data into the UI.

The API is the source for the page.

---

# STEP 3 — PROJECT LIBRARY DESIGN

Create a premium learning-focused Project Library.

The design should feel consistent with the existing application's visual language but must NOT alter the Homepage.

Recommended structure:

```text
PROJECTS

Build real-world
Data Engineering systems.

Explore verified project architectures,
pipelines, technologies and interview scenarios.

[ project count / learning metadata ]

--------------------------------------------

PROJECT LIBRARY

┌─────────────────────────────────────┐
│ VoltGrid AU                         │
│ Azure Data Engineering Architecture │
│                                     │
│ source → ingestion → lakehouse      │
│ → serving                           │
│                                     │
│ Azure • Databricks • Delta Lake     │
│                                     │
│ [Explore Project]                   │
└─────────────────────────────────────┘
```

Use the actual project fields from the API.

Do not invent marketing claims.

---

# STEP 4 — PROJECT CARD

Create a reusable component:

```text
components/projects/ProjectCard.tsx
```

The card should display source-backed information such as:

- title
- domain
- summary
- architecture type
- cloud/platform
- technologies
- source systems count if already available from DTO
- scenarios count if already available from DTO

Only display values actually returned by the API.

Avoid excessive information density.

The card should have a clear:

```text
Explore Project →
```

action.

---

# STEP 5 — RESPONSIVE DESIGN

The Project Library must work on:

```text
Desktop
Laptop
Tablet
Mobile
```

Check:

- no horizontal overflow
- card width
- typography wrapping
- button sizing
- spacing
- navigation
- readable content

Do not create a separate mobile application.

Use responsive CSS.

---

# STEP 6 — PROJECT DETAIL ROUTE

Create:

```text
app/projects/[slug]/page.tsx
```

The route must use:

```text
GET /api/projects/[slug]
```

Do NOT hardcode:

```text
VoltGrid AU
```

into the route.

The slug determines the project.

---

# STEP 7 — PROJECT DETAIL UI SHELL

Create the initial project detail structure.

Suggested:

```text
PROJECT DETAIL

← Back to Projects

VoltGrid AU
Azure Data Engineering Architecture

[Domain]
[Cloud]
[Technology badges]

------------------------------------------------

OVERVIEW

Project summary

------------------------------------------------

BUSINESS PROBLEM

Source-backed business problem points

------------------------------------------------

ARCHITECTURE

[Architecture Explorer Placeholder]

------------------------------------------------

DATA FLOW

[Coming in next phase]

------------------------------------------------

SOURCE SYSTEMS

[Source system summary]

------------------------------------------------

DATA MODEL

[Data model summary]

------------------------------------------------

SCENARIOS

[Scenario summary]

------------------------------------------------

TECHNOLOGIES

[Technology list]

------------------------------------------------

INTERVIEW TALKING POINTS

[Interview section placeholder]
```

IMPORTANT:

The placeholders must look intentional and polished.

Do not create fake architecture diagrams.

Do not write:

```text
Coming Soon
```

everywhere.

Use meaningful labels such as:

```text
Interactive Architecture Explorer
```

with a subtle indication that the interactive layer is being added in the next phase.

---

# STEP 8 — SOURCE-FAITHFUL CONTENT

The UI must render the API data.

For example:

```text
project.summary
project.businessProblem
project.technologies
project.sourceSystems
project.scenarios
project.dataModel
project.interviewTalkingPoints
```

Do not rewrite source-derived facts into unsupported claims.

Do not add technologies that are not in the dataset.

Do not add architecture components that are not documented.

---

# STEP 9 — VISUAL MOTION

Use only LIGHT UI motion in this phase.

Allowed:

- page entrance
- card fade/slide
- hover elevation
- subtle badge transitions
- button hover
- section reveal

Use:

```text
Framer Motion
```

only where useful.

Do NOT build architecture/data-flow animations.

Do NOT reuse or modify Fundamental 50 animation components.

Do NOT modify the existing InteractionRegistry.

Project motion must be isolated from the Fundamental 50 animation system.

---

# STEP 10 — DESIGN QUALITY

The Projects UI should feel like a serious Data Engineering learning product.

Design characteristics:

- premium dark interface
- strong hierarchy
- restrained glow
- glass/solid surfaces where appropriate
- readable typography
- technical visual language
- clean spacing
- subtle borders
- consistent radius
- high information clarity

Avoid:

- excessive gradients
- noisy backgrounds
- giant decorative illustrations
- fake 3D elements
- generic SaaS dashboard appearance
- unnecessary animations

The existing Homepage style is reference-only.

DO NOT modify the Homepage to achieve consistency.

---

# STEP 11 — LOADING / ERROR STATES

Implement proper states.

### Loading

Use an appropriate skeleton or loading UI.

### Empty

If:

```text
projects.length === 0
```

show a clear empty state.

Do not invent projects.

### API Error

Show a useful error state.

### Invalid slug

Return a proper not-found experience.

Do not show a fake project.

---

# STEP 12 — DATA FLOW

The intended flow is:

```text
MongoDB
   ↓
Project Repository
   ↓
Project Service
   ↓
Project DTO
   ↓
/api/projects
   ↓
Projects Page
   ↓
ProjectCard
```

And:

```text
/projects/[slug]
        ↓
/api/projects/[slug]
        ↓
Project DTO
        ↓
Project Detail UI
```

Do not bypass the API by importing the JSON dataset directly into the client.

---

# STEP 13 — ACCESSIBILITY

Verify:

- semantic headings
- keyboard-accessible links/buttons
- visible focus states
- sufficient text contrast
- meaningful link labels
- proper `alt` handling for any imagery
- no interaction dependent only on hover

The project card must be fully keyboard accessible.

---

# STEP 14 — BROWSER VERIFICATION

This is mandatory.

Do NOT report browser verification based only on:

```text
npm run build
```

Actually open the application in a browser.

Verify:

```text
/
```

Existing Homepage still works.

Then:

```text
/projects
```

Verify:

- Project Library loads
- VoltGrid AU appears
- project data is coming from API
- card is clickable
- responsive layout works

Then:

```text
/projects/voltgrid-au
```

Verify:

- correct project loads
- title is correct
- summary is correct
- business problem renders
- technologies render
- source-system information renders
- scenarios/data-model sections render
- no fake data appears

Also verify an invalid route:

```text
/projects/does-not-exist
```

Expected:

```text
proper not-found state
```

---

# STEP 15 — REGRESSION CHECK

After Project UI implementation, verify:

```text
/
```

and:

```text
/questions
```

and at least one Fundamental 50 question.

Confirm:

```text
Homepage unchanged
Fundamental animations unchanged
Question routes unchanged
SQL unchanged
```

If anything regresses:

FIX THE REGRESSION BEFORE REPORTING PHASE COMPLETE.

Do not modify the protected animation implementation to solve unrelated Project UI problems.

---

# REQUIRED REPORT

Return exactly this structure:

```text
PHASE 3 — PROJECT LIBRARY + UI SHELL

Implemented:
- ...

Routes:
- /projects
- /projects/[slug]

API integration:
- ...

Project cards:
- ...

Project detail:
- ...

Responsive verification:
- ...

Loading/error states:
- ...

Accessibility:
- ...

Browser verification:
- Homepage:
- Projects Library:
- VoltGrid Detail:
- Invalid slug:
- Mobile/responsive:
- Fundamental 50 regression:

Protected systems:
- Fundamental 50 untouched
- InteractionRegistry untouched
- Fundamental animations untouched
- Homepage untouched
- Homepage animations untouched
- SQL untouched

Known issues:
- ...

Next phase:
- Phase 4 — Interactive Architecture Explorer

STOP.
```

---

# 🛑 HARD STOP

After Phase 3 is implemented and browser-verified:

STOP.

Do NOT automatically begin Phase 4.

Do NOT build the architecture animation.

Do NOT add additional projects.

Do NOT modify Fundamental 50.

WAIT FOR APPROVAL.
