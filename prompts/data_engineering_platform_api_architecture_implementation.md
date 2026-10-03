# DATA ENGINEERING PLATFORM — API ARCHITECTURE IMPLEMENTATION
## Production-Ready API Foundation

We are now implementing the standardized API architecture for the Data Engineering Platform.

IMPORTANT:
Do NOT blindly implement the original API proposal.
Use the optimized architecture below.

The goal is a clean, scalable API foundation supporting:

- Projects
- Fundamental 50 / Questions
- SQL Interview Lab
- User Progress
- User History
- System Health / Readiness

Existing Project APIs already work.
Existing Project UI is LOCKED.
Homepage, Fundamental 50 animations, SQL UI, InteractionRegistry, and Project UI must not be broken.

============================================================
0. IMPLEMENTATION PHILOSOPHY
============================================================

Use this architecture:

ROUTE
  ↓
VALIDATE
  ↓
AUTH / RATE LIMIT where required
  ↓
SERVICE
  ↓
REPOSITORY
  ↓
DATA SOURCE

Keep responsibilities strictly separated.

Route handlers:
- parse request
- validate input
- call service
- return standardized response

Services:
- business logic
- orchestration
- progress calculations
- SQL validation/coordination

Repositories:
- data access only
- MongoDB / JSON / future PostgreSQL/Supabase

Do not put business logic directly into route handlers.

Do not let frontend code know whether data comes from JSON or MongoDB.

============================================================
1. RUNTIME STRATEGY
============================================================

DO NOT force Edge Runtime.

Default to:

Node.js runtime

Reason:

Current architecture may use:

- fs
- Mongoose
- MongoDB
- SQL execution infrastructure

These should remain Node-compatible.

Do NOT introduce Edge Runtime unless a specific endpoint is proven compatible and there is a measured reason to do so.

No premature optimization.

============================================================
2. API VERSIONING
============================================================

Introduce:

/api/v1/

Structure:

app/
└── api/
    └── v1/
        ├── projects/
        │   ├── route.ts
        │   └── [slug]/
        │       └── route.ts
        │
        ├── questions/
        │   ├── route.ts
        │   └── [id]/
        │       ├── route.ts
        │       └── validate/
        │           └── route.ts
        │
        ├── sql/
        │   ├── challenges/
        │   │   ├── route.ts
        │   │   └── [id]/
        │   │       └── route.ts
        │   │
        │   └── execute/
        │       └── route.ts
        │
        ├── user/
        │   ├── progress/
        │   │   └── route.ts
        │   └── history/
        │       └── route.ts
        │
        └── system/
            ├── health/
            │   └── route.ts
            └── readiness/
                └── route.ts

Do not remove existing endpoints until frontend migration is verified.

If backward compatibility is required, temporarily preserve existing endpoints as thin wrappers over the new v1 services rather than duplicating logic.

============================================================
3. STANDARD RESPONSE SYSTEM
============================================================

Create:

lib/api-response.ts

Provide helpers such as:

successResponse()
errorResponse()

Success:

{
  "success": true,
  "data": {},
  "meta": {
    "timestamp": "...",
    "requestId": "..."
  }
}

Collection response:

{
  "success": true,
  "data": [],
  "meta": {
    "timestamp": "...",
    "requestId": "...",
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 50,
      "totalPages": 3
    }
  }
}

Error:

{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Project not found.",
    "requestId": "..."
  }
}

Do not expose:
- stack traces
- MongoDB internals
- filesystem paths
- SQL engine internals
- environment variables
- database connection strings

============================================================
4. STANDARD ERROR TAXONOMY
============================================================

Create a centralized error model.

Supported codes should include where applicable:

VALIDATION_ERROR
UNAUTHORIZED
FORBIDDEN
NOT_FOUND
CONFLICT
RATE_LIMITED
SQL_EXECUTION_ERROR
SQL_TIMEOUT
INTERNAL_ERROR
SERVICE_UNAVAILABLE

Use appropriate HTTP status codes.

Do not expose internal errors directly to clients.

============================================================
5. REQUEST ID
============================================================

Every API request should have a request ID.

Use it in:

- response meta
- structured server logs
- error responses

Do not expose sensitive request information.

If an upstream/request ID exists and can be safely reused, follow the existing application convention.

============================================================
6. VALIDATION
============================================================

Use Zod consistently.

Create/extend:

lib/validators/

Examples:

project validator
question validator
question validation request
SQL execution request
progress request
history query
pagination/filter schemas

Validate:

- route parameters
- query parameters
- request bodies

Never trust frontend validation.

============================================================
7. REPOSITORY ARCHITECTURE
============================================================

Use explicit repositories.

Examples:

lib/repositories/
    projectRepository.ts
    questionRepository.ts
    sqlChallengeRepository.ts
    progressRepository.ts
    historyRepository.ts

Repositories should only handle data access.

Do NOT create an unnecessary generic DAO abstraction.

The repository may internally use:

MongoDB
JSON
future PostgreSQL/Supabase

The rest of the application should not care.

============================================================
8. PROJECT API
============================================================

Existing Project API must be migrated to v1 without changing its data contract unnecessarily.

Endpoints:

GET /api/v1/projects

GET /api/v1/projects/[slug]

Use:

ProjectRepository
ProjectService
ProjectDTO
Project validators

Existing verified VoltGrid data must remain unchanged.

Do not modify:

data/verified-projects/voltgrid-au.json

Do not modify Project UI.

Do not modify Project animation system.

Do not change source-derived project content.

============================================================
9. QUESTIONS / FUNDAMENTAL 50 API
============================================================

Build:

GET /api/v1/questions

GET /api/v1/questions/[id]

POST /api/v1/questions/[id]/validate

Support appropriate:

- pagination
- section/category filtering
- difficulty filtering if actually present
- search if supported by existing dataset

Do not invent question metadata.

Use the existing Fundamental 50/question dataset.

Do not modify:

- Fundamental 50 animation components
- InteractionRegistry
- question mappings
- existing question content

The API should expose data without changing the existing learning experience.

============================================================
10. QUESTION VALIDATION
============================================================

POST:

/api/v1/questions/[id]/validate

The service should validate the submitted answer using the existing documented question/answer model.

Do not introduce AI grading unless explicitly requested later.

Do not fabricate evaluation criteria.

Return a structured result.

Example:

{
  "success": true,
  "data": {
    "correct": true,
    "explanation": "..."
  }
}

Only include fields supported by the existing question data/model.

============================================================
11. SQL INTERVIEW LAB
============================================================

This is the highest-risk API component.

DO NOT implement:

User SQL
↓
Application database
↓
execute

Never execute user SQL against:

- production MongoDB
- application database
- developer database
- filesystem
- internal network resources

============================================================
12. SQL EXECUTION ARCHITECTURE
============================================================

Use:

User SQL
   ↓
Zod validation
   ↓
Payload limits
   ↓
SQL parser / AST validation
   ↓
Allowed-statement validation
   ↓
Sandboxed SQL engine
   ↓
Timeout / resource limits
   ↓
Result normalization
   ↓
Challenge validator
   ↓
Response

Initial SQL Interview Lab should be READ-ONLY.

Disallow by default:

DROP
DELETE
UPDATE
INSERT
ALTER
CREATE
TRUNCATE

Also prevent:

- filesystem access
- network access
- environment access
- process execution
- access to production resources

============================================================
13. SQL RESOURCE LIMITS
============================================================

Implement safeguards for:

- maximum query length
- maximum execution time
- maximum result rows
- request body size
- rate limiting
- resource consumption

Return explicit errors:

SQL_TIMEOUT
SQL_EXECUTION_ERROR
VALIDATION_ERROR
RATE_LIMITED

Do not expose engine internals.

============================================================
14. SQL CHALLENGE API
============================================================

Build:

GET /api/v1/sql/challenges

GET /api/v1/sql/challenges/[id]

Challenge metadata should come from the existing SQL challenge dataset.

Do not fabricate:

- schemas
- tables
- columns
- expected outputs
- difficulty
- descriptions

Only expose verified data.

============================================================
15. SQL RESULT VALIDATION
============================================================

The SQL service should be able to compare the user's result with the challenge's expected result where the existing challenge model supports this.

Do not rely solely on raw string comparison if the existing challenge design requires semantic result comparison.

Do not invent validation rules.

============================================================
16. SQL RATE LIMITING
============================================================

Treat:

POST /api/v1/sql/execute

differently from ordinary GET endpoints.

Apply appropriate rate limiting.

Architecture:

SQL Request
    ↓
Rate Limit
    ↓
Payload Validation
    ↓
SQL Validation
    ↓
Sandbox
    ↓
Timeout
    ↓
Result

Do not apply unnecessarily aggressive limits to ordinary read APIs.

============================================================
17. USER PROGRESS
============================================================

Create:

GET /api/v1/user/progress

POST /api/v1/user/progress

Progress represents CURRENT STATE.

Potential structure:

User
 ├── Question Progress
 ├── Project Progress
 └── SQL Progress

Each progress record should have a stable identity such as:

userId
+
contentType
+
contentId

Updates must be idempotent.

Do not allow repeated completion requests to create duplicate logical progress records.

Possible fields only where supported:

status
attempts
completedAt
updatedAt

Do not invent user progress fields unnecessarily.

============================================================
18. USER HISTORY
============================================================

Create:

GET /api/v1/user/history

History represents EVENTS, not current state.

Example:

QUESTION_COMPLETED
SQL_ATTEMPTED
PROJECT_VIEWED

Only implement event types actually needed by the platform.

Concept:

Progress = current state

History = event log

Do not use History as the source of truth for current progress.

Avoid storing sensitive information unnecessarily.

============================================================
19. AUTHENTICATION BOUNDARIES
============================================================

Public APIs:

GET /projects
GET /projects/[slug]
GET /questions
GET /questions/[id]
GET /sql/challenges
GET /sql/challenges/[id]

Authenticated APIs:

GET /user/progress
POST /user/progress
GET /user/history

SQL execution may initially be public or authenticated depending on the existing product decision, but must have rate limiting and sandboxing either way.

Do not build a full authentication system if one does not already exist.

If authentication is not yet implemented:

Create clean authentication boundaries/interfaces without inventing a complete auth provider.

============================================================
20. HEALTH
============================================================

Create:

GET /api/v1/system/health

Purpose:

"Is the application alive?"

Keep it cheap.

============================================================
21. READINESS
============================================================

Create:

GET /api/v1/system/readiness

Purpose:

"Can the application actually serve requests?"

Check only critical dependencies.

For example:

MongoDB connectivity
required datasets
critical services

Do not make health/readiness expensive.

Do not expose internal connection information.

============================================================
22. PAGINATION
============================================================

List endpoints should use standardized pagination.

Support where appropriate:

page
pageSize

or cursor pagination if the existing dataset/service architecture makes it more appropriate.

Do not fetch huge datasets unnecessarily.

Apply sensible maximum page sizes.

Do not trust arbitrary client page sizes.

============================================================
23. FILTERING
============================================================

Questions should support useful filters where data exists:

section/category
difficulty
search

Projects may support:

domain
technology

only if those fields exist in the project data model.

Do not create filters for fields that don't exist.

============================================================
24. CACHING
============================================================

Do NOT introduce Redis just because it is available.

First use:

Repository
↓
MongoDB / JSON
↓
Next.js-compatible caching where appropriate

Only introduce Redis after a demonstrated requirement.

Read-heavy endpoints may eventually be cached:

projects
questions
SQL challenge metadata

Do not cache user-specific state incorrectly.

Never cache private progress/history responses publicly.

============================================================
25. OBSERVABILITY
============================================================

Do not build a large telemetry platform in this phase.

At minimum support structured server logging for:

- request ID
- route
- method
- status
- duration
- error code

Do not log:

- passwords
- tokens
- SQL secrets
- sensitive user data

SQL execution logs must not store raw sensitive input unnecessarily.

============================================================
26. DIRECTORY STRUCTURE
============================================================

Aim for:

app/
└── api/
    └── v1/
        ├── projects/
        ├── questions/
        ├── sql/
        ├── user/
        └── system/

lib/
├── api-response.ts
├── errors/
├── validators/
├── services/
│   ├── projectService.ts
│   ├── questionService.ts
│   ├── sqlService.ts
│   ├── progressService.ts
│   └── historyService.ts
│
├── repositories/
│   ├── projectRepository.ts
│   ├── questionRepository.ts
│   ├── sqlChallengeRepository.ts
│   ├── progressRepository.ts
│   └── historyRepository.ts
│
└── dto/

Keep the architecture consistent with the existing repository/service patterns.

============================================================
27. IMPLEMENTATION PHASES
============================================================

Do NOT implement everything in one uncontrolled change.

Use these phases.

PHASE 1
API FOUNDATION

Implement:

- /api/v1 structure
- api-response.ts
- standardized errors
- request IDs
- Zod foundation
- health
- readiness

Then:

RUN
↓
TEST
↓
REPORT
↓
STOP

PHASE 2
PROJECT + QUESTIONS

Implement:

Projects v1
Questions v1

Migrate existing frontend usage only where necessary.

Then:

RUN
↓
BROWSER VERIFY
↓
REGRESSION
↓
REPORT
↓
STOP

PHASE 3
SQL CHALLENGE READ APIs

Implement:

GET challenges
GET challenge

No SQL execution yet.

Then:

RUN
↓
TEST
↓
REPORT
↓
STOP

PHASE 4
SQL EXECUTION SANDBOX

Implement:

validation
AST checks
read-only restrictions
sandbox
timeouts
row limits
rate limiting
result validation

This phase requires strong security testing.

Then:

RUN
↓
SECURITY TEST
↓
REPORT
↓
STOP

PHASE 5
USER PROGRESS

Implement:

progress repository
progress service
GET progress
POST progress
idempotent updates

Then:

RUN
↓
TEST
↓
REPORT
↓
STOP

PHASE 6
USER HISTORY

Implement:

history repository
history service
GET history

Then:

RUN
↓
TEST
↓
REPORT
↓
STOP

PHASE 7
FULL API QA

Test:

Projects
Questions
SQL
Progress
History
Health
Readiness

Then:

RUN
↓
SECURITY QA
↓
BROWSER QA
↓
REGRESSION
↓
FINAL REPORT
↓
STOP

============================================================
28. PROTECTED SYSTEMS
============================================================

DO NOT modify:

Homepage visual system
Fundamental 50 animation system
InteractionRegistry
SQL existing UI unless API integration specifically requires it
Locked Project UI/animations
Verified VoltGrid project dataset
Existing question content

API work must not become an excuse to redesign frontend systems.

============================================================
29. REGRESSION REQUIREMENTS
============================================================

After every phase verify:

Homepage loads.

Fundamental 50 loads.

Fundamental 50 animations still work.

SQL UI still loads.

Projects Library still loads.

VoltGrid Project still loads.

Project animations still work.

No existing route is broken.

============================================================
30. API TEST MATRIX
============================================================

Test success cases:

GET project list
GET project
GET questions
GET question
GET SQL challenges
GET SQL challenge
GET health
GET readiness

Test validation failures:

invalid IDs
invalid slugs
invalid pagination
invalid filters
invalid SQL request
invalid progress request

Test not found:

unknown project
unknown question
unknown challenge

Test SQL security:

DROP
DELETE
UPDATE
INSERT
ALTER
CREATE
TRUNCATE

Also test:

very large query
very large result
long-running query
malformed SQL
multiple statements
unexpected input types

Verify they are safely rejected/contained.

============================================================
31. API CONTRACT QUALITY
============================================================

Every endpoint must have:

- predictable status codes
- standardized response wrapper
- validation
- error handling
- request ID
- no leaked internals

Do not create endpoint-specific response formats unless there is a strong documented reason.

============================================================
32. NO PREMATURE COMPLEXITY
============================================================

Do NOT introduce unless required:

- Redis
- Kafka
- microservices
- GraphQL
- Kubernetes
- Edge runtime everywhere
- external telemetry infrastructure
- unnecessary generic DAO frameworks

This is a Next.js platform.

Keep the architecture modular without turning it into a distributed system prematurely.

============================================================
33. FINAL ACCEPTANCE CRITERIA
============================================================

API architecture is complete only when:

✓ /api/v1 exists
✓ standard response helper exists
✓ standard errors exist
✓ request IDs exist
✓ Zod validation exists
✓ Project API works
✓ Questions API works
✓ SQL challenge API works
✓ SQL execution is isolated
✓ SQL is read-only initially
✓ SQL has timeout/resource limits
✓ SQL has rate limiting
✓ Progress is idempotent
✓ History is separate from Progress
✓ Health works
✓ Readiness works
✓ repositories are separated
✓ services contain business logic
✓ routes remain thin
✓ no sensitive internals leak
✓ existing frontend still works
✓ protected systems remain untouched

============================================================
34. FINAL REPORT
============================================================

After each phase STOP and report:

1. Files created
2. Files modified
3. APIs implemented
4. Validation implemented
5. Tests executed
6. Security tests executed
7. Browser regression results
8. Runtime/console errors
9. Any limitations
10. Confirmation of protected systems remaining untouched

DO NOT claim a phase is complete without actually running its tests.

DO NOT silently continue into the next phase.

The required workflow is:

IMPLEMENT
↓
BUILD
↓
RUN
↓
TEST
↓
BROWSER VERIFY where applicable
↓
REPORT
↓
STOP

Begin with PHASE 1 ONLY.
