import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Question } from '../../lib/models/Question';

dotenv.config({ path: '.env' });

const INPUT_FILE = path.join(process.cwd(), 'data', 'verified-datasets', 'fundamental-50-question-dataset.json');

async function importDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not found');

  await mongoose.connect(uri);
  console.log('Connected to MongoDB.');

  if (!fs.existsSync(INPUT_FILE)) {
    throw new Error('Input dataset not found: ' + INPUT_FILE);
  }

  const data = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
  
  // We are ONLY building the vertical slice for Q3
  const q3Data = data.find((q: any) => q.id === 'fundamental-q3');
  if (!q3Data) {
    throw new Error('Q3 not found in dataset');
  }

  const q3 = {
    id: q3Data.id,
    slug: q3Data.id,
    questionNumber: 3,
    question: q3Data.title,
    section: q3Data.subSkills[0] || 'Fundamentals',
    detailedExplanation: q3Data.detailedExplanation,
    interviewerAngle: q3Data.interviewerAngle,
    source: 'verified-dataset',
    sourceReference: q3Data.sources,
    contentOrigin: '50-Data-Engineering-Interview-Questions.pdf',
    difficulty: q3Data.difficulty,
    type: q3Data.type
  };

  // Idempotent UPSERT
  const result = await Question.findOneAndUpdate(
    { id: q3.id },
    { $set: q3 },
    { upsert: true, new: true }
  );

  console.log(`Successfully upserted Q3: ${result.id}`);
  await mongoose.disconnect();
}

importDb().catch(console.error);
