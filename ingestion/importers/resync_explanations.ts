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

  // We want to re-import ALL questions from Q1 to Q33 to ensure they are all clean
  const qIds = Array.from({length: 33}, (_, i) => 'fundamental-q' + (i + 1));
  const questionsToImport = dataset.filter((q: any) => qIds.includes(q.id));

  for (const data of questionsToImport) {
    await Question.findOneAndUpdate(
      { id: data.id },
      { $set: { detailedExplanation: data.detailedExplanation } }
    );
  }
  
  console.log('Successfully re-synced detailedExplanations for Q1-Q33');
  await mongoose.disconnect();
}
run();
