export type ProjectDTO = {
  id: string;
  slug: string;
  title: string;
  domain: string;
  summary: string;
  businessProblem: string[];

  architecture: {
    type: string;
    cloud: string;
    flow: string;
  };

  sourceSystems: Array<{
    name: string;
    format: string;
    ingestionPath: string;
    frequency: string;
  }>;

  ingestion: string[];
  processing: string[];
  storage: string[];
  serving: string[];
  dataQuality: string[];
  security: string[];
  orchestration: string[];
  monitoring: string[];
  technologies: string[];

  scenarios: Array<{
    layer: string;
    scenario: string;
    handling: string;
    codeSnippet?: {
      language: string;
      code: string;
    };
  }>;

  dataModel: {
    dimensions: Array<{
      name: string;
      grain: string;
      scd: string;
      examples: string;
      columns?: Array<{
        name: string;
        type: string;
        isPrimary?: boolean;
        isForeign?: boolean;
      }>;
    }>;
    facts: Array<{
      name: string;
      grain: string;
      columns?: Array<{
        name: string;
        type: string;
        isPrimary?: boolean;
        isForeign?: boolean;
      }>;
    }>;
  };

  interviewTalkingPoints: string[];
};

export function toProjectDTO(project: any): ProjectDTO {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    domain: project.domain,
    summary: project.summary,
    businessProblem: project.businessProblem || [],
    architecture: project.architecture || { type: '', cloud: '', flow: '' },
    sourceSystems: project.sourceSystems || [],
    ingestion: project.ingestion || [],
    processing: project.processing || [],
    storage: project.storage || [],
    serving: project.serving || [],
    dataQuality: project.dataQuality || [],
    security: project.security || [],
    orchestration: project.orchestration || [],
    monitoring: project.monitoring || [],
    technologies: project.technologies || [],
    scenarios: project.scenarios || [],
    dataModel: project.dataModel || { dimensions: [], facts: [] },
    interviewTalkingPoints: project.interviewTalkingPoints || [],
  };
}
