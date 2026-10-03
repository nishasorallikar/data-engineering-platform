'use client';

import { m } from 'framer-motion';
import { Database, Server, Smartphone, LineChart, Code2, Layers, Cpu, CheckCircle2 } from 'lucide-react';

const STAGES = [
  { num: '01', title: 'Foundations', icon: Layers, tech: 'ETL, OLAP, Lakehouse' },
  { num: '02', title: 'SQL', icon: Database, tech: 'JOINs, Windows, CTEs' },
  { num: '03', title: 'Data Modeling', icon: Code2, tech: 'Star Schema, SCD' },
  { num: '04', title: 'Pipelines', icon: Cpu, tech: 'DAGs, CDC, Idempotency' },
  { num: '05', title: 'Spark', icon: Server, tech: 'RDD, Shuffle, Partitioning' },
  { num: '06', title: 'Streaming', icon: Smartphone, tech: 'Kafka, Watermarks' },
  { num: '07', title: 'Distributed Systems', icon: LineChart, tech: 'CAP, Sharding' },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="w-full py-16 md:py-24 px-6 border-t border-zinc-900 scroll-mt-24">
      <div className="container mx-auto flex flex-col items-center">
        
        <div className="text-center mb-24 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Learning Roadmap</h2>
          <p className="text-zinc-400 text-lg">A structured path from basics to advanced system design.</p>
        </div>

        <div className="w-full max-w-3xl flex flex-col relative">
          
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-zinc-800" />

          {STAGES.map((stage, i) => {
            const isEven = i % 2 === 0;
            return (
              <m.div 
                key={stage.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className={`relative flex items-center mb-16 last:mb-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                
                {/* Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-zinc-700 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                  <div className="w-2 h-2 rounded-full bg-zinc-600" />
                </div>

                {/* Content */}
                <div className={`ml-20 md:ml-0 w-full md:w-1/2 flex flex-col ${isEven ? 'md:pr-16 md:text-right md:items-end' : 'md:pl-16 md:text-left md:items-start'}`}>
                  <div className="text-zinc-500 font-mono text-xs font-bold mb-2">STAGE {stage.num}</div>
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl w-full hover:border-zinc-700 transition-colors flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center shrink-0">
                      <stage.icon className="w-6 h-6 text-zinc-400" />
                    </div>
                    <div className="flex flex-col text-left">
                      <h3 className="font-bold text-zinc-200">{stage.title}</h3>
                      <p className="text-xs text-zinc-500 mt-1">{stage.tech}</p>
                    </div>
                  </div>
                </div>

              </m.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
