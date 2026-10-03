import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const MONGODB_URI = process.env.MONGODB_URI as string;
const JSON_FILE_PATH = path.join(process.cwd(), 'data', 'verified-datasets', 'fundamental-50-question-dataset.json');

const QuestionSchema = new mongoose.Schema({}, { strict: false, collection: 'questions_v2' });
const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);

async function runAudit() {
  console.log(`JSON FILE:\n${JSON_FILE_PATH}`);
  console.log(`MongoDB COLLECTION:\nquestions_v2`);
  
  if (!fs.existsSync(JSON_FILE_PATH)) {
    console.error(`JSON file missing at ${JSON_FILE_PATH}`);
    process.exit(1);
  }

  const rawJson = fs.readFileSync(JSON_FILE_PATH, 'utf8');
  const jsonData = JSON.parse(rawJson);

  await mongoose.connect(MONGODB_URI);
  const dbData = await Question.find({}).lean().exec();

  console.log(`\nJSON RECORD COUNT: ${jsonData.length}`);
  console.log(`MongoDB RECORD COUNT: ${dbData.length}`);

  if (jsonData.length !== 50 || dbData.length !== 50) {
    console.error(`Discrepancy: Expected 50 records.`);
  }

  const jsonMap = new Map();
  jsonData.forEach((q: any) => {
    jsonMap.set(q.id, q);
  });

  const dbMap = new Map();
  dbData.forEach((q: any) => {
    dbMap.set(q.id, q);
  });

  console.log(`\nFIELD | MATCHED | MISMATCHED | MISSING JSON | MISSING DB`);
  let mismatches: any[] = [];
  
  let matchCount = 0;
  let mismatchCount = 0;
  let missingJsonCount = 0;
  let missingDbCount = 0;

  for (const [id, dbQ] of dbMap.entries()) {
    const jsonQ = jsonMap.get(id);
    if (!jsonQ) {
      missingJsonCount++;
      mismatches.push({ id, field: 'document', json: 'MISSING', db: 'EXISTS' });
      continue;
    }
    
    // Compare basic fields
    // JSON uses "skill" for section, "title" for question text
    // DB uses "section" for section, "question" for question text
    
    const dbSection = dbQ.section?.trim() || '';
    const jsonSection = jsonQ.skill?.trim() || '';
    
    if (dbSection !== jsonSection) {
      mismatchCount++;
      mismatches.push({ id, field: 'section', json: jsonSection, db: dbSection });
    } else {
      matchCount++;
    }

    const dbTitle = dbQ.question?.trim() || '';
    const jsonTitle = jsonQ.title?.trim() || '';
    
    if (dbTitle !== jsonTitle) {
      mismatchCount++;
      mismatches.push({ id, field: 'question', json: jsonTitle, db: dbTitle });
    } else {
      matchCount++;
    }
    
    // Explanation
    const dbExplanation = (dbQ.detailedExplanation || '').trim().replace(/\s+/g, ' ');
    const jsonExplanation = (jsonQ.detailedExplanation || '').trim().replace(/\s+/g, ' ');
    if (dbExplanation !== jsonExplanation) {
      mismatchCount++;
      mismatches.push({ id, field: 'detailedExplanation', json: jsonExplanation, db: dbExplanation });
    } else {
      matchCount++;
    }
    
    // Difficulty
    const dbDifficulty = dbQ.difficulty?.trim() || '';
    const jsonDifficulty = jsonQ.difficulty?.trim() || '';
    if (dbDifficulty !== jsonDifficulty) {
      mismatchCount++;
      mismatches.push({ id, field: 'difficulty', json: jsonDifficulty, db: dbDifficulty });
    } else {
      matchCount++;
    }
  }

  for (const [id, jsonQ] of jsonMap.entries()) {
    if (!dbMap.has(id)) {
      missingDbCount++;
      mismatches.push({ id, field: 'document', json: 'EXISTS', db: 'MISSING' });
    }
  }

  console.log(`ALL   | ${matchCount} | ${mismatchCount} | ${missingJsonCount} | ${missingDbCount}`);

  if (mismatches.length > 0) {
    console.log(`\nMISMATCH DETAILS:`);
    mismatches.slice(0, 10).forEach(m => {
      console.log(`\n${m.id}`);
      console.log(`FIELD: ${m.field}`);
      console.log(`JSON: "${m.json.substring(0, 100)}..."`);
      console.log(`MongoDB: "${m.db.substring(0, 100)}..."`);
    });
    if (mismatches.length > 10) console.log(`... and ${mismatches.length - 10} more`);
    console.log(`\nDATA CONSISTENCY STATUS: FAILED`);
  } else {
    console.log(`\nDATA CONSISTENCY STATUS: PASSED`);
  }

  await mongoose.disconnect();
}

runAudit().catch(console.error);
