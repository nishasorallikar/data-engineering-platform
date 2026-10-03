import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
import { Question } from '../../lib/models/Question';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  await mongoose.connect(MONGODB_URI!);
  const rawData = fs.readFileSync(path.resolve(process.cwd(), 'data/verified-datasets/fundamental-50-question-dataset.json'), 'utf8');
  const dataset = JSON.parse(rawData);

  const targetIds = [
    'fundamental-q44', 'fundamental-q45', 'fundamental-q46', 
    'fundamental-q47', 'fundamental-q48', 'fundamental-q49', 'fundamental-q50'
  ];
  
  const questionsToImport = dataset.filter((q: any) => targetIds.includes(q.id));

  for (const data of questionsToImport) {
    const mappedData = {
      id: data.id,
      slug: (data.statement || data.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      question: data.statement || data.title,
      section: 'Section 7: Streaming & System Design',
      detailedExplanation: data.detailedExplanation,
      interviewerAngle: data.interviewerAngle,
      difficulty: data.difficulty,
      source: 'verified-dataset',
      contentOrigin: '50-Data-Engineering-Interview-Questions.pdf',
      questionNumber: parseInt(data.id.split('-q')[1])
    };

    await Question.findOneAndUpdate(
      { id: mappedData.id },
      { $set: mappedData },
      { upsert: true, returnDocument: 'after' }
    );
  }
  console.log('Imported Q44-Q50.');
  await mongoose.disconnect();
}
run();
