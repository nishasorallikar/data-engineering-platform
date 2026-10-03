# ANTIGRAVITY — PROJECTS PHASE 2
# PROJECT CORE DATA LAYER

---

# STATUS

PHASE 1 — APPROVED ✅

The verified VoltGrid AU dataset exists:

```text
data/verified-projects/voltgrid-au.json
```

Validation passed.

We are now implementing:

# PHASE 2 — PROJECT CORE DATA LAYER

---

# 🎯 OBJECTIVE

Build the backend/domain foundation that will allow the future Projects UI to consume verified project data safely.

Architecture:

```text
VERIFIED DATASET
      ↓
PROJECT TYPES
      ↓
MONGOOSE MODEL
      ↓
REPOSITORY
      ↓
SERVICE
      ↓
DTO / VALIDATION
      ↓
READ API
      ↓
STOP
```

This phase is DATA + BACKEND ONLY.

---

# 🔒 ABSOLUTE PROTECTION

DO NOT MODIFY:

## FUNDAMENTAL 50

- existing questions
- existing question mappings
- InteractionRegistry
- existing interactive components
- Framer Motion animations
- animation timing
- animation behavior
- `/questions`
- `/questions/[id]`

## HOMEPAGE

DO NOT MODIFY:

- Hero
- Hero animations
- Navbar
- homepage layout
- Fundamental 50 section
- glassmorphic design
- homepage animations

## SQL

DO NOT:

- build SQL Lab
- modify SQL code
- create SQL routes
- create SQL models
- modify SQL datasets

---

# 🚫 NO PROJECT UI YET

DO NOT build:

- `/projects`
- `/projects/[slug]`
- Project Library
- Project cards
- Architecture Explorer
- Scenario UI
- Data Model UI
- Interview UI
- animations
- Framer Motion project components

The visual experience comes later.

---

# STEP 1 — INSPECT EXISTING ARCHITECTURE

Before creating anything:

Inspect the existing:

```text
lib/models
lib/repositories
lib/services
lib/validators
lib/dto
lib/db
app/api
```

Reuse existing conventions.

Do NOT create duplicate infrastructure if an established pattern already exists.

---

# STEP 2 — PROJECT TYPES

Create a strongly typed domain representation.

Suggested:

```ts
Project
ProjectArchitecture
ProjectSourceSystem
ProjectScenario
ProjectDataModel
ProjectDimension
ProjectFact
ProjectTechnology
ProjectSourceReference
```

Types must reflect the verified dataset.

Do not add speculative fields.

---

# STEP 3 — MONGOOSE PROJECT MODEL

Create:

```text
lib/models/Project.ts
```

Use the existing MongoDB/Mongoose conventions.

Suggested collection:

```text
projects
```

The model must support the verified dataset structure.

Important:

- stable `id`
- unique `slug`
- title
- domain
- summary
- business problem
- architecture
- source systems
- ingestion
- processing
- storage
- serving
- data quality
- security
- orchestration
- monitoring
- technologies
- scenarios
- data model
- interview talking points
- source references
- source type

---

# SOURCE FIDELITY

The database model must NOT transform verified source facts into invented content.

The source dataset remains authoritative:

```text
data/verified-projects/voltgrid-au.json
```

If a field is absent from the verified dataset:

DO NOT invent a value.

---

# STEP 4 — REPOSITORY

Create:

```text
lib/repositories/projectRepository.ts
```

Follow the existing repository pattern.

Required read operations:

```text
findAll()
findBySlug(slug)
findById(id)
```

Optional:

```text
findByDomain(domain)
findByTechnology(technology)
```

Only add filtering if the existing architecture supports it cleanly.

Do not over-engineer search yet.

---

# STEP 5 — SERVICE

Create:

```text
lib/services/projectService.ts
```

The service should:

- fetch projects through the repository
- validate inputs
- return safe project data
- avoid exposing raw Mongoose documents
- prepare data for DTO conversion

No UI logic belongs here.

---

# STEP 6 — DTO

Create a safe project DTO.

Example:

```ts
ProjectDTO
```

The DTO should expose only learner-facing project information.

Do NOT expose:

- MongoDB internals
- internal implementation details
- private fields
- raw database objects

Use `.lean()` where appropriate.

---

# STEP 7 — VALIDATION

Create or reuse Zod validation.

Validate:

```text
project ID
slug
title
architecture
source systems
technologies
scenarios
data model
source references
```

The validation schema must correspond to the verified dataset.

Do NOT create validation rules that contradict the source data.

---

# STEP 8 — DATA IMPORT

Create a controlled import mechanism.

Preferred:

```text
scripts/ingest-projects.ts
```

Flow:

```text
data/verified-projects/voltgrid-au.json
             ↓
        validation
             ↓
         normalize
             ↓
        MongoDB
             ↓
        projects
```

Requirements:

- idempotent
- safe to rerun
- no duplicate projects
- stable IDs
- stable slugs
- no deletion of unrelated collections

Use an upsert strategy.

DO NOT modify:

```text
questions_v2
```

---

# STEP 9 — API

Create read-only project APIs following the existing route conventions.

Suggested:

```text
GET /api/projects
GET /api/projects/[slug]
```

Requirements:

- read-only
- validated parameters
- DTO output
- no raw Mongoose documents
- predictable error responses

Do NOT create write APIs yet.

---

# STEP 10 — API RESPONSE CONTRACT

Collection response:

```json
{
  "projects": [],
  "count": 1
}
```

Single project:

```json
{
  "project": {}
}
```

Use the existing API response convention if one already exists.

Do not break existing APIs.

---

# STEP 11 — DATA INTEGRITY TESTS

Create tests that verify:

### Project identity

```text
id exists
slug exists
slug is unique
```

### Source fidelity

```text
project exists
architecture exists
source systems exist
technologies exist
scenarios exist
data model exists
source references exist
```

### No contamination

Verify the Project dataset has no accidental:

```text
Fundamental 50
SQL Lab
question records
question IDs
```

### Database isolation

Verify ingestion modifies only:

```text
projects
```

and does NOT modify:

```text
questions_v2
```

---

# STEP 12 — VERIFY IMPORT

Run the ingestion.

Confirm:

```text
voltgrid-au.json
        ↓
MongoDB
        ↓
projects collection
```

Expected:

```text
1 verified project
```

Do not create placeholder projects.

Do not create fake records for the other 11 projects.

---

# STEP 13 — VERIFY API

Test:

```text
GET /api/projects
```

Expected:

```text
VoltGrid AU
```

Then:

```text
GET /api/projects/voltgrid-au
```

Expected:

```text
complete verified VoltGrid project DTO
```

Verify that the response contains source-derived project data and no raw database internals.

---

# 🚨 DO NOT BUILD THE UI

Even if the API works perfectly, STOP.

Do NOT proceed to:

```text
/projects
```

Do NOT create:

```text
/projects/[slug]
```

Do NOT build the architecture animation.

Do NOT build Framer Motion project components.

Those belong to later phases.

---

# REQUIRED FILES

Expected new files may include:

```text
lib/models/Project.ts

lib/repositories/projectRepository.ts

lib/services/projectService.ts

lib/dto/project.ts

lib/validators/project.ts

scripts/ingest-projects.ts

app/api/projects/route.ts

app/api/projects/[slug]/route.ts

tests/project/
```

Reuse existing conventions if equivalent files already exist.

Do not blindly create duplicates.

---

# REQUIRED REPORT

Return:

```text
PHASE 2 — PROJECT CORE DATA LAYER

Implemented:
- ...

Dataset:
- ...

MongoDB:
- collection:
- records:

Repository:
- ...

Service:
- ...

DTO:
- ...

Validation:
- ...

API:
- ...

Tests:
- ...

Database isolation:
- questions_v2 untouched

Protected systems:
- Fundamental 50 untouched
- InteractionRegistry untouched
- Fundamental animations untouched
- Homepage untouched
- Homepage animations untouched
- SQL untouched

Browser/API verification:
- ...

Known issues:
- ...

Next phase:
- ...
```

---

# 🛑 HARD STOP

After Phase 2 is implemented, tested, imported and verified:

STOP.

Do NOT automatically begin Phase 3.

Do NOT build the Project Library.

Do NOT build the architecture UI.

Do NOT touch the existing animation system.

WAIT FOR APPROVAL.
