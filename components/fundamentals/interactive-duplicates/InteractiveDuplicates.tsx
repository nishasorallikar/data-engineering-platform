'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Database, Filter, Trash2 } from 'lucide-react';

const STAGES = [
  { id: 'raw', label: '1. Raw Data', desc: 'Table with duplicates', sql: 'SELECT id, email, updated_at\nFROM users;' },
  { id: 'number', label: '2. Number Copies', desc: 'ROW_NUMBER() to identify the latest', sql: 'SELECT id, email, updated_at,\n  ROW_NUMBER() OVER (\n    PARTITION BY email \n    ORDER BY updated_at DESC\n  ) as rn\nFROM users;' },
  { id: 'dedupe', label: '3. Deduplicate', desc: 'Keep only rn = 1', sql: 'WITH Numbered AS (\n  SELECT id, email, updated_at,\n    ROW_NUMBER() OVER (PARTITION BY email ORDER BY updated_at DESC) as rn\n  FROM users\n)\nSELECT id, email, updated_at\nFROM Numbered\nWHERE rn = 1;' }
] as const;

const RAW_DATA = [
  { id: 1, email: 'alice@x.com', updated: '2024-01-01' },
  { id: 2, email: 'alice@x.com', updated: '2024-02-15' }, // Latest Alice
  { id: 3, email: 'bob@y.com', updated: '2024-01-10' },
  { id: 4, email: 'bob@y.com', updated: '2024-01-05' }, // Old Bob
];

export function InteractiveDuplicates() {
  const [activeStage, setActiveStage] = useState<string>('raw');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveStage(current => {
        const currentIndex = STAGES.findIndex(s => s.id === current);
        return STAGES[(currentIndex + 1) % STAGES.length].id;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = STAGES.find(s => s.id === activeStage)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      {/* Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl">
        {STAGES.map((stage) => (
          <button
            key={stage.id}
            onClick={() => {
              setUserInteracted(true);
              setActiveStage(stage.id);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 relative ${
              activeStage === stage.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {activeStage === stage.id && (
              <motion.div
                layoutId="active-stage-bg"
                className="absolute inset-0 bg-red-600 rounded-xl -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {stage.label}
            </span>
          </button>
        ))}
      </div>

      <div className="text-sm font-mono text-red-400 h-8">{activeData.desc}</div>

      {/* SQL Codeblock */}
      <div className="w-full max-w-2xl bg-[#1E1E1E] rounded-xl overflow-hidden border border-zinc-700 shadow-xl relative min-h-[160px]">
        <div className="flex items-center px-4 py-2 bg-[#2D2D2D] border-b border-zinc-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="ml-4 text-xs font-mono text-zinc-400">dedupe.sql</span>
        </div>
        <div className="p-4 font-mono text-sm leading-relaxed overflow-x-auto text-[#D4D4D4]">
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeStage}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <code>
                {activeData.sql.split('\n').map((line, i) => {
                  const highlighted = line
                    .replace(/(SELECT|FROM|OVER|PARTITION BY|ORDER BY|DESC|AS|WITH|WHERE)/g, '<span class="text-[#569CD6] font-bold">$1</span>')
                    .replace(/(ROW_NUMBER)/g, '<span class="text-[#DCDCAA]">$1</span>')
                    .replace(/(users|Numbered)/g, '<span class="text-[#4EC9B0]">$1</span>')
                    .replace(/(id|email|updated_at|rn)/g, '<span class="text-[#9CDCFE]">$1</span>');
                  return <div key={i} dangerouslySetInnerHTML={{ __html: highlighted }} />;
                })}
              </code>
            </motion.pre>
          </AnimatePresence>
        </div>
      </div>

      {/* Visualizer */}
      <div className="w-full max-w-2xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative">
        <div className="flex bg-zinc-800 p-3 font-bold text-zinc-400 text-sm font-mono border-b border-zinc-700 rounded-t-xl">
          <div className="w-1/4">ID</div>
          <div className="w-1/4 text-center">Email</div>
          <div className="w-1/4 text-center">Updated</div>
          <div className="w-1/4 text-right text-red-400">rn</div>
        </div>
        
        <div className="relative font-mono text-sm min-h-[250px]">
          <AnimatePresence mode="wait">
            <ExecutionState key={activeStage} stage={activeStage} reduceMotion={shouldReduceMotion} />
          </AnimatePresence>
        </div>
      </div>
      
    </div>
  );
}

function ExecutionState({ stage, reduceMotion }: { stage: string, reduceMotion: boolean | null }) {
  let displayContent;

  switch(stage) {
    case 'raw':
      displayContent = (
        <div className="w-full flex flex-col">
          {RAW_DATA.map((row, i) => (
            <motion.div
              key={i}
              initial={reduceMotion ? { opacity: 1 } : { x: -10, opacity: 0 }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0, opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : i * 0.1, duration: 0.3 }}
              className="flex p-4 border-b border-zinc-900/50 items-center"
            >
              <div className="w-1/4 text-zinc-300 font-bold">{row.id}</div>
              <div className="w-1/4 text-center text-blue-400">{row.email}</div>
              <div className="w-1/4 text-center text-zinc-400">{row.updated}</div>
              <div className="w-1/4 text-right font-bold text-zinc-600">-</div>
            </motion.div>
          ))}
        </div>
      );
      break;
    case 'number':
      displayContent = (
        <div className="w-full flex flex-col gap-4 py-2">
          {/* Alice Partition */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-blue-900/10 border border-blue-900/50 rounded-xl overflow-hidden">
            <div className="bg-blue-950/50 p-2 text-xs font-bold text-blue-400 uppercase text-center border-b border-blue-900/50">PARTITION: alice@x.com</div>
            {RAW_DATA.filter(r => r.email === 'alice@x.com').sort((a,b) => b.updated.localeCompare(a.updated)).map((row, i) => (
              <div key={row.id} className="flex p-3 border-b border-blue-900/30 items-center">
                <div className="w-1/4 text-zinc-300 font-bold">{row.id}</div>
                <div className="w-1/4 text-center text-zinc-500 line-clamp-1">{row.email}</div>
                <div className="w-1/4 text-center text-emerald-400 font-bold">{row.updated}</div>
                <div className="w-1/4 flex justify-end">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.1 }}
                    className="w-6 h-6 rounded bg-red-600 flex items-center justify-center text-white font-bold"
                  >
                    {i + 1}
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Bob Partition */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-orange-900/10 border border-orange-900/50 rounded-xl overflow-hidden">
            <div className="bg-orange-950/50 p-2 text-xs font-bold text-orange-400 uppercase text-center border-b border-orange-900/50">PARTITION: bob@y.com</div>
            {RAW_DATA.filter(r => r.email === 'bob@y.com').sort((a,b) => b.updated.localeCompare(a.updated)).map((row, i) => (
              <div key={row.id} className="flex p-3 border-b border-orange-900/30 items-center">
                <div className="w-1/4 text-zinc-300 font-bold">{row.id}</div>
                <div className="w-1/4 text-center text-zinc-500 line-clamp-1">{row.email}</div>
                <div className="w-1/4 text-center text-emerald-400 font-bold">{row.updated}</div>
                <div className="w-1/4 flex justify-end">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + i * 0.1 }}
                    className="w-6 h-6 rounded bg-red-600 flex items-center justify-center text-white font-bold"
                  >
                    {i + 1}
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      );
      break;
    case 'dedupe':
      displayContent = (
        <div className="w-full flex flex-col gap-2 py-2">
          {/* All Rows but conditionally faded */}
          {RAW_DATA.map((row, i) => {
            const isKept = (row.id === 2 || row.id === 3); // 2 is latest Alice, 3 is latest Bob
            const rn = isKept ? 1 : 2;

            return (
              <motion.div
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: isKept ? 1 : 0.2 }}
                className={`flex p-4 rounded-xl border items-center transition-all duration-500 ${isKept ? 'bg-emerald-900/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'bg-red-900/10 border-red-900/50 line-through'}`}
              >
                <div className="w-1/4 text-zinc-300 font-bold">{row.id}</div>
                <div className="w-1/4 text-center text-blue-400">{row.email}</div>
                <div className="w-1/4 text-center text-zinc-300">{row.updated}</div>
                <div className="w-1/4 flex justify-end">
                  <div className={`w-6 h-6 rounded flex items-center justify-center font-bold ${isKept ? 'bg-emerald-600 text-white' : 'bg-red-800 text-red-300'}`}>
                    {rn}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      );
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col w-full"
    >
      {displayContent}
    </motion.div>
  );
}
