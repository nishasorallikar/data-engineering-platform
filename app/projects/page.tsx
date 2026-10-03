import React from 'react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectDTO } from '@/lib/dto/projectDto';

export const dynamic = 'force-dynamic';

async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/projects`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  
  return res.json();
}

export default async function ProjectsLibraryPage() {
  let data;
  try {
    data = await getProjects();
  } catch (e) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-zinc-100 mb-4">Error loading projects</h1>
        <p className="text-zinc-400">Please try again later.</p>
      </div>
    );
  }

  const projects: ProjectDTO[] = data?.projects || [];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="max-w-2xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-6">
          Build real-world <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Data Engineering systems.
          </span>
        </h1>
        <p className="text-lg text-zinc-400 mb-8">
          Explore verified project architectures, pipelines, technologies and interview scenarios.
        </p>
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
          {projects.length} Verified {projects.length === 1 ? 'Project' : 'Projects'} Available
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full py-12 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-lg">
            No projects available at the moment.
          </div>
        ) : (
          projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  );
}
