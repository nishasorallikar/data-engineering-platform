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
  
  const targetIds = ['fundamental-q5', 'fundamental-q6', 'fundamental-q7'];

  for (const targetId of targetIds) {
    const qData = data.find((q: any) => q.id === targetId);
    if (!qData) {
      throw new Error(`${targetId} not found in dataset`);
    }

    const qRecord = {
      id: qData.id,
      slug: qData.id,
      questionNumber: parseInt(qData.id.split('-q')[1], 10),
      question: qData.title,
      section: qData.subSkills ? qData.subSkills[0] : 'Fundamentals',
      detailedExplanation: qData.detailedExplanation,
      interviewerAngle: qData.interviewerAngle,
      source: 'verified-dataset',
      sourceReference: qData.sources,
      contentOrigin: '50-Data-Engineering-Interview-Questions.pdf',
      difficulty: qData.difficulty,
      type: qData.type
    };

    // Idempotent UPSERT
    const result = await Question.findOneAndUpdate(
      { id: qRecord.id },
      { $set: qRecord },
      { upsert: true, new: true }
    );
    console.log(`Successfully upserted: ${result.id}`);
  }

  await mongoose.disconnect();
}

importDb().catch(console.error);
