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
    'fundamental-q26', 'fundamental-q27', 'fundamental-q28', 
    'fundamental-q29', 'fundamental-q30', 'fundamental-q31',
    'fundamental-q32', 'fundamental-q33'
  ];
  
  const questionsToImport = dataset.filter((q: any) => targetIds.includes(q.id));

  for (const data of questionsToImport) {
    const mappedData = {
      id: data.id,
      slug: (data.statement || data.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      question: data.statement || data.title,
      section: 'Section 5: Pipeline Patterns',
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
  console.log('Imported Q26-Q33.');
  await mongoose.disconnect();
}
run();
