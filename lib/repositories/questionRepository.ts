import connectToDatabase from '../db/mongodb';
import { Question } from '../models/Question';

export class QuestionRepository {
  async findById(id: string) {
    await connectToDatabase();
    // We search by the custom stable string ID (e.g. fundamental-q1)
    const q = await Question.findOne({ id }).lean().exec();
    return q;
  }

  async findAll() {
    await connectToDatabase();
    const q = await Question.find({}).sort({ questionNumber: 1 }).lean().exec();
    return q;
  }

  async findBySlug(slug: string) {
    await connectToDatabase();
    const q = await Question.findOne({ slug }).lean().exec();
    return q;
  }
}
