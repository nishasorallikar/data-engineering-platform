require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const QuestionSchema = new mongoose.Schema({
  questionNumber: Number,
  section: String,
}, { collection: 'questions_v2' });

const Question = mongoose.model('Question', QuestionSchema);

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const updates = [
    { range: [1, 7], section: 'Foundations & Architecture' },
    { range: [8, 16], section: 'SQL' },
    { range: [17, 25], section: 'Data Modelling & Warehousing' },
    { range: [26, 34], section: 'Pipelines, ETL & Orchestration' },
    { range: [35, 43], section: 'Big Data & Spark' },
    { range: [44, 47], section: 'Streaming & Messaging' },
    { range: [48, 50], section: 'Distributed Systems & Design' }
  ];

  for (const update of updates) {
    const result = await Question.updateMany(
      { questionNumber: { $gte: update.range[0], $lte: update.range[1] } },
      { $set: { section: update.section } }
    );
    console.log(`Updated ${result.modifiedCount} documents to section "${update.section}"`);
  }

  await mongoose.disconnect();
  console.log('Done');
}

run().catch(console.error);
