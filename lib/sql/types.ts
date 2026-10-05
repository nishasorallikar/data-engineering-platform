export type SqlTable = {
  name?: string;
  columns: string[];
  rows: string[][];
  sourceFormat: "markdown" | "ascii" | "structured" | "raw";
  rawSource?: string;
};

export type SqlChallengeTables = {
  inputTables: SqlTable[];
  expectedOutput?: SqlTable[];
};
