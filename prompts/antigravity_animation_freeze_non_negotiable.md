# ANTIGRAVITY — FUNDAMENTAL 50 ANIMATION FREEZE + SAFE IMPLEMENTATION PROMPT

## 🚨 ABSOLUTE NON-NEGOTIABLE RULE

**DO NOT TOUCH, MODIFY, REFACTOR, REWRITE, REPLACE, OPTIMIZE, SIMPLIFY, REMOVE, OR REDESIGN ANY EXISTING ANIMATION.**

The existing **Always-On Concept Motion** is the most important part of this project.

Do not:
- change Framer Motion configurations
- change animation variants
- change `initial`, `animate`, `exit`, `transition`, `whileHover`, `whileTap`, `layout`, or `layoutId`
- change animation timing, easing, sequencing, or movement paths
- replace Framer Motion with CSS animation
- replace animations with static cards
- convert animations into click-only interactions
- remove looping motion
- rename/remove existing animation components
- replace existing visualizations with generic components
- "improve" animations unless explicitly instructed later

If an existing animation works, **FREEZE IT.**

---

# PRIMARY OBJECTIVE

Continue improving the Fundamental 50 learning experience while treating the existing animations as **protected production assets**.

The learner must experience:

**Question loads → concept is already moving → learner watches the system behave → concept becomes understandable → learner can interact for deeper understanding.**

The animation itself is NOT optional.

---

# 1. AUDIT FIRST — DO NOT MODIFY

Inspect the existing implementation before writing changes:

- `InteractionRegistry.tsx`
- Fundamental question routing
- `FundamentalQuestionPage`
- all existing `Interactive*.tsx` components
- Framer Motion usage
- animation variants
- `useInView`
- automatic animation triggers
- replay/reset logic
- reduced-motion handling
- question-to-component mappings

Create an internal inventory of:

| Question | Component | Existing Animation | Auto-start | Protected |
|---|---|---|---|---|
| Q1 | existing component | YES/NO | YES/NO | 🔒 |
| Q2 | existing component | YES/NO | YES/NO | 🔒 |
| ... | ... | ... | ... | 🔒 |
| Q50 | existing component | YES/NO | YES/NO | 🔒 |

Do not alter the components during this audit.

---

# 2. ANIMATION FREEZE CONTRACT

Every existing animation is now under an **Animation Freeze Contract**.

Preserve exactly:

- visual structure
- motion behavior
- automatic playback
- animation duration
- animation delay
- easing
- stagger timing
- movement paths
- connector animations
- data-flow animations
- node transitions
- morphing behavior
- hover motion
- focus motion
- replay behavior
- reset behavior
- responsive animation behavior
- reduced-motion fallback

Never:

```text
❌ Refactor animation code
❌ Rename animation variables
❌ Replace components
❌ Merge animation components
❌ Create a generic animation abstraction
❌ Replace motion.div with div
❌ Replace Framer Motion with CSS
❌ Disable autoplay
❌ Make motion dependent on clicking
❌ Remove animation because of performance concerns
❌ Change animation to "subtle" motion
❌ Convert visualization to a static diagram
```

If another change requires modifying an animation component, **STOP and report the conflict instead of changing it.**

---

# 3. IMPORTANT DISTINCTION

## Animation ≠ Interaction

"Interactive" must NOT mean merely "clickable."

Correct behavior:

```text
PAGE LOAD
   ↓
ANIMATION STARTS AUTOMATICALLY
   ↓
CONCEPT IS VISUALLY DEMONSTRATED
   ↓
USER WATCHES
   ↓
USER UNDERSTANDS
   ↓
USER MAY CLICK / HOVER / EXPAND
   ↓
DEEPER EXPLANATION
```

The animation is the **primary teaching mechanism**.

Clicking is secondary.

---

# 4. SAFE IMPLEMENTATION RULE

If adding:

- explanation panels
- examples
- interview angle
- key takeaways
- code examples
- common mistakes
- practice questions
- controls
- progress tracking
- bookmarks
- navigation
- breadcrumbs
- topic hierarchy
- search
- responsive layout
- accessibility improvements
- question content

build those **AROUND** the existing visualization.

Use composition:

```tsx
<FundamentalQuestionPage>
  <QuestionHeader />

  <ExistingProtectedVisualization />

  <LearningExplanation />

  <InterviewAngle />

  <Examples />

  <Practice />

  <KeyTakeaways />
</FundamentalQuestionPage>
```

The existing visualization remains untouched.

---

# 5. COMPONENT BOUNDARY

Treat every existing animation component as a black box.

The parent may control:

- placement
- surrounding layout
- spacing outside the component
- section headings
- content above/below
- page-level navigation

The parent must NOT control:

- internal animation state
- animation variants
- motion timing
- internal motion sequence
- internal animation triggers
- internal visual state

Unless the existing component already exposes those controls.

---

# 6. DO NOT "FIX" WORKING ANIMATIONS

If you find:

```tsx
transition={{ duration: 1.2 }}
```

do not change it.

If you find:

```tsx
whileHover={{ scale: 1.05 }}
```

do not change it.

If you find:

```tsx
animate={{ opacity: 1, x: 0 }}
```

do not change it.

If you find:

```tsx
repeat: Infinity
```

do not change it.

If you find:

```tsx
useInView(...)
```

do not change it.

Even if another implementation appears cleaner.

**This is intentional.**

---

# 7. VISUAL REGRESSION PROTECTION

Before any new implementation:

1. Run the application.
2. Open existing Fundamental question pages.
3. Verify animations are present.
4. Observe automatic motion.
5. Do NOT click initially.
6. Confirm the concept visualization runs automatically.
7. Only then work on surrounding UI.

After implementation:

1. Reload the same page.
2. Watch without clicking.
3. Confirm animation still starts automatically.
4. Confirm animation sequence is unchanged.
5. Confirm visual meaning is unchanged.
6. Test hover/click interactions.
7. Test responsive layout.
8. Test reduced-motion behavior.

---

# 8. HARD REGRESSION TEST

## TEST A — ZERO INTERACTION

Load the question.

Do not click, hover, press replay, or perform any special action.

Expected:

```text
Animation automatically starts.
```

If it does not:

```text
FAIL
```

## TEST B — ANIMATION INTEGRITY

Expected:

```text
Same animation.
Same motion.
Same sequence.
Same timing.
Same visual meaning.
```

If changed:

```text
FAIL
```

## TEST C — INTERACTION

After observing automatic motion:

- hover
- click
- expand
- replay

Expected:

```text
Existing interactions still work.
```

## TEST D — CONTENT INTEGRITY

The visualization must correspond to the actual question.

Never map a visualization for one question to another merely because it is reusable.

---

# 9. QUESTION MAPPING MUST BE VERIFIED

Do NOT trust an implementation report blindly.

The authoritative Fundamental 50 sequence is:

### FOUNDATIONS & ARCHITECTURE

Q1 — What does a data engineer actually do?

Q2 — Explain ETL vs ELT. Which would you choose today?

Q3 — What is the difference between OLTP and OLAP systems?

Q4 — Data lake, data warehouse, or lakehouse — what is the difference?

Q5 — How do you handle structured, semi-structured and unstructured data?

Q6 — What is a data mart, and when would you build one?

Q7 — Batch or streaming — how do you decide?

### SQL

Q8 — Explain every JOIN type and where each is used.

Q9 — WHERE vs HAVING — what is the difference?

Q10 — What are window functions? Explain RANK, DENSE_RANK and ROW_NUMBER.

Q11 — Find the second-highest salary in each department.

Q12 — How do you find and delete duplicate rows?

Q13 — CTE vs subquery vs temporary table — when do you use each?

Q14 — A query is slow. Walk me through how you fix it.

Q15 — UNION vs UNION ALL?

Q16 — What NULL-handling mistakes do you watch out for?

### DATA MODELLING & WAREHOUSING

Q17 — Explain normalisation and the normal forms.

Q18 — When would you deliberately denormalise?

Q19 — What is a star schema and why is it the default for analytics?

Q20 — How does a snowflake schema differ, and when is it worth it?

Q21 — Fact tables and dimension tables — and what types of fact table exist?

Q22 — Surrogate key vs natural key — which do you use in a warehouse?

Q23 — Explain Slowly Changing Dimensions and their types.

Q24 — What is the grain of a fact table, and why is it the first thing you decide?

Q25 — Inmon vs Kimball vs Data Vault — what is the difference?

### PIPELINES, ETL & ORCHESTRATION

Q26 — What is idempotency and why does every pipeline need it?

Q27 — Full load vs incremental load — how do you choose?

Q28 — What is Change Data Capture and why is it better than polling?

Q29 — How do you design and run a backfill?

Q30 — What does an orchestrator do, and what makes a good DAG?

Q31 — How do you handle late-arriving data?

Q32 — What data quality checks would you put in a pipeline?

Q33 — How do you handle schema drift from an upstream source?

Q34 — A production pipeline fails at 3 a.m. Walk me through what you do.

### BIG DATA & SPARK

Q35 — Explain Spark's architecture.

Q36 — RDD vs DataFrame vs Dataset?

Q37 — Transformations vs actions, and what is lazy evaluation?

Q38 — Narrow vs wide transformations — and what is a shuffle?

Q39 — What is data skew, how do you detect it and how do you fix it?

Q40 — Partitioning vs bucketing — what is the difference?

Q41 — Parquet, ORC, Avro or CSV — which and why?

Q42 — What is the small files problem?

Q43 — cache vs persist, and when do you use a broadcast join?

### STREAMING & MESSAGING

Q44 — Explain Kafka: topics, partitions, offsets and consumer groups.

Q45 — How is Kafka different from a traditional message queue?

Q46 — Explain at-most-once, at-least-once and exactly-once.

Q47 — Event time vs processing time — what is a watermark?

### DISTRIBUTED SYSTEMS & DESIGN

Q48 — Explain the CAP theorem.

Q49 — Sharding vs replication, and horizontal vs vertical scaling?

Q50 — Design a data pipeline for a ride-hailing app from scratch.

---

# 10. DO NOT TRUST REPORT LABELS

If a report says:

```text
Q1 = OLTP vs OLAP
```

do not accept that mapping without checking the actual registry and route.

The actual question inventory above is authoritative.

If there is a mismatch:

```text
STOP
↓
Inspect InteractionRegistry
↓
Inspect question IDs
↓
Inspect database/question data
↓
Inspect route rendering
↓
Resolve mapping
```

Do not randomly rewrite mappings.

---

# 11. NO GENERIC VISUALIZATION FALLBACK

Never implement one generic visualization for every question.

Examples of concept-specific visual models:

```text
Q1  → Data Engineer workflow / system flow
Q2  → ETL ↔ ELT morphing pipeline
Q3  → OLTP vs OLAP comparison
Q4  → Lake vs Warehouse vs Lakehouse
Q8  → JOIN visualization
Q10 → Window ranking animation
Q19 → Star schema visualization
Q23 → SCD timeline
Q30 → DAG execution animation
Q35 → Spark architecture
Q38 → Shuffle visualization
Q44 → Kafka topic/partition/consumer-group flow
Q47 → Event-time/watermark timeline
Q48 → CAP network partition visualization
Q50 → Ride-hailing data pipeline/system design
```

The actual registry must determine the implementation.

---

# 12. NEW FEATURES MUST NOT LEAK INTO ANIMATION

If new content causes layout problems:

### WRONG

Modify the animation.

### RIGHT

Adjust the surrounding layout:

```text
Question page
├── Header
├── Explanation
├── Protected Animation 🔒
├── Deeper Explanation
├── Example
├── Interview Answer
└── Practice
```

The visualization owns its internal layout.

---

# 13. FRAMER MOTION IS A CORE REQUIREMENT

The project uses:

- Framer Motion
- React
- Lucide
- shadcn/ui

Existing Framer Motion behavior must remain intact.

Do not migrate animation technology.

Do not replace motion with:

- CSS-only animation
- GIF
- video
- static diagram
- Lottie
- canvas

unless explicitly requested in a future task.

---

# 14. REDUCED MOTION

Accessibility improvements are allowed only if they do not alter the normal-motion experience.

Normal users:

```text
Full existing animation
```

Reduced-motion users:

```text
Meaningful static state / simplified motion
```

Do not use reduced-motion support as an excuse to remove normal animation.

---

# 15. PERFORMANCE RULE

If performance becomes an issue, do NOT immediately reduce animation.

First investigate:

- unnecessary React renders
- duplicated data fetching
- oversized assets
- unnecessary DOM
- repeated database calls
- inefficient parent rendering
- unnecessary network requests

Animation remains protected.

---

# 16. IMPLEMENTATION ORDER

Use this exact sequence:

```text
STEP 1
Audit existing animation components.

STEP 2
Audit InteractionRegistry.

STEP 3
Audit actual question IDs.

STEP 4
Verify question → visualization mapping.

STEP 5
Run the app.

STEP 6
Browser-test existing animations.

STEP 7
FREEZE existing animations.

STEP 8
Implement/fix surrounding learning UI.

STEP 9
Browser-test again.

STEP 10
Run animation regression tests.

STEP 11
Only then continue to the next questions/features.
```

---

# 17. STOP CONDITIONS

Immediately STOP if:

- an existing animation must be rewritten
- an animation disappears
- automatic animation stops
- motion becomes click-dependent
- a visualization becomes static
- question mapping becomes ambiguous
- database question IDs conflict
- registry mapping contradicts source questions
- a generic visualization is being substituted
- browser verification cannot confirm the expected motion

Do not make a "reasonable assumption."

Report the exact conflict.

---

# 18. FINAL ACCEPTANCE CRITERIA

### Animation

- [ ] Existing animations remain unchanged
- [ ] Existing Framer Motion behavior remains
- [ ] Automatic motion remains
- [ ] Concept motion starts without requiring a click
- [ ] Replay/reset still works
- [ ] Hover/click interactions still work
- [ ] Reduced-motion remains meaningful

### Content

- [ ] Question IDs match the authoritative Fundamental 50
- [ ] Question titles are correct
- [ ] Visualization matches the question
- [ ] No question is silently mapped to another concept
- [ ] No fabricated content is introduced

### Architecture

- [ ] Existing visualization components remain intact
- [ ] New UI composes around them
- [ ] No animation refactor
- [ ] No generic visualization fallback
- [ ] No hidden runtime sanitization used to repair bad source data

### Browser verification

- [ ] Q1 verified
- [ ] Q2 verified
- [ ] Q3 verified
- [ ] Q4 verified
- [ ] Continue through all implemented questions
- [ ] Automatic motion observed in the real browser

---

# 🔒 MOST IMPORTANT INSTRUCTION

## PROTECT THE ANIMATIONS AT ANY COST.

The animation is NOT a decorative feature.

It is the core teaching mechanism.

Priority order:

```text
1. PRESERVE EXISTING ANIMATION
2. PRESERVE AUTOMATIC CONCEPT MOTION
3. PRESERVE QUESTION → VISUALIZATION CORRECTNESS
4. PRESERVE SOURCE CONTENT
5. BUILD LEARNING UX AROUND IT
6. ADD INTERACTION FOR DEEPER LEARNING
7. ONLY THEN CONSIDER REFACTORING
```

If there is a conflict between:

```text
cleaner code vs existing animation
```

**KEEP THE EXISTING ANIMATION.**

If there is a conflict between:

```text
new UI vs existing animation
```

**KEEP THE EXISTING ANIMATION.**

If there is a conflict between:

```text
performance optimization vs existing animation
```

**KEEP THE EXISTING ANIMATION and optimize elsewhere.**

If there is a conflict between:

```text
developer preference vs existing animation
```

**KEEP THE EXISTING ANIMATION.**

---

# FINAL COMMAND TO ANTIGRAVITY

**DO NOT TOUCH THE EXISTING ANIMATIONS.**

Treat them as frozen production components.

Your job is to make the surrounding Fundamental 50 experience better while preserving the animation exactly.

Before finishing, open the application in a real browser and verify that the animations are still automatically running.

Do not report "complete" based only on compilation, TypeScript, or build success.

The final verification must prove:

> **The learner opens the question, does nothing, and the concept is already moving.**

That behavior is mandatory.
