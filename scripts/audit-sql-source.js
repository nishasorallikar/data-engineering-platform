const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.resolve(__dirname, '../docx_content.txt'), 'utf8');
const lines = text.split('\n');

// Extract all "Day N" references
const dayPattern = /\bDay\s+(\d+)\b/gi;
const dayNumbers = new Set();
const dayLines = {};

lines.forEach((line, idx) => {
  let m;
  while ((m = dayPattern.exec(line)) !== null) {
    const d = parseInt(m[1]);
    if (d >= 1 && d <= 300) {
      dayNumbers.add(d);
      if (!dayLines[d]) dayLines[d] = [];
      dayLines[d].push({ lineNum: idx + 1, line: line.trim().substring(0, 100) });
    }
  }
  dayPattern.lastIndex = 0; // reset regex between lines
});

const sorted = Array.from(dayNumbers).sort((a, b) => a - b);
console.log(`\n=== DAY NUMBER AUDIT ===`);
console.log(`Found day references: ${sorted.length}`);
console.log(`First: ${sorted[0]}, Last: ${sorted[sorted.length - 1]}`);

// Check for missing days in range 1-210
const missing = [];
for (let i = 1; i <= 210; i++) {
  if (!dayNumbers.has(i)) missing.push(i);
}
console.log(`\nMissing days (1-210): ${missing.length}`);
if (missing.length > 0) console.log('Missing:', missing.slice(0, 50).join(', '));

// Days above 210
const above = sorted.filter(d => d > 210);
console.log(`\nDays above 210: ${above.join(', ') || 'none'}`);

// Check for duplicate day declarations (actual challenge headings)
// Look for lines like "Day 1:" or "Day 1 —" that mark challenge starts
const challengeHeaderPattern = /^Day\s+(\d+)\s*[:\-–—]/i;
const challengeDays = {};
lines.forEach((line, idx) => {
  const m = challengeHeaderPattern.exec(line.trim());
  if (m) {
    const d = parseInt(m[1]);
    if (!challengeDays[d]) challengeDays[d] = [];
    challengeDays[d].push(idx + 1);
  }
});

const duplicateDays = Object.entries(challengeDays).filter(([d, occurrences]) => occurrences.length > 1);
console.log(`\n=== CHALLENGE HEADER ANALYSIS ===`);
console.log(`Unique day headers found: ${Object.keys(challengeDays).length}`);
console.log(`Duplicate day headers: ${duplicateDays.length}`);
if (duplicateDays.length > 0) {
  duplicateDays.forEach(([d, lines]) => console.log(`  Day ${d}: at lines ${lines.join(', ')}`));
}

// Spot check a few day entries
const spotDays = [1, 20, 21, 40, 41, 60, 61, 90, 105, 115, 135, 150, 165, 185, 186, 210];
console.log(`\n=== SPOT CHECK ENTRIES ===`);
spotDays.forEach(d => {
  const found = challengeDays[d];
  if (found) {
    console.log(`Day ${d}: header at lines ${found.join(', ')}`);
  } else {
    console.log(`Day ${d}: NO HEADER FOUND`);
  }
});

// Sample first 30 challenge lines
const challengeKeys = Object.keys(challengeDays).map(Number).sort((a,b)=>a-b);
console.log(`\n=== FIRST 10 CHALLENGE HEADERS ===`);
challengeKeys.slice(0, 10).forEach(d => {
  const lineNum = challengeDays[d][0];
  console.log(`Day ${d} (line ${lineNum}): ${lines[lineNum - 1].trim().substring(0, 120)}`);
});

// Scan for fields
const fieldPatterns = {
  question: /\b(problem|question|challenge|task)\s*:/i,
  explanation: /\b(explanation|approach|solution overview)\s*:/i,
  sql: /\bsql\s*(solution|query|answer)?\s*:/i,
  pyspark: /\bpyspark\s*(solution|code|answer)?\s*:/i,
  inputTable: /\b(input|table|schema)\s*:/i,
  expectedOutput: /\b(expected|output|result)\s*:/i,
  useCases: /\b(use case|use-case|real.world|data engineering use case)/i,
};

const fieldCounts = {};
Object.keys(fieldPatterns).forEach(k => fieldCounts[k] = 0);

lines.forEach(line => {
  Object.entries(fieldPatterns).forEach(([field, pattern]) => {
    if (pattern.test(line)) fieldCounts[field]++;
  });
});

console.log(`\n=== FIELD OCCURRENCE COUNTS ===`);
Object.entries(fieldCounts).forEach(([f, count]) => console.log(`  ${f}: ${count} occurrences`));

console.log('\n=== TOPIC BOUNDARIES ===');
// Look for topic/section headings
const topicPattern = /\b(section|topic|part)\s*\d+|basic joins|window functions|subqueries|string functions|date.*time|conditional logic|set operations|complex agg|advanced joins|data cleaning|performance|real.world/i;
const topicLines = lines.map((l, i) => ({ line: l.trim(), num: i + 1 })).filter(({line}) => topicPattern.test(line) && line.length < 120);
topicLines.slice(0, 25).forEach(({line, num}) => console.log(`  L${num}: ${line}`));
