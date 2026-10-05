import React from 'react';
import { ProjectDTO } from '@/lib/dto/projectDto';
import { notFound } from 'next/navigation';
import { ProjectWorkspace } from '@/components/projects/ProjectWorkspace';
import { ProjectService } from '@/lib/services/projectService';

export const dynamic = 'force-dynamic';

async function getProject(slug: string): Promise<ProjectDTO | null> {
  try {
    const projectService = new ProjectService();
    return await projectService.getProjectBySlug(slug);
  } catch (error) {
    console.error('Failed to fetch project by slug:', error);
    return null;
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return <ProjectWorkspace project={project} />;
}

