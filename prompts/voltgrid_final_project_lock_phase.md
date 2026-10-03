# FINAL PROJECT FINISHING PHASE — VOLTGRID AU
## Data Model Rebuild + Full Project QA + Final Lock

We are now in the FINAL finishing phase for the VoltGrid AU Project experience.

The project is functionally implemented, but the Data Model experience still needs a serious UX improvement and the entire Project experience needs one final consistency/source-fidelity/browser QA pass.

DO NOT treat this as another broad redesign.

This is the final refinement + verification phase.

============================================================
0. PRIMARY OBJECTIVE
============================================================

Finish the VoltGrid Project experience so it can be LOCKED.

The sequence is:

DATA MODEL REBUILD
↓
ALL PROJECT SCREENS CONSISTENCY PASS
↓
SOURCE FIDELITY AUDIT
↓
DESKTOP QA
↓
TABLET QA
↓
MOBILE QA
↓
REDUCED MOTION QA
↓
REGRESSION QA
↓
FINAL PROJECT LOCK

After successful verification, STOP.

============================================================
1. SOURCE OF TRUTH
============================================================

Authoritative dataset:

data/verified-projects/voltgrid-au.json

Use the verified dataset as the only source for project-specific facts.

DO NOT invent:

- columns
- foreign keys
- relationships
- technologies
- metrics
- SLAs
- performance numbers
- business outcomes
- security controls
- monitoring metrics
- quality percentages
- scenario behavior
- architecture components

If information is unavailable:

"Not documented in source"

Do not replace missing information with generic Data Engineering assumptions.

============================================================
2. CRITICAL DATA MODEL PROBLEM
============================================================

The current Data Model screen is technically functional but visually weak.

Current problem:

The selected table displays a huge empty area:

SCHEMA / COLUMNS

"Schema columns not documented in source"

This makes the screen feel unfinished.

DO NOT fabricate columns to fill the space.

Instead, redesign the information hierarchy around the information that IS documented.

The absence of column definitions should be a small source-status message, not the main visual element.

============================================================
3. DATA MODEL — NEW INFORMATION HIERARCHY
============================================================

The Data Model screen must have two modes:

TOPOLOGY
TABLE VIEW

TOPOLOGY should be the DEFAULT mode.

TABLE VIEW is the secondary structured representation.

============================================================
4. DATA MODEL — TOPOLOGY MODE
============================================================

Make the schema topology the visual centerpiece.

The topology must be generated ONLY from documented data.

Do not invent relationships.

Do not assume that every dimension connects to every fact.

Do not create a generic star schema.

Only render relationships explicitly supported by:

data/verified-projects/voltgrid-au.json

Conceptual example only:

                 DIMENSION
                    │
                    │
DIMENSION ───── FACT TABLE ───── DIMENSION
                    │
                 DIMENSION

The actual topology must come from the verified dataset.

============================================================
5. FACT / DIMENSION GROUPING
============================================================

The left-side table browser must clearly distinguish:

FACT TABLES
DIMENSION TABLES

Example structure:

FACT TABLES · 9

FactChargingSession
One row per session

FactEnergyConsumption
Charger + hour

FactPayments
One row per payment

...

DIMENSION TABLES · 13

DimCharger
[documented grain/details]

DimLocation
[documented grain/details]

...

Do not invent counts.

Load the actual counts from the dataset.

Use source-derived names exactly.

============================================================
6. TABLE NODE DESIGN
============================================================

Every topology node should visually communicate:

TABLE NAME

TYPE:
FACT / DIMENSION

GRAIN:
[source-derived grain]

SCD:
[source-derived SCD information, if documented]

Do not write:

"SCD: N/A"

unless that is actually supported by the source.

If not documented:

"SCD: Not documented"

Keep node content compact.

============================================================
7. TABLE SELECTION ANIMATION
============================================================

When a table is selected:

1. selected node gets a subtle glow
2. selected node scales very slightly
3. documented relationships illuminate
4. unrelated nodes dim
5. a subtle data pulse may travel along documented relationships
6. inspector smoothly updates

Do not animate relationships that do not exist in the source.

Animation must communicate:

"These are the documented relationships connected to this table."

============================================================
8. DATA MODEL INSPECTOR
============================================================

The right-side inspector should become useful even when columns are unavailable.

Example:

FACT CHARGING SESSION
────────────────────────────

TYPE
FACT

GRAIN
One row per session

SCD
Not documented in source

ROLE
Charging session fact

DOCUMENTED DETAILS
[source-derived information]

────────────────────────────

SCHEMA COLUMNS

Not documented in source.

Do not make the final message occupy a giant empty panel.

Use compact information blocks.

============================================================
9. TABLE VIEW
============================================================

TABLE VIEW must be a useful alternative to topology.

Create a structured table:

| Table | Type | Grain | SCD |
|------|------|-------|-----|

Only populate fields supported by the dataset.

Selecting a row should open the same inspector.

Table View must not become another collection of large cards.

============================================================
10. DATA MODEL VISUAL LANGUAGE
============================================================

Use a schema/database engineering aesthetic.

Visual hierarchy:

TABLE
→ GRAIN
→ SCD
→ RELATIONSHIPS
→ DOCUMENTED DETAILS

Use:

- cyan for active selection
- emerald for fact/healthy/system state where semantically appropriate
- violet for modeling
- subtle connection lines
- subtle grid
- restrained glow

Avoid:

- giant empty boxes
- excessive rounded cards
- generic dashboard widgets
- decorative graphics with no semantic meaning

============================================================
11. DATA MODEL RESPONSIVENESS
============================================================

Desktop:

LEFT:
Table browser

CENTER:
Topology

RIGHT:
Inspector

Example:

┌─────────────┬──────────────────────────┬─────────────────┐
│ TABLES      │ SCHEMA TOPOLOGY          │ INSPECTOR       │
│             │                          │                 │
│ FACTS       │      DIM                 │ FACT             │
│ DIMENSIONS  │       │                  │ Grain            │
│             │ FACT ── DIM              │ SCD              │
│             │       │                  │ Details          │
└─────────────┴──────────────────────────┴─────────────────┘

Tablet:

Stack:

TABLES
↓
TOPOLOGY
↓
INSPECTOR

Mobile:

TABLE SELECTOR
↓
TOPOLOGY
↓
INSPECTOR

No page-level horizontal overflow.

============================================================
12. DO NOT BREAK SOURCE FIDELITY
============================================================

Before finalizing Data Model:

Audit:

- all documented facts
- all documented dimensions
- all documented grains
- all documented SCD information
- all documented relationships
- all documented descriptions/details

Do not silently remove tables.

Do not silently change names.

Do not invent relationships.

============================================================
13. FULL PROJECT CONSISTENCY PASS
============================================================

After Data Model is fixed, inspect every Project screen.

Screens:

1. Overview
2. Architecture
3. Pipeline
4. Scenarios
5. Data Model
6. Quality
7. Security
8. Monitoring
9. Interview

They should feel like one product.

However, DO NOT make them identical.

Each should retain its own engineering metaphor:

OVERVIEW
Platform Control Room

ARCHITECTURE
System Topology

PIPELINE
Data Movement / Transformation

SCENARIOS
Scenario Execution Workspace

DATA MODEL
Schema Topology

QUALITY
Validation Pipeline

SECURITY
Trust / Access Architecture

MONITORING
Observability Topology

INTERVIEW
Engineering Interview Console

============================================================
14. GLOBAL VISUAL CONSISTENCY
============================================================

Verify consistency of:

- typography
- spacing
- navigation
- borders
- glow intensity
- panel hierarchy
- technical labels
- active states
- loading states
- empty states
- hover behavior
- focus behavior
- animation speed
- reduced-motion behavior

Do not redesign working screens unnecessarily.

Fix only inconsistencies and obvious weaknesses.

============================================================
15. GLOBAL ANIMATION QA
============================================================

Verify that meaningful animations exist where already implemented:

ARCHITECTURE
data packets / active path

PIPELINE
data movement / transformation

SCENARIOS
selected scenario path

DATA MODEL
relationship illumination / schema pulse

QUALITY
validation/check animation

SECURITY
documented security/control signal

MONITORING
telemetry signal

INTERVIEW
subtle technical interaction feedback

Animations must:

- remain contained
- never cause overflow
- never hide information
- never reduce readability
- respect reduced motion

============================================================
16. SCENARIO FINAL CHECK
============================================================

Verify all 33 documented scenarios.

For each scenario:

✓ title preserved
✓ layer preserved
✓ documented logic preserved
✓ documented handling preserved
✓ relevant source information preserved

The UI may reorganize information.

It must not remove source-derived content.

Check the previous horizontal-overflow problem again.

Desktop:

LEFT SCENARIO LIST
+
CENTER FLOW
+
RIGHT DETAILS

must all remain visible.

============================================================
17. PIPELINE FINAL CHECK
============================================================

Verify:

SOURCE
→ INGESTION
→ BRONZE
→ SILVER
→ GOLD
→ SERVING

The flow must remain responsive.

Verify that source-derived processing details are preserved.

Do not add undocumented transformations.

============================================================
18. QUALITY FINAL CHECK
============================================================

Verify that quality checks come from the verified dataset.

No fake:

- quality scores
- percentages
- record counts
- SLA values

If a documented threshold/condition exists, display it exactly as documented.

============================================================
19. SECURITY FINAL CHECK
============================================================

Audit every displayed security technology/control against the dataset.

For example, if implementation contains:

- Entra ID
- RBAC
- Managed Identity
- VNet integration
- TDE

verify each one against the source.

Remove anything unsupported.

Do not invent compliance or security claims.

============================================================
20. MONITORING FINAL CHECK
============================================================

Verify monitoring information against the source.

No fabricated:

- uptime
- latency
- throughput
- incident counts
- CPU utilization
- SLA percentages

Only documented monitoring/alerting information.

============================================================
21. OVERVIEW FINAL CHECK
============================================================

Overview should not feel empty.

Ensure the primary architecture visualization remains the visual centerpiece.

If source-derived project metrics are shown, they must come from the dataset.

For example, only if actually loaded:

- 28 sources
- 6 architecture layers
- 33 scenarios
- 19 technologies

Do not hardcode unsupported values.

============================================================
22. BROWSER QA — MANDATORY
============================================================

Actually run the application.

Test:

/projects
/projects/voltgrid-au

Then inspect:

OVERVIEW
ARCHITECTURE
PIPELINE
SCENARIOS
DATA MODEL
QUALITY
SECURITY
MONITORING
INTERVIEW

Viewport testing:

1440 × desktop
1280 × desktop
1024 × tablet
768 × tablet
390 × mobile

Verify:

✓ no horizontal page overflow
✓ no clipped right panels
✓ no overlapping panels
✓ no text disappearing
✓ no broken scroll areas
✓ no broken topology
✓ no broken animations
✓ no runtime errors
✓ no console errors caused by Project UI
✓ navigation works
✓ selected states work
✓ responsive layout works

============================================================
23. REDUCED MOTION QA
============================================================

Enable prefers-reduced-motion.

Verify:

✓ continuous packet motion stops
✓ scanning animations stop
✓ topology remains visible
✓ active states remain understandable
✓ interaction still works
✓ no information depends on animation

============================================================
24. REGRESSION QA — PROTECTED SYSTEMS
============================================================

After Project changes, verify:

Homepage
Fundamental 50
Fundamental 50 animations
SQL
InteractionRegistry

DO NOT MODIFY these systems.

If regression occurs:

FIX THE PROJECT CHANGE.

Do not modify protected systems to compensate.

============================================================
25. CODE QUALITY
============================================================

Check for:

- React runtime errors
- rendering objects directly
- missing keys
- invalid responsive CSS
- unnecessary fixed widths
- unsafe assumptions about dataset structure
- duplicated project data
- hardcoded project-specific facts where API/data should be used
- broken loading states
- broken empty states

The previous issue where complex source-system objects were rendered directly must remain fixed.

Safely normalize structured data before rendering.

============================================================
26. FINAL ACCEPTANCE CRITERIA
============================================================

The Project experience can only be considered COMPLETE when:

✓ Data Model is visually strong
✓ Data Model topology is source-faithful
✓ Data Model Table View is useful
✓ all documented facts/dimensions are accessible
✓ no undocumented relationships are invented
✓ Scenario workspace has no overflow
✓ all 33 scenarios retain their information
✓ Pipeline is animated
✓ Quality is animated
✓ Security is animated
✓ Monitoring is animated
✓ Architecture is animated
✓ Overview is visually strong
✓ all screens feel like one product
✓ desktop works
✓ tablet works
✓ mobile works
✓ reduced motion works
✓ source fidelity passes
✓ protected systems pass regression
✓ no Project runtime errors

============================================================
27. FINAL REPORT
============================================================

After all implementation and browser verification:

STOP.

Report:

1. Data Model changes
2. Scenario changes
3. Pipeline changes
4. Quality changes
5. Security changes
6. Monitoring changes
7. Architecture changes
8. Overview changes
9. Interview changes
10. Animation verification
11. Source-fidelity audit
12. Desktop results
13. Tablet results
14. Mobile results
15. Reduced-motion results
16. Regression results
17. Runtime/console errors, if any
18. Remaining source limitations, if any
19. Confirmation that protected systems were untouched

IMPORTANT:

Do not report "complete" unless the browser verification was actually performed.

Once all acceptance criteria pass:

PROJECT EXPERIENCE = LOCKED

STOP.
