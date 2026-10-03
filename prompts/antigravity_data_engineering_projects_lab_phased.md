# ANTIGRAVITY — PHASE 2: DATA ENGINEERING PROJECTS LAB
# SOURCE-GROUNDED, INTERACTIVE PROJECT EXPERIENCE

## PROJECT DECISION

We are NOT building the SQL Interview Lab next.

The next major module is:

# DATA ENGINEERING PROJECTS LAB

The platform already has substantial project source material, including metadata-driven ingestion, Snowflake/dbt modeling, data lineage automation, ETL-to-ELT modernization, cross-database loading, GCP/Snowflake platforms, workforce migration, reporting automation, e-commerce analytics, EV charging, healthcare migration, and VoltGrid AU architecture.

The uploaded sources must be treated as the source of truth.

Do NOT invent:
- project metrics
- companies
- technologies
- responsibilities
- architecture components
- business outcomes
- dataset sizes
- implementation claims

If a point is not supported by the source, mark it as unavailable.

---

# 🔒 PROTECTED EXISTING SYSTEMS

DO NOT modify:

## Fundamental 50
- existing animations
- existing interactive question components
- InteractionRegistry
- question mappings
- animation timing
- Framer Motion behavior

## Homepage
Do NOT redesign the Homepage or change:
- Hero design
- Hero animations
- Navbar
- Homepage layout
- Fundamental 50 section
- homepage animation system

Projects Lab is a NEW module.

---

# 🎯 PROJECT LAB OBJECTIVE

The learner should not merely read a project description.

They should understand:

BUSINESS PROBLEM
↓
SOURCE SYSTEMS
↓
INGESTION
↓
RAW / BRONZE
↓
TRANSFORMATION
↓
SILVER
↓
GOLD / MODEL
↓
SERVING
↓
MONITORING
↓
BUSINESS OUTCOME

Then:

UNDERSTAND
↓
EXPLORE
↓
TRACE
↓
DEBUG
↓
EXPLAIN
↓
INTERVIEW

---

# IMPLEMENTATION STRATEGY

Do NOT build every project at once.

Use strict phases:

PHASE 0 — Source + architecture audit
PHASE 1 — Project content model + verified dataset
PHASE 2 — Project library
PHASE 3 — One complete interactive project
PHASE 4 — Architecture explorer
PHASE 5 — Pipeline/scenario explorer
PHASE 6 — Project interview mode
PHASE 7 — Scale verified projects
PHASE 8 — Progress/bookmarks
PHASE 9 — Full browser QA

After every phase:

IMPLEMENT
↓
BUILD
↓
RUN
↓
BROWSER VERIFY
↓
REPORT
↓
STOP

Do NOT silently continue.

---

# PHASE 0 — SOURCE & ARCHITECTURE AUDIT

Inspect the uploaded/project source material and existing application.

Identify for every project:

- project name
- domain
- business problem
- project brief
- architecture
- responsibilities
- technology stack
- documented data scale
- documented outcomes
- source systems
- ingestion
- storage
- transformation
- serving
- orchestration
- monitoring
- security
- data quality
- CI/CD
- documented scenarios
- documented interview talking points

Create:

| Project | Source | Domain | Architecture | Technologies | Scale | Scenarios | Interview Material |
|---|---|---|---|---|---|---|---|

Use:
VERIFIED / MISSING / CONFLICT

Do NOT modify code.
Do NOT ingest sources into MongoDB yet.
Do NOT build UI.

## STOP AFTER PHASE 0.

---

# PHASE 1 — VERIFIED PROJECT DATASET

Create a normalized project dataset.

Suggested structure:

```ts
{
  id,
  slug,
  title,
  domain,
  summary,
  businessProblem,
  architecture,
  sourceSystems,
  ingestion,
  processing,
  storage,
  serving,
  orchestration,
  monitoring,
  security,
  dataQuality,
  technologies,
  responsibilities,
  scale,
  outcomes,
  scenarios,
  interviewTalkingPoints,
  sourceReferences,
  sourceType
}
```

Do not add fields without source-backed value.

Preserve source references.

Clearly distinguish source-derived content from generated educational explanations.

---

# SOURCE PROJECT INVENTORY

Potential verified projects from the supplied material include:

1. Metadata-Driven Framework — Data Ingestion & Pipeline Platform
2. Snowflake + dbt Data Modeling & Reporting
3. Data Lineage Automation
4. ETL-to-ELT Modernization
5. Automated Cross-Database Data Loading
6. Develop Intelligence Hub — Enterprise Data Platform
7. Workforce Management Migration — Kronos to Legion
8. YouTube TV Reporting & Data Automation
9. E-Commerce Analytics Platform
10. FastCharge Electric Vehicle Platform
11. Eye Recommend Healthcare Data Migration
12. VoltGrid AU

Do not treat this list as a ranking.

---

# PHASE 2 — PROJECT LIBRARY

Create:

```text
/projects
```

The library should feel like an engineering portfolio + learning environment.

Include:

- search
- actual source-backed filters
- project cards
- domain
- architecture
- technologies
- Explore Project CTA

Do not invent filters or project metadata.

---

# PHASE 3 — ONE COMPLETE PROJECT

Do NOT build all project pages.

Choose ONE project that has sufficient verified architecture detail for an end-to-end interactive experience.

The VoltGrid AU source is highly detailed, documenting project overview, source systems, ingestion, Bronze/Silver/Gold, serving, real-time alerts, data quality, security, orchestration, monitoring, star schema, scenarios, dashboard hierarchy, and Azure services.

Use source completeness as the selection criterion only; this is NOT a ranking of project quality.

Example route:

```text
/projects/voltgrid-au
```

---

# PROJECT DETAIL PAGE

Structure:

PROJECT HEADER
↓
BUSINESS PROBLEM
↓
ARCHITECTURE
↓
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
↓
REAL-TIME ALERTS
↓
DATA QUALITY
↓
SECURITY
↓
MONITORING
↓
INTERVIEW MODE

---

# PHASE 4 — INTERACTIVE ARCHITECTURE EXPLORER

This is the core visual feature.

Do NOT make it static.

Create always-on concept motion:

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

Use:
- Framer Motion
- Lucide icons
- SVG where appropriate
- animated connectors
- data packets
- node state transitions
- subtle glow
- hover/focus states

Animation must start automatically.

The learner should understand the architecture without clicking.

---

# NODE INTERACTION

Hover/click a node and show only source-supported details:

- role
- sources
- frequency
- output
- relevant documented pattern

Do not invent responsibilities.

---

# PIPELINE PLAYBACK

Provide:

```text
▶ Play
⏸ Pause
↻ Replay
```

Default behavior:

AUTO PLAY

Controls are secondary. Animation must not require clicking Play.

---

# PHASE 5 — SCENARIO EXPLORER

Turn documented scenarios into an interactive layer.

Examples from the VoltGrid source include:

- duplicate telemetry
- late-arriving event
- overheating charger
- billing mismatch
- tariff change
- SLA breach
- null station ID
- schema drift
- payment failure

Flow:

EVENT
↓
DETECTION
↓
PIPELINE BEHAVIOR
↓
QUARANTINE / TRANSFORMATION
↓
SILVER / GOLD
↓
ALERT / BUSINESS RESULT

Example documented rule:

Duplicate telemetry is deduplicated using:
`charger_id + event_ts + connector_id`
and the latest ingestion timestamp is retained.

Do not replace documented rules with invented logic.

---

# PHASE 6 — DATA MODEL EXPLORER

For projects containing dimensional models, make the model interactive.

For VoltGrid, the source documents dimensions including:

```text
DimCountry
DimState
DimCity
DimStation
DimCharger
DimCustomer
DimVehicle
DimEmployee
DimFranchisePartner
DimChargeCard
DimTariff
DimWeather
DimTime
```

and facts including:

```text
FactChargingSession
FactEnergyConsumption
FactPayments
FactMaintenance
FactFleetUtilisation
FactDeviceTelemetry
FactComplaints
FactStationUtilisation
FactInvoice
```

Build a visual star-schema explorer.

Interactions:
- highlight dimension
- highlight related fact
- show grain
- show major metrics
- show SCD type where documented
- show relationship path

Do not invent undocumented columns.

---

# PHASE 7 — TECHNOLOGY EXPLORER

Display actual documented technologies grouped by role.

For VoltGrid, the source documents services including:

```text
Azure IoT Hub
Azure Event Hubs
Azure Data Factory
Azure Logic Apps
Azure Blob Storage
Azure AI Document Intelligence
ADLS Gen2
Azure Databricks
Delta Lake
Azure Synapse Analytics
Azure Cosmos DB
Azure Key Vault
Microsoft Entra ID
Azure Monitor
Log Analytics
Azure Functions
Azure Communication Services
Microsoft Teams
Azure DevOps
Power BI
```

Do not add technologies merely because they are commonly used in Azure data engineering.

---

# PHASE 8 — INTERVIEW MODE

Every project should eventually have:

# Explain This Project

Example:

```text
INTERVIEW MODE

Question 1
Walk me through this project's architecture.

[Think]

[Answer]
```

Then show:

```text
Expected discussion areas
```

Use source-supported talking points.

For VoltGrid, documented talking points include:

- Medallion architecture
- ADF parameterisation
- Auto Loader
- Structured Streaming
- checkpointing
- watermarking
- Delta Lake MERGE
- SCD2
- data quality/quarantine
- Synapse
- Cosmos DB
- Key Vault
- Managed Identity
- RLS
- Azure Monitor
- Azure DevOps CI/CD

Present these as source-derived interview topics, not fabricated interview answers.

---

# PHASE 9 — PROJECT DEBUGGING MODE

After the basic explorer works, introduce debugging scenarios.

Example:

```text
Pipeline Alert

Streaming lag > threshold

What would you inspect?
```

Possible options must be grounded in documented architecture/monitoring.

Then reveal the relevant source-backed context.

Do not invent undocumented root causes.

---

# PHASE 10 — PROJECT LIBRARY SCALING

Only after ONE complete project works:

Add remaining verified projects.

Each must pass:

SOURCE VERIFIED
↓
DATA NORMALIZED
↓
ARCHITECTURE VERIFIED
↓
PROJECT PAGE
↓
INTERACTIVE FLOW
↓
SCENARIOS
↓
INTERVIEW MODE

Do not create empty pages merely to increase project count.

---

# PHASE 11 — BOOKMARKS & PROGRESS

Only after real user state exists.

Potential state:

- Project viewed
- Architecture explored
- Scenario completed
- Interview attempted
- Project bookmarked

Do NOT show fake completion percentages.

---

# PHASE 12 — FULL BROWSER QA

Test:

## Project Library
- loads
- search works
- filters work
- cards open correct project
- no dead links

## Project Detail
- source-derived content is correct
- architecture renders
- animation starts automatically
- node interaction works
- scenario explorer works
- data model works where applicable
- technology explorer works
- interview mode works

## Responsive
- desktop
- tablet
- mobile
- no horizontal overflow
- touch interactions work

## Existing Platform
- Homepage unchanged
- Homepage animations unchanged
- Fundamental 50 unchanged
- Fundamental 50 animations unchanged

---

# 🚫 STRICT DO-NOT-DO LIST

Do NOT:

- modify Fundamental 50 animations
- modify InteractionRegistry
- redesign Homepage
- ingest every project PDF blindly
- invent project facts
- invent metrics
- invent technologies
- invent responsibilities
- invent architecture components
- create fake interview answers
- create empty project pages
- turn architecture into static-only images
- build all projects before validating one
- add random decorative animations
- migrate authentication
- migrate MongoDB/PostgreSQL
- migrate content to MDX
- refactor unrelated systems

---

# REQUIRED REPORT AFTER EVERY PHASE

Return:

```text
PHASE: X

Implemented:
- ...

Source material used:
- ...

Files added:
- ...

Files modified:
- ...

Existing systems NOT modified:
- Fundamental 50
- Fundamental 50 animations
- Homepage
- Homepage animations

Browser verification:
PASS / FAIL

Known issues:
- ...

Next phase:
- ...
```

Then STOP.

---

# 🔥 IMMEDIATE COMMAND

## START WITH PHASE 0 ONLY.

Audit the uploaded project source material and the existing application.

Do NOT build the Projects UI yet.
Do NOT modify the database yet.
Do NOT modify Homepage.
Do NOT modify Fundamental 50.
Do NOT create project animations yet.

Return:

1. Verified project inventory
2. Source mapping
3. Project architecture completeness
4. Which project has enough verified material for the first interactive implementation
5. Required data model
6. Missing information
7. Proposed Phase 1

Then STOP.
