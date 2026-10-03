import 'dotenv/config';
import connectToDatabase from '../../lib/db/mongodb';
import { Question } from '../../lib/models/Question';

const q6Data = {
  id: 'fundamental-q6',
  title: 'What is a data mart, and when would you build one?',
  category: 'Foundations & Architecture',
  number: 6,
  difficulty: 'Beginner',
  answer: 'A Data Mart is a subset of a Data Warehouse designed for a specific business line or team (e.g., Sales, Finance, Marketing). While a Data Warehouse holds enterprise-wide data, a Data Mart provides a focused, highly optimized view for a particular group of users.',
  explanation: `
## Why build a Data Mart?
- **Performance:** Queries run faster because the dataset is smaller and modeled specifically for the team's access patterns.
- **Security:** Easier to restrict access. The Marketing team only sees the Marketing Data Mart, not the HR data.
- **Simplicity:** Business users don't have to navigate hundreds of irrelevant tables to find what they need.
- **Cost Control:** By isolating a team's compute on a smaller subset of data, you can prevent one team's massive queries from slowing down the entire warehouse.

## Types of Data Marts
1. **Dependent Data Mart:** Built on top of an existing Enterprise Data Warehouse (EDW). Data flows Source -> EDW -> Data Mart. (Best Practice)
2. **Independent Data Mart:** Built directly from sources, bypassing a central warehouse. (Often leads to data silos and conflicting definitions).
3. **Hybrid Data Mart:** Combines data from an EDW with external/temporary operational data.
`,
  interviewerAngle: 'The interviewer wants to see if you understand data organization and serving strategies. You should mention that modern cloud data warehouses (like Snowflake or BigQuery) often replace physical data marts with logical data marts (using Views and Role-Based Access Control) because storage and compute scale so easily.'
};

async function importQ6() {
  console.log('Importing Q6...');
  await connectToDatabase();
  await Question.findOneAndUpdate({ id: q6Data.id }, q6Data, { upsert: true, returnDocument: 'after' });
  console.log('Q6 imported successfully!');
  process.exit(0);
}

importQ6().catch(console.error);
