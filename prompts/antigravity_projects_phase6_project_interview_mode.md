# ANTIGRAVITY — PROJECTS PHASE 6
# PROJECT INTERVIEW MODE

---

# STATUS

PHASE 5 — APPROVED ✅

Completed and verified:

```text
Project Library
      ↓
Project Detail
      ↓
Architecture Explorer
      ↓
Scenario Explorer
      ↓
33 verified VoltGrid scenarios
```

We are now implementing:

# PHASE 6 — PROJECT INTERVIEW MODE

---

# 🎯 OBJECTIVE

Create an interview-preparation experience inside the verified VoltGrid AU project.

The learner should be able to practice explaining the project as if answering a real Data Engineering interview.

Core flow:

```text
PROJECT
   ↓
INTERVIEW MODE
   ↓
QUESTION
   ↓
THINK / ANSWER
   ↓
REVEAL
   ↓
SOURCE-GROUNDED EXPLANATION
   ↓
NEXT QUESTION
```

This phase is ONLY for Project Interview Mode.

---

# 🔒 SOURCE OF TRUTH

Primary source:

```text
data/verified-projects/voltgrid-au.json
```

The source-backed interview material is the foundation.

Also use the existing verified project fields where relevant:

```text
project overview
architecture
source systems
ingestion
processing
Bronze
Silver
Gold
serving
data quality
security
orchestration
monitoring
data model
scenarios
technologies
interview talking points
```

Do NOT invent project facts.

---

# 🚨 CRITICAL SOURCE-FIDELITY RULE

Interview questions may be pedagogically generated from documented source material.

However:

## PROJECT FACTS MUST NEVER BE INVENTED.

Do NOT invent:

- years of experience
- team size
- project duration
- record volumes
- latency numbers
- SLA numbers
- cost savings
- percentage improvements
- customer counts
- business metrics
- technologies not documented
- responsibilities not documented
- undocumented implementation details

If the source does not contain a fact:

```text
Not documented in the verified source.
```

Do not silently fill the gap with general Data Engineering knowledge.

---

# 🔒 PROTECTED SYSTEMS

DO NOT MODIFY:

## FUNDAMENTAL 50

- Q1–Q50
- InteractionRegistry
- existing animation components
- animation mappings
- animation timing
- animation behavior
- `/questions`
- `/questions/[id]`

## HOMEPAGE

DO NOT MODIFY:

- Hero
- Navbar
- homepage animations
- Fundamental 50 section
- existing homepage layout

## SQL

DO NOT MODIFY:

- SQL Lab
- SQL routes
- SQL datasets
- SQL components

## PROJECT ARCHITECTURE

Do NOT rewrite or alter the Phase 4:

```text
ArchitectureExplorer
```

## PROJECT SCENARIOS

Do NOT rewrite or alter the Phase 5:

```text
ScenarioExplorer
```

Interview Mode must be an independent system.

---

# 🚫 NOT IN THIS PHASE

Do NOT implement:

- global user progress
- authentication
- leaderboard
- social sharing
- certificates
- AI grading
- LLM-generated answers at runtime
- resume generation
- additional projects
- admin question editor
- public question submission
- complex scoring algorithms

Keep the interview system deterministic and source-grounded.

---

# STEP 1 — INSPECT EXISTING PROJECT DATA

Inspect:

```text
data/verified-projects/voltgrid-au.json
```

and the existing Project DTO.

Identify all material that can support interview questions.

Especially inspect:

```text
interviewTalkingPoints
architecture
ingestion
sourceSystems
dataQuality
security
monitoring
dataModel
scenarios
technologies
```

Do not duplicate information unnecessarily.

---

# STEP 2 — CREATE INTERVIEW QUESTION MODEL

Create an isolated project interview domain model.

Suggested:

```ts
type ProjectInterviewQuestion = {
  id: string;
  projectSlug: string;

  question: string;

  category:
    | "architecture"
    | "ingestion"
    | "medallion"
    | "data-quality"
    | "security"
    | "monitoring"
    | "data-model"
    | "scenarios"
    | "technology"
    | "project-overview";

  difficulty:
    | "foundational"
    | "intermediate"
    | "advanced";

  sourceReferences: string[];

  expectedPoints: string[];

  explanation: string;
};
```

Adjust the type to match existing conventions.

Do NOT add unsupported fields.

---

# STEP 3 — INTERVIEW QUESTION DATASET

Create a deterministic verified project interview dataset.

Suggested:

```text
data/verified-projects/voltgrid-au-interview.json
```

or an equivalent project-data location consistent with the repository.

Questions must be generated from the verified project content.

Each question must include:

```text
question
category
difficulty
sourceReferences
expectedPoints
explanation
```

---

# STEP 4 — QUESTION QUALITY

Questions should resemble actual Data Engineering interview questions.

Examples of supported question themes:

```text
Explain the overall VoltGrid architecture.

Why was a Medallion Lakehouse architecture used?

How does ingestion handle different source patterns?

How are streaming and batch ingestion represented?

What happens in the Bronze layer?

What transformations are performed in Silver?

What is the purpose of the Gold layer?

How is the data served to downstream consumers?

How is data quality handled?

How is security implemented?

How is orchestration handled?

How is monitoring performed?

Explain one documented project scenario.

Explain the documented data model.

What Azure technologies are used?
```

These are examples of question themes only.

Use the actual verified source to determine the final questions and answers.

---

# STEP 5 — EXPECTED ANSWER POINTS

Do NOT require one exact natural-language answer.

Instead define:

```text
expectedPoints
```

For example:

```text
[
  "Mentions source systems",
  "Explains ingestion",
  "Explains Bronze",
  "Explains Silver",
  "Explains Gold",
  "Explains serving"
]
```

Every expected point must be supported by the project source.

This allows the learner to formulate their own answer.

---

# STEP 6 — SOURCE REFERENCES

Every interview question must point back to the source material.

Example:

```json
{
  "sourceReferences": [
    "architecture",
    "ingestion",
    "serving"
  ]
}
```

Use the actual project dataset structure.

Do not create fake page numbers or citations.

If the dataset does not contain page-level references:

Do NOT invent them.

---

# STEP 7 — EXPLANATION DESIGN

After the learner reveals the answer, show:

```text
WHAT A STRONG ANSWER SHOULD COVER
```

Then:

```text
KEY POINTS
```

Then:

```text
SOURCE-GROUNDED EXPLANATION
```

The explanation must remain faithful to the verified project.

Avoid:

```text
This probably means...
Usually companies...
A typical architecture would...
```

unless explicitly labeled as general knowledge.

Prefer:

```text
The verified VoltGrid project documents...
```

---

# STEP 8 — INTERVIEW UI

Create:

```text
components/projects/interview/
    ProjectInterview.tsx
    InterviewQuestion.tsx
    InterviewAnswer.tsx
    InterviewProgress.tsx
```

Use existing UI components where possible.

---

# STEP 9 — INTERVIEW MODE ENTRY

Inside:

```text
/projects/voltgrid-au
```

add a clear:

```text
INTERVIEW MODE
```

entry point.

Example:

```text
┌──────────────────────────────────────┐
│  PROJECT INTERVIEW MODE              │
│                                      │
│  Practice explaining this project    │
│  like a Data Engineering interview.  │
│                                      │
│  [Start Interview]                   │
└──────────────────────────────────────┘
```

Do not make this a separate unrelated application.

---

# STEP 10 — INTERVIEW EXPERIENCE

When started:

```text
QUESTION 01
```

Display:

```text
Category
Difficulty

Question

[Your Answer]

[Reveal Answer]
```

The learner should be able to think before revealing the expected points.

---

# STEP 11 — ANSWER INPUT

Use a textarea.

Requirements:

- keyboard accessible
- resizable or sufficiently large
- clear placeholder
- no forced exact wording
- answer remains visible after reveal

Do NOT send answers to an external AI service.

No AI grading in this phase.

---

# STEP 12 — REVEAL EXPERIENCE

Before reveal:

```text
[Reveal Answer]
```

After reveal:

```text
YOUR ANSWER

...

WHAT A STRONG ANSWER SHOULD COVER

...

SOURCE-GROUNDED EXPLANATION

...

[SOURCE REFERENCES]

[Next Question]
```

Do not erase the learner's answer.

---

# STEP 13 — SELF-ASSESSMENT

Add simple self-assessment.

For example:

```text
How well did you answer?

[Needs Work]
[Good]
[Strong]
```

This is NOT a score generated by the system.

Store only local session state if needed.

Do not persist user performance to MongoDB in this phase.

---

# STEP 14 — QUESTION PROGRESSION

Provide:

```text
Previous
Next
```

and a progress indicator:

```text
Question 3 of 15
```

The exact question count must come from the loaded dataset.

Do NOT hardcode the total.

---

# STEP 15 — CATEGORY NAVIGATION

Allow lightweight category visibility.

For example:

```text
Architecture
Ingestion
Medallion
Data Quality
Security
Monitoring
Data Model
Scenarios
Technology
```

Only show categories that actually exist in the loaded question dataset.

Do not build a complex filtering engine.

---

# STEP 16 — QUESTION ORDER

Use deterministic ordering.

Do NOT randomize by default.

A logical progression is preferred:

```text
Project Overview
      ↓
Architecture
      ↓
Ingestion
      ↓
Medallion
      ↓
Data Quality
      ↓
Security
      ↓
Monitoring
      ↓
Data Model
      ↓
Scenarios
      ↓
Technology
```

Only use categories actually represented in the source.

---

# STEP 17 — MOTION

Use subtle Framer Motion transitions.

Allowed:

- question transition
- answer reveal
- progress transition
- category selection
- panel entrance

Do NOT create large cinematic animations.

Do NOT modify the Phase 4 or Phase 5 animation systems.

Interview animation must remain isolated.

---

# STEP 18 — ALWAYS-ON MICRO-MOTION

A very subtle ambient indicator may remain active:

```text
INTERVIEW MODE ●
```

or similar.

This is optional.

Do not add unnecessary moving elements.

The learning content is more important than decoration.

---

# STEP 19 — RESPONSIVE DESIGN

Desktop:

```text
Question
+
Answer area
+
Expected points
```

Tablet:

```text
Question
↓
Answer
↓
Reveal
```

Mobile:

```text
Category
Question
Textarea
Reveal
Expected points
Explanation
Next
```

No horizontal overflow.

---

# STEP 20 — ACCESSIBILITY

Required:

- semantic headings
- accessible textarea
- keyboard navigation
- visible focus states
- accessible buttons
- readable contrast
- no hover-only content
- screen-reader-friendly labels

Reveal state must be announced appropriately where practical.

---

# STEP 21 — DATA FLOW

Preferred:

```text
Verified Interview Dataset
        ↓
Project API / Service
        ↓
Project DTO or interview DTO
        ↓
Project Detail
        ↓
ProjectInterview
```

Do not import interview JSON directly into client components if the application architecture already provides a server/API data layer.

Do not query MongoDB from client components.

---

# STEP 22 — API / BACKEND

If interview questions require a backend endpoint, implement read-only access.

Suggested:

```text
GET /api/projects/[slug]/interview
```

Response:

```json
{
  "questions": [],
  "count": 0
}
```

No write endpoint.

No answer submission endpoint.

No user-performance persistence.

---

# STEP 23 — SOURCE FIDELITY VALIDATION

Create validation that checks:

```text
question exists
category exists
difficulty exists
sourceReferences exists
expectedPoints exists
explanation exists
```

Also verify:

```text
no empty questions
no duplicate IDs
no duplicate question text
no unsupported technologies
no unsupported project claims
```

---

# STEP 24 — FACT CONTAMINATION CHECK

Run an automated check to ensure interview content does not accidentally contain:

```text
unverified metrics
fake years
fake team sizes
fake performance claims
fake project responsibilities
```

If the source does not document a number, do not introduce it.

---

# STEP 25 — BROWSER VERIFICATION

Mandatory.

Open:

```text
/projects/voltgrid-au
```

Verify:

### Entry

- Interview Mode entry is visible
- Start Interview works

### Question

- question loads
- category displays
- difficulty displays
- progress displays

### Answer

- textarea works
- user can type
- answer remains visible

### Reveal

- Reveal Answer works
- expected points appear
- explanation appears
- source references appear
- no fake facts appear

### Navigation

- Next works
- Previous works
- first/last question boundaries work

### Category

- category filtering/navigation works if implemented

### Responsive

Verify:

```text
Desktop
Tablet
Mobile
```

### Reduced motion

Verify the interface remains usable.

---

# STEP 26 — REGRESSION

Verify:

```text
/
```

Homepage:

```text
PASS
```

Verify:

```text
/projects
```

Project Library:

```text
PASS
```

Verify:

```text
/projects/voltgrid-au
```

Confirm:

```text
Architecture Explorer PASS
Scenario Explorer PASS
Interview Mode PASS
```

Verify:

```text
/questions
```

and at least one Fundamental 50 interactive question.

Confirm:

```text
Fundamental 50 animations unchanged
InteractionRegistry unchanged
```

Verify SQL remains unchanged.

---

# STEP 27 — INTERVIEW CONTENT AUDIT

Before declaring success:

Compare every interview question against:

```text
data/verified-projects/voltgrid-au.json
```

Verify:

```text
question
expectedPoints
explanation
sourceReferences
```

Do not rely only on code compilation.

The interview content must be source-grounded.

---

# 🚫 DO NOT ADD SCORE

Do NOT create:

```text
82/100
Expert
Beginner
Top 10%
Interview Ready
```

based on the user's answer.

No automatic assessment.

The self-assessment buttons are only:

```text
Needs Work
Good
Strong
```

and are user-selected.

---

# 🚫 DO NOT CLAIM INTERVIEW EXPERIENCE

Do not turn the verified project into a fabricated resume story.

For example, do NOT automatically say:

```text
I personally designed...
I personally implemented...
I reduced costs by...
I handled 10M records...
```

unless explicitly documented in the source.

The interview mode teaches the learner how to explain the documented project; it does not invent personal experience.

---

# REQUIRED REPORT

Return exactly:

```text
PHASE 6 — PROJECT INTERVIEW MODE

Implemented:
- ...

Verified source:
- data/verified-projects/voltgrid-au.json

Interview dataset:
- location:
- question count:

Categories:
- ...

Difficulty levels:
- ...

Question flow:
- ...

Answer input:
- ...

Reveal experience:
- ...

Expected points:
- ...

Source references:
- ...

Self-assessment:
- ...

Navigation:
- ...

API:
- ...

Validation:
- ...

Fact contamination check:
- ...

Responsive:
- Desktop:
- Tablet:
- Mobile:

Accessibility:
- ...

Reduced motion:
- ...

Browser verification:
- Interview entry:
- Question:
- Answer input:
- Reveal:
- Navigation:
- Category:
- Responsive:
- Reduced motion:

Regression:
- Homepage:
- Projects Library:
- Architecture Explorer:
- Scenario Explorer:
- Fundamental 50:
- InteractionRegistry:
- SQL:

Source fidelity audit:
- ...

Protected systems:
- Fundamental 50 untouched
- InteractionRegistry untouched
- Fundamental animations untouched
- Homepage untouched
- Homepage animations untouched
- SQL untouched
- Architecture Explorer untouched
- Scenario Explorer untouched

Known issues:
- ...

Next phase:
- Phase 7 — Project Progress + Bookmarks

STOP.
```

---

# 🛑 HARD STOP

After Phase 6 is implemented, source-audited, browser-verified, and regression-tested:

STOP.

Do NOT automatically begin Phase 7.

Do NOT add global progress.

Do NOT add bookmarks.

Do NOT add authentication.

Do NOT add leaderboards.

Do NOT add AI grading.

Do NOT add additional projects.

Do NOT modify Fundamental 50.

WAIT FOR APPROVAL.
