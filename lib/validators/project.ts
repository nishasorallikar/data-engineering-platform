import { z } from 'zod';

export const ProjectSourceSystemSchema = z.object({
  name: z.string(),
  format: z.string(),
  ingestionPath: z.string(),
  frequency: z.string()
});

export const ProjectScenarioSchema = z.object({
  layer: z.string(),
  scenario: z.string(),
  handling: z.string()
});

export const ProjectDimensionSchema = z.object({
  name: z.string(),
  grain: z.string(),
  scd: z.string(),
  examples: z.string()
});

export const ProjectFactSchema = z.object({
  name: z.string(),
  grain: z.string()
});

export const ProjectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  domain: z.string(),
  summary: z.string(),
  businessProblem: z.array(z.string()),
  
  architecture: z.object({
    type: z.string(),
    cloud: z.string(),
    flow: z.string()
  }),
  
  sourceSystems: z.array(ProjectSourceSystemSchema),
  ingestion: z.array(z.string()),
  processing: z.array(z.string()),
  storage: z.array(z.string()),
  serving: z.array(z.string()),
  dataQuality: z.array(z.string()),
  security: z.array(z.string()),
  orchestration: z.array(z.string()),
  monitoring: z.array(z.string()),
  technologies: z.array(z.string()),
  
  scenarios: z.array(ProjectScenarioSchema),
  
  dataModel: z.object({
    dimensions: z.array(ProjectDimensionSchema),
    facts: z.array(ProjectFactSchema)
  }),
  
  interviewTalkingPoints: z.array(z.string()),
  sourceReferences: z.array(z.string()),
  sourceType: z.string()
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
