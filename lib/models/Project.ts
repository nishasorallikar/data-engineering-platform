import mongoose, { Document, Model } from 'mongoose';

export interface IProject extends Document {
  id: string;
  slug: string;
  title: string;
  domain: string;
  summary: string;
  projectUrl?: string;
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
  }>;

  dataModel: {
    dimensions: Array<{
      name: string;
      grain: string;
      scd: string;
      examples: string;
    }>;
    facts: Array<{
      name: string;
      grain: string;
    }>;
  };

  interviewTalkingPoints: string[];
  sourceReferences: string[];
  sourceType: string;
}

const SourceSystemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  format: { type: String, required: true },
  ingestionPath: { type: String, required: true },
  frequency: { type: String, required: true }
}, { _id: false });

const ScenarioSchema = new mongoose.Schema({
  layer: { type: String, required: true },
  scenario: { type: String, required: true },
  handling: { type: String, required: true }
}, { _id: false });

const DimensionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grain: { type: String, required: true },
  scd: { type: String, required: true },
  examples: { type: String, required: true }
}, { _id: false });

const FactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grain: { type: String, required: true }
}, { _id: false });

const ProjectMongooseSchema = new mongoose.Schema<IProject>({
  id: { type: String, required: true, unique: true, index: true },
  slug: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  domain: { type: String, required: true },
  summary: { type: String, required: true },
  projectUrl: { type: String, required: false },
  businessProblem: [{ type: String }],

  architecture: {
    type: { type: String, required: true },
    cloud: { type: String, required: true },
    flow: { type: String, required: true }
  },

  sourceSystems: [SourceSystemSchema],
  ingestion: [{ type: String }],
  processing: [{ type: String }],
  storage: [{ type: String }],
  serving: [{ type: String }],
  dataQuality: [{ type: String }],
  security: [{ type: String }],
  orchestration: [{ type: String }],
  monitoring: [{ type: String }],
  technologies: [{ type: String }],

  scenarios: [ScenarioSchema],

  dataModel: {
    dimensions: [DimensionSchema],
    facts: [FactSchema]
  },

  interviewTalkingPoints: [{ type: String }],
  sourceReferences: [{ type: String }],
  sourceType: { type: String, required: true }
}, {
  timestamps: true,
  collection: 'projects'
});

export const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectMongooseSchema);
