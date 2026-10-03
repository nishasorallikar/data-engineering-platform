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
  
  // We are ONLY building the vertical slice for Q4
  const q4Data = data.find((q: any) => q.id === 'fundamental-q4');
  if (!q4Data) {
    throw new Error('Q4 not found in dataset');
  }

  const q4 = {
    id: q4Data.id,
    slug: q4Data.id,
    questionNumber: 4,
    question: q4Data.title,
    section: q4Data.subSkills[0] || 'Fundamentals',
    detailedExplanation: q4Data.detailedExplanation,
    interviewerAngle: q4Data.interviewerAngle,
    source: 'verified-dataset',
    sourceReference: q4Data.sources,
    contentOrigin: '50-Data-Engineering-Interview-Questions.pdf',
    difficulty: q4Data.difficulty,
    type: q4Data.type
  };

  // Idempotent UPSERT
  const result = await Question.findOneAndUpdate(
    { id: q4.id },
    { $set: q4 },
    { upsert: true, new: true }
  );

  console.log(`Successfully upserted Q4: ${result.id}`);
  await mongoose.disconnect();
}

importDb().catch(console.error);
