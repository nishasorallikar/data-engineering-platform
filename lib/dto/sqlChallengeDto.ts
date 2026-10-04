export interface SqlChallengeDTO {
  day: number;
  topicNumber: number | null;
  topicTitle: string | null;
  title: string;
  problemNumber?: number;
  difficulty?: "Easy" | "Medium" | "Hard";
  question: string | null;
  explanation: string | null;
  inputTables?: Array<{
    name: string;
    columns?: string[];
    rows?: unknown[][];
    rawContent?: string;
  }>;
  expectedOutput?: string | {
    columns: string[];
    rows?: unknown[][];
  };
  sqlSolution: string | null;
  pySparkSolution: string | null;
  dataEngineeringUseCases?: string[];
  sourceReferences: string[];
  sourceStatus: "SOURCE-DERIVED";
}

export function toSqlChallengeDTO(challenge: any): SqlChallengeDTO {
  return {
    day: challenge.day,
    topicNumber: challenge.topicNumber,
    topicTitle: challenge.topicTitle,
    title: challenge.title,
    problemNumber: challenge.problemNumber,
    difficulty: challenge.difficulty,
    question: challenge.question,
    explanation: challenge.explanation,
    inputTables: challenge.inputTables,
    expectedOutput: challenge.expectedOutput,
    sqlSolution: challenge.sqlSolution,
    pySparkSolution: challenge.pySparkSolution,
    dataEngineeringUseCases: challenge.dataEngineeringUseCases,
    sourceReferences: challenge.sourceReferences,
    sourceStatus: challenge.sourceStatus,
  };
}
