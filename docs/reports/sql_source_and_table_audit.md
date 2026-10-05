# SQL Source and Table Audit Report

## 1. Production Status

```text
Projects: PASS 
VoltGrid: PASS 
Health: PASS 
Readiness: PASS 
```

**Notes:** 
The `/projects` page was previously failing due to Server Components using `fetch` with an improperly resolved environment variable (`NEXT_PUBLIC_APP_URL`) to access its own API route. This was fixed by refactoring the Server Components to directly use `ProjectService`. 

## 2. Source Inventory

| File | Type | Claimed Range | Actual Coverage | Complete? | Notes |
|---|---|---|---|---|---|
| `sql-challenges.json` | JSON | 1-210 | 1-165 (partial) | NO | Primary parsed source. Missing days 116-150 and 166-210. |
| `source.docx` | DOCX | Unknown | Unknown | NO | Found in `scripts/`. Appears to be an old extraction artifact. |
| `210 Days SQLPyspark Interview Questions - Data Engineer Role.docx` | DOCX | 1-210 | 0 | NO | Referenced in JSON but **physically missing** from repository. |
| `DE_SQL_Day76_to_90_Workbook.pdf` | PDF | 76-90 | 0 | NO | Referenced in JSON but **physically missing** from repository. |

## 3. 210-Day Coverage

```text
1–20      PRESENT
21–40     PRESENT
41–60     PRESENT
61–75     PRESENT
76–90     PRESENT
91–105    PRESENT
106–115   PRESENT
116–135   MISSING
136–150   MISSING
151–165   PRESENT
166–185   MISSING
186–210   MISSING
```
*Total existing in system: 130 challenges.*

## 4. Duplicate / Conflict Report

**NO CONFLICTS FOUND.** 
Since the raw source documents (Word/PDF) have not been committed to the repository, cross-referencing against original source files is currently impossible. There are exactly 130 unique days present in `sql-challenges.json` with no internal duplication.

## 5. Structured Table Audit (Legacy Days 1-50)

```text
Total inspected: 50
Already structured: 0
Extractable confidently: 6
Ambiguous: 44
No table present: 0
```

**Notes:** Almost all of the legacy challenges (e.g. Day 2) embed tables in the `explanation` string via unstructured newlines (`\n`) and missing delimiter boundaries, making programmatic array splitting highly unstable.

## 6. Migration Recommendation

**DO NOT MIGRATE YET.**

**Reasons:**
1. The table representations embedded in the text lack rigid delimiters, leading to 44/50 cases being mathematically ambiguous to parse via Regex or `\n` splitting.
2. Attempting a script rewrite runs a massive risk of misaligning columns or corrupting the text.
3. Proper migration requires human-in-the-loop review tooling and potentially candidate extraction via an LLM that is audited *before* it mutates the JSON database.

## 7. JSON ↔ MongoDB Integrity

**FAIL (Architectural Discrepancy)**

**Root Cause:** The `sql-challenges.json` dataset does NOT live in MongoDB. The platform's `SqlChallengeService` parses the JSON file directly. 
The MongoDB `questions_v2` collection houses the **Fundamental 50** dataset (conceptual interview questions), completely separate from the SQL datasets. They are 100% mismatched by design.

## 8. Browser QA

*   Homepage: PASS
*   Fundamental 50: PASS
*   Projects: PASS
*   VoltGrid: PASS
*   SQL Library: PASS
*   SQL Detail: PASS (The empty `0 tables` section bug has been resolved and no longer renders).

## 9. Build / TypeScript / Lint / Tests

*   **Build:** `npm run build` succeeds (Exit Code 0).
*   **TypeScript:** Type checking is actively suppressed. `ignoreBuildErrors: true` is explicitly configured in `next.config.ts`.
*   **Lint:** No lint errors blocking the build.
