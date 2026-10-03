# STITCH MASTER PROMPT — VOLTGRID PROJECT EXPERIENCE V2
## Complete UX/UI Upgrade + Data Modeling + Always-On Engineering Animations

We are now improving the APPROVED VoltGrid AU project experience substantially.

The current design direction is technically promising, but several screens still feel too static, too empty, too card-based, and not sufficiently like a premium interactive Data Engineering learning product.

This is NOT a request for a cosmetic polish.

Rework the Project Detail experience into a cohesive:

> INTERACTIVE DATA ENGINEERING COMMAND CENTER

The experience should visually communicate:
- data movement
- architecture
- transformations
- schemas
- quality checks
- security controls
- observability
- engineering decisions

The user should feel that they are exploring a real data platform rather than reading a collection of cards.

==================================================
0. SOURCE OF TRUTH — NON-NEGOTIABLE
==================================================

Use ONLY the verified project dataset:

data/verified-projects/voltgrid-au.json

The source documents are authoritative.

Do NOT invent:
- technologies
- architecture components
- relationships
- metrics
- SLAs
- performance numbers
- business outcomes
- security controls
- monitoring metrics
- scenario behavior
- database relationships
- pipeline stages

If something is not documented:

"Not documented in source"

Do not fill the gap using generic Data Engineering knowledge.

Preserve the documented terminology.

Known source-derived facts may be visualized, including:
- 28 documented source systems
- 6 architecture layers
- 33 documented scenarios
- 19 documented technologies
- documented dimensions/facts
- documented SCD information
- documented Bronze/Silver/Gold processing
- documented quality checks
- documented security controls
- documented orchestration
- documented monitoring/alerts

Only show these values if they are loaded from the verified dataset.

==================================================
1. CURRENT DESIGN PROBLEM
==================================================

The current Project UI has a strong dark technical aesthetic, but it currently suffers from:

- excessive empty space
- static cards
- weak information hierarchy
- too much "dashboard card" appearance
- limited visual explanation
- insufficient data movement
- weak Data Model visualization
- Pipeline lacks process animation
- Quality lacks animated validation flow
- Security lacks animated control/identity flow
- Monitoring lacks animated observability flow
- Scenario screen needs better composition and content density
- some panels overflow/clipped at certain widths
- some source-derived scenario content has been visually removed/simplified

The redesign must solve these problems.

==================================================
2. DESIGN PRINCIPLE
==================================================

Every major screen should answer a different engineering question.

OVERVIEW
"What is this platform?"

ARCHITECTURE
"How is the platform structured?"

PIPELINE
"How does data move and transform?"

SCENARIOS
"What happens when real engineering conditions occur?"

DATA MODEL
"How is the data organized and modeled?"

QUALITY
"How is data validated and protected from bad data?"

SECURITY
"How is access and platform security structured?"

MONITORING
"How is the platform observed and alerted?"

INTERVIEW
"Can I explain this project like an engineer?"

Do NOT make every page look like the same collection of cards.

Each screen needs its own visual metaphor.

==================================================
3. GLOBAL VISUAL LANGUAGE
==================================================

Preserve the approved technical aesthetic:

- near-black / graphite background
- dark navy surfaces
- cyan primary interaction
- emerald secondary/healthy state
- amber/orange for Bronze/data warnings
- violet can be used sparingly for transformation/modeling
- monospace technical labels
- geometric typography
- thin technical borders
- subtle grid/topology background
- restrained glass effects
- controlled glow
- high contrast
- premium engineering-tool feeling

Avoid:
- generic SaaS dashboard
- excessive rounded cards
- giant empty panels
- unnecessary gradients
- decorative 3D effects with no semantic meaning
- random animations

Every animation must communicate something.

==================================================
4. GLOBAL ANIMATION SYSTEM
==================================================

This is CRITICAL.

The project experience should have an ALWAYS-ON visual language.

Use Framer Motion / SVG / CSS motion concepts.

Animations should represent real engineering concepts:

DATA PACKETS
small luminous packets traveling through pipeline paths.

TRANSFORMATION
data visually changes state between layers.

VALIDATION
records pass through validation gates.

SECURITY
identity/access signals move through control points.

MONITORING
telemetry signals continuously travel toward monitoring/alerting.

SCHEMA
relationships pulse subtly between documented entities.

SCENARIOS
selected scenario activates only its documented path.

IMPORTANT:

Animation must never:
- cause layout overflow
- hide content
- replace readable information
- become visually noisy
- interfere with accessibility

Support prefers-reduced-motion.

When reduced motion is enabled:
- disable continuous packet movement
- retain static highlighted paths
- retain readable state indicators
- retain interaction feedback

==================================================
5. OVERVIEW — MAKE IT FEEL ALIVE
==================================================

The current Overview has too much empty space.

Do NOT simply add more cards.

Create a "Platform Control Room" composition.

Suggested structure:

TOP:
VoltGrid AU
Azure Data Engineering Architecture
source verification badges

CENTER:
LIVE ARCHITECTURE STRIP

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

Animate a small data packet continuously through the documented architecture.

Below/around the architecture show compact source-derived telemetry:

28 SOURCES
6 LAYERS
33 SCENARIOS
19 TECHNOLOGIES

These should feel like system telemetry, not marketing cards.

Add a "SYSTEM CHARACTERISTICS" area using only documented information.

The Overview should visually establish that this is a functioning data platform.

==================================================
6. ARCHITECTURE — IMPROVE THE EXISTING SCREEN
==================================================

Keep the approved architecture concept.

But increase information density and visual explanation.

Use:

SOURCE → INGESTION → BRONZE → SILVER → GOLD → SERVING

Show documented source categories feeding ingestion.

Examples only when present in dataset:
- IoT Charger Telemetry
- Enterprise Batch Sources
- External APIs
- Invoice PDFs

Show documented ingestion paths.

Data packets should move continuously.

When a user selects a node:

- highlight node
- highlight incoming/outgoing connections
- dim unrelated nodes
- show a compact technical inspector

Inspector should contain source-derived:
- function
- layer
- technology
- documented details

Do not invent.

==================================================
7. PIPELINE — MAJOR ANIMATED EXPERIENCE
==================================================

Pipeline MUST NOT be a static list.

It should visually explain:

HOW DATA MOVES.

Create an interactive pipeline timeline / flow:

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

Animate data packets traveling through the stages.

Each stage should have:
- stage name
- documented technology
- documented processing purpose
- animated activity indicator

When a stage is selected:

1. pause/focus its path
2. highlight the stage
3. show technical details
4. show documented transformations
5. show relevant scenarios where available

For Silver especially, visually communicate documented transformations such as:
- deduplication
- watermarking
- cleansing
- enrichment

ONLY if present in verified data.

Use transformation animation:

RAW RECORD
→
VALIDATED RECORD
→
CURATED RECORD

Do not invent record examples if the source does not provide them.

==================================================
8. SCENARIOS — REBUILD THE EXPERIENCE
==================================================

The Scenario screen needs significant improvement.

Keep the 33 verified scenarios.

Layout:

LEFT:
Scenario command list

CENTER:
Scenario execution visualization

RIGHT:
Scenario detail inspector

Desktop:

┌───────────────┬────────────────────────┬──────────────────┐
│ Scenario      │ Active Scenario Flow   │ Documentation    │
│ Library       │                        │ / Resolution     │
│               │ animated path          │                  │
└───────────────┴────────────────────────┴──────────────────┘

NO HORIZONTAL PAGE OVERFLOW.

The right panel must always remain inside viewport.

Scenario content MUST NOT be removed.

Each selected scenario should preserve:
- title
- layer
- documented condition/description
- documented handling/resolution
- relevant source-derived technical details

The animation should activate the documented path only.

==================================================
9. DATA MODEL — MAKE THIS A MAJOR FEATURE
==================================================

THIS SCREEN NEEDS A LARGE IMPROVEMENT.

Do NOT present Data Model as a simple table.

Make it a visual DATA MODEL EXPLORER.

Primary visualization:

DOCUMENTED DATA TOPOLOGY

FACTS
   ↕
DIMENSIONS

Use nodes representing the documented fact and dimension tables.

Each node should show:

TABLE NAME
GRAIN
SCD TYPE
(optional documented examples)

Only relationships documented in the verified dataset may be drawn.

NO invented foreign-key relationships.

NO assumed relationships.

NO generic star schema relationships unless explicitly documented.

Use an elegant topology layout:

                 DIMENSION
                    │
                    │
DIMENSION ───── FACT ───── DIMENSION
                    │
                 DIMENSION

But generate the actual topology from the verified dataset.

Animation:

- subtle pulse around active table
- relationship lines gently illuminate
- a small data pulse can travel along documented relationships
- selecting a fact highlights connected documented dimensions
- selecting a dimension highlights its documented relationship(s)

Right-side inspector:

TABLE
GRAIN
SCD
ROLE
DOCUMENTED DETAILS

For dimensions:
show SCD type if documented.

For facts:
show grain.

Add a toggle:

TOPOLOGY | TABLE VIEW

TABLE VIEW can provide a structured readable list.

Topology should remain the visual centerpiece.

==================================================
10. DATA QUALITY — ANIMATED VALIDATION PIPELINE
==================================================

Quality should NOT look like static checklist cards.

Create:

DATA QUALITY CONTROL LOOP

Incoming Data
     ↓
VALIDATION
     ↓
QUALITY CHECK
     ↓
PASS / FLAG
     ↓
CURATED DATA

Animate records entering validation.

For documented checks:
- visualize the check
- show its purpose
- show the layer
- show documented response/handling

Example if documented:

charger temperature
        ↓
threshold validation
        ↓
alert / handling

Do NOT invent thresholds.

If the source documents a threshold such as charger overheating >75°C, it may be visualized exactly as documented.

Use animated:
- check pulses
- validation gates
- pass/flag transitions
- alert signals

Do NOT create fake percentages like:
99.9% quality
98% valid
etc.

Unless documented, never show numeric quality scores.

==================================================
11. SECURITY — ANIMATED TRUST BOUNDARY
==================================================

Security should feel like an architecture security map.

Create:

IDENTITY
   ↓
AUTHENTICATION
   ↓
AUTHORIZATION
   ↓
RESOURCE
   ↓
AUDIT / CONTROL

Use documented security technologies and controls.

For example, where documented:
- Entra ID
- RBAC
- Managed Identity

Visualize access signals moving through the control layers.

Example conceptual animation:

USER / SERVICE
      │
      ▼
IDENTITY
      │
      ▼
RBAC
      │
      ▼
AZURE RESOURCE

Selecting a control should illuminate its documented scope.

Do NOT invent:
- MFA
- encryption algorithms
- zero trust claims
- compliance certifications
- security scores

unless explicitly documented.

==================================================
12. MONITORING — ANIMATED OBSERVABILITY WORKSPACE
==================================================

Monitoring should look like a real observability system.

Create:

PIPELINE
   ↓
TELEMETRY
   ↓
MONITORING
   ↓
ALERT
   ↓
OPERATOR / ACTION

Animate small telemetry signals flowing from the pipeline toward monitoring.

Create an observability topology rather than fake charts.

Show documented monitoring concepts:
- pipeline monitoring
- data quality alerts
- operational alerts
- documented thresholds/conditions

If the dataset contains a documented alert such as charger overheating >75°C,
visualize it exactly.

Do NOT invent:
- CPU graphs
- fake uptime
- fake latency
- fake throughput
- fake incident counts
- fake SLA percentages

Instead use "DOCUMENTED SIGNAL", "DOCUMENTED ALERT", etc.

==================================================
13. INTERVIEW MODE
==================================================

Keep Interview Mode as an engineering interview workspace.

Use a terminal / technical interview visual language.

Questions should come from the verified interview dataset.

No fake AI grading.

No fake scores.

Use:
QUESTION
KEY POINTS
SOURCE-GROUNDED EXPLANATION
SELF ASSESSMENT

==================================================
14. NAVIGATION
==================================================

Persistent project navigation:

OVERVIEW
ARCHITECTURE
PIPELINE
SCENARIOS
DATA MODEL
QUALITY
SECURITY
MONITORING
INTERVIEW

Active tab must be obvious.

Navigation should feel like an engineering control console.

On smaller screens:
convert to a horizontally scrollable contained navigation strip OR compact menu.

Do NOT cause page-level horizontal overflow.

==================================================
15. RESPONSIVE DESIGN
==================================================

Test:

1440
1280
1024
768
390

Desktop:
multi-column engineering workspaces.

Tablet:
stack intelligently.

Mobile:
vertical technical workflow.

Never:
- clip panels
- overlap content
- push content outside viewport
- hide critical scenario/model information

The page itself must have:

overflow-x: hidden

but DO NOT use this to hide broken layouts.

Fix the layout itself.

==================================================
16. VISUAL HIERARCHY
==================================================

Avoid making every section a card.

Use different visual structures:

Overview:
control room

Architecture:
topology graph

Pipeline:
animated process flow

Scenarios:
command/execution workspace

Data Model:
schema topology

Quality:
validation pipeline

Security:
trust/access graph

Monitoring:
observability topology

Interview:
technical terminal

This distinction is essential.

==================================================
17. MICRO-INTERACTIONS
==================================================

Add meaningful micro-interactions:

Hover:
- node glow
- border illumination
- connection emphasis

Click:
- focus state
- connected-path highlighting

Selection:
- smooth transition
- inspector update

Navigation:
- active indicator movement

Data packets:
- continuous but restrained

Use Framer Motion.

Avoid excessive bouncing or flashy effects.

==================================================
18. SOURCE FIDELITY AUDIT
==================================================

Before finalizing:

Compare every screen against:

data/verified-projects/voltgrid-au.json

Verify:

✓ 28 sources where documented
✓ 6 architecture layers
✓ 33 scenarios
✓ 19 technologies
✓ all documented dimensions
✓ all documented facts
✓ grains preserved
✓ SCD types preserved
✓ documented pipeline stages
✓ documented quality checks
✓ documented security controls
✓ documented monitoring
✓ interview content preserved

No fabricated content.

==================================================
19. BROWSER QA
==================================================

Actually run and inspect the application.

Test every route:

/projects
/projects/voltgrid-au
/projects/voltgrid-au?section=overview
/projects/voltgrid-au?section=architecture
/projects/voltgrid-au?section=pipeline
/projects/voltgrid-au?section=scenarios
/projects/voltgrid-au?section=data-model
/projects/voltgrid-au?section=quality
/projects/voltgrid-au?section=security
/projects/voltgrid-au?section=monitoring
/projects/voltgrid-au?section=interview

Verify:

✓ no horizontal overflow
✓ no clipped panels
✓ no overlapping panels
✓ no missing source-derived content
✓ animations run
✓ animations remain contained
✓ reduced-motion works
✓ mobile works
✓ desktop works
✓ navigation works
✓ data model topology is readable
✓ pipeline animation works
✓ quality animation works
✓ security animation works
✓ monitoring animation works
✓ scenario animation works

==================================================
20. PROTECTED SYSTEMS
==================================================

DO NOT MODIFY:

- Homepage
- Fundamental 50
- Fundamental 50 animation system
- InteractionRegistry
- SQL screens
- existing Question system
- unrelated routes

Projects only.

==================================================
21. IMPLEMENTATION STRATEGY
==================================================

This is now a MAJOR UX IMPROVEMENT.

Do NOT generate a superficial visual refresh.

Think like a senior product designer designing:

"Databricks + cloud architecture diagram + observability console + interactive learning platform"

but do NOT copy any company's UI.

The goal is:

ENGINEERING UNDERSTANDING THROUGH VISUAL INTERACTION.

Every animation must explain something.

Every panel must have a purpose.

Every source-derived fact must remain accessible.

==================================================
FINAL DELIVERABLE
==================================================

Generate/revise the complete Project design system for:

1. Overview
2. Architecture
3. Pipeline
4. Scenarios
5. Data Model
6. Quality
7. Security
8. Monitoring
9. Interview

Especially improve:

DATA MODEL
PIPELINE
QUALITY
SECURITY
MONITORING

with meaningful always-on animations.

Do not write React code yet if this is being handled as a Stitch design pass.

First produce the complete approved visual design.

Then STOP and report:

1. What changed on each screen
2. Which animations were introduced
3. How Data Model topology works
4. How Pipeline animation works
5. How Quality animation works
6. How Security animation works
7. How Monitoring animation works
8. How Scenario content was preserved
9. Responsive verification results
10. Reduced-motion verification
11. Source-fidelity verification
12. Confirmation that protected systems were untouched
