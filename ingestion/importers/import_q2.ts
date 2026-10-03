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
  
  // We are ONLY building the vertical slice for Q1
  const q2Data = data.find((q: any) => q.id === 'fundamental-q2');
  if (!q2Data) {
    throw new Error('Q2 not found in dataset');
  }

  const q2 = {
    id: q2Data.id,
    slug: q2Data.id,
    questionNumber: 2,
    question: q2Data.title,
    section: q2Data.subSkills[0] || 'Fundamentals',
    detailedExplanation: q2Data.detailedExplanation,
    interviewerAngle: q2Data.interviewerAngle,
    source: 'verified-dataset',
    sourceReference: q2Data.sources,
    contentOrigin: '50-Data-Engineering-Interview-Questions.pdf',
    difficulty: q2Data.difficulty,
    type: q2Data.type
  };

  // Idempotent UPSERT
  const result = await Question.findOneAndUpdate(
    { id: q2.id },
    { $set: q2 },
    { upsert: true, new: true }
  );

  console.log(`Successfully upserted Q2: ${result.id}`);
  await mongoose.disconnect();
}

importDb().catch(console.error);
