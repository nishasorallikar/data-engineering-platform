# ANTIGRAVITY — PHASE 2: SQL INTERVIEW LAB
# PROPERLY DIVIDED IMPLEMENTATION PLAN

## 🎯 OBJECTIVE

The Fundamental 50 is almost complete and the Homepage V1 is now built.

The next major product module is:

# SQL INTERVIEW LAB

The SQL Lab should turn the platform from:

```text
READ / WATCH CONCEPTS
        ↓
INTO
        ↓
WRITE SQL → RUN SQL → DEBUG → UNDERSTAND → PRACTICE → INTERVIEW
```

This must NOT be implemented as another static PDF/document browser.

It must become an interactive learning and interview-practice environment.

---

# 🔒 EXISTING SYSTEM PROTECTION

The following are protected and must NOT be rewritten as part of this phase:

### Fundamental 50

Do NOT:

- modify existing Fundamental 50 animations
- modify existing interactive question components
- change animation timing
- change Framer Motion variants
- change InteractionRegistry behavior
- replace existing visualizations
- migrate existing Fundamental 50 components
- duplicate Fundamental 50 components into SQL Lab

The SQL Lab is a NEW module.

Build it beside the existing system.

---

# 🔒 HOMEPAGE PROTECTION

Do NOT redesign the Homepage during this phase.

Only add a SQL Lab route/link if required.

Do not use this phase to refactor:

- Homepage
- Fundamental 50
- global animation architecture
- authentication
- PostgreSQL
- MDX migration
- InteractionRegistry optimization

Those are separate future phases.

---

# SOURCE MATERIALS

The project contains source material including:

- `50-Data_Engineering_Interview-Questions.pdf`
- `25_DATA_ENGINEERING_INTERVIEW_QUESTIONS...`
- `PYTHON_INTERVIEW_Q&A...`
- `DATA_ENGINEERING_FUNDAMENTALS...`
- `MOST_ASKED_INTERVIEW_QUESTIONS...`
- `COMPANY_WISE_INTERVIEW_QUESTIONS...`
- multiple Data Engineering / SQL / Databricks / Spark / Azure guides

For SQL content:

## DO NOT blindly ingest every PDF.

Use the source → validate → normalize → verified dataset workflow.

```text
SOURCE
   ↓
EXTRACT
   ↓
NORMALIZE
   ↓
VALIDATE
   ↓
VERIFIED SQL DATASET
   ↓
DATABASE
   ↓
SQL LAB
```

Do not invent questions merely to fill a target count.

---

# 🧱 IMPLEMENTATION PRINCIPLE

The SQL Lab will be built in independent phases.

## NEVER IMPLEMENT ALL PHASES IN ONE PASS.

After each phase:

```text
IMPLEMENT
   ↓
BUILD
   ↓
RUN
   ↓
BROWSER VERIFY
   ↓
STOP
   ↓
NEXT PHASE
```

If a phase fails, fix that phase before moving forward.

---

# PHASE 0 — DISCOVERY & ARCHITECTURE AUDIT

## Objective

Understand the existing application before writing SQL Lab code.

Inspect:

```text
app/
components/
lib/
data/
ingestion/
scripts/
models/
repositories/
services/
validators/
```

Identify:

- current routing architecture
- database connection
- existing Question model
- existing Progress model
- authentication state
- current UI primitives
- current code editor dependencies
- current shadcn/ui setup
- current Framer Motion setup
- current error handling
- current server/client boundaries

Also inspect whether SQL-specific content already exists.

### Important

Do not modify anything in this phase.

### Deliverable

Create an internal implementation plan:

```text
Existing architecture
↓
Reusable infrastructure
↓
Missing SQL Lab infrastructure
↓
Required new files
↓
Potential conflicts
```

### STOP CONDITION

If the existing schema or architecture is unclear, STOP and report the exact uncertainty.

Do not guess.

---

# PHASE 1 — SQL CONTENT SOURCE PIPELINE

## Objective

Create a clean verified SQL problem dataset.

Do NOT build the editor yet.

First build the content foundation.

---

## 1.1 Source inventory

Identify SQL-relevant source material from the available resources.

Group content into:

```text
SQL FOUNDATIONS
JOINs
AGGREGATIONS
WINDOW FUNCTIONS
CTEs
SUBQUERIES
NULL HANDLING
DUPLICATES
DATE / TIME
STRING FUNCTIONS
CASE EXPRESSIONS
SET OPERATIONS
QUERY OPTIMIZATION
ADVANCED SQL
INTERVIEW PROBLEMS
```

Do not assume every source contains valid SQL questions.

---

## 1.2 Normalize each problem

Every verified SQL problem should have a structure similar to:

```ts
{
  id,
  title,
  slug,
  category,
  difficulty,
  prompt,
  schema,
  seedData,
  expectedOutput,
  explanation,
  hints,
  solution,
  concepts,
  interviewFollowUps,
  source,
  sourceType
}
```

Do not add fields that the application does not actually need.

---

## 1.3 Source integrity

Every source-derived question must retain:

```text
source
source title
source question/reference
```

Generated additions must be explicitly marked as generated.

Never present generated content as source-derived.

---

## 1.4 Validation

Validate:

- unique IDs
- unique slugs
- valid category
- valid difficulty
- valid SQL
- valid schema
- valid seed data
- expected output consistency
- solution consistency
- no duplicate questions
- no corrupted PDF text
- no unrelated content contamination

---

## PHASE 1 ACCEPTANCE

Only continue when:

- verified dataset exists
- validation passes
- no obvious source contamination exists
- SQL problems are structured consistently

### STOP.

Do NOT build the UI in the same phase.

---

# PHASE 2 — SQL EXECUTION ENGINE

## Objective

Build the backend execution layer before building the polished UI.

The learner must eventually be able to:

```text
Write SQL
   ↓
Execute
   ↓
Receive result
   ↓
Compare against expected behavior
```

---

## IMPORTANT SECURITY RULE

Never execute arbitrary learner SQL directly against the production application database.

Use an isolated execution environment.

The implementation must consider:

- read-only execution
- query timeout
- row limits
- memory limits where applicable
- restricted statements
- isolated database/schema
- no access to application secrets
- no access to unrelated tables
- no destructive SQL

At minimum block or isolate:

```text
DROP
DELETE
TRUNCATE
ALTER
CREATE
GRANT
REVOKE
INSERT
UPDATE
```

unless a future sandbox architecture explicitly supports them.

---

## Execution API

Design a server-side execution boundary such as:

```text
POST /api/sql/execute
```

Input:

```ts
{
  problemId,
  query
}
```

Output:

```ts
{
  success,
  columns,
  rows,
  rowCount,
  executionTime,
  error?
}
```

Do not expose database credentials or internal infrastructure.

---

## PHASE 2 ACCEPTANCE

Verify:

- valid query executes
- invalid query returns readable error
- forbidden SQL is rejected
- timeout is handled
- result rows are limited
- execution cannot access production data
- server/client boundary is correct

### STOP.

Do not build the complete SQL UI yet.

---

# PHASE 3 — SQL LAB UI SHELL

## Objective

Create the learning environment without implementing the full question library yet.

Route:

```text
/sql
```

or use the application's established route convention.

---

## Layout

Desktop:

```text
┌──────────────────────────────────────────────────────────────┐
│ SQL INTERVIEW LAB                                            │
├───────────────────────┬──────────────────────────────────────┤
│ Problem               │ Database Schema                      │
│                       │                                      │
│ Prompt                │ Tables                               │
│                       │ Columns                              │
│ Constraints           │ Sample rows                          │
│                       │                                      │
├───────────────────────┴──────────────────────────────────────┤
│ SQL EDITOR                                                   │
│                                                              │
│ SELECT ...                                                   │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ [Run Query] [Reset] [Hint] [Solution]                        │
├──────────────────────────────────────────────────────────────┤
│ RESULTS                                                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

Mobile:

```text
Problem
↓
Schema
↓
Editor
↓
Controls
↓
Results
```

---

# SQL EDITOR

Use a proper code editor.

Requirements:

- SQL syntax highlighting
- line numbers
- keyboard shortcuts
- tab indentation
- clear error state
- reset
- copy
- accessible controls

Do NOT build a fake textarea pretending to be a code editor if an appropriate existing editor dependency is already available.

If a new dependency is required, inspect the project first.

---

# PHASE 3 ACCEPTANCE

Browser verify:

- route loads
- editor works
- schema displays
- problem displays
- buttons work
- responsive layout works
- no horizontal overflow
- no fake execution state

### STOP.

---

# PHASE 4 — FIRST COMPLETE SQL PROBLEM

Do NOT import 100 problems yet.

Implement exactly ONE fully working problem.

Use a representative problem such as:

```text
Find the second-highest salary in each department.
```

Only use this if it exists in the verified source dataset.

Otherwise select one verified SQL problem from the dataset.

---

## Complete learner flow

```text
OPEN PROBLEM
      ↓
READ QUESTION
      ↓
INSPECT SCHEMA
      ↓
WRITE QUERY
      ↓
RUN QUERY
      ↓
RESULT
      ↓
VALIDATION
      ↓
SUCCESS / NEEDS CORRECTION
      ↓
EXPLANATION
      ↓
BETTER APPROACH
      ↓
INTERVIEW FOLLOW-UP
```

---

# RESULT EXPERIENCE

Successful result:

```text
✓ Query executed

Your output matches the expected result.

Concepts demonstrated:
Window functions
Partitioning
Ranking
```

Do not invent concept tags; derive them from the problem dataset.

---

# ERROR EXPERIENCE

Do NOT merely display:

```text
SQL Error
```

Instead show:

```text
Query Error

Line 4:
Column "department" does not exist.

Check:
- table name
- column name
- alias
```

Do not generate explanations that claim facts not supported by the actual SQL engine error.

---

# PHASE 4 ACCEPTANCE

One complete problem must work end-to-end.

Only continue after:

- browser verification
- real query execution
- real result
- real validation
- real error handling

### STOP.

---

# PHASE 5 — HINT / LEARNING SYSTEM

Now add progressive assistance.

Do NOT immediately reveal the answer.

Use:

```text
Hint 1
↓
Hint 2
↓
Hint 3
↓
Solution
```

Example:

```text
Hint 1:
Think about how you would rank salaries within each department.

Hint 2:
Which window function assigns a unique number to each row?

Hint 3:
Consider PARTITION BY department.
```

Hints must be derived from the verified problem content.

---

# SOLUTION VIEW

When requested:

```text
Solution
────────

SQL

Explanation

Why it works

Alternative approach
```

Never force the learner to open the solution.

---

# PHASE 5 ACCEPTANCE

Verify:

- hints reveal progressively
- solution is hidden initially
- solution is accessible
- explanation matches actual query
- no fabricated explanation

### STOP.

---

# PHASE 6 — SQL PROBLEM LIBRARY

Only now scale the content.

Create filters:

```text
All
Easy
Medium
Hard
JOINs
Window Functions
CTEs
Aggregation
Subqueries
Optimization
Advanced
```

If the verified dataset has different categories, use the actual categories instead.

---

## Problem card

Each card:

```text
Problem title

Difficulty
Category
Concepts

[Start Problem]
```

Avoid excessive metadata.

---

# SEARCH

Search by:

- title
- concept
- category
- problem text

Use real indexed/queryable data.

---

# PHASE 6 ACCEPTANCE

Verify:

- filtering
- search
- pagination if needed
- problem navigation
- no duplicate problems
- no fabricated counts

### STOP.

---

# PHASE 7 — GAMIFIED LEARNING LAYER

Only after the SQL engine and content are stable.

Introduce:

## XP

Award XP only from real completed actions.

Example:

```text
Problem solved: +XP
Hint used: smaller XP
Solution viewed: smaller/no XP
```

Exact values should be configurable.

---

## Streak

Only if the platform already has reliable user identity and persistence.

Do not fake streaks.

---

## Difficulty progression

Potential flow:

```text
FOUNDATION
   ↓
EASY
   ↓
MEDIUM
   ↓
HARD
   ↓
INTERVIEW
```

Do not lock content arbitrarily unless the product actually requires it.

---

# PHASE 8 — INTERVIEW MODE

Now connect SQL Lab to interview preparation.

Interview Mode should change the experience from:

```text
LEARNING
```

to:

```text
INTERVIEW
```

Example:

```text
Question
↓
Timer
↓
SQL Editor
↓
Submit
↓
Result
↓
Explanation
↓
Interview follow-up
```

Possible interview categories:

```text
SQL Screening
Data Engineer SQL
Analytics SQL
Advanced SQL
Company Questions
```

Only use categories supported by the verified data.

---

# PHASE 9 — PROGRESS

Only after real user persistence exists.

Track:

```text
Problems attempted
Problems solved
Difficulty
Categories
Hints used
Solutions viewed
Interview attempts
```

Do NOT create fake percentages.

If progress is not persisted yet:

```text
Progress tracking coming soon.
```

---

# PHASE 10 — VISUAL SQL LEARNING

This comes AFTER the functional SQL engine.

Add meaningful animations.

Examples:

## JOIN visualization

```text
Table A
   +
Table B
   ↓
JOIN
   ↓
Result
```

## GROUP BY

```text
Rows
 ↓
Group
 ↓
Aggregate
 ↓
Result
```

## Window Function

```text
Rows
 ↓
PARTITION
 ↓
ORDER
 ↓
RANK
```

## CTE

```text
Base Query
    ↓
CTE
    ↓
Final Query
```

The animations must teach the concept.

Do NOT add random decorative animation.

Use:

- Framer Motion
- Lucide
- shadcn/ui

But do not interfere with the Fundamental 50 animations.

---

# PHASE 11 — PERFORMANCE & HARDENING

Only after the product works.

Review:

- query execution safety
- database isolation
- query timeout
- result limits
- API validation
- rate limiting
- caching where appropriate
- indexes
- loading states
- error handling
- bundle size
- unnecessary client components

Do not optimize by removing meaningful learning interactions.

---

# PHASE 12 — FULL BROWSER QA

Test:

## Content

- [ ] verified SQL questions load
- [ ] source attribution preserved
- [ ] no duplicated questions
- [ ] no corrupted source content

## Editor

- [ ] typing
- [ ] syntax highlighting
- [ ] reset
- [ ] run
- [ ] errors

## Execution

- [ ] valid query
- [ ] invalid query
- [ ] forbidden query
- [ ] timeout
- [ ] row limit

## Learning

- [ ] hints
- [ ] solution
- [ ] explanation
- [ ] interview follow-up

## Library

- [ ] search
- [ ] filter
- [ ] navigation

## Responsive

- [ ] desktop
- [ ] tablet
- [ ] mobile
- [ ] no horizontal overflow

## Existing Platform

- [ ] Fundamental 50 still works
- [ ] Homepage still works
- [ ] Fundamental 50 animations untouched
- [ ] Homepage animations untouched

---

# 🛑 STRICT STOP RULE

After EACH phase:

```text
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
```

Do NOT silently continue through all phases.

---

# 📋 REQUIRED REPORT AFTER EVERY PHASE

Return:

```text
PHASE: X

Implemented:
- ...

Files added:
- ...

Files modified:
- ...

Files NOT modified:
- Fundamental 50 animations
- InteractionRegistry
- Homepage animations

Browser verification:
- PASS / FAIL

Known issues:
- ...

Next phase:
- ...
```

---

# 🚫 DO NOT DO THESE THINGS

Do NOT:

- ingest every PDF at once
- create hundreds of questions before validating the engine
- create fake SQL execution
- execute SQL against production
- fabricate expected outputs
- fabricate progress
- fabricate XP
- fabricate user statistics
- fabricate interview questions
- modify Fundamental 50
- modify Homepage animations
- redesign the homepage
- introduce authentication in this phase
- migrate MongoDB/PostgreSQL in this phase
- migrate content to MDX in this phase
- optimize InteractionRegistry in this phase

---

# 🧠 FINAL PRODUCT PHILOSOPHY

Fundamental 50 teaches:

```text
WHAT IS IT?
WHY DOES IT WORK?
HOW DOES THE SYSTEM BEHAVE?
```

SQL Lab teaches:

```text
CAN YOU ACTUALLY USE IT?
```

The learner journey becomes:

```text
FUNDAMENTAL 50
      ↓
UNDERSTAND
      ↓
SQL LAB
      ↓
PRACTICE
      ↓
INTERVIEW MODE
      ↓
REAL-WORLD SYSTEM DESIGN
```

---

# 🔥 IMMEDIATE COMMAND

Start with:

## PHASE 0 ONLY

Audit the existing project and SQL-related source material.

Do NOT build SQL UI.

Do NOT modify Fundamental 50.

Do NOT modify Homepage.

Do NOT ingest the entire resource folder.

Return the architecture/source audit.

Then STOP.

Wait for approval before Phase 1.
