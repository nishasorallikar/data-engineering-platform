import mongoose, { Document, Model } from 'mongoose';

export interface ISourceReference {
  document: string;
  page?: number;
}

export interface IQuestion extends Document {
  id: string; // The stable application ID (e.g. fundamental-q1)
  slug: string;
  questionNumber?: number;
  question: string;
  section: string;
  
  // Content
  detailedExplanation?: string;
  interviewerAngle?: string;
  
  // Metadata
  source: string; // e.g. "verified-dataset"
  sourceReference?: ISourceReference[];
  contentOrigin: string; // e.g. "50-Data-Engineering-Interview-Questions.pdf"
  difficulty?: string;
  type?: string;
}

const SourceReferenceSchema = new mongoose.Schema({
  document: { type: String, required: true },
  page: { type: Number, required: false }
}, { _id: false });

const QuestionSchema = new mongoose.Schema<IQuestion>({
  id: { type: String, required: true, unique: true, index: true },
  slug: { type: String, required: true, unique: true, index: true },
  questionNumber: { type: Number, index: true },
  question: { type: String, required: true },
  section: { type: String, required: true, index: true },
  
  detailedExplanation: { type: String },
  interviewerAngle: { type: String },
  
  source: { type: String, required: true },
  sourceReference: [SourceReferenceSchema],
  contentOrigin: { type: String, required: true, index: true },
  difficulty: { type: String },
  type: { type: String }
}, {
  timestamps: true,
  collection: 'questions_v2' // Using a new collection to isolate from legacy
});

// Since Next.js hot reloads can cause model recompilation errors:
export const Question: Model<IQuestion> = mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);
