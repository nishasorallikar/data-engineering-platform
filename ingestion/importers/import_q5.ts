import 'dotenv/config';
import connectToDatabase from '../../lib/db/mongodb';
import { Question } from '../../lib/models/Question';

const q5Data = {
  id: 'fundamental-q5',
  title: 'How do you handle structured, semi-structured and unstructured data?',
  category: 'Foundations & Architecture',
  number: 5,
  difficulty: 'Beginner',
  answer: 'Data comes in three primary shapes. Structured data fits neatly into rows and columns (like a SQL table). Semi-structured data has tags or markers to separate semantic elements and enforce hierarchies of records and fields within the data (like JSON or XML). Unstructured data has no predefined data model (like images, audio, video, or raw text blocks).',
  explanation: `
## Structured Data
- **Characteristics:** Highly organized, predefined schema, typically fits into a relational database (RDBMS).
- **Processing:** Easy to search and analyze using SQL.
- **Storage:** Data Warehouses (e.g., Snowflake, Redshift), Relational Databases (e.g., PostgreSQL, MySQL).

## Semi-Structured Data
- **Characteristics:** Does not conform to a rigid relational schema but contains tags or key-value pairs that make it easier to analyze than raw unstructured data.
- **Processing:** Handled using NoSQL databases or data warehouses that support semi-structured types (like VARIANT in Snowflake).
- **Storage:** MongoDB, Elasticsearch, or modern Data Warehouses/Data Lakes.

## Unstructured Data
- **Characteristics:** No predefined format. Makes up the vast majority of real-world data (estimated at 80-90%).
- **Processing:** Requires advanced techniques like Natural Language Processing (NLP), Computer Vision, or Machine Learning to extract value.
- **Storage:** Data Lakes (e.g., Amazon S3, Google Cloud Storage, Azure Data Lake).
`,
  interviewerAngle: 'The interviewer is testing your understanding of the different types of data you will encounter as a Data Engineer. They want to ensure you know that you cannot just dump a JSON file into a strict Postgres table without handling it, and that you understand the role of Data Lakes for unstructured data.'
};

async function importQ5() {
  console.log('Importing Q5...');
  await connectToDatabase();
  await Question.findOneAndUpdate({ id: q5Data.id }, q5Data, { upsert: true, new: true });
  console.log('Q5 imported successfully!');
  process.exit(0);
}

importQ5().catch(console.error);
