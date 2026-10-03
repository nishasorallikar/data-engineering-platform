# ANTIGRAVITY — PROJECTS PHASE 1
# VERIFIED PROJECT DATASET — VOLTGRID AU FIRST

---

# STATUS

PHASE 0 — APPROVED

The Project Discovery & Architecture Audit is complete.

We are now moving to:

# PHASE 1 — VERIFIED PROJECT DATASET

The first project to structure is:

# VoltGrid AU

Selection is based ONLY on source completeness.

This is NOT a ranking of projects.

---

# 🔒 PROTECTED SYSTEMS

DO NOT MODIFY:

## Fundamental 50

- existing questions
- existing question mappings
- InteractionRegistry
- existing interactive components
- Framer Motion animations
- animation timing
- animation behavior
- question routes

## Homepage

DO NOT MODIFY:

- Hero
- Hero animations
- Navbar
- Homepage layout
- Fundamental 50 section
- existing glassmorphic design
- homepage animations

## SQL

Do NOT build or modify SQL Lab during this phase.

---

# OBJECTIVE

Convert the verified VoltGrid AU source material into a clean,
source-faithful project dataset.

Pipeline:

SOURCE
↓
EXTRACTION
↓
NORMALIZATION
↓
STRUCTURING
↓
VALIDATION
↓
VERIFIED PROJECT DATASET

Do NOT build the Project UI yet.

Do NOT build animations yet.

Do NOT create project routes yet.

---

# SOURCE OF TRUTH

Use:

`VoltGrid_AU_Azure_Data_Engineering_Architecture.pdf`

as the authoritative source for VoltGrid-specific facts.

Preserve the terminology used by the source.

Do NOT silently replace source terminology with generic Data Engineering terminology.

---

# REQUIRED PROJECT DATA

Create a normalized VoltGrid project record containing:

```ts
{
  id,
  slug,
  title,
  domain,
  summary,
  businessProblem,

  architecture: {
    type,
    cloud,
    flow
  },

  sourceSystems: [],

  ingestion: [],
  processing: [],
  storage: [],
  serving: [],

  dataQuality: [],
  security: [],
  orchestration: [],
  monitoring: [],

  technologies: [],

  scenarios: [],

  dataModel: {
    dimensions: [],
    facts: []
  },

  interviewTalkingPoints: [],

  sourceReferences: [],
  sourceType
}
```

Only keep fields that have actual source-backed content.

---

# SOURCE FIDELITY RULE

Every factual field must come from the source.

Use:

```text
SOURCE-DERIVED
```

for directly supported content.

Use:

```text
GENERATED
```

only if an educational explanation is created separately.

Never mix generated explanations with source-derived project facts.

---

# DO NOT INVENT

Do NOT invent:

- project metrics
- record counts
- users
- business results
- technologies
- Azure services
- architecture layers
- source systems
- pipeline stages
- table names
- column names
- dimensions
- facts
- grains
- SCD types
- monitoring rules
- security controls
- scenarios
- interview questions
- implementation details

If the source does not document something:

```text
NOT DOCUMENTED
```

Do not fill the gap with general knowledge.

---

# DATA EXTRACTION AREAS

Extract and normalize the following.

## 1. PROJECT OVERVIEW

Capture source-supported:

- client
- domain
- geography
- business model
- scale
- cloud
- architecture
- processing
- serving

---

# 2. HIGH-LEVEL ARCHITECTURE

Capture the documented architecture flow.

Preserve the source's actual terminology.

Represent the architecture structurally:

```text
Source Systems
↓
Ingestion
↓
Bronze
↓
Silver
↓
Gold
↓
Serving
```

Do not add undocumented layers.

---

# 3. SOURCE SYSTEMS

Extract every documented source system.

For each:

```ts
{
  name,
  format,
  ingestionPath,
  frequency
}
```

Do not summarize away important source-specific distinctions.

---

# 4. INGESTION

Separate documented ingestion paths.

For example, if explicitly documented:

```text
Streaming
Batch
PDF / Document
CDC
```

For each capture:

- technology
- source
- destination
- frequency
- documented engineering pattern

---

# 5. BRONZE

Capture:

- storage location
- folder/path conventions
- ingestion metadata
- design principles
- documented retention or immutability behavior

Do not invent additional Bronze conventions.

---

# 6. SILVER

Capture:

- transformations
- deduplication
- SLA mapping
- masking
- schema handling
- documented Silver tables

Preserve source-specific terminology.

---

# 7. GOLD

Capture:

- dimensions
- facts
- grain
- SCD type
- documented metrics
- business logic

Do not invent undocumented columns.

---

# 8. SERVING

Capture documented serving systems and their roles.

For example, if explicitly documented:

```text
Synapse
Cosmos DB
APIs
Power BI
```

Do not add alternative serving technologies.

---

# 9. REAL-TIME ALERTING

Extract documented:

- event
- condition
- detection
- action
- destination

Preserve the source logic.

---

# 10. DATA QUALITY

Extract actual documented checks.

Organize by:

```text
Bronze → Silver
Silver → Gold
```

Do not invent quality rules.

---

# 11. SECURITY

Extract documented:

- identity
- RBAC
- secrets
- privacy
- encryption
- row-level security
- access controls

Use the source terminology.

---

# 12. ORCHESTRATION / CI/CD

Extract:

- ADF pipelines
- Databricks jobs
- dependencies
- scheduling
- Azure DevOps
- deployment approach

Only if documented.

---

# 13. MONITORING

Extract documented monitoring signals.

For example:

- pipeline failures
- streaming lag
- freshness
- alerts

Do not create undocumented monitoring metrics.

---

# 14. DATA MODEL

Extract the documented Gold data model.

For every dimension:

```ts
{
  name,
  grain,
  scd,
  documentedAttributes
}
```

For every fact:

```ts
{
  name,
  grain,
  documentedMetrics
}
```

Do NOT invent columns.

---

# 15. SCENARIOS

Extract every documented scenario.

For each:

```ts
{
  layer,
  scenario,
  detection,
  handling,
  outcome
}
```

If one of these fields is not explicitly documented:

```text
NOT DOCUMENTED
```

---

# 16. DASHBOARDS / SERVING USE CASES

Extract documented dashboard views and focus areas.

Do not create additional dashboards.

---

# 17. AZURE SERVICES

Create a normalized technology list:

```ts
{
  name,
  architecturalRole
}
```

The role must come from the source.

Do not describe a service using generic knowledge if the source gives a specific role.

---

# 18. INTERVIEW MATERIAL

Extract documented interview talking points.

Do NOT create new interview questions yet.

Do NOT generate answers.

This phase is source normalization only.

---

# VALIDATION

Before creating the dataset, validate:

## IDs

- unique project ID
- unique slug

## Source integrity

- every major field has source support
- no fabricated facts
- no duplicated content
- no unrelated PDF contamination

## Architecture

- source → ingestion → Bronze → Silver → Gold → serving is internally consistent
- streaming and batch paths remain distinguishable where documented

## Data model

- every dimension is source-supported
- every fact is source-supported
- grain is not invented
- SCD type is not invented

## Technologies

- every technology is source-supported
- no generic technology additions

## Scenarios

- every scenario is source-supported

---

# OUTPUT FILES

Create:

```text
data/
  verified-projects/
    voltgrid-au.json
```

If the existing project uses another verified-data directory convention,
reuse that convention instead of creating a conflicting structure.

Do NOT create the MongoDB model yet unless required by the existing
project's established ingestion architecture.

The primary deliverable of this phase is the VERIFIED DATASET.

---

# SOURCE TRACEABILITY

Each major section should retain source references.

Example:

```ts
sourceReferences: [
  {
    section: "High-Level Architecture",
    source: "VoltGrid_AU_Azure_Data_Engineering_Architecture.pdf"
  }
]
```

Use the existing project's actual source-reference convention if one exists.

---

# TESTING

Create validation checks for the dataset.

Verify:

- JSON/schema validity
- required fields
- no duplicate IDs
- no duplicate technologies
- no malformed arrays
- no empty critical sections
- source references present
- no accidental SQL/Fundamental 50 contamination

---

# 🚨 DO NOT BUILD

This phase must NOT build:

- `/projects`
- `/projects/[slug]`
- ProjectCard changes
- architecture UI
- animation components
- architecture explorer
- scenario UI
- interview UI
- progress UI
- bookmarks
- database migration
- Homepage changes
- Fundamental 50 changes
- SQL Lab

---

# REQUIRED REPORT

Return:

## PHASE 1 — VERIFIED PROJECT DATASET

### Source processed
...

### Dataset created
...

### Sections extracted
...

### Validation results
...

### Source gaps
...

### Generated content
...

### Files added
...

### Files modified
...

### Protected systems untouched
...

### Browser verification
Not applicable — data-only phase.

### Known issues
...

---

# 🛑 HARD STOP

After creating and validating the VoltGrid verified dataset:

STOP.

Do NOT automatically continue to Phase 2.

Do NOT build the Project Library.

Wait for approval.
