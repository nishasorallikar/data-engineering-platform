import { ProjectRepository } from '../repositories/projectRepository';
import { ProjectDTO, toProjectDTO } from '../dto/projectDto';
import mongoose from 'mongoose';

const projectRepository = new ProjectRepository();

export class ProjectService {
  async getAllProjects(): Promise<ProjectDTO[]> {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }
    const projects = await projectRepository.findAll();
    return projects.map(toProjectDTO);
  }

  async getProjectBySlug(slug: string): Promise<ProjectDTO | null> {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }
    const project = await projectRepository.findBySlug(slug);
    if (!project) return null;
    return toProjectDTO(project);
  }
}
