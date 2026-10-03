import { NextResponse } from 'next/server';
import { ProjectService } from '../../../lib/services/projectService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const projectService = new ProjectService();
    const projects = await projectService.getAllProjects();
    
    return NextResponse.json({
      projects: projects,
      count: projects.length
    });
  } catch (error) {
    console.error('Projects API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
