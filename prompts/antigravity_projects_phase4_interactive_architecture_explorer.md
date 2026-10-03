# ANTIGRAVITY — PROJECTS PHASE 4
# INTERACTIVE ARCHITECTURE EXPLORER

---

# STATUS

PHASE 3 — APPROVED ✅

The Project Library and Project Detail UI Shell are implemented and browser-verified.

Current flow:

```text
Verified Dataset
      ↓
MongoDB
      ↓
Project API
      ↓
/projects
      ↓
/projects/voltgrid-au
```

We are now implementing:

# PHASE 4 — INTERACTIVE ARCHITECTURE EXPLORER

---

# 🎯 OBJECTIVE

Build the first major interactive learning visualization for the Projects module:

## VoltGrid AU — Architecture Explorer

The visualization must teach the architecture through motion.

This is NOT a static diagram with clickable boxes.

The architecture itself should communicate:

```text
SOURCE SYSTEMS
      ↓
INGESTION
      ↓
BRONZE
      ↓
SILVER
      ↓
GOLD
      ↓
SERVING
```

through continuous, understandable data movement.

---

# 🚨 SOURCE FIDELITY — NON-NEGOTIABLE

The authoritative source remains:

```text
data/verified-projects/voltgrid-au.json
```

Use only architecture information supported by the verified dataset.

Do NOT invent:

- services
- data sources
- pipelines
- transformations
- destinations
- relationships
- frequencies
- technologies
- business flows

If a relationship is not documented, do not visually imply it as a factual architecture connection.

---

# 🔒 PROTECTED SYSTEMS

DO NOT MODIFY:

## FUNDAMENTAL 50

- Q1–Q50 animation components
- InteractionRegistry
- animation mappings
- animation timing
- animation behavior
- question UI
- `/questions`
- `/questions/[id]`

## HOMEPAGE

DO NOT MODIFY:

- Hero
- Navbar
- homepage animations
- Fundamental 50 section
- existing visual design
- existing motion systems

## SQL

DO NOT MODIFY:

- SQL Lab
- SQL routes
- SQL data
- SQL components

---

# 🚨 ISOLATION RULE

The new architecture animation must be implemented as an independent Project-specific system.

Preferred structure:

```text
components/projects/
    architecture/
        ArchitectureExplorer.tsx
        ArchitectureNode.tsx
        ArchitectureConnection.tsx
        DataPacket.tsx
        architectureConfig.ts
```

Names may be adjusted to match the existing codebase.

DO NOT import or modify Fundamental 50 animation components.

DO NOT register Project animations inside `InteractionRegistry`.

DO NOT alter existing global animation configuration.

---

# STEP 1 — INSPECT THE VERIFIED DATA

Before writing the visualization, inspect:

```text
data/verified-projects/voltgrid-au.json
```

Identify the actual documented architecture elements.

Build an internal architecture representation from the source data.

At minimum determine what is actually documented for:

```text
Source Systems
Ingestion
Bronze
Silver
Gold
Serving
```

Also identify documented:

- Azure services
- Databricks components
- Delta Lake
- streaming
- batch
- CDC
- PDF invoice processing
- monitoring/alerting
- serving destinations

Only include elements supported by the dataset.

---

# STEP 2 — ARCHITECTURE DATA MODEL

Do not hardcode the entire architecture directly inside JSX.

Create a structured architecture configuration.

Example shape:

```ts
type ArchitectureLayer =
  | "source"
  | "ingestion"
  | "bronze"
  | "silver"
  | "gold"
  | "serving";

type ArchitectureNode = {
  id: string;
  label: string;
  layer: ArchitectureLayer;
  technology?: string;
  description?: string;
};

type ArchitectureConnection = {
  from: string;
  to: string;
  mode?: string;
  label?: string;
};
```

The actual nodes and relationships must be populated from the verified VoltGrid source.

Do not create generic placeholder nodes just to make the diagram look complete.

---

# STEP 3 — VISUAL ARCHITECTURE

Create a clear six-stage architecture:

```text
┌─────────────────────────────────────────────────────────┐
│ SOURCE SYSTEMS                                          │
│                                                         │
│ operational / telemetry / business sources              │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ INGESTION                                               │
│                                                         │
│ streaming / batch / CDC / documented ingestion paths   │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ BRONZE                                                  │
│                                                         │
│ raw landing / source-aligned data                       │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ SILVER                                                  │
│                                                         │
│ cleansing / deduplication / transformation              │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ GOLD                                                    │
│                                                         │
│ business-ready analytical model                         │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ SERVING                                                 │
│                                                         │
│ documented analytics / APIs / downstream consumers      │
└─────────────────────────────────────────────────────────┘
```

The actual labels and services must come from the verified dataset.

---

# STEP 4 — ALWAYS-ON DATA MOTION

This is the core requirement.

The visualization must have continuous motion without requiring the learner to click.

Example:

```text
SOURCE
  ●
  │
  │  animated packet
  ↓
INGESTION
  ●
  │
  ↓
BRONZE
  ●
  │
  ↓
SILVER
  ●
  │
  ↓
GOLD
  ●
  │
  ↓
SERVING
```

Data packets should continuously travel along documented architecture connections.

Use:

```text
Framer Motion
```

or an appropriate animation mechanism.

Motion should communicate:

- direction
- progression
- layer transition
- active data movement

The learner should understand the pipeline simply by watching it.

---

# STEP 5 — MOTION DESIGN

Use subtle premium motion.

Recommended:

### Data packets

Small luminous particles/dots traveling through connections.

### Connections

Subtle animated flow indication.

### Nodes

Very subtle breathing/pulse while active.

### Layer transition

When a packet reaches a layer:

```text
packet arrives
      ↓
node briefly reacts
      ↓
packet continues
```

Do not make the animation noisy.

Avoid:

- excessive particle counts
- flashing
- rapid movement
- distracting glow
- constant scaling
- unnecessary 3D effects

The motion should feel like a technical system visualization.

---

# STEP 6 — ANIMATION LOOP

Animation must be deterministic.

Avoid random animation.

Use a stable cycle such as:

```text
0s      source packet starts
1s      ingestion
2s      bronze
3s      silver
4s      gold
5s      serving
6s      next packet
```

Exact timing can be tuned for visual quality.

If multiple documented paths exist, animate them independently but predictably.

---

# STEP 7 — INTERACTION IS SECONDARY

The architecture must teach without interaction.

Interaction adds inspection.

For example, clicking/hovering a node may reveal:

```text
NODE

Databricks

Role:
...

Layer:
...

Documented function:
...
```

But the learner must NOT need to interact to understand the architecture.

Always-on motion comes first.

---

# STEP 8 — NODE INSPECTION

Create an isolated node interaction system.

On hover/focus/click:

- highlight node
- highlight its documented connections
- show a compact information panel
- dim unrelated nodes slightly

Do not hide the architecture.

Do not pause all architecture motion unless there is a strong UX reason.

The information shown must come from the verified project data.

---

# STEP 9 — CONNECTION INSPECTION

When a connection is selected, display only documented information.

Example:

```text
FLOW

Mode:
Streaming

From:
[documented source]

To:
[documented destination]

Purpose:
[source-backed description]
```

If the dataset does not document a specific purpose:

```text
Purpose:
Not documented in the source.
```

Do NOT invent explanations.

---

# STEP 10 — LAYER LEGEND

Add a compact legend:

```text
SOURCE
INGESTION
BRONZE
SILVER
GOLD
SERVING
```

The legend should correspond directly to the architecture.

Clicking a layer may highlight that layer.

Do not make the legend required for understanding.

---

# STEP 11 — ARCHITECTURE CONTROLS

Keep controls minimal.

Allowed:

```text
[Auto Flow ●]

[Reset View]

[Fit Architecture]
```

Optional:

```text
[Pause]
```

If a pause control is implemented, the default state MUST be playing.

The visualization should automatically begin when visible.

---

# STEP 12 — RESPONSIVE DESIGN

Desktop:

```text
wide architecture flow
```

Tablet:

```text
compressed horizontal / adaptive flow
```

Mobile:

Use an intentional vertical architecture:

```text
SOURCE
  ↓
INGESTION
  ↓
BRONZE
  ↓
SILVER
  ↓
GOLD
  ↓
SERVING
```

Do NOT simply shrink the desktop diagram until it becomes unreadable.

The mobile layout must remain understandable.

---

# STEP 13 — REDUCED MOTION

Respect:

```text
prefers-reduced-motion
```

When reduced motion is enabled:

- remove continuous packet animation
- keep architecture visible
- preserve state transitions in a non-animated manner
- retain interaction and information access

Do not make the architecture inaccessible to reduced-motion users.

---

# STEP 14 — PERFORMANCE

Do not create hundreds of DOM animation elements.

Keep the visualization lightweight.

Requirements:

- no animation memory leaks
- cleanup timers/listeners
- no unnecessary rerenders
- stable React keys
- animation lifecycle cleanup
- no console errors

If using Framer Motion:

- prefer declarative animation
- avoid unnecessary state updates every frame
- do not use `setInterval` for visual frame animation unless truly necessary

---

# STEP 15 — ACCESSIBILITY

Nodes must be accessible.

Support:

- keyboard focus
- visible focus state
- semantic labels
- screen-reader descriptions where appropriate
- reduced motion
- non-hover access to node information

Do not make important information hover-only.

---

# STEP 16 — ADD TO PROJECT DETAIL

Replace the Phase 3 architecture placeholder with:

```text
<ArchitectureExplorer />
```

Location:

```text
/projects/[slug]
```

The component must receive project data.

Do not make the component fetch the database directly.

Preferred:

```text
Project Detail
      ↓
Project API data
      ↓
ArchitectureExplorer
      ↓
architecture configuration
      ↓
visualization
```

---

# STEP 17 — NO FAKE ARCHITECTURE

This is critical.

Do NOT add generic architecture elements such as:

```text
Kafka
Airflow
Snowflake
Redshift
Glue
Kinesis
Lambda
```

unless they are actually documented for VoltGrid.

Do NOT assume that a common Data Engineering architecture pattern applies.

VoltGrid source data is the authority.

---

# STEP 18 — BROWSER VERIFICATION

Browser verification is mandatory.

Open:

```text
/projects
```

Verify:

- Project Library works
- VoltGrid card works

Open:

```text
/projects/voltgrid-au
```

Verify:

### Architecture

- explorer renders
- actual VoltGrid nodes appear
- actual layers appear
- connections are visible
- data packets move automatically

### Interaction

- node hover/focus/click works
- information panel works
- connection inspection works if implemented
- layer highlighting works

### Responsive

Verify:

```text
Desktop
Tablet
Mobile
```

### Reduced motion

Test:

```text
prefers-reduced-motion
```

Ensure the visualization remains usable.

---

# STEP 19 — REGRESSION VERIFICATION

After Phase 4:

Open:

```text
/
```

Confirm:

```text
Homepage unchanged
```

Open:

```text
/questions
```

Open at least one existing Fundamental 50 interactive question.

Confirm:

```text
Fundamental 50 animation unchanged
```

Also verify:

```text
InteractionRegistry unchanged
```

Do not modify Fundamental 50 code to solve Project animation issues.

---

# STEP 20 — QUALITY CHECK

Before declaring success, inspect the actual browser result.

Ask:

```text
Can I understand the pipeline without clicking anything?
```

If the answer is no:

FIX THE ANIMATION.

The architecture must teach through motion.

Do NOT report success merely because:

```text
build passes
```

or:

```text
component renders
```

---

# REQUIRED REPORT

Return exactly:

```text
PHASE 4 — INTERACTIVE ARCHITECTURE EXPLORER

Implemented:
- ...

Verified source:
- data/verified-projects/voltgrid-au.json

Architecture layers:
- ...

Documented nodes:
- ...

Documented connections:
- ...

Always-on motion:
- ...

Node interaction:
- ...

Connection interaction:
- ...

Layer interaction:
- ...

Responsive:
- Desktop:
- Tablet:
- Mobile:

Reduced motion:
- ...

Accessibility:
- ...

Performance:
- ...

Browser verification:
- /projects:
- /projects/voltgrid-au:
- Architecture motion:
- Node interaction:
- Responsive:
- Reduced motion:

Regression:
- Homepage:
- Fundamental 50:
- InteractionRegistry:
- SQL:

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
- Phase 5 — Pipeline + Scenario Explorer

STOP.
```

---

# 🛑 HARD STOP

After Phase 4 is implemented, browser-verified, and regression-tested:

STOP.

Do NOT automatically begin Phase 5.

Do NOT build scenario interactions.

Do NOT build interview mode.

Do NOT add additional projects.

Do NOT modify Fundamental 50.

WAIT FOR APPROVAL.
