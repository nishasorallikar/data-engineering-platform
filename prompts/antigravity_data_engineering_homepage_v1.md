# ANTIGRAVITY — DATA ENGINEERING PLATFORM HOMEPAGE V1
# PREMIUM INTERACTIVE HOMEPAGE — FUNDAMENTAL 50 INTEGRATION

---

# 🚨 PROJECT CONTEXT

We have almost completed the **Fundamental 50** learning section.

The Fundamental 50 currently contains:

- 50 Data Engineering interview questions
- Question-specific interactive visualizations
- Always-On Concept Motion
- Framer Motion animations
- Lucide icons
- shadcn/ui
- Interactive explanations
- Practice/interview-oriented learning

The Fundamental 50 section is now considered a **protected learning module**.

## 🔒 ABSOLUTE RULE

### DO NOT MODIFY THE EXISTING FUNDAMENTAL 50 ANIMATIONS.

Do not:

- refactor them
- redesign them
- replace them
- simplify them
- change their Framer Motion behavior
- change animation timing
- change animation variants
- remove automatic motion
- convert them to static cards
- replace them with homepage-specific versions
- create a second implementation of the same visualization

The homepage may LINK TO and PREVIEW the Fundamental 50.

It must NOT modify its implementation.

---

# PRIMARY HOMEPAGE OBJECTIVE

Build a premium, modern, interactive Data Engineering learning platform homepage.

The homepage should immediately communicate:

> "This is an interactive Data Engineering learning platform where concepts are understood visually, practiced interactively, and prepared for real interviews."

This should NOT feel like:

- a generic SaaS landing page
- a generic course marketplace
- a template website
- a collection of boring cards
- a static documentation site

It should feel like a serious engineering learning product.

---

# DESIGN DIRECTION

Use the existing application's visual language where appropriate.

Technology:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Lucide icons

Design characteristics:

- premium
- technical
- minimal
- dark-first if the existing application is dark-first
- strong typography
- subtle gradients
- depth
- glass/blur used carefully
- clean spacing
- animated data-flow
- interactive diagrams
- high information density without visual clutter

Reference the interaction quality of premium developer portfolios and modern engineering products.

Do NOT copy another website's branding, layout, assets, or identity.

---

# 🚨 MOST IMPORTANT UX PRINCIPLE

The homepage itself should demonstrate the product philosophy:

## WATCH → UNDERSTAND → INTERACT → PRACTICE → MASTER

Do not make every animation dependent on clicking.

Important visual elements should have:

1. Initial state
2. Automatic explanatory motion
3. Interaction
4. Deeper detail
5. Replay/reset where appropriate

The user should understand what the platform does before clicking anything.

---

# HOMEPAGE INFORMATION ARCHITECTURE

Build the homepage in this order:

```text
NAVBAR
   ↓
HERO
   ↓
INTERACTIVE DATA ENGINEERING FLOW
   ↓
WHAT YOU WILL LEARN
   ↓
FUNDAMENTAL 50
   ↓
HOW LEARNING WORKS
   ↓
LEARNING ROADMAP
   ↓
PRACTICE + INTERVIEW
   ↓
PROJECTS / REAL-WORLD SYSTEMS
   ↓
PROGRESS / LEARNER JOURNEY
   ↓
FINAL CTA
   ↓
FOOTER
```

---

# 1. NAVBAR

Create a premium sticky navigation.

Navigation:

```text
[Logo / Product Name]

Learn
Fundamentals
Roadmap
Practice
Interview
Projects

                    Search
                    [Start Learning]
```

Keep navigation clean.

Do not overcrowd it.

Use Lucide icons where useful.

Interactions:

- subtle hover states
- active route state
- smooth transitions
- mobile navigation drawer
- keyboard accessible

Navbar should become slightly more compact after scrolling.

Use Framer Motion for the transition.

---

# 2. HERO SECTION

This is the most important homepage section.

## LEFT SIDE

Large headline:

```text
Learn Data Engineering
by Understanding How Data Moves.
```

Supporting text:

```text
Master Data Engineering fundamentals, SQL, data modeling,
pipelines, Spark, streaming and distributed systems through
interactive visual learning and interview-focused practice.
```

Primary CTA:

```text
Start Learning
```

Secondary CTA:

```text
Explore Fundamental 50
```

Do not invent statistics such as:

- "10,000+ learners"
- "500+ questions"
- "99% success rate"

unless actual application data exists.

---

# HERO RIGHT SIDE — INTERACTIVE DATA ENGINEERING SYSTEM

Do NOT use a generic illustration.

Create an always-on animated conceptual data pipeline.

Example:

```text
                 ┌─────────────┐
                 │   SOURCES   │
                 └──────┬──────┘
                        │
                     data flow
                        ↓
              ┌─────────────────┐
              │    INGESTION    │
              └────────┬────────┘
                       │
                       ↓
              ┌─────────────────┐
              │   PROCESSING    │
              └────────┬────────┘
                       │
                       ↓
             ┌───────────────────┐
             │ STORAGE / LAKEHOUSE│
             └─────────┬─────────┘
                       │
                       ↓
               ┌───────────────┐
               │    SERVING    │
               └───────────────┘
```

Animate small data packets continuously moving through the system.

Use:

- Framer Motion
- SVG where appropriate
- Lucide icons
- animated connectors
- subtle glow
- node state transitions

The animation should communicate:

```text
Raw data
→ ingestion
→ processing
→ storage
→ analytics
```

without requiring a click.

This is a HOMEPAGE animation.

It is NOT a replacement for any Fundamental 50 visualization.

---

# 3. INTERACTIVE DATA ENGINEERING FLOW

Below the hero, create a full-width interactive conceptual section.

Heading:

```text
See the Data Engineering Journey
```

Subheading:

```text
From raw events to analytics-ready data.
```

Visual:

```text
Sources
   ↓
Ingestion
   ↓
Transformation
   ↓
Storage
   ↓
Analytics
```

Each node should automatically participate in the animation.

Example:

```text
data packet
      ↓
Sources
      ↓
Kafka
      ↓
Spark
      ↓
Data Lakehouse
      ↓
Warehouse
      ↓
BI
```

On hover/click:

- highlight node
- show concise explanation
- show relevant technologies
- show "Learn this" CTA

Do not overload the visual.

---

# 4. "WHAT YOU WILL LEARN"

Create the major learning domains.

Use 7 visually distinct modules.

## 01 Foundations & Architecture

Topics:

- Data Engineering fundamentals
- ETL / ELT
- OLTP / OLAP
- Data Lake
- Data Warehouse
- Lakehouse
- Structured / semi-structured / unstructured data
- Batch vs Streaming

## 02 SQL

Topics:

- JOINs
- Aggregations
- Window functions
- CTEs
- Query optimization
- NULL handling
- Duplicates

## 03 Data Modeling

Topics:

- Normalization
- Denormalization
- Star schema
- Snowflake schema
- Fact tables
- Dimension tables
- Surrogate keys
- SCD
- Grain

## 04 Pipelines & Orchestration

Topics:

- Idempotency
- Incremental loads
- CDC
- Backfills
- DAGs
- Late-arriving data
- Data quality
- Schema drift
- Incident handling

## 05 Big Data & Spark

Topics:

- Spark architecture
- RDD
- DataFrame
- Dataset
- Lazy evaluation
- Transformations
- Actions
- Shuffle
- Data skew
- Partitioning
- Bucketing
- File formats

## 06 Streaming & Messaging

Topics:

- Kafka
- Topics
- Partitions
- Offsets
- Consumer groups
- Delivery semantics
- Event time
- Processing time
- Watermarks

## 07 Distributed Systems

Topics:

- CAP theorem
- Replication
- Sharding
- Scaling
- Data pipeline architecture

Each domain should visually connect to the roadmap.

---

# 5. FUNDAMENTAL 50 SECTION

This section must showcase the completed Fundamental 50 experience.

Heading:

```text
Fundamental 50
```

Subheading:

```text
The core Data Engineering questions you should be able to explain,
design and discuss in an interview.
```

Display:

```text
50 Questions
7 Domains
Interactive Learning
Interview Preparation
```

IMPORTANT:

These numbers must be derived from the actual Fundamental 50 implementation.

Do not fabricate additional numbers.

---

# FUNDAMENTAL 50 VISUAL

Create a beautiful animated representation of the 7 sections.

```text
FOUNDATIONS
      ↓
SQL
      ↓
DATA MODELING
      ↓
PIPELINES
      ↓
SPARK
      ↓
STREAMING
      ↓
DISTRIBUTED SYSTEMS
```

Animate a progress/data-flow indicator moving through the learning journey.

On hover:

- highlight section
- show question count
- show representative topics

On click:

Navigate to the existing Fundamental 50 section.

### IMPORTANT

Do NOT import or recreate the actual Q1–Q50 visualization components into this homepage.

The homepage only links to them.

---

# 6. FUNDAMENTAL 50 FEATURE PREVIEW

Create 3–4 representative learning previews.

Examples:

```text
Interactive Architecture
Watch systems move.

SQL Visualization
See query logic execute.

Data Modeling
Build schemas visually.

Distributed Systems
Understand system behavior through motion.
```

These are promotional previews.

They must NOT replace the actual question components.

If using existing visual assets/components, render them only if doing so does not modify or alter their behavior.

Prefer lightweight homepage-specific conceptual previews when necessary.

---

# 7. HOW LEARNING WORKS

Heading:

```text
Don't Just Read. Watch the Concept Work.
```

Create an animated 4-step sequence:

```text
01 WATCH
Concept starts moving automatically.

        ↓

02 UNDERSTAND
See how components interact.

        ↓

03 INTERACT
Explore deeper states.

        ↓

04 PRACTICE
Apply it to interview problems.
```

Each step should animate sequentially.

Use Framer Motion.

The visual should continuously demonstrate the process.

---

# 8. LEARNING ROADMAP

Create a horizontal/vertical roadmap.

```text
FOUNDATIONS
     ↓
SQL
     ↓
DATA MODELING
     ↓
ETL / PIPELINES
     ↓
SPARK
     ↓
STREAMING
     ↓
DISTRIBUTED SYSTEMS
     ↓
SYSTEM DESIGN
```

Each stage should have:

- number
- title
- short description
- relevant technologies
- completion state if real user progress exists

Do not fake completion percentages.

If no progress data exists, show neutral states.

---

# 9. PRACTICE + INTERVIEW SECTION

Heading:

```text
Turn Understanding Into Interview Confidence
```

Create two major panels.

## PRACTICE

Show:

```text
Practice Questions
SQL Problems
Architecture Challenges
Scenario-Based Problems
```

## INTERVIEW

Show:

```text
Explain the Concept
Design the System
Debug the Pipeline
Discuss Trade-offs
```

Animate the transition:

```text
Concept
   ↓
Question
   ↓
Scenario
   ↓
Interview
```

---

# 10. PROJECTS / REAL-WORLD SYSTEMS

Create a section:

```text
Learn How Real Systems Are Built
```

Example project cards:

```text
Data Pipeline
Streaming System
Analytics Platform
Lakehouse Architecture
Real-Time Processing
```

Only show projects that actually exist in the application.

If projects do not yet exist:

Do NOT fabricate project content.

Instead show:

```text
Projects
Coming as you progress through the roadmap.
```

or use actual available project data.

---

# 11. PROGRESS / LEARNER JOURNEY

Create a visual learner journey.

If authenticated and real progress data exists:

```text
Your Learning Progress

Foundations       ████████░░
SQL               █████░░░░░
Data Modeling     ███░░░░░░░
Spark             ██░░░░░░░░
```

If no real progress data exists:

Do NOT create fake progress.

Instead display:

```text
Track your progress as you learn.
```

CTA:

```text
Start Learning
```

---

# 12. FINAL CTA

Create a strong final section.

Heading:

```text
Stop Memorizing Data Engineering.
Start Understanding It.
```

Supporting copy:

```text
Learn the systems, practice the problems,
and build the mental models needed for real interviews.
```

CTA:

```text
Start Learning
```

Secondary:

```text
Explore Fundamental 50
```

Use subtle background motion.

---

# 13. FOOTER

Include:

```text
Product
Learn
Fundamentals
Roadmap
Practice
Interview
Projects

Resources
Documentation
About
Contact
```

Only include routes that actually exist.

Do not create dead links.

---

# 14. ANIMATION SYSTEM

Use Framer Motion consistently.

Animations should communicate meaning.

Good examples:

### Data flow

```text
source → ingestion → processing → storage
```

### Learning progression

```text
foundation → SQL → modeling → pipelines → Spark
```

### Interview progression

```text
learn → practice → explain → design
```

Avoid meaningless animations such as:

```text
random floating cards
random bouncing icons
random spinning objects
```

Every major animation must have a conceptual purpose.

---

# 15. PERFORMANCE

Homepage should feel fast.

Use:

- lazy loading for below-the-fold heavy visualizations
- lightweight SVG where appropriate
- avoid unnecessary re-renders
- memoize expensive components when justified
- avoid unnecessary database calls
- server-render static content where appropriate

BUT:

## DO NOT optimize by destroying meaningful animation.

---

# 16. RESPONSIVE DESIGN

Desktop:

```text
Full interactive experience
```

Tablet:

```text
Compressed but still animated
```

Mobile:

```text
Single-column
Readable
Touch-friendly
Meaningful animations
```

Do not simply hide major sections on mobile.

---

# 17. ACCESSIBILITY

Requirements:

- keyboard navigation
- visible focus states
- semantic HTML
- ARIA labels where needed
- sufficient contrast
- reduced-motion support
- buttons must be real buttons
- links must be real links

Normal users must still receive the full animation experience.

---

# 18. DATA INTEGRITY

Do not fabricate:

- learner counts
- completion rates
- ratings
- company logos
- job placement statistics
- course counts
- user testimonials
- success percentages

If the backend has real data, use it.

Otherwise use honest static copy.

---

# 19. FUNDAMENTAL 50 PROTECTION

This is mandatory:

```text
Homepage
    ↓
Fundamental 50 CTA
    ↓
Existing Fundamental 50 route
    ↓
Existing animations
```

NOT:

```text
Homepage
    ↓
New replacement Fundamental visualizations
```

The Fundamental 50 remains the source of truth.

---

# 20. IMPLEMENTATION PHASES

Do NOT build the entire homepage blindly in one pass.

## PHASE 1 — STRUCTURE

Implement:

- Navbar
- Hero
- Hero animation
- Learning domains
- Fundamental 50 section
- Footer

STOP.

Run the application.

Verify browser layout.

---

## PHASE 2 — INTERACTION

Add:

- hover states
- section interactions
- roadmap
- learning-flow animation
- CTA transitions

STOP.

Browser verify.

---

## PHASE 3 — LEARNING EXPERIENCE

Add:

- How Learning Works
- Practice + Interview
- Projects
- Progress

STOP.

Browser verify.

---

## PHASE 4 — POLISH

Only after everything works:

- spacing
- typography
- responsive
- accessibility
- performance
- micro-interactions

---

# 21. BROWSER VERIFICATION

Do not claim completion from:

```text
npm run build
TypeScript passes
ESLint passes
```

Those are not sufficient.

Open the actual application in a real browser.

Verify:

### Navbar

- [ ] visible
- [ ] navigation works
- [ ] mobile works

### Hero

- [ ] headline visible
- [ ] CTA works
- [ ] data-flow animation starts automatically

### Learning Domains

- [ ] all 7 domains represented
- [ ] no fake data
- [ ] interactions work

### Fundamental 50

- [ ] 50 questions represented accurately
- [ ] 7 sections represented accurately
- [ ] CTA reaches existing Fundamental 50
- [ ] existing animations remain untouched

### Roadmap

- [ ] sequence correct
- [ ] no fake progress

### Practice / Interview

- [ ] routes work where implemented
- [ ] no dead links

### Mobile

- [ ] no horizontal overflow
- [ ] animations remain meaningful
- [ ] touch targets work

---

# 22. ABSOLUTE STOP CONDITIONS

STOP implementation if:

- you need to modify Fundamental 50 animation code
- you need to change `InteractionRegistry`
- you need to rewrite existing interactive question components
- actual data is missing
- a route does not exist
- a statistic is being invented
- a visualization is being replaced with a fake placeholder
- the homepage starts importing heavy Fundamental 50 visualizations unnecessarily

Report the issue instead of inventing a solution.

---

# FINAL QUALITY BAR

The homepage should make a new learner understand within seconds:

```text
This is a Data Engineering platform.
        ↓
It teaches concepts visually.
        ↓
I can learn the fundamentals.
        ↓
I can practice.
        ↓
I can prepare for interviews.
        ↓
I can progress through a structured roadmap.
```

And the most important visual message:

# WATCH → UNDERSTAND → INTERACT → PRACTICE

The homepage should **demonstrate this philosophy rather than merely describe it.**

---

# 🔒 FINAL COMMAND

Build the homepage around the existing Fundamental 50 system.

**DO NOT TOUCH THE FUNDAMENTAL 50 ANIMATIONS.**

Do not refactor them.
Do not recreate them.
Do not replace them.
Do not simplify them.

The Fundamental 50 is now a protected module.

Focus entirely on creating a premium homepage that makes the existing learning experience discoverable, understandable, and compelling.

Implement Phase 1 first.

After Phase 1, STOP and browser-verify before continuing.
