'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { FolderTree, Hash } from 'lucide-react';

const CONCEPTS = [
  { 
    id: 'partitioning', 
    label: 'Partitioning (Folders)', 
    icon: FolderTree, 
    desc: 'Physically splits data into directories based on a column (e.g. date=2024-01-01). Great for low cardinality.', 
    highlight: 'blue'
  },
  { 
    id: 'bucketing', 
    label: 'Bucketing (Hash files)', 
    icon: Hash, 
    desc: 'Splits data into a fixed number of files based on a hash of a column (e.g. user_id). Great for high cardinality + joins.', 
    highlight: 'emerald'
  }
] as const;

export function InteractivePartitioning() {
  const [activeType, setActiveType] = useState<string>('partitioning');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveType(current => {
        const currentIndex = CONCEPTS.findIndex(c => c.id === current);
        return CONCEPTS[(currentIndex + 1) % CONCEPTS.length].id;
      });
    }, 6000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = CONCEPTS.find(c => c.id === activeType)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full">
        {CONCEPTS.map((concept) => (
          <button
            key={concept.id}
            onClick={() => {
              setUserInteracted(true);
              setActiveType(concept.id);
            }}
            className={`flex-1 min-w-[200px] px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative ${
              activeType === concept.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {activeType === concept.id && (
              <motion.div
                layoutId="active-type-bg-partitioning"
                className={`absolute inset-0 rounded-xl -z-10 ${concept.highlight === 'emerald' ? 'bg-emerald-600' : 'bg-blue-600'}`}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              <concept.icon className="w-4 h-4" />
              {concept.label}
            </span>
          </button>
        ))}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-12 md:h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[350px] overflow-hidden">
        <AnimatePresence mode="wait">
          <StrategyState key={activeType} type={activeType} reduceMotion={shouldReduceMotion} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function StrategyState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  
  if (type === 'partitioning') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6 font-mono w-full h-full">
        <div className="flex flex-col gap-4 w-full max-w-lg items-center">
          
          <div className="bg-zinc-900 border border-zinc-700 w-full rounded-xl p-4">
            <div className="text-blue-400 font-bold mb-2 flex items-center gap-2"><FolderTree className="w-4 h-4"/> Partition by `date`</div>
            
            <div className="flex flex-col gap-2 pl-4 border-l border-zinc-700 ml-2">
              <div className="flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-zinc-500" />
                <span className="text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded">date=2024-01-01/</span>
                <span className="text-[10px] text-zinc-500">part-001.parquet</span>
              </div>
              <motion.div initial={{ backgroundColor: 'transparent' }} animate={{ backgroundColor: 'rgba(59,130,246,0.2)' }} transition={{ delay: 1 }} className="flex items-center gap-2 rounded border border-blue-900/50 p-1 -ml-1">
                <FolderTree className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 font-bold bg-blue-900/50 px-2 py-0.5 rounded">date=2024-01-02/</span>
                <span className="text-[10px] text-blue-400">part-001.parquet</span>
              </motion.div>
              <div className="flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-zinc-500" />
                <span className="text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded">date=2024-01-03/</span>
                <span className="text-[10px] text-zinc-500">part-001.parquet</span>
              </div>
            </div>
          </div>
          
          <div className="w-full bg-zinc-900 p-3 rounded-lg border border-zinc-700 text-zinc-400">
            <span className="text-blue-400">Query:</span> <br/>
            SELECT * FROM sales WHERE date = '2024-01-02'
          </div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-blue-400 text-center font-bold bg-blue-950/50 border border-blue-900 p-2 rounded w-full">
            Partition Pruning: Spark skips reading folders 01 and 03 completely! Disk I/O minimized.
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6 font-mono w-full h-full">
        <div className="flex flex-col gap-4 w-full max-w-lg items-center">
          
          <div className="bg-zinc-900 border border-zinc-700 w-full rounded-xl p-4">
            <div className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><Hash className="w-4 h-4"/> Bucket by `user_id` into 4 buckets</div>
            
            <div className="flex gap-2 justify-between">
              {[0, 1, 2, 3].map(b => (
                <div key={b} className="flex flex-col items-center bg-zinc-950 border border-zinc-800 rounded p-2 w-24">
                  <div className="text-[10px] text-zinc-500 mb-1">Bucket {b}</div>
                  <Hash className="w-6 h-6 text-emerald-500 mb-2" />
                  <div className="text-[8px] text-zinc-400 flex flex-col gap-1 w-full">
                    {/* Simulated hash distribution */}
                    <span className="bg-zinc-800 p-0.5 text-center">user_{b*2+1}</span>
                    <span className="bg-zinc-800 p-0.5 text-center">user_{b*3+7}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full bg-zinc-900 p-3 rounded-lg border border-zinc-700 text-zinc-400">
            <span className="text-emerald-400">Query:</span> <br/>
            SELECT * FROM sales JOIN users ON sales.user_id = users.user_id
          </div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-emerald-400 text-center font-bold bg-emerald-950/50 border border-emerald-900 p-2 rounded w-full">
            Bucket Join: If BOTH tables are bucketed into 4 buckets by user_id, Spark can join them bucket-to-bucket with ZERO shuffle!
          </motion.div>
        </div>
      </motion.div>
  );
}
