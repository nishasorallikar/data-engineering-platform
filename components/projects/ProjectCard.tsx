import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Box, Cloud, Database, ExternalLink } from 'lucide-react';
import { ProjectDTO } from '@/lib/dto/projectDto';

interface ProjectCardProps {
  project: ProjectDTO;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="group relative overflow-hidden bg-background/50 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300">
      <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold text-zinc-100">{project.title}</CardTitle>
            <CardDescription className="text-sm font-medium text-blue-400/80">{project.domain}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-zinc-900/50 text-xs border-zinc-800">
            {project.architecture.type}
          </Badge>
        </div>
        <p className="text-sm text-zinc-400 line-clamp-2">{project.summary}</p>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Cloud className="w-3.5 h-3.5" />
            <span>{project.architecture.cloud}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5" />
            <span>{project.sourceSystems.length} Sources</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Box className="w-3.5 h-3.5" />
            <span>{project.scenarios.length} Scenarios</span>
          </div>
        </div>
        
        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="secondary" className="bg-zinc-800/30 text-zinc-500">
              +{project.technologies.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between items-center w-full">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 group-hover:text-white transition-colors mt-2 relative z-10 pointer-events-none">
          Explore Project
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
        {project.projectUrl && (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors mt-2 z-20 relative"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </CardFooter>
    </Card>
  );
};
