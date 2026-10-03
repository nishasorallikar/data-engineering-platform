import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const QuestionSchema = new mongoose.Schema({}, { strict: false, collection: 'questions_v2' });
const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);

async function run() {
  await mongoose.connect(MONGODB_URI!);
  console.log('Connected to DB');

  const uniqueSections = await Question.distinct('section');
  console.log('Unique Sections Before:', uniqueSections);

  const result = await Question.updateMany(
    { section: { $regex: /Fundamentals/i } },
    { $set: { section: 'Section 2: SQL' } }
  );

  console.log('Updated documents:', result);

  const uniqueSectionsAfter = await Question.distinct('section');
  console.log('Unique Sections After:', uniqueSectionsAfter);

  await mongoose.disconnect();
}

run().catch(console.dir);
