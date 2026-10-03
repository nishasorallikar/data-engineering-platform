'use client';

import { m } from 'framer-motion';

const DOMAINS = [
  { num: '01', title: 'Foundations & Architecture', tags: ['OLTP/OLAP', 'Lakehouse', 'Batch/Stream'] },
  { num: '02', title: 'SQL', tags: ['JOINs', 'Window Functions', 'CTEs', 'Optimization'] },
  { num: '03', title: 'Data Modeling', tags: ['Star Schema', 'Facts/Dims', 'SCD', 'Grain'] },
  { num: '04', title: 'Pipelines & Orchestration', tags: ['Idempotency', 'CDC', 'DAGs', 'Data Quality'] },
  { num: '05', title: 'Big Data & Spark', tags: ['Architecture', 'RDD/DF', 'Shuffle', 'Skew'] },
  { num: '06', title: 'Streaming & Messaging', tags: ['Kafka', 'Offsets', 'Semantics', 'Watermarks'] },
  { num: '07', title: 'Distributed Systems', tags: ['CAP Theorem', 'Sharding', 'System Design'] },
];

export function LearningDomains() {
  return (
    <section className="w-full py-16 md:py-24 px-6">
      <div className="container mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">What You Will Learn</h2>
          <p className="text-zinc-400 text-lg">7 distinct modules covering the entire Data Engineering landscape.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-6xl">
          {DOMAINS.map((domain, i) => (
            <m.div 
              key={domain.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-colors p-6 rounded-2xl flex flex-col h-full group"
            >
              <div className="text-zinc-600 font-mono text-sm font-bold mb-4 group-hover:text-blue-500 transition-colors">Module {domain.num}</div>
              <h3 className="text-xl font-bold text-zinc-200 mb-6 flex-1">{domain.title}</h3>
              
              <div className="flex flex-wrap gap-2">
                {domain.tags.map(tag => (
                  <span key={tag} className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-mono px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </m.div>
          ))}
          
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 7 * 0.1 }}
            className="bg-blue-950/20 border border-blue-900/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center h-full group"
          >
            <div className="text-blue-400 font-bold mb-2">Ready to start?</div>
            <div className="text-zinc-400 text-sm mb-4">Jump straight into the Fundamental 50.</div>
          </m.div>
        </div>

      </div>
    </section>
  );
}
