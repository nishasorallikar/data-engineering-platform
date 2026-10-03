import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ProjectSchema } from '../lib/validators/project';
import { Project } from '../lib/models/Project';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

async function ingestProjects() {
  await mongoose.connect(MONGODB_URI!);
  console.log('Connected to DB');

  const dataDir = path.resolve(__dirname, '../data/verified-projects');
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
    const data = JSON.parse(content);
    
    // Validate with Zod
    const validatedData = ProjectSchema.parse(data);

    // Upsert project
    const result = await Project.updateOne(
      { slug: validatedData.slug },
      { $set: validatedData },
      { upsert: true }
    );

    console.log(`Ingested: ${validatedData.slug} - Modified/Upserted: ${result.modifiedCount}/${result.upsertedCount}`);
  }

  const count = await Project.countDocuments();
  console.log(`Total projects in DB: ${count}`);

  await mongoose.disconnect();
}

ingestProjects().catch((err) => {
  console.error(err);
  process.exit(1);
});
