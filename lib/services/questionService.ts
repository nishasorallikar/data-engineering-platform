import { QuestionRepository } from '../repositories/questionRepository';
import { toQuestionDto } from '../dto/questionDto';

export class QuestionService {
  private repository: QuestionRepository;

  constructor() {
    this.repository = new QuestionRepository();
  }

  async getQuestionById(id: string) {
    const q = await this.repository.findById(id);
    if (!q) return null;
    return toQuestionDto(q);
  }

  async getAllQuestions() {
    const questions = await this.repository.findAll();
    return questions.map(toQuestionDto);
  }

  async getQuestionBySlug(slug: string) {
    const q = await this.repository.findBySlug(slug);
    if (!q) return null;
    return toQuestionDto(q);
  }
}
