export type SqlClauseType = 
  | 'WITH' 
  | 'SELECT' 
  | 'FROM' 
  | 'JOIN' 
  | 'ON' 
  | 'WHERE' 
  | 'GROUP BY' 
  | 'HAVING' 
  | 'ORDER BY' 
  | 'LIMIT' 
  | 'UNION' 
  | 'UNION ALL' 
  | 'INTERSECT' 
  | 'EXCEPT';

export interface SqlClause {
  type: SqlClauseType;
  label: string;
  line: number;
  description: string;
}

const CLAUSE_DESCRIPTIONS: Record<SqlClauseType, string> = {
  'WITH': 'Defines Common Table Expressions (CTEs) for use later in the query.',
  'SELECT': 'Specifies the columns or expressions to be returned in the result set.',
  'FROM': 'Specifies the base table(s) to retrieve rows from.',
  'JOIN': 'Combines rows from two or more tables based on a related column.',
  'ON': 'Defines the condition for a JOIN operation.',
  'WHERE': 'Filters rows based on a specific condition before grouping.',
  'GROUP BY': 'Groups rows that have the same values into summary rows.',
  'HAVING': 'Filters groups after the GROUP BY operation has been applied.',
  'ORDER BY': 'Sorts the result set by one or more columns.',
  'LIMIT': 'Restricts the number of rows returned in the result set.',
  'UNION': 'Combines the result sets of two queries, removing duplicates.',
  'UNION ALL': 'Combines the result sets of two queries, keeping duplicates.',
  'INTERSECT': 'Returns only the rows that appear in both query result sets.',
  'EXCEPT': 'Returns rows from the first query that are not in the second.'
};

export function parseSqlClauses(sql: string): SqlClause[] {
  if (!sql) return [];

  const lines = sql.split('\n');
  const clauses: SqlClause[] = [];
  
  // Basic Regex matchers for clauses (very simplified, ignores strings/comments for now, 
  // but avoids matching inside words)
  const matchers: { type: SqlClauseType, regex: RegExp }[] = [
    { type: 'WITH', regex: /^\s*WITH\b/i },
    { type: 'SELECT', regex: /^\s*SELECT\b/i },
    { type: 'FROM', regex: /^\s*FROM\b/i },
    { type: 'JOIN', regex: /^\s*(?:INNER\s+|LEFT\s+|RIGHT\s+|FULL\s+|CROSS\s+)?JOIN\b/i },
    { type: 'ON', regex: /^\s*ON\b/i },
    { type: 'WHERE', regex: /^\s*WHERE\b/i },
    { type: 'GROUP BY', regex: /^\s*GROUP\s+BY\b/i },
    { type: 'HAVING', regex: /^\s*HAVING\b/i },
    { type: 'ORDER BY', regex: /^\s*ORDER\s+BY\b/i },
    { type: 'LIMIT', regex: /^\s*LIMIT\b/i },
    { type: 'UNION ALL', regex: /^\s*UNION\s+ALL\b/i },
    { type: 'UNION', regex: /^\s*UNION\b(?!\s+ALL)/i },
    { type: 'INTERSECT', regex: /^\s*INTERSECT\b/i },
    { type: 'EXCEPT', regex: /^\s*EXCEPT\b/i },
  ];

  lines.forEach((line, index) => {
    // Strip inline comments for matching
    const cleanLine = line.replace(/--.*$/, '').toUpperCase();
    
    for (const matcher of matchers) {
      if (matcher.regex.test(cleanLine)) {
        // Prevent duplicate consecutive stages of the same type if they are likely part of the same block
        // (except JOIN/ON which can happen multiple times)
        const isRepeat = clauses.length > 0 && clauses[clauses.length - 1].type === matcher.type && !['JOIN', 'ON'].includes(matcher.type);
        
        if (!isRepeat) {
          clauses.push({
            type: matcher.type,
            label: matcher.type,
            line: index + 1,
            description: CLAUSE_DESCRIPTIONS[matcher.type]
          });
        }
      }
    }
  });

  // Reorder conceptually for display if needed, but linear parsing is usually better for Flow.
  return clauses;
}
