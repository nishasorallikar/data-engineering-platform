/**
 * PHASE 3B: Build complete SQL challenge dataset from all available sources
 * 
 * Sources:
 *   - docx: Days 1–76 (with SQL + PySpark)
 *   - PDF workbooks: Days 76–115, 151–165 (questions only)
 *   - PDF solutions: Days 76–115, 151–165 (SQL solutions)
 * 
 * RULES: No invented content. No inferred difficulty. Source-faithful only.
 */

const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

const SCRIPTS_DIR = __dirname;
const OUTPUT_DIR = path.resolve(SCRIPTS_DIR, '../data/sql-challenges');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'sql-challenges.json');

// Topic map — source derived from docx TOC
const TOPIC_MAP = [
  { topicNumber: 1,  topicTitle: "Basic JOINs & Aggregations",       start: 1,   end: 20  },
  { topicNumber: 2,  topicTitle: "Window Functions & Ranking",        start: 21,  end: 40  },
  { topicNumber: 3,  topicTitle: "Subqueries & CTEs",                 start: 41,  end: 60  },
  { topicNumber: 4,  topicTitle: "String Functions & Patterns",       start: 61,  end: 75  },
  { topicNumber: 5,  topicTitle: "Date & Time Operations",            start: 76,  end: 90  },
  { topicNumber: 6,  topicTitle: "Conditional Logic & CASE",          start: 91,  end: 105 },
  { topicNumber: 7,  topicTitle: "Set Operations",                    start: 106, end: 115 },
  { topicNumber: 8,  topicTitle: "Complex Aggregations & Pivots",     start: 116, end: 135 },
  { topicNumber: 9,  topicTitle: "Advanced JOINs & Self-Joins",       start: 136, end: 150 },
  { topicNumber: 10, topicTitle: "Data Cleaning & Transformation",    start: 151, end: 165 },
  { topicNumber: 11, topicTitle: "Performance & Optimization",        start: 166, end: 185 },
  { topicNumber: 12, topicTitle: "Real-world Scenarios",              start: 186, end: 210 },
];

function getTopicForDay(day) {
  return TOPIC_MAP.find(t => day >= t.start && day <= t.end) || null;
}

// =============================================
// DOCX EXTRACTION
// =============================================
function extractDocxText() {
  const DOCX_PATH = path.join(SCRIPTS_DIR, 'source.docx');
  if (!fs.existsSync(DOCX_PATH)) {
    console.log('WARN: source.docx not found, skipping docx extraction');
    return '';
  }
  const zip = new AdmZip(DOCX_PATH);
  const wordDoc = zip.getEntry('word/document.xml');
  if (!wordDoc) return '';
  const xml = wordDoc.getData().toString('utf8');
  return xml
    .replace(/<w:br[^>]*\/>/g, '\n')
    .replace(/<w:p[ >][^>]*>/g, '\n')
    .replace(/<\/w:p>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x[0-9A-Fa-f]+;/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');
}

function parseDocxChallenges(text) {
  const lines = text.split('\n');
  const challenges = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    const headerMatch = /^Day\s+(\d+)\s*[-–:]\s*(.+)$/.exec(line);
    if (!headerMatch) { i++; continue; }

    const day = parseInt(headerMatch[1]);
    if (day < 1 || day > 210) { i++; continue; }

    let rawTitle = headerMatch[2].trim();
    const lcMatch = /\(#(\d+)\)/.exec(rawTitle);
    const problemNumber = lcMatch ? parseInt(lcMatch[1]) : undefined;
    const title = rawTitle.replace(/\s*\(#\d+\)/, '').trim();

    const blockLines = [];
    i++;
    while (i < lines.length) {
      const nl = lines[i].trim();
      if (/^Day\s+\d+\s*[-–:]/.test(nl)) break;
      if (/^END OF TOPIC/i.test(nl) || /^Topic\s+\d+:/i.test(nl)) { i++; break; }
      blockLines.push(lines[i]);
      i++;
    }
    const block = blockLines.join('\n');

    const question = extractDocxSection(block,
      ['Question', 'Problem Statement', 'Problem'],
      ['Explanation', 'Input Table', 'Input Tables', 'SQL Solution', 'PySpark Solution', 'DE Relevance', 'DE Use Cases', 'Expected Output']);
    const explanation = extractDocxSection(block,
      ['Explanation'],
      ['Input Table', 'Input Tables', 'SQL Solution', 'PySpark Solution', 'Expected Output', 'DE Relevance']);
    const sqlSolution = extractDocxSection(block,
      ['SQL Solution', 'SQL Query'],
      ['PySpark Solution', 'DE Relevance', 'DE Use Cases']);
    const pySparkSolution = extractDocxSection(block,
      ['PySpark Solution', 'PySpark Query'],
      ['DE Relevance', 'DE Use Cases', 'Expected Output']);
    const expectedOutput = extractDocxSection(block,
      ['Expected Output'],
      ['SQL Solution', 'PySpark Solution', 'DE Relevance']);
    const deUseCases = extractDocxUseCases(block);
    const topic = getTopicForDay(day);

    if (question || sqlSolution) {
      challenges.push({
        day,
        topicNumber: topic?.topicNumber ?? null,
        topicTitle: topic?.topicTitle ?? null,
        title,
        problemNumber,
        question: question?.trim() || null,
        explanation: explanation?.trim() || null,
        expectedOutput: expectedOutput?.trim() || null,
        sqlSolution: sqlSolution?.trim() || null,
        pySparkSolution: pySparkSolution?.trim() || null,
        dataEngineeringUseCases: deUseCases.length > 0 ? deUseCases : undefined,
        sourceReferences: ['210 Days SQLPyspark Interview Questions - Data Engineer Role.docx'],
        sourceStatus: 'SOURCE-DERIVED',
      });
    }
  }
  return challenges;
}

function extractDocxSection(block, startKws, endKws) {
  const lines = block.split('\n');
  let inSection = false;
  const collected = [];
  for (const line of lines) {
    const t = line.trim();
    if (!inSection) {
      if (startKws.some(kw => t === kw || t.startsWith(kw + ':') || t.startsWith(kw + ' '))) {
        inSection = true;
        const ci = t.indexOf(':');
        if (ci !== -1 && t.substring(ci + 1).trim()) collected.push(t.substring(ci + 1).trim());
        continue;
      }
    } else {
      if (endKws.some(kw => t === kw || t.startsWith(kw + ':') || t.startsWith(kw + ' ') || /^Day\s+\d+/.test(t))) break;
      collected.push(line);
    }
  }
  return collected.join('\n').trim() || null;
}

function extractDocxUseCases(block) {
  const lines = block.split('\n');
  let inSection = false;
  const useCases = [];
  for (const line of lines) {
    const t = line.trim();
    if (/^DE Relevance|^DE Use Cases|^Data Engineering Use Cases/i.test(t)) { inSection = true; continue; }
    if (inSection) {
      if (/^(SQL Solution|PySpark Solution|Day \d+|Expected Output|Input Table|Explanation)/i.test(t)) break;
      if (t && t.length > 2 && !t.startsWith('Used in')) useCases.push(t.replace(/^[-•]\s*/, ''));
    }
  }
  return useCases.filter(u => u.length > 2);
}

// =============================================
// PDF PAGE PARSER (one challenge per page)
// =============================================
function parsePdfPage(pageText, fallbackDay) {
  const text = pageText
    .replace(/DATA ENGINEER SQL INTERVIEW CHALLENGE\s+/g, '')
    .replace(/DATA ENGINEER SQL INTERVIEW SOLUTIONS\s+/g, '')
    .replace(/Candidate Name:.*?Date:.*?(?=\d+\.|[A-Z])/s, '')
    .replace(/Solutions Manual[^\n]*/g, '')
    .replace(/Short but Tricky[^\n]*/g, '')
    .replace(/Write SQL Solution Here.*$/s, '')
    .replace(/Page \d+\s*$/gm, '')
    .trim();
  
  // Title might start with "N. Title" or just "Title"
  let day, title;
  const numberedTitleMatch = /^(\d+)\.\s+(.+?)(?:\s{2,}TABLE:)/.exec(text);
  
  if (numberedTitleMatch) {
    day = parseInt(numberedTitleMatch[1]);
    title = numberedTitleMatch[2].trim();
  } else {
    // Try to match without number
    const plainTitleMatch = /^(.+?)(?:\s{2,}TABLE:)/.exec(text);
    if (!plainTitleMatch) return null;
    day = fallbackDay;
    title = plainTitleMatch[1].trim();
  }
  
  if (day < 1 || day > 210) return null;
  
  const questionMatch = /QUESTION\s+(.+?)(?=EXPECTED OUTPUT|Reference Solution|$)/s.exec(text);
  const question = questionMatch ? questionMatch[1].trim().replace(/\s{2,}/g, ' ').replace(/Rules:\s*/i, '\n\nRules: ') : null;
  
  const outputMatch = /EXPECTED OUTPUT\s+(.+?)(?=Reference Solution|$)/s.exec(text);
  const expectedOutput = outputMatch ? outputMatch[1].trim().replace(/\s{2,}/g, '\n') : null;
  
  const sqlMatch = /Reference Solution\s+(.+?)(?=•|$)/s.exec(text);
  const sqlSolution = sqlMatch ? sqlMatch[1].trim().replace(/\s{2,}/g, '\n') : null;
  
  const tableMatches = [];
  const tableRegex = /TABLE:\s*(\w+)\s+(.+?)(?=TABLE:|QUESTION|EXPECTED OUTPUT|Reference Solution)/gs;
  let tm;
  while ((tm = tableRegex.exec(text)) !== null) {
    tableMatches.push({ name: tm[1].trim(), rawContent: tm[2].trim().replace(/\s{2,}/g, ' ') });
  }
  
  return { day, title, question, expectedOutput, sqlSolution, inputTables: tableMatches };
}

// =============================================
// MAIN
// =============================================
async function main() {
  const allChallenges = new Map();
  
  // STEP 1: docx (richest source — includes PySpark and DE use cases)
  console.log('\n[1] Extracting from docx (Days 1–76)...');
  const docxText = extractDocxText();
  const docxChallenges = parseDocxChallenges(docxText);
  console.log(`  → ${docxChallenges.length} challenges`);
  docxChallenges.forEach(c => allChallenges.set(c.day, c));
  
  // STEP 2: PDF workbooks — parse pre-extracted text files
  console.log('\n[2] Parsing PDF workbooks...');
  
  const pdfSources = [
    {
      questionFile: 'DE_SQL_Day76_to_90_Workbook.txt',
      solutionFile: 'DE_SQL_Day76_to_90_Solutions_Workbook.txt',
      sourceRef: 'DE_SQL_Day76_to_90_Workbook.pdf',
      range: [76, 90],
    },
    {
      questionFile: 'DE_SQL_Day91_to_105_Workbook.txt',
      solutionFile: 'DE_SQL_Day91_to_105_Solutions_Workbook.txt',
      sourceRef: 'DE_SQL_Day91_to_105_Workbook.pdf',
      range: [91, 105],
    },
    {
      questionFile: 'DE_SQL_Day106_to_115_Workbook.txt',
      solutionFile: 'DE_SQL_Day106_to_115_Solution_Workbook.txt',
      sourceRef: 'DE_SQL_Day106_to_115_Workbook.pdf',
      range: [106, 115],
    },
    {
      questionFile: 'DE_SQL_Day151_to_165_Practice_Workbook.txt',
      solutionFile: 'DE_SQL_Day151_to_165_Solutions_Workbook.txt',
      sourceRef: 'DE_SQL_Day151_to_165_Practice_Workbook.pdf',
      range: [151, 165],
    },
  ];
  
  for (const src of pdfSources) {
    const qPath = path.join(SCRIPTS_DIR, src.questionFile);
    const sPath = path.join(SCRIPTS_DIR, src.solutionFile);
    
    if (!fs.existsSync(qPath)) { console.log(`  SKIP (missing): ${src.questionFile}`); continue; }
    
    // PDFs are one page per line in our extraction
    const qLines = fs.readFileSync(qPath, 'utf8').split('\n').filter(l => l.trim());
    const sLines = fs.existsSync(sPath) ? fs.readFileSync(sPath, 'utf8').split('\n').filter(l => l.trim()) : [];
    
    // Build solution map: day → sql
    const solutionMap = new Map();
    sLines.forEach((line, i) => {
      const parsed = parsePdfPage(line, src.range[0] + i);
      if (parsed && parsed.sqlSolution) solutionMap.set(parsed.day, parsed.sqlSolution);
    });
    
    let added = 0;
    qLines.forEach((line, i) => {
      const parsed = parsePdfPage(line, src.range[0] + i);
      if (!parsed) return;
      const { day, title, question, expectedOutput, inputTables } = parsed;
      if (day < src.range[0] || day > src.range[1]) return;
      
      // Only add if not already from docx (docx is richer)
      if (!allChallenges.has(day)) {
        const topic = getTopicForDay(day);
        const sqlSolution = solutionMap.get(day) || null;
        allChallenges.set(day, {
          day,
          topicNumber: topic?.topicNumber ?? null,
          topicTitle: topic?.topicTitle ?? null,
          title,
          problemNumber: undefined,
          question: question || null,
          explanation: null, // Not available in PDF workbooks
          inputTables: inputTables.length > 0 ? inputTables : undefined,
          expectedOutput: expectedOutput || null,
          sqlSolution,
          pySparkSolution: null, // Not available in PDF workbooks
          dataEngineeringUseCases: undefined,
          sourceReferences: [src.sourceRef],
          sourceStatus: 'SOURCE-DERIVED',
        });
        added++;
      } else {
        // Supplement docx entry with PDF solution if missing
        const existing = allChallenges.get(day);
        if (!existing.sqlSolution && solutionMap.has(day)) {
          existing.sqlSolution = solutionMap.get(day);
          if (!existing.sourceReferences.includes(src.sourceRef)) {
            existing.sourceReferences.push(src.sourceRef);
          }
        }
      }
    });
    
    console.log(`  ${src.sourceRef}: ${added} new days added, ${solutionMap.size} solutions mapped`);
  }
  
  // STEP 3: Sort and validate
  const sorted = Array.from(allChallenges.values()).sort((a, b) => a.day - b.day);
  const daySet = new Set(sorted.map(c => c.day));
  const maxDay = sorted[sorted.length - 1]?.day || 0;
  const missingDays = [];
  for (let d = 1; d <= maxDay; d++) {
    if (!daySet.has(d)) missingDays.push(d);
  }
  
  console.log(`\n=== DATASET SUMMARY ===`);
  console.log(`Total challenges: ${sorted.length}`);
  console.log(`Day range: Day ${sorted[0]?.day} – Day ${maxDay}`);
  console.log(`Missing days within range: ${missingDays.length === 0 ? 'none' : missingDays.join(', ')}`);
  console.log(`With SQL solution:     ${sorted.filter(c => c.sqlSolution).length}`);
  console.log(`With PySpark solution: ${sorted.filter(c => c.pySparkSolution).length}`);
  console.log(`With question text:    ${sorted.filter(c => c.question).length}`);
  console.log(`With expected output:  ${sorted.filter(c => c.expectedOutput).length}`);
  console.log(`With DE use cases:     ${sorted.filter(c => c.dataEngineeringUseCases).length}`);
  
  // Topic breakdown
  console.log('\n=== BY TOPIC ===');
  TOPIC_MAP.forEach(t => {
    const inRange = sorted.filter(c => c.topicNumber === t.topicNumber);
    const expected = t.end - t.start + 1;
    console.log(`  Topic ${t.topicNumber} (Day ${t.start}-${t.end}): ${inRange.length}/${expected} days`);
  });
  
  // Write output
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sorted, null, 2), 'utf8');
  console.log(`\n✓ Dataset written to: ${OUTPUT_FILE}`);
  
  // Spot checks
  const spotDays = [1, 20, 21, 40, 41, 60, 61, 75, 76, 90, 105, 106, 115, 151, 165];
  console.log('\n=== SPOT CHECK ===');
  spotDays.forEach(d => {
    const c = allChallenges.get(d);
    if (c) console.log(`  Day ${d}: "${c.title}" | SQL:${c.sqlSolution ? '✓' : '✗'} PySpark:${c.pySparkSolution ? '✓' : '✗'}`);
    else    console.log(`  Day ${d}: NOT IN DATASET`);
  });
}

main().catch(console.error);
