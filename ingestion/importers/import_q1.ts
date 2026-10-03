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
  const q1Data = data.find((q: any) => q.id === 'fundamental-q1');
  if (!q1Data) {
    throw new Error('Q1 not found in dataset');
  }

  const q1 = {
    id: q1Data.id,
    slug: q1Data.id,
    questionNumber: 1,
    question: q1Data.title,
    section: q1Data.subSkills[0] || 'Fundamentals',
    detailedExplanation: q1Data.detailedExplanation,
    interviewerAngle: q1Data.interviewerAngle,
    source: 'verified-dataset',
    sourceReference: q1Data.sources,
    contentOrigin: '50-Data-Engineering-Interview-Questions.pdf',
    difficulty: q1Data.difficulty,
    type: q1Data.type
  };

  // Idempotent UPSERT
  const result = await Question.findOneAndUpdate(
    { id: q1.id },
    { $set: q1 },
    { upsert: true, new: true }
  );

  console.log(`Successfully upserted Q1: ${result.id}`);
  await mongoose.disconnect();
}

importDb().catch(console.error);
