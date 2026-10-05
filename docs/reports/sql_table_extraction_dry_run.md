# SQL Table Extraction Dry Run Report (Days 1-50)

## Overview
- Days inspected: 50
- Already structured: 0
- Confidently extractable: 0
- Ambiguous: 8
- No table: 42

## Full Day 1–50 Matrix
| Day | Status | Expected Output Status | Reason |
|---|---|---|---|
| 1 | NO_TABLE | MISSING | |
| 2 | AMBIGUOUS | MISSING | Lacks explicit delimiters |
| 3 | AMBIGUOUS | MISSING | Lacks explicit delimiters |
| 4 | AMBIGUOUS | MISSING | Lacks explicit delimiters |
| 5 | AMBIGUOUS | MISSING | Lacks explicit delimiters |
| 6 | NO_TABLE | MISSING | |
| 7 | AMBIGUOUS | MISSING | Lacks explicit delimiters |
| 8 | AMBIGUOUS | MISSING | Lacks explicit delimiters |
| 9 | AMBIGUOUS | MISSING | Lacks explicit delimiters |
| 10 | NO_TABLE | MISSING | |
| 11 | NO_TABLE | MISSING | |
| 12 | NO_TABLE | MISSING | |
| 13 | NO_TABLE | MISSING | |
| 14 | NO_TABLE | MISSING | |
| 15 | NO_TABLE | MISSING | |
| 16 | NO_TABLE | MISSING | |
| 17 | NO_TABLE | MISSING | |
| 18 | AMBIGUOUS | MISSING | Lacks explicit delimiters |
| 19 | NO_TABLE | MISSING | |
| 20 | NO_TABLE | MISSING | |
| 21 | NO_TABLE | MISSING | |
| 22 | NO_TABLE | MISSING | |
| 23 | NO_TABLE | MISSING | |
| 24 | NO_TABLE | MISSING | |
| 25 | NO_TABLE | MISSING | |
| 26 | NO_TABLE | MISSING | |
| 27 | NO_TABLE | MISSING | |
| 28 | NO_TABLE | MISSING | |
| 29 | NO_TABLE | MISSING | |
| 30 | NO_TABLE | MISSING | |
| 31 | NO_TABLE | MISSING | |
| 32 | NO_TABLE | MISSING | |
| 33 | NO_TABLE | MISSING | |
| 34 | NO_TABLE | MISSING | |
| 35 | NO_TABLE | MISSING | |
| 36 | NO_TABLE | AMBIGUOUS | |
| 37 | NO_TABLE | AMBIGUOUS | |
| 38 | NO_TABLE | AMBIGUOUS | |
| 39 | NO_TABLE | AMBIGUOUS | |
| 40 | NO_TABLE | AMBIGUOUS | |
| 41 | NO_TABLE | AMBIGUOUS | |
| 42 | NO_TABLE | AMBIGUOUS | |
| 43 | NO_TABLE | AMBIGUOUS | |
| 44 | NO_TABLE | AMBIGUOUS | |
| 45 | NO_TABLE | AMBIGUOUS | |
| 46 | NO_TABLE | AMBIGUOUS | |
| 47 | NO_TABLE | AMBIGUOUS | |
| 48 | NO_TABLE | AMBIGUOUS | |
| 49 | NO_TABLE | AMBIGUOUS | |
| 50 | NO_TABLE | AMBIGUOUS | |

## Confident Candidates
None found that can be extracted with absolute zero-guess confidence programmatically.

## Ambiguous Candidates
For all ambiguous candidates (Days 2, 3, 4, 5, 7, 8, 9, 18), the source data contains raw text strings interleaved with newlines (e.g. `id\nname\nvalue`), making column count and row boundaries mathematically ambiguous without human-in-the-loop review.

## Expected-output Audit
Expected outputs for days 36-50 show AMBIGUOUS status, as they also lack rigid markdown delimiters.

## Migration Recommendation
SAFE MIGRATION / HUMAN REVIEW / FURTHER SOURCE AUDIT

**NO PRODUCTION MIGRATION PERFORMED**

---
SQL PHASE 3A.3 = COMPLETE
Golden Dataset Modified: NO
MongoDB Modified: NO
UI Modified: NO
Confident Extraction Candidates: 0
Human Review Required: 8
No Table: 42
Already Structured: 0
Recommended Next Phase: HUMAN REVIEW
