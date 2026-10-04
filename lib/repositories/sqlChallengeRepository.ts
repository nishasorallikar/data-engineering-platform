import fs from 'fs/promises';
import path from 'path';

export interface SqlChallengeRecord {
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
    rawContent?: string;
  }>;
  expectedOutput?: string;
  sqlSolution: string | null;
  pySparkSolution: string | null;
  dataEngineeringUseCases?: string[];
  sourceReferences: string[];
  sourceStatus: "SOURCE-DERIVED";
}

export class SqlChallengeRepository {
  private dataPath = path.join(process.cwd(), 'data', 'sql-challenges', 'sql-challenges.json');
  private cache: SqlChallengeRecord[] | null = null;

  private async loadData(): Promise<SqlChallengeRecord[]> {
    if (this.cache) return this.cache;
    try {
      const fileContent = await fs.readFile(this.dataPath, 'utf8');
      const data = JSON.parse(fileContent);
      this.cache = data;
      return data;
    } catch (error) {
      console.error('Failed to load SQL challenges dataset:', error);
      return [];
    }
  }

  async findAll(): Promise<SqlChallengeRecord[]> {
    return await this.loadData();
  }

  async findByDay(day: number): Promise<SqlChallengeRecord | null> {
    const data = await this.loadData();
    return data.find(c => c.day === day) || null;
  }

  async findByTopic(topicNumber: number): Promise<SqlChallengeRecord[]> {
    const data = await this.loadData();
    return data.filter(c => c.topicNumber === topicNumber);
  }

  async findByDifficulty(difficulty: string): Promise<SqlChallengeRecord[]> {
    const data = await this.loadData();
    return data.filter(c => c.difficulty === difficulty);
  }

  async findPaginated(
    page: number, 
    limit: number, 
    filters?: { topic?: number; difficulty?: string }
  ): Promise<{ data: SqlChallengeRecord[], total: number }> {
    let data = await this.loadData();
    
    if (filters?.topic) {
      data = data.filter(c => c.topicNumber === filters.topic);
    }
    
    if (filters?.difficulty) {
      data = data.filter(c => c.difficulty === filters.difficulty);
    }
    
    const total = data.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, endIndex);
    
    return { data: paginatedData, total };
  }
}
