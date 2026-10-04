import { SqlChallengeRepository } from '../repositories/sqlChallengeRepository';
import { SqlChallengeDTO, toSqlChallengeDTO } from '../dto/sqlChallengeDto';
import { NotFoundError } from '../errors';

export class SqlChallengeService {
  private repository: SqlChallengeRepository;

  constructor() {
    this.repository = new SqlChallengeRepository();
  }

  async getChallengeByDay(day: number): Promise<SqlChallengeDTO> {
    const challenge = await this.repository.findByDay(day);
    if (!challenge) {
      throw new NotFoundError(`Challenge for day ${day} not found`);
    }
    return toSqlChallengeDTO(challenge);
  }

  async getChallenges(
    page: number = 1,
    limit: number = 20,
    filters?: { topic?: number; difficulty?: string }
  ): Promise<{ data: SqlChallengeDTO[], total: number }> {
    const result = await this.repository.findPaginated(page, limit, filters);
    
    return {
      data: result.data.map(toSqlChallengeDTO),
      total: result.total
    };
  }
}
