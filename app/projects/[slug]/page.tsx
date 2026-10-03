import React from 'react';
import { ProjectDTO } from '@/lib/dto/projectDto';
import { notFound } from 'next/navigation';
import { ProjectWorkspace } from '@/components/projects/ProjectWorkspace';

export const dynamic = 'force-dynamic';

async function getProject(slug: string): Promise<ProjectDTO | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/projects/${slug}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch project');
  }
  
  const data = await res.json();
  return data.project;
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return <ProjectWorkspace project={project} />;
}

