export type ArchitectureId = 'data-lake' | 'data-warehouse' | 'lakehouse';

export interface ArchitectureConfig {
  id: ArchitectureId;
  title: string;
  subtitle: string;
  shortDesc: string;
  schema: string;
  cost: string;
  computeStorage: string;
  technologies: string;
  pros: string[];
  cons: string[];
  details: string;
}

export const Q4_ARCHITECTURES: ArchitectureConfig[] = [
  {
    id: 'data-warehouse',
    title: 'Data Warehouse',
    subtitle: 'The traditional analytical powerhouse',
    shortDesc: 'A strictly governed, relational system optimized for structured data and business intelligence.',
    schema: 'Schema-on-Write (Must define schema before inserting)',
    cost: 'Highest per TB (Compute & Storage often tightly coupled, though decoupling is standard in modern ones)',
    computeStorage: 'Tightly coupled in legacy; Logically decoupled but financially coupled in modern cloud DWs.',
    technologies: 'Snowflake, Google BigQuery, Amazon Redshift, Teradata',
    pros: [
      'Incredible performance for complex JOINs and aggregations',
      'Out-of-the-box ACID transactions and data governance',
      'Seamless integration with BI tools (Tableau, Looker)'
    ],
    cons: [
      'Cannot natively process unstructured data (images, video, raw text)',
      'High storage costs force companies to keep only curated data',
      'Vendor lock-in with proprietary storage formats'
    ],
    details: 'A Data Warehouse requires you to ETL data into its proprietary tables. It acts as the single source of truth for business reporting. However, because you pay a premium for storage inside the DW, companies historically had to discard raw data.'
  },
  {
    id: 'data-lake',
    title: 'Data Lake',
    subtitle: 'The infinite raw data dumping ground',
    shortDesc: 'A centralized repository that allows you to store all your structured and unstructured data at any scale.',
    schema: 'Schema-on-Read (Dump files now, figure out the schema when querying)',
    cost: 'Cheapest per TB ($0.023/GB on S3 Standard)',
    computeStorage: 'Storage is completely independent. Compute must be brought to the data (e.g., EMR, Dataproc, Athena).',
    technologies: 'Amazon S3, Azure Data Lake Storage (ADLS Gen2), Google Cloud Storage',
    pros: [
      'Infinitely scalable and incredibly cheap',
      'Supports machine learning models natively (Python, Pandas, PyTorch)',
      'Stores any file type (Parquet, CSV, JSON, JPEG, MP4)'
    ],
    cons: [
      'No ACID transactions (if a job fails halfway, you have corrupted partial files)',
      'No time-travel or easy row-level UPDATEs/DELETEs',
      'Easily degrades into a "Data Swamp" without extreme governance'
    ],
    details: 'A Data Lake is fundamentally just object storage in the cloud. You are responsible for organizing the files into directories (e.g., s3://bucket/year/month/day/). Because it lacks transactions, dealing with GDPR (deleting a single user record) requires rewriting massive files entirely.'
  },
  {
    id: 'lakehouse',
    title: 'Data Lakehouse',
    subtitle: 'The best of both worlds',
    shortDesc: 'An open architecture that combines the cheap storage of a data lake with the data management features of a warehouse.',
    schema: 'Enforced schema with evolution support',
    cost: 'Moderate (Storage is cheap S3, Compute is spun up only when needed)',
    computeStorage: 'Completely decoupled. Data lives in your S3 bucket in an open format, compute engines (Spark, Trino) query it.',
    technologies: 'Delta Lake, Apache Iceberg, Apache Hudi',
    pros: [
      'Provides ACID transactions directly on top of S3 object storage',
      'Supports Time-Travel, UPSERTS (MERGE), and row-level DELETEs',
      'No vendor lock-in: Data is stored in open Parquet files + metadata logs'
    ],
    cons: [
      'Requires managing compute engines separately (though serverless options exist)',
      'Can be complex to set up compaction, vacuuming, and metadata management',
      'BI tool performance can sometimes lag behind a dedicated warehouse'
    ],
    details: 'A Lakehouse uses an "Open Table Format" (like Delta or Iceberg). It consists of standard Parquet files alongside a transactional metadata log (e.g., _delta_log/). When an engine queries the Lakehouse, it reads the log to know exactly which Parquet files represent the most recent, committed state of the table. This allows warehouses and data lakes to merge into one.'
  }
];
