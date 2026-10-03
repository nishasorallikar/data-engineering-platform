import { Project, IProject } from '../models/Project';

export class ProjectRepository {
  async findAll(): Promise<IProject[]> {
    return Project.find({}).lean();
  }

  async findBySlug(slug: string): Promise<IProject | null> {
    return Project.findOne({ slug }).lean();
  }

  async findById(id: string): Promise<IProject | null> {
    return Project.findOne({ id }).lean();
  }
}
