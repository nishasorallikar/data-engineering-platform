import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
import { Question } from '../../lib/models/Question';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in environment variables');
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected to MongoDB');

    const datasetPath = path.resolve(process.cwd(), 'data/verified-datasets/fundamental-50-question-dataset.json');
    const rawData = fs.readFileSync(datasetPath, 'utf8');
    const dataset = JSON.parse(rawData);

    // Target Q8 to Q16
    const targetIds = [
      'fundamental-q8', 'fundamental-q9', 'fundamental-q10', 
      'fundamental-q11', 'fundamental-q12', 'fundamental-q13',
      'fundamental-q14', 'fundamental-q15', 'fundamental-q16'
    ];
    
    const questionsToImport = dataset.filter((q: any) => targetIds.includes(q.id));

    if (questionsToImport.length === 0) {
      console.log('No matching questions found in dataset.');
      process.exit(0);
    }

    console.log(`Found ${questionsToImport.length} questions to import.`);

    for (const data of questionsToImport) {
      console.log(`Importing ${data.id}...`);
      
      const mappedData = {
        id: data.id,
        slug: (data.statement || data.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        question: data.statement || data.title,
        section: data.skill || 'Section 2: SQL',
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

    console.log('Successfully imported Q8 to Q16.');
  } catch (error) {
    console.error('Error importing questions:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

run();
