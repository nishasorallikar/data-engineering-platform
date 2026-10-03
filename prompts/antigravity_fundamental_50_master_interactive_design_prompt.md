# ANTIGRAVITY MASTER PROMPT
# Fundamental 50 — Complete Interactive Learning Experience
## Framer Motion + Lucide + shadcn/ui — Q1–Q50 in One Implementation

---

# 0. MISSION

Build the complete **50 Fundamental Data Engineering Interview Questions** learning experience as a premium, highly interactive interview-preparation product.

The current Q1 and Q2 direction is the visual/interaction quality target:

- Framer Motion is visibly used.
- Interactions teach the concept rather than decorate the page.
- Lucide icons provide the visual language.
- shadcn/ui provides the UI primitives.
- Each question gets an interaction model appropriate to the concept.
- Motion communicates relationships, sequence, state, comparison, scale, flow, or trade-offs.
- The experience should feel like an interactive technical learning system, not a PDF viewer or a long article page.

This prompt covers **all 50 questions in one implementation plan**.

Do NOT build one generic visual component and merely swap labels for all 50 questions.

Instead:

```text
ONE LEARNING SHELL
        +
QUESTION-SPECIFIC INTERACTION MODEL
        +
SOURCE-FAITHFUL CONTENT
        +
FRAMER MOTION
        +
LUCIDE
        +
SHADCN/UI
```

---

# 1. SOURCE OF TRUTH — NON-NEGOTIABLE

The authoritative source is:

```text
50-Data-Engineering-Interview-Questions.pdf
```

The source-faithful transcription available in the project/workspace may be used as a reference:

```text
50_fundamental_data_engineering_interview_questions.md
```

The source contains exactly:

```text
Q1–Q7    Foundations & Architecture
Q8–Q16   SQL
Q17–Q25  Data Modelling & Warehousing
Q26–Q34  Pipelines, ETL & Orchestration
Q35–Q43  Big Data & Spark
Q44–Q47  Streaming & Messaging
Q48–Q50  Distributed Systems & Design
```

The source content already ingested into the application's Fundamental 50 dataset is the content layer.

## Never invent

Do NOT invent:

- answers
- explanations
- examples
- diagrams
- architecture nodes
- interviewer angles
- benchmarks
- statistics
- cloud-provider claims
- implementation details
- code
- SQL
- recommendations
- source pages

unless the source already supports them.

If a proposed interaction requires information that does not exist in the source, use the interaction to reveal/organize existing source content instead of creating new technical facts.

---

# 2. THE CORE DESIGN PHILOSOPHY

The learning experience should follow this mental model:

```text
ASK
 ↓
THINK
 ↓
REVEAL
 ↓
VISUALIZE
 ↓
EXPLORE
 ↓
UNDERSTAND
 ↓
INTERVIEW
 ↓
SOURCE
```

The learner should not immediately receive a giant wall of explanation.

Every question should create a reason to interact.

However:

**Do not force interaction where interaction would make the concept less clear.**

Examples:

- A pipeline concept → animated flow.
- A comparison → interactive comparison.
- A hierarchy → expanding hierarchy.
- A data model → relationship diagram.
- A Spark architecture → layered execution diagram.
- Kafka → animated event stream.
- CAP → three-state conceptual model.
- A system-design question → buildable architecture canvas.

---

# 3. GLOBAL PAGE STRUCTURE

Every Fundamental 50 question page should use this shell:

```text
┌──────────────────────────────────────────────┐
│ SECTION / Q NUMBER                          │
│                                              │
│ Q01                                           │
│ What does a data engineer actually do?       │
│                                              │
│ Question 1 of 50                             │
└──────────────────────────────────────────────┘

                 ↓

┌──────────────────────────────────────────────┐
│ THINK FIRST                                  │
│                                              │
│ Answer out loud before revealing the answer. │
│                                              │
│                 [ Reveal Answer ]            │
└──────────────────────────────────────────────┘

                 ↓

┌──────────────────────────────────────────────┐
│ CORE CONCEPT                                 │
│ Source-derived answer / explanation          │
└──────────────────────────────────────────────┘

                 ↓

┌──────────────────────────────────────────────┐
│ INTERACTIVE CONCEPT                          │
│                                              │
│ Question-specific visualization              │
└──────────────────────────────────────────────┘

                 ↓

┌──────────────────────────────────────────────┐
│ UNDERSTAND / EXPLORE                         │
│ Structured source-derived explanation        │
└──────────────────────────────────────────────┘

                 ↓

┌──────────────────────────────────────────────┐
│ INTERVIEWER'S ANGLE                          │
│ Source-derived interviewer guidance          │
└──────────────────────────────────────────────┘

                 ↓

┌──────────────────────────────────────────────┐
│ SOURCE                                       │
│ PDF + actual provenance                      │
└──────────────────────────────────────────────┘

                 ↓

       ← Previous          Next →
```

Do not use this exact vertical stack rigidly if the interaction itself needs a different layout. The shell is consistent; the central visual changes.

---

# 4. THINK FIRST — GAMIFIED BUT NOT FAKE

Implement a reusable `ThinkFirst` component.

Behavior:

1. Show the question.
2. Ask the learner to answer before revealing.
3. Use a deliberate pause/interaction state.
4. Reveal the source-derived answer on click.
5. Animate the reveal with Framer Motion.
6. Never fabricate a score unless an actual answer-checking mechanism exists.
7. Do not pretend the user was graded when they were not.

Preferred interaction:

```text
┌────────────────────────────┐
│ THINK FIRST                │
│                            │
│ What would you say?        │
│                            │
│ ○ I have an answer         │
│                            │
│ [ Reveal Answer ]          │
└────────────────────────────┘
```

Use:

- `Card`
- `Button`
- `Badge`
- `Tooltip`
- Framer Motion
- optional `AnimatePresence`

The learner's mental effort is the gamification, not fake points.

---

# 5. GLOBAL MOTION SYSTEM

Create one consistent motion system.

Suggested tokens:

```ts
pageEnter:
  opacity: 0 -> 1
  y: 16 -> 0

sectionEnter:
  opacity: 0 -> 1
  y: 20 -> 0

cardEnter:
  opacity: 0 -> 1
  y: 12 -> 0

interactiveNode:
  scale: 1 -> 1.03

focus:
  opacity: 1 -> 0.35 for unrelated nodes

reveal:
  height: 0 -> auto
  opacity: 0 -> 1

connector:
  animated directional flow

micro:
  120–220ms

normal:
  250–450ms

large:
  450–700ms
```

Do not animate everything.

Prefer:

```text
transform
opacity
layout
```

Avoid unnecessary:

```text
width animation
height animation
box-shadow animation
large blur animations
continuous DOM-heavy animations
```

---

# 6. REDUCED MOTION

Every animated component must respect:

```text
prefers-reduced-motion
```

When reduced motion is enabled:

- remove looping flow animations
- remove large entrance movement
- keep state changes understandable
- use opacity or immediate state changes
- never hide information because animation was disabled

Create a shared motion utility/hook rather than duplicating reduced-motion logic.

---

# 7. GLOBAL INTERACTION RULES

For interactive diagrams:

### Hover
Show:

- subtle scale
- border emphasis
- tooltip where useful

### Click
Show:

- selected state
- detail panel
- explanation
- focus mode where useful

### Focus mode
Dim unrelated elements.

### Expand
Use:

```text
AnimatePresence
layout
```

### Navigation
Question-to-question transitions should preserve orientation.

### Keyboard
All interactive nodes must be keyboard reachable.

### Mobile
Do not shrink a desktop diagram until it becomes unusable.

Use:

- horizontal scrolling
- stacked cards
- bottom sheets
- collapsible details
- simplified visual density

where appropriate.

---

# 8. COMPONENT ARCHITECTURE

Use a reusable architecture.

```text
components/fundamentals/
  FundamentalQuestionPage.tsx
  ThinkFirst.tsx
  AnswerReveal.tsx
  CoreConcept.tsx
  InteractiveConcept.tsx
  InterviewerAngle.tsx
  SourceSection.tsx
  QuestionNavigation.tsx

  interactive/
    pipeline/
    etl-elt/
    oltp-olap/
    lake-warehouse-lakehouse/
    data-types/
    data-mart/
    batch-streaming/
    sql/
    normalization/
    denormalization/
    star-schema/
    snowflake-schema/
    fact-dimension/
    keys/
    scd/
    grain/
    architecture-patterns/
    idempotency/
    loading/
    cdc/
    backfill/
    orchestration/
    late-data/
    data-quality/
    schema-drift/
    incident-response/
    spark-architecture/
    rdd-dataframe-dataset/
    transformations-actions/
    shuffle/
    skew/
    partitioning-bucketing/
    file-formats/
    small-files/
    cache-broadcast/
    kafka/
    message-queue/
    delivery-semantics/
    event-time/
    cap/
    scaling/
    ride-hailing-system/
```

Do not create all folders if an existing component can safely serve multiple related questions.

Use a data-driven registry:

```ts
type FundamentalInteractionType =
  | "pipeline"
  | "comparison"
  | "architecture"
  | "flow"
  | "hierarchy"
  | "matrix"
  | "table"
  | "timeline"
  | "state-machine"
  | "execution"
  | "stream"
  | "system-design"
```

Question configuration determines the visual.

---

# 9. COMPLETE Q1–Q50 DESIGN MAP

The following is the required interaction direction for each question.

---

# SECTION 1 — FOUNDATIONS & ARCHITECTURE

---

## Q1 — What does a data engineer actually do?

### Interaction
**Animated end-to-end data pipeline.**

Visual:

```text
Sources
   ↓
Ingestion
   ↓
Storage
   ↓
Transformation
   ↓
Serving
```

Reliability is a cross-cutting layer:

```text
Orchestration
Testing
Monitoring
Lineage
Cost Control
```

### Motion

- progressive stage reveal
- animated connectors
- moving data particles
- hover stage
- click stage
- focus selected stage
- expanded stage explanation
- reliability layer subtly pulses only when selected

### Icons

Use relevant Lucide icons such as:

- Database
- DownloadCloud / Import
- HardDrive
- GitBranch / Workflow
- BarChart3
- ShieldCheck
- Activity
- TestTube
- Network
- DollarSign

Do not invent icon meanings if another Lucide icon better represents the source label.

---

## Q2 — Explain ETL vs ELT. Which would you choose today?

### Interaction
**Interactive ETL ↔ ELT architecture toggle.**

ETL:

```text
Source
 ↓
Extract
 ↓
Transform
 ↓
Load
 ↓
Target
```

ELT:

```text
Source
 ↓
Extract
 ↓
Load
 ↓
Target
 ↓
Transform
```

### Motion

When toggling:

- Transform physically moves
- connectors reconfigure
- layout animates
- active architecture changes
- comparison panel updates

### Important

Preserve the source's trade-off discussion.

Do not turn "which would you choose today?" into a universal claim beyond the source.

---

## Q3 — What is the difference between OLTP and OLAP systems?

### Interaction
**Two-system comparison laboratory.**

Left:

```text
OLTP
```

Right:

```text
OLAP
```

Show source-supported differences as selectable dimensions:

```text
Purpose
Workload
Query pattern
Data organization
Typical usage
```

### Motion

Click a dimension:

- both sides highlight
- matching relationship line appears
- details slide into comparison area

Optional:

```text
Transaction → OLTP
Analytical query → OLAP
```

Use animated query/request particles only if the source supports the visual metaphor.

---

## Q4 — Data lake, data warehouse, or lakehouse — what is the difference?

### Interaction
**Three-way architecture explorer.**

Tabs/cards:

```text
DATA LAKE
DATA WAREHOUSE
LAKEHOUSE
```

### Motion

- shared horizontal axis
- selected architecture expands
- unselected architectures compress
- switching animates the central storage/processing visual
- comparison attributes transition with `layout`

Use a three-column comparison on desktop and a swipe/stack interaction on mobile.

---

## Q5 — How do you handle structured, semi-structured and unstructured data?

### Interaction
**Data-shape explorer.**

Three visual containers:

```text
STRUCTURED
SEMI-STRUCTURED
UNSTRUCTURED
```

Use source-supported examples only.

### Motion

Click a type:

- sample representation transforms into the selected format
- schema/shape visualization changes
- explanation card reveals

Possible visual language:

```text
Rows / Columns
JSON-like tree
Document / Media-like container
```

Only use actual source examples if present.

---

## Q6 — What is a data mart, and when would you build one?

### Interaction
**Warehouse → Data Mart branching visual.**

Visual:

```text
Enterprise / Warehouse
        |
   +----+----+
   ↓         ↓
Sales Mart  Finance Mart
```

Only show domains that the source actually supports. If the source does not specify examples, use generic labels:

```text
Domain / Team
```

### Motion

- data flow branches
- selected mart expands
- parent warehouse remains visible
- purpose/explanation appears in side panel

---

## Q7 — Batch or streaming — how do you decide?

### Interaction
**Time-flow decision simulator.**

Split:

```text
BATCH
──────────────►
periodic processing

STREAMING
────────────────────────►
continuous events
```

### Motion

- batch packets move in groups
- streaming events move individually
- toggle comparison
- source-supported decision factors appear as selectable cards

Do not invent latency thresholds.

---

# SECTION 2 — SQL

For SQL questions, preserve the existing SQL rendering pipeline.

Do not replace working SQL table/code parsing.

---

## Q8 — Explain every JOIN type and where each is used.

### Interaction
**JOIN visual laboratory.**

Selectable JOIN types:

```text
INNER
LEFT
RIGHT
FULL
CROSS
```

Only include types actually present in the source.

### Motion

Animate two table circles/sets.

On JOIN selection:

- matching rows illuminate
- output region updates
- join relationship animates
- SQL/result area can reveal source-supported example

Do not use fake row data if the source does not contain it.

---

## Q9 — WHERE vs HAVING — what is the difference?

### Interaction
**Query execution timeline.**

Visual:

```text
FROM
 ↓
WHERE
 ↓
GROUP BY
 ↓
HAVING
 ↓
SELECT
```

Only show ordering supported by source content.

### Motion

Click WHERE:

- pre-aggregation filtering area highlights.

Click HAVING:

- post-group filtering area highlights.

Animate records entering/exiting each stage.

---

## Q10 — What are window functions? Explain RANK, DENSE_RANK and ROW_NUMBER.

### Interaction
**Ranking playground.**

Use source-provided example data if available.

Three tabs:

```text
RANK
DENSE_RANK
ROW_NUMBER
```

### Motion

When switching:

- row rankings animate
- gaps/non-gaps update
- highlight the behavior difference

Use `layout` transitions instead of re-rendering the entire table.

---

## Q11 — Find the second-highest salary in each department.

### Interaction
**Interactive ranking problem.**

Visual:

```text
Department
   ↓
Rows
   ↓
Rank
   ↓
Rank = 2
```

### Motion

- reveal source table
- animate ranking
- selected rows move/highlight
- reveal SQL solution only after Think First

Keep SQL rendering inside the established SQL components.

---

## Q12 — How do you find and delete duplicate rows?

### Interaction
**Duplicate detection / cleanup simulator.**

Visual:

```text
Raw Rows
   ↓
Group by duplicate identity
   ↓
Duplicate groups
   ↓
Keep / Delete
```

### Motion

- duplicate rows visually group together
- duplicate cards stack
- selected record remains
- duplicates collapse away

Never perform destructive actions against real application data. This is a visual learning simulator only.

---

## Q13 — CTE vs subquery vs temporary table — when do you use each?

### Interaction
**Three-panel SQL strategy board.**

```text
CTE
SUBQUERY
TEMP TABLE
```

### Motion

Select one:

- panel expands
- query flow animates
- other options dim
- comparison matrix updates

---

## Q14 — A query is slow. Walk me through how you fix it.

### Interaction
**SQL performance investigation flow.**

Visual stages:

```text
Observe
 ↓
Inspect
 ↓
Explain Plan
 ↓
Identify Bottleneck
 ↓
Optimize
 ↓
Validate
```

Do not add unsupported optimization steps.

### Motion

Each stage becomes active sequentially.

The learner clicks through the investigation.

---

## Q15 — UNION vs UNION ALL?

### Interaction
**Result-set merge visualizer.**

Two source result sets:

```text
A
B
```

Toggle:

```text
UNION
UNION ALL
```

### Motion

Rows flow into output.

For UNION:

- duplicates visibly collapse if the source explanation supports this.

For UNION ALL:

- all rows remain.

Use actual source-provided rows where available.

---

## Q16 — What NULL-handling mistakes do you watch out for?

### Interaction
**NULL behavior explorer.**

Use source-supported cases.

Possible interaction categories only when supported:

```text
Comparison
Aggregation
Filtering
Joins
```

### Motion

NULL rows animate through the selected operation.

Use a distinct but accessible NULL visual state.

---

# SECTION 3 — DATA MODELLING & WAREHOUSING

---

## Q17 — Explain normalisation and the normal forms.

### Interaction
**Progressive table decomposition.**

Visual:

```text
UNNORMALISED
     ↓
1NF
     ↓
2NF
     ↓
3NF
```

Only include normal forms present in the source.

### Motion

- table splits
- repeated attributes move
- relationships appear
- selected normal form expands

Do not manufacture textbook examples if absent.

---

## Q18 — When would you deliberately denormalise?

### Interaction
**Normalize ↔ Denormalize trade-off slider.**

Show:

```text
More normalized
        ↕
More denormalized
```

Source-supported trade-offs appear as cards.

### Motion

Schema cards merge/split visually.

Do not present denormalization as universally good or bad.

---

## Q19 — What is a star schema and why is it the default for analytics?

### Interaction
**Interactive star schema.**

Center:

```text
FACT
```

Around it:

```text
DIMENSION
DIMENSION
DIMENSION
DIMENSION
```

### Motion

- fact table pulses
- dimensions connect
- clicking a dimension highlights its relationship
- details open beside the selected node

---

## Q20 — How does a snowflake schema differ, and when is it worth it?

### Interaction
**Star → Snowflake morph.**

Start with star schema.

Toggle:

```text
STAR
SNOWFLAKE
```

### Motion

Dimension nodes split into normalized branches.

The transformation itself teaches the concept.

---

## Q21 — Fact tables and dimension tables — and what types of fact table exist?

### Interaction
**Warehouse anatomy explorer.**

Two large zones:

```text
FACT TABLE
DIMENSION TABLE
```

Then source-supported fact-table types appear as selectable cards.

### Motion

Selecting a type changes the central fact-table visual.

---

## Q22 — Surrogate key vs natural key — which do you use in a warehouse?

### Interaction
**Key identity comparison.**

Visual:

```text
NATURAL KEY
vs
SURROGATE KEY
```

Use a source-supported example if present.

### Motion

Animate a dimension record through insert/update history.

Show the selected key traveling through relationships.

Do not invent warehouse behavior beyond the source.

---

## Q23 — Explain Slowly Changing Dimensions and their types.

### Interaction
**Dimension-history timeline.**

Visual:

```text
Customer
   ↓
Version 1
   ↓
Version 2
   ↓
Version 3
```

Types become selectable.

### Motion

- old row transitions
- new row appears
- history expands
- active version is highlighted

Only implement types actually covered in source content.

---

## Q24 — What is the grain of a fact table, and why is it the first thing you decide?

### Interaction
**Grain zoom-in explorer.**

Start with a broad business event.

Then zoom:

```text
Fact Table
   ↓
One row represents...
```

### Motion

Camera-like scale transition from business process → individual fact row.

The selected grain becomes visually locked.

Do not invent a grain example absent from source.

---

## Q25 — Inmon vs Kimball vs Data Vault — what is the difference?

### Interaction
**Three architecture strategy map.**

Columns:

```text
INMON
KIMBALL
DATA VAULT
```

### Motion

Selecting one architecture:

- expands its architecture diagram
- dims the other two
- comparison dimensions animate

Never rank them.

The source's trade-offs must remain intact.

---

# SECTION 4 — PIPELINES, ETL & ORCHESTRATION

---

## Q26 — What is idempotency and why does every pipeline need it?

### Interaction
**Retry simulator.**

Visual:

```text
Run 1
 ↓
Write
 ↓
Retry
```

Compare:

```text
Idempotent
Non-idempotent
```

### Motion

Press:

```text
RUN
```

Then:

```text
RETRY
```

Show the effect visually.

The simulator must use deterministic demo state only.

---

## Q27 — Full load vs incremental load — how do you choose?

### Interaction
**Load strategy simulator.**

Toggle:

```text
FULL LOAD
INCREMENTAL LOAD
```

Visualize:

```text
Source dataset
 ↓
Load strategy
 ↓
Target
```

### Motion

Full load moves the complete source representation.

Incremental load moves only source-supported changed/new data.

Do not invent CDC semantics if the source does not connect them here.

---

## Q28 — What is Change Data Capture and why is it better than polling?

### Interaction
**Database change stream.**

Visual:

```text
Database
 ↓
Change Events
 ↓
Consumer
```

Compare with:

```text
Polling
```

### Motion

CDC:

- changes emit immediately as events.

Polling:

- periodic scan pulses.

Use source-supported terminology and trade-offs.

---

## Q29 — How do you design and run a backfill?

### Interaction
**Timeline/backfill planner.**

Visual:

```text
Historical Time
──────────────────────────►
       ↑
    Backfill
       ↓
Current Pipeline
```

### Motion

A backfill window moves through historical partitions/time ranges.

Show stages from the source explanation.

Do not invent operational safeguards not present in source.

---

## Q30 — What does an orchestrator do, and what makes a good DAG?

### Interaction
**Interactive DAG.**

Visual:

```text
Task A
  ↓
Task B → Task C
  ↓
Task D
```

### Motion

- tasks activate in dependency order
- connectors animate
- selected node reveals details
- failed node can visually stop downstream execution

Do not simulate unsupported scheduling features.

---

## Q31 — How do you handle late-arriving data?

### Interaction
**Timeline with late event.**

Visual:

```text
Event Time
────────────────────►

Expected Event
          ●

Late Event
     ●
```

### Motion

A late event enters after the expected processing window and visually moves into the correct handling path.

Only use source-supported handling concepts.

---

## Q32 — What data quality checks would you put in a pipeline?

### Interaction
**Pipeline quality gates.**

Visual:

```text
Ingestion
   ↓
Quality Gate
   ↓
Transform
   ↓
Serve
```

Quality checks appear as selectable gates.

### Motion

Passing data flows forward.

Failed demo data pauses at the gate.

Do not claim actual runtime validation against production data.

---

## Q33 — How do you handle schema drift from an upstream source?

### Interaction
**Schema evolution visualizer.**

Visual:

```text
Schema v1
   ↓
Change detected
   ↓
Schema v2
```

### Motion

Added/removed/changed fields animate.

A compatibility indicator can be shown only if source content supports the distinction.

---

## Q34 — A production pipeline fails at 3 a.m. Walk me through what you do.

### Interaction
**Incident-response control room.**

Visual:

```text
ALERT
 ↓
ASSESS
 ↓
CONTAIN
 ↓
RECOVER
 ↓
VERIFY
 ↓
FOLLOW-UP
```

Only use stages supported by the source.

### Motion

- alert enters
- active stage pulses
- selected stage opens checklist/content
- timeline records actions

This should feel like a calm operational console, not a game.

---

# SECTION 5 — BIG DATA & SPARK

---

## Q35 — Explain Spark's architecture.

### Interaction
**Interactive Spark cluster architecture.**

Visual layers:

```text
Driver
   ↓
Cluster Manager
   ↓
Executors
   ↓
Tasks
```

Use only architecture elements present in source.

### Motion

- job submitted
- stages/tasks flow
- executors process work
- selected component expands

---

## Q36 — RDD vs DataFrame vs Dataset?

### Interaction
**Three-level abstraction explorer.**

Tabs:

```text
RDD
DATAFRAME
DATASET
```

Comparison dimensions from source.

### Motion

Selecting an abstraction morphs the representation from lower-level to higher-level where the source supports that conceptual relationship.

---

## Q37 — Transformations vs actions, and what is lazy evaluation?

### Interaction
**Spark execution simulator.**

Visual:

```text
Transformations
      ↓
Logical Plan
      ↓
Action
      ↓
Execution
```

### Motion

Click transformations:

- plan builds but does not execute.

Click action:

- execution animation starts.

This is one of the most important interactions in the Spark section.

---

## Q38 — Narrow vs wide transformations — and what is a shuffle?

### Interaction
**Partition movement simulator.**

Two modes:

```text
NARROW
WIDE
```

### Motion

Narrow:

```text
partition → partition
```

Wide:

```text
many partitions
      ↓
shuffle
      ↓
many partitions
```

Animate records physically crossing partition boundaries for the wide case.

---

## Q39 — What is data skew, how do you detect it and how do you fix it?

### Interaction
**Partition imbalance visualizer.**

Visual:

```text
Partition 1  ███
Partition 2  ███
Partition 3  █████████████████
Partition 4  ██
```

### Motion

- skewed partition grows visually
- detection view highlights the outlier
- source-supported mitigation appears after interaction

Do not invent a fix.

---

## Q40 — Partitioning vs bucketing — what is the difference?

### Interaction
**Storage layout explorer.**

Toggle:

```text
PARTITIONING
BUCKETING
```

Visualize directory/layout differences using abstract blocks.

### Motion

- partitioning reorganizes top-level paths
- bucketing reorganizes records into bucket groups

Use source-faithful explanation.

---

## Q41 — Parquet, ORC, Avro or CSV — which and why?

### Interaction
**File-format comparison lab.**

Four selectable formats:

```text
PARQUET
ORC
AVRO
CSV
```

### Motion

- format card expands
- visual representation changes
- comparison matrix updates
- source-supported trade-offs appear

Do not declare a universal winner.

---

## Q42 — What is the small files problem?

### Interaction
**File explosion simulator.**

Start:

```text
Few large files
```

Then animate:

```text
many tiny files
```

### Motion

- file icons multiply
- metadata/management overhead representation increases
- compaction/solution from source can be revealed if present

Avoid fake numeric performance claims.

---

## Q43 — cache vs persist, and when do you use a broadcast join?

### Interaction
**Spark memory / join strategy explorer.**

Two independent controls:

```text
CACHE / PERSIST
```

and:

```text
NORMAL JOIN / BROADCAST JOIN
```

### Motion

Show:

```text
Dataset
 ↓
Executor memory/storage
```

For broadcast:

```text
Small side
 ↘ ↓ ↙
Executors
```

Only use source-supported behavior.

---

# SECTION 6 — STREAMING & MESSAGING

---

## Q44 — Explain Kafka: topics, partitions, offsets and consumer groups.

### Interaction
**Live Kafka event-stream simulator.**

Visual:

```text
Topic
├── Partition 0
├── Partition 1
└── Partition 2
```

Consumers appear below.

### Motion

- events move through partitions
- offsets advance
- consumer group members process partitions
- selected partition/consumer highlights

This should be one of the strongest interactive visuals in the application.

---

## Q45 — How is Kafka different from a traditional message queue?

### Interaction
**Kafka vs Message Queue comparison.**

Two animated systems:

```text
KAFKA
TRADITIONAL MESSAGE QUEUE
```

Use source-supported dimensions.

### Motion

Events flow through each system differently.

Click a dimension to compare.

Do not imply unsupported product-specific behavior.

---

## Q46 — Explain at-most-once, at-least-once and exactly-once.

### Interaction
**Delivery semantics simulator.**

Three modes:

```text
AT-MOST-ONCE
AT-LEAST-ONCE
EXACTLY-ONCE
```

Visualize a message:

```text
Producer → Consumer
```

Then simulate retry/failure only in a controlled conceptual demo.

### Motion

Show:

- possible loss
- possible duplicate
- exactly-once conceptual outcome

only where supported by source.

Do not overclaim real-world guarantees.

---

## Q47 — Event time vs processing time — what is a watermark?

### Interaction
**Streaming timeline + watermark visualizer.**

Visual:

```text
EVENT TIME
──────────────────────────────►

PROCESSING TIME
──────────────────────────────►
```

Watermark line moves through the event-time axis.

### Motion

- events arrive out of order
- watermark advances
- late event enters
- source-supported behavior becomes visible

This should feel like a real streaming timeline.

---

# SECTION 7 — DISTRIBUTED SYSTEMS & DESIGN

---

## Q48 — Explain the CAP theorem.

### Interaction
**Interactive distributed-system triangle.**

Visual:

```text
          CONSISTENCY
             /\
            /  \
           /    \
          /      \
 PARTITION -------- AVAILABILITY
```

Do not present the diagram as a simplistic "pick any two" slogan if the source gives a more precise explanation.

### Motion

- hover each property
- click property to expand
- network partition event animates
- affected states highlight

Use source-faithful wording.

---

## Q49 — Sharding vs replication, and horizontal vs vertical scaling?

### Interaction
**Four-way scaling laboratory.**

Modes:

```text
SHARDING
REPLICATION
HORIZONTAL SCALING
VERTICAL SCALING
```

Visualize a server/database cluster.

### Motion

Sharding:

```text
One dataset
 ↓
multiple shards
```

Replication:

```text
Primary
 ↓
copies
```

Horizontal:

```text
more nodes
```

Vertical:

```text
bigger node
```

Use source-supported diagrams and terminology.

---

## Q50 — Design a data pipeline for a ride-hailing app from scratch.

### Interaction
**Full system-design builder.**

This is the final capstone.

Start with a blank canvas.

Potential source-supported architecture elements should be discovered from the actual Q50 source content before implementation.

Do NOT invent a cloud architecture just because it is a common interview answer.

The interaction should allow the learner to progressively reveal the architecture represented by the source.

Suggested learning progression:

```text
BUSINESS EVENTS
      ↓
SOURCES
      ↓
INGESTION
      ↓
STORAGE
      ↓
PROCESSING
      ↓
SERVING
      ↓
ANALYTICS / APPLICATIONS
```

Only include nodes actually supported by the source.

### Motion

- start with empty architecture canvas
- reveal one layer at a time
- connectors draw themselves
- events move through the pipeline
- selected components expand
- architecture can zoom
- dependencies highlight
- learner can click nodes to inspect source-derived explanation

### Final state

The learner should see the complete architecture and be able to explain it verbally.

This is the culmination of Q1–Q49.

---

# 10. QUESTION-SPECIFIC VISUAL LANGUAGE

Do not make every question look identical.

Use these visual families:

### Pipeline
Q1, Q2, Q6, Q7, Q26–34

### Comparison
Q3, Q4, Q13, Q15, Q18, Q20, Q22, Q25, Q36, Q40, Q41, Q45, Q49

### Data transformation
Q5, Q11, Q12, Q17, Q23, Q27, Q28

### Schema / architecture
Q19, Q20, Q21, Q25, Q35, Q44, Q48, Q50

### Execution simulator
Q9, Q10, Q14, Q37, Q38, Q39, Q43, Q46, Q47

### Timeline
Q23, Q24, Q29, Q31, Q34, Q47

### System design
Q48, Q49, Q50

These categories are design directions, not permission to add content.

---

# 11. SHADCN/UI RULES

Use shadcn/ui for:

```text
Card
Button
Badge
Tabs
Accordion
Collapsible
ScrollArea
Separator
Tooltip
Table
Progress
Dialog
Sheet
DropdownMenu
```

Use the smallest appropriate component.

Examples:

```text
Card → concept container
Tabs → comparison modes
Accordion → detailed explanation
ScrollArea → wide diagrams
Table → SQL/data examples
Badge → section/Q labels
Sheet → mobile detail panel
Tooltip → node metadata
Button → interaction controls
Dialog → optional deep explanation
```

Do not build a second UI framework.

---

# 12. LUCIDE ICON RULES

Use Lucide consistently.

Icons must communicate meaning.

Do not:

- use random decorative icons
- use emojis as primary technical visuals
- use an icon simply because it looks attractive
- create custom SVGs when Lucide already has a suitable icon

Examples:

```text
Database
Server
Cloud
Workflow
GitBranch
Activity
ShieldCheck
Table
Rows3
Network
Layers
Box
ArrowRight
ArrowDown
Clock
Timer
Radio
MessageSquare
Users
Search
Filter
Zap
AlertTriangle
CheckCircle
```

Choose the actual best-fit icon per concept.

---

# 13. FRAMER MOTION REQUIREMENTS

Framer Motion must be visibly present in the implementation.

Required techniques where appropriate:

```text
motion.div
AnimatePresence
layout
layoutId
useInView
staggerChildren
whileHover
whileFocus
whileTap
```

Do not mechanically use all of them everywhere.

### Examples

Q1:

```text
staggerChildren
AnimatePresence
layout
```

Q2:

```text
layout
AnimatePresence
```

Q10:

```text
layout
```

Q23:

```text
timeline transitions
AnimatePresence
```

Q30:

```text
staggered DAG execution
```

Q44:

```text
continuous event flow
```

Q47:

```text
timeline movement
```

Q50:

```text
layout
AnimatePresence
path/connector animation
```

---

# 14. DO NOT OVER-ANIMATE

Bad:

```text
every card floating
every icon spinning
constant glowing
constant particle systems
large parallax
scroll hijacking
```

Good:

```text
data moves
state changes
nodes connect
sections reveal
selected concepts focus
architecture transforms
```

Animation should answer:

> "What changed?"

or:

> "How does this system work?"

If it answers neither, remove it.

---

# 15. RESPONSIVE DESIGN

Required QA sizes:

```text
1440 × 900
1024 × 768
768 × 1024
390 × 844
```

Desktop:

- large interactive diagrams
- side-by-side comparisons
- detail panels

Tablet:

- reduce visual density
- preserve interactions

Mobile:

- stack
- horizontal-scroll diagrams where necessary
- bottom sheet/detail drawer
- collapsible panels
- no microscopic labels
- no horizontal page overflow

---

# 16. ACCESSIBILITY

Every interactive node must support:

```text
keyboard focus
Enter
Space
visible focus state
aria-label
aria-expanded where relevant
aria-selected where relevant
```

Animations must not be required to understand content.

Color must not be the only state indicator.

---

# 17. CONTENT SAFETY / SOURCE FIDELITY

Before rendering each visual, create a data contract.

Example:

```ts
{
  questionId: "fundamental-q1",
  interactionType: "pipeline",
  nodes: sourceSupportedNodes,
  relationships: sourceSupportedRelationships,
  details: sourceSupportedDetails
}
```

Do not hardcode fabricated technical facts into components.

Prefer:

```text
question data
→ interaction configuration
→ visual
```

instead of:

```text
visual component
→ giant hardcoded answer
```

The source content remains the authority.

---

# 18. DATA-DRIVEN INTERACTION REGISTRY

Create a registry conceptually like:

```ts
const fundamentalInteractions = {
  "fundamental-q1": "pipeline",
  "fundamental-q2": "etl-elt",
  "fundamental-q3": "oltp-olap",
  ...
  "fundamental-q50": "ride-hailing-system"
}
```

The exact implementation is up to the project architecture.

Do not use question-number conditionals scattered across the codebase.

Bad:

```ts
if (q === 1) ...
else if (q === 2) ...
else if (q === 3) ...
```

Prefer:

```text
question
 ↓
interaction registry
 ↓
specific visual component
```

---

# 19. SHARED LEARNING COMPONENTS

Create reusable:

```text
ThinkFirst
AnswerReveal
CoreConcept
InteractiveSection
DetailPanel
InterviewerAngle
SourceSection
QuestionNavigation
SectionNavigator
```

But keep question-specific visuals independent.

The goal is:

```text
shared shell
+
unique concept interaction
```

not:

```text
one visual reused 50 times
```

---

# 20. QUESTION NAVIGATION

Show:

```text
Q07 / 50
```

with:

```text
← Previous
Next →
```

Also provide a compact section navigator:

```text
Foundations & Architecture
SQL
Data Modelling & Warehousing
Pipelines, ETL & Orchestration
Big Data & Spark
Streaming & Messaging
Distributed Systems & Design
```

The navigator must route to actual questions.

Do not create empty section pages.

---

# 21. SOURCE DISPLAY

Always show real provenance.

Example:

```text
SOURCE

50 Fundamental Data Engineering Interview Questions
Page X
```

The page must come from the actual source data.

Never hardcode fake page numbers.

---

# 22. SQL SPECIAL RULE

For Q8–Q16:

Do not break the existing SQL renderer.

If a question contains:

```text
input tables
SQL
expected output
```

keep them structurally separate.

Use the existing:

```text
DataTable
CodeBlock
ExplanationRenderer
SourceCard
```

where appropriate.

The new interaction sits around the existing SQL content.

---

# 23. NO PROGRESS-TRACKING SCOPE CREEP

Do not modify:

```text
Progress model
Progress repository
Progress service
streaks
analytics
completion tracking
```

A static:

```text
Question 17 of 50
```

is allowed.

---

# 24. NO INGESTION SCOPE CREEP

Do not modify the PDF extraction pipeline unless a verified data issue directly blocks rendering.

Do not:

```text
re-import 767 questions
merge datasets
delete questions
rewrite SQL ingestion
change unrelated schemas
```

---

# 25. PERFORMANCE

Check:

```text
No layout thrashing
No infinite animations unless genuinely representing a live flow
No giant SVG
No giant DOM tree
No expensive blur loops
No animation blocking scrolling
No memory leaks from timers
No duplicated event listeners
```

For continuous data-flow visuals:

- use lightweight elements
- pause/slow animations when offscreen if appropriate
- respect reduced motion

---

# 26. REAL BROWSER QA — REQUIRED

Do NOT claim visual QA from:

```text
TypeScript
unit tests
build
static component inspection
```

alone.

Open the actual application in a real browser.

Verify all 50 routes.

At minimum inspect:

```text
Q1
Q2
Q3
Q4
Q5
Q6
Q7
Q8
Q9
Q10
Q11
Q12
Q13
Q14
Q15
Q16
Q17
Q18
Q19
Q20
Q21
Q22
Q23
Q24
Q25
Q26
Q27
Q28
Q29
Q30
Q31
Q32
Q33
Q34
Q35
Q36
Q37
Q38
Q39
Q40
Q41
Q42
Q43
Q44
Q45
Q46
Q47
Q48
Q49
Q50
```

For every question verify:

```text
Correct title
Correct section
Think First works
Reveal works
Core concept is source-faithful
Interactive visual loads
Interaction works
Expansion works
Collapse works
Interviewer Angle is clean
Source is correct
Previous works
Next works
No horizontal page overflow
No console errors
```

---

# 27. VISUAL QA CHECKLIST

At each viewport verify:

### Typography
- no Times New Roman
- no accidental serif fallback
- headings readable
- body readable

### Layout
- no ghost margins
- no unexplained blank regions
- no overlapping cards
- no clipped diagrams

### Interaction
- hover works
- click works
- keyboard works
- focus state visible
- mobile interaction usable

### Motion
- entrance animation visible but subtle
- state transitions smooth
- connectors animate when useful
- no excessive motion
- reduced motion works

### Content
- no PDF watermark
- no page-footer leakage
- no cross-question contamination
- no broken sentences
- no fabricated content

---

# 28. AUTOMATED VERIFICATION

Run:

```bash
npx tsc --noEmit
npm run build
```

Also run the project's existing test/lint commands if available.

Verify:

```text
50 questions fetchable
50 unique question IDs
50 correct titles
7 sections
0 missing
0 duplicates
```

---

# 29. GOLDEN QUESTION QA

Deeply inspect these:

```text
Q1   pipeline
Q2   ETL/ELT
Q3   OLTP/OLAP
Q4   lake/warehouse/lakehouse
Q7   batch/streaming
Q10  window functions
Q19  star schema
Q23  SCD
Q30  orchestration/DAG
Q35  Spark architecture
Q38  shuffle
Q44  Kafka
Q47  watermark
Q48  CAP
Q50  ride-hailing system
```

These cover the major interaction families.

---

# 30. QUALITY BAR

The finished experience should NOT feel like:

```text
PDF viewer
+
accordion
+
some animation
```

It should feel like:

```text
Interactive Data Engineering Learning OS
```

The learner should understand concepts by watching systems change.

Examples:

```text
ETL → ELT
```

should be understood by seeing Transform move.

```text
Star → Snowflake
```

should be understood by seeing dimensions branch.

```text
Narrow → Wide
```

should be understood by seeing shuffle movement.

```text
Kafka
```

should be understood by seeing events, partitions, offsets and consumers interact.

```text
Watermark
```

should be understood by seeing the event-time timeline move.

```text
CAP
```

should be understood by seeing the distributed system react to a partition.

```text
Ride-hailing system
```

should be understood as a complete architecture assembled from source-supported concepts.

---

# 31. IMPLEMENTATION ORDER

Do NOT attempt to implement all 50 blindly in one giant component.

Implement in controlled batches while keeping this master design contract:

### Batch 1
```text
Q1–Q7
Foundations & Architecture
```

### Batch 2
```text
Q8–Q16
SQL
```

### Batch 3
```text
Q17–Q25
Data Modelling & Warehousing
```

### Batch 4
```text
Q26–Q34
Pipelines, ETL & Orchestration
```

### Batch 5
```text
Q35–Q43
Big Data & Spark
```

### Batch 6
```text
Q44–Q47
Streaming & Messaging
```

### Batch 7
```text
Q48–Q50
Distributed Systems & Design
```

The key difference from previous work:

**The design plan for all 50 is now fixed up front.**

Do not redesign the UX philosophy after every question.

---

# 32. BATCH CHECKPOINTS

After each batch:

```text
TypeScript PASS
Build PASS
Browser PASS
Content integrity PASS
Previous batch regression PASS
```

Then continue.

Never continue if the previous batch is broken.

---

# 33. FINAL ACCEPTANCE CHECK

The implementation is complete only when:

```text
Q1–Q50
     ↓
50 correct questions
     ↓
7 correct sections
     ↓
50 working routes
     ↓
50 interactive experiences
     ↓
Framer Motion
     ↓
Lucide
     ↓
shadcn/ui
     ↓
source-faithful content
     ↓
responsive
     ↓
accessible
     ↓
real browser verified
```

Final checks:

```text
Missing questions: 0
Duplicate questions: 0
Cross-question contamination: 0
Watermark contamination: 0
Broken routes: 0
Console errors: 0
Build errors: 0
TypeScript errors: 0
Horizontal page overflow: 0
```

---

# 34. FINAL REPORT FORMAT

Return:

```text
# FUNDAMENTAL 50 — COMPLETE INTERACTIVE EXPERIENCE

## Source

Source:
50-Data-Engineering-Interview-Questions.pdf

Questions:
50 / 50

Sections:
7 / 7

## Interaction Coverage

Q1:
PASS — Pipeline

Q2:
PASS — ETL / ELT

...

Q50:
PASS — Ride-Hailing System Design

## Motion

Framer Motion:
PASS / FAIL

Reduced Motion:
PASS / FAIL

## UI

shadcn/ui:
PASS / FAIL

Lucide:
PASS / FAIL

## Accessibility

Keyboard:
PASS / FAIL

Focus:
PASS / FAIL

ARIA:
PASS / FAIL

## Responsive

1440:
PASS / FAIL

1024:
PASS / FAIL

768:
PASS / FAIL

390:
PASS / FAIL

## Content Integrity

Missing:
0

Duplicate:
0

Cross-question contamination:
0

PDF artifacts:
0

Fabricated content:
0

## Technical

TypeScript:
PASS / FAIL

Build:
PASS / FAIL

Console errors:
0 / N

## Browser QA

Real browser verification:
PASS / FAIL

## Files Changed

[list actual files]

## STATUS

READY / NOT READY
```

---

# 35. FINAL NON-NEGOTIABLE INSTRUCTION

Do not optimize for the number of animations.

Optimize for:

```text
CONCEPT CLARITY
+
INTERACTION QUALITY
+
SOURCE FIDELITY
+
VISUAL HIERARCHY
+
INTERVIEW READINESS
```

Every animation must teach something.

Every interactive element must have a reason.

Every technical statement must come from the source or an already-approved data field.

Every question must feel intentionally designed.

The final experience should make a learner think:

> "I can see how this works."

rather than:

> "I am reading another interview PDF."

Build the complete Fundamental 50 experience using this contract.
