export type DimensionId = 'purpose' | 'organization' | 'query' | 'anti-pattern';

export interface ComparisonDimension {
  id: DimensionId;
  label: string;
  oltpText: string;
  olapText: string;
}

export const Q3_DIMENSIONS: ComparisonDimension[] = [
  {
    id: 'purpose',
    label: 'Purpose',
    oltpText: 'Handles the transactions that run a business.',
    olapText: 'Handles the analytics that measure it.'
  },
  {
    id: 'organization',
    label: 'Data Organization',
    oltpText: 'Row-oriented — a whole record sits together.',
    olapText: 'Column-oriented — values of one column sit together.'
  },
  {
    id: 'query',
    label: 'Query Pattern',
    oltpText: 'Writing or fetching one order is one seek.',
    olapText: 'Scanning one column of a billion rows reads far less data and compresses far better.'
  },
  {
    id: 'anti-pattern',
    label: 'Anti-Pattern',
    oltpText: 'Running analytics here is the classic mistake: long scans lock rows and starve the application.',
    olapText: 'Not meant for high-throughput single-row inserts or updates.'
  }
];
