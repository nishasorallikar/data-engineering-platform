import { SqlTable } from "./types";

/**
 * Parses raw text into a structured SqlTable if possible,
 * otherwise returns it as a raw fallback.
 */
export function parseSqlTable(rawText: string, name?: string): SqlTable {
  if (!rawText || !rawText.trim()) {
    return { name, columns: [], rows: [], sourceFormat: "raw", rawSource: rawText };
  }

  const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  // Try Markdown Table (e.g., | id | name |)
  const isMarkdown = lines.some(l => l.startsWith('|') && l.endsWith('|'));
  if (isMarkdown) {
    try {
      const parsed = parseMarkdownTable(lines);
      if (parsed) {
        return { name, ...parsed, sourceFormat: "markdown", rawSource: rawText };
      }
    } catch (e) {
      // Fallback below
    }
  }

  // Try ASCII Table (e.g., +---+---+ )
  const isAscii = lines.some(l => l.startsWith('+') && l.includes('-') && l.endsWith('+'));
  if (isAscii) {
    try {
      const parsed = parseAsciiTable(lines);
      if (parsed) {
        return { name, ...parsed, sourceFormat: "ascii", rawSource: rawText };
      }
    } catch (e) {
      // Fallback below
    }
  }

  // Fallback to Raw
  return {
    name,
    columns: [],
    rows: [],
    sourceFormat: "raw",
    rawSource: rawText
  };
}

function parseMarkdownTable(lines: string[]) {
  // Find the separator line e.g., |---|---|
  const sepIndex = lines.findIndex(l => /^\|[\s\-\:]+\|$/.test(l) || l.includes('---'));
  
  if (sepIndex === -1) return null;
  if (sepIndex === 0) return null; // No header row

  const headerLine = lines[sepIndex - 1];
  const columns = extractMarkdownRow(headerLine);
  
  const rows: string[][] = [];
  for (let i = sepIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('|')) {
      const row = extractMarkdownRow(line);
      // Pad row to match columns if needed, or just push
      rows.push(row);
    }
  }
  
  if (columns.length === 0) return null;
  
  return { columns, rows };
}

function extractMarkdownRow(line: string): string[] {
  let inner = line.trim();
  if (inner.startsWith('|')) inner = inner.substring(1);
  if (inner.endsWith('|')) inner = inner.substring(0, inner.length - 1);
  
  return inner.split('|').map(c => c.trim());
}

function parseAsciiTable(lines: string[]) {
  // +----+-------+
  // | id | name  |
  // +----+-------+
  // | 1  | John  |
  // +----+-------+
  
  const dataLines = lines.filter(l => l.startsWith('|') && !l.startsWith('+'));
  if (dataLines.length < 1) return null;
  
  const columns = extractMarkdownRow(dataLines[0]);
  
  const rows: string[][] = [];
  for (let i = 1; i < dataLines.length; i++) {
    rows.push(extractMarkdownRow(dataLines[i]));
  }
  
  if (columns.length === 0) return null;
  
  return { columns, rows };
}

/**
 * Normalizes input arrays of raw tables from JSON into SqlTable[]
 */
export function normalizeInputTables(inputTablesRaw: any[]): SqlTable[] {
  if (!Array.isArray(inputTablesRaw)) return [];
  
  return inputTablesRaw.map(it => {
    // If it's already somewhat structured (e.g., has columns and rows explicitly)
    if (it.columns && Array.isArray(it.columns) && it.rows && Array.isArray(it.rows)) {
      return {
        name: it.name,
        columns: it.columns,
        rows: it.rows.map((r: any) => Array.isArray(r) ? r.map(String) : []),
        sourceFormat: "structured",
        rawSource: it.rawContent
      };
    }
    
    // Otherwise parse rawContent
    if (it.rawContent) {
      return parseSqlTable(it.rawContent, it.name);
    }
    
    // Unrecognized
    return {
      name: it.name,
      columns: [],
      rows: [],
      sourceFormat: "raw",
      rawSource: JSON.stringify(it)
    };
  });
}

/**
 * Normalizes expected output (often a string) into an array of SqlTable
 * Since expected output usually is a single table but might be raw text.
 */
export function normalizeExpectedOutput(expectedOutputRaw: any): SqlTable[] {
  if (!expectedOutputRaw) return [];
  
  if (typeof expectedOutputRaw === 'string') {
    return [parseSqlTable(expectedOutputRaw, "EXPECTED OUTPUT")];
  }
  
  if (expectedOutputRaw.columns && Array.isArray(expectedOutputRaw.columns)) {
    return [{
      name: "EXPECTED OUTPUT",
      columns: expectedOutputRaw.columns,
      rows: (expectedOutputRaw.rows || []).map((r: any) => Array.isArray(r) ? r.map(String) : []),
      sourceFormat: "structured",
      rawSource: JSON.stringify(expectedOutputRaw)
    }];
  }
  
  return [{
    name: "EXPECTED OUTPUT",
    columns: [],
    rows: [],
    sourceFormat: "raw",
    rawSource: JSON.stringify(expectedOutputRaw)
  }];
}
