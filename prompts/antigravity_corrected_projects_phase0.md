# ANTIGRAVITY — CORRECTED PHASE 0
# DATA ENGINEERING PROJECTS LAB — DISCOVERY & ARCHITECTURE AUDIT

---

# 🚨 IMPORTANT — PREVIOUS PHASE 0 WAS WRONG

The previous Phase 0 audited the **SQL Lab**.

That is NOT the current task.

We explicitly changed direction:

> DO NOT BUILD SQL NEXT.
> BUILD THE DATA ENGINEERING PROJECTS MODULE.

The SQL audit must NOT be used as the basis for the next implementation phase.

---

# CURRENT PRIORITY

We are building:

# DATA ENGINEERING PROJECTS LAB

The existing project source material is the source of truth.

---

# 🔒 PROTECTED EXISTING SYSTEMS

## FUNDAMENTAL 50 — LOCKED

DO NOT MODIFY:

- Fundamental 50 questions
- Fundamental 50 question mappings
- InteractionRegistry
- existing interactive components
- existing Framer Motion animations
- animation timing
- animation behavior
- question routes

## HOMEPAGE — LOCKED

DO NOT MODIFY:

- Hero
- Hero animations
- Navbar
- Homepage layout
- Fundamental 50 section
- existing glassmorphic design
- existing homepage animations

The Projects module must be additive.

---

# 🎯 PROJECT LAB OBJECTIVE

The learner should not merely read a project description.

The learner should understand:

```text
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
```

Then:

```text
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
```

---

# PHASE 0 — PROJECT DISCOVERY & ARCHITECTURE AUDIT

## Objective

Audit the existing application and the available project source material.

This phase is DISCOVERY ONLY.

---

# STEP 1 — AUDIT EXISTING APPLICATION

Inspect the current project structure.

Identify:

- existing routes
- existing components
- existing layout
- existing design system
- existing animation infrastructure
- existing data access patterns
- existing MongoDB infrastructure
- existing repository/service architecture
- existing reusable cards
- existing tabs
- existing filters
- existing modal/drawer components
- existing command/search components
- existing Framer Motion utilities
- existing project-related components, if any

### IMPORTANT

Do NOT modify anything.

---

# STEP 2 — AUDIT PROJECT SOURCE MATERIAL

Use the supplied project documents as the source of truth.

Identify all verified projects.

At minimum inspect the available material covering:

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

Do NOT rank these projects.

Do NOT decide which is "best".

Determine which projects have sufficient source material for an interactive learning experience.

---

# STEP 3 — BUILD A PROJECT SOURCE MATRIX

Return:

| # | Project | Domain | Cloud | Architecture | Ingestion | Processing | Storage | Serving | Scenarios | Data Model | Monitoring | Interview Material |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

For every field use only:

```text
VERIFIED
PARTIAL
NOT DOCUMENTED
CONFLICT
```

Do not fill missing information with general knowledge.

---

# STEP 4 — INSPECT VOLTGRID SPECIFICALLY

The VoltGrid source contains substantial architecture information.

Audit these sections:

- Project Overview
- High-Level Architecture
- Source Systems
- Ingestion Layer
- Bronze Layer
- Silver Layer
- Gold Layer
- Serving Layer
- Real-Time Alerting
- Data Quality Framework
- Security & Compliance
- Orchestration & CI/CD
- Monitoring & Observability
- Star Schema
- Scenario Coverage
- Dashboard Drill-Down
- Azure Services Summary

Do NOT build it yet.

Only document what is available.

---

# STEP 5 — IDENTIFY REUSABLE PROJECT UI INFRASTRUCTURE

Determine whether the existing application already has reusable components for:

- cards
- badges
- tabs
- accordions
- dialogs
- drawers
- command/search
- filters
- timelines
- architecture diagrams
- animated nodes
- animated connectors
- progress indicators
- breadcrumbs

If something exists, identify it for future reuse.

Do not create duplicate components during this phase.

---

# STEP 6 — PROPOSE PROJECT DATA MODEL

Based ONLY on the source material and application architecture, propose a future model.

Example direction:

```ts
Project {
  id
  slug
  title
  domain
  summary
  businessProblem

  architecture
  sourceSystems
  ingestion
  processing
  storage
  serving

  dataQuality
  security
  orchestration
  monitoring

  technologies
  responsibilities
  scale
  outcomes

  scenarios
  dataModel
  interviewTalkingPoints

  sourceReferences
  sourceType
}
```

This is a PROPOSAL ONLY.

Do NOT create the MongoDB model yet.

Do NOT migrate the database.

---

# STEP 7 — DETERMINE THE FIRST PROJECT

Identify which project has enough VERIFIED source material to support:

```text
Project Overview
        ↓
Architecture
        ↓
Source Systems
        ↓
Ingestion
        ↓
Processing
        ↓
Storage
        ↓
Serving
        ↓
Monitoring
        ↓
Scenarios
        ↓
Data Model
        ↓
Interview Mode
```

Use SOURCE COMPLETENESS as the criterion.

Do not call the project "best".

Do not rank projects.

---

# STEP 8 — DESIGN THE FUTURE PROJECT EXPERIENCE

Do NOT implement.

Propose the UX architecture:

```text
/projects
```

and:

```text
/projects/[slug]
```

The project page should eventually support:

```text
PROJECT OVERVIEW

BUSINESS PROBLEM

ARCHITECTURE EXPLORER

SOURCE SYSTEMS

INGESTION FLOW

MEDALLION / PROCESSING FLOW

DATA MODEL

SCENARIOS

MONITORING

TECHNOLOGY STACK

INTERVIEW MODE
```

---

# 🚨 ANIMATION REQUIREMENT

The existing Fundamental 50 animation system is PROTECTED.

However, the new Projects module should follow the same core philosophy:

# ALWAYS-ON CONCEPT MOTION

The architecture must visually teach the learner.

NOT:

```text
click button
↓
animation appears
```

Instead:

```text
PAGE LOADS
     ↓
ARCHITECTURE IS ALREADY MOVING
     ↓
DATA PACKETS FLOW THROUGH THE SYSTEM
     ↓
LEARNER SEES THE PIPELINE
     ↓
LEARNER CAN INTERACT TO INSPECT DETAILS
```

For example, the eventual VoltGrid architecture could visually communicate:

```text
Sources
   ↓
Azure IoT Hub / Event Hubs / ADF / Logic Apps
   ↓
ADLS Bronze
   ↓
Databricks
   ↓
ADLS Silver
   ↓
Databricks Gold
   ↓
Synapse / Cosmos DB / APIs
   ↓
Power BI / Alerts
```

BUT:

## DO NOT IMPLEMENT THIS IN PHASE 0.

Only document the proposed interaction model.

---

# 🚫 DO NOT IMPLEMENT

During Phase 0:

- NO database changes
- NO MongoDB model
- NO ingestion scripts
- NO project routes
- NO project UI
- NO animations
- NO project cards
- NO project pages
- NO homepage changes
- NO Fundamental 50 changes
- NO SQL changes

---

# REQUIRED PHASE 0 REPORT

Return EXACTLY:

## PHASE 0 — PROJECT DISCOVERY

### 1. Existing Application Architecture
...

### 2. Existing Reusable Infrastructure
...

### 3. Verified Project Inventory
...

### 4. Project Source Matrix
...

### 5. Detailed VoltGrid Source Audit
...

### 6. Proposed Project Data Model
...

### 7. Proposed Routes
...

### 8. Proposed Project UX
...

### 9. Animation Architecture Proposal
...

### 10. First Project Selection

Explain ONLY in terms of SOURCE COMPLETENESS.

Do not rank projects.

### 11. Missing Information
...

### 12. Files That Would Be Created In Phase 1
...

### 13. Files That Must NOT Be Modified
...

### 14. Browser Verification

Since this phase is audit-only:

```text
PASS — no code changes
```

---

# 🛑 HARD STOP

STOP AFTER THIS REPORT.

Do NOT begin Phase 1 automatically.

Do NOT build SQL.

Do NOT build Projects yet.

Do NOT modify existing code.

WAIT FOR APPROVAL.
