'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Database, Filter, Crown } from 'lucide-react';

const STAGES = [
  { id: 'raw', label: '1. Raw Data', sql: 'SELECT name, dept, salary\nFROM employees;' },
  { id: 'partition', label: '2. Partition & Rank', sql: 'SELECT name, dept, salary,\n  DENSE_RANK() OVER (\n    PARTITION BY dept\n    ORDER BY salary DESC\n  ) as rnk\nFROM employees;' },
  { id: 'filter', label: '3. Filter rnk = 2', sql: 'WITH Ranked AS (\n  SELECT name, dept, salary,\n    DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) as rnk\n  FROM employees\n)\nSELECT name, dept, salary\nFROM Ranked\nWHERE rnk = 2;' }
] as const;

const RAW_DATA = [
  { id: 1, name: 'Alice', dept: 'IT', salary: 100 },
  { id: 2, name: 'Bob', dept: 'IT', salary: 100 }, // Tied for 1st
  { id: 3, name: 'Charlie', dept: 'IT', salary: 90 }, // 2nd highest
  { id: 4, name: 'Dave', dept: 'HR', salary: 80 },
  { id: 5, name: 'Eve', dept: 'HR', salary: 70 }, // 2nd highest
];

export function InteractiveSecondHighest() {
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
        {STAGES.map((stage, idx) => (
          <button
            key={stage.id}
            onClick={() => {
              setUserInteracted(true);
              setActiveStage(stage.id);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-bold font-mono transition-all duration-300 relative ${
              activeStage === stage.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {activeStage === stage.id && (
              <motion.div
                layoutId="active-stage-bg"
                className="absolute inset-0 bg-emerald-600 rounded-xl -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {stage.label}
            </span>
          </button>
        ))}
      </div>

      {/* SQL Codeblock */}
      <div className="w-full max-w-2xl bg-[#1E1E1E] rounded-xl overflow-hidden border border-zinc-700 shadow-xl relative min-h-[160px]">
        <div className="flex items-center px-4 py-2 bg-[#2D2D2D] border-b border-zinc-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="ml-4 text-xs font-mono text-zinc-400">query.sql</span>
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
                    .replace(/(DENSE_RANK)/g, '<span class="text-[#DCDCAA]">$1</span>')
                    .replace(/(employees|Ranked)/g, '<span class="text-[#4EC9B0]">$1</span>')
                    .replace(/(name|dept|salary|rnk)/g, '<span class="text-[#9CDCFE]">$1</span>');
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
          <div className="w-1/4">Name</div>
          <div className="w-1/4 text-center">Dept</div>
          <div className="w-1/4 text-center">Salary</div>
          <div className="w-1/4 text-right text-emerald-400">rnk</div>
        </div>
        
        <div className="relative font-mono text-sm min-h-[300px]">
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
              <div className="w-1/4 text-zinc-300 font-bold">{row.name}</div>
              <div className="w-1/4 text-center text-zinc-500">{row.dept}</div>
              <div className="w-1/4 text-center text-emerald-400 font-bold">${row.salary}</div>
              <div className="w-1/4 text-right font-bold text-zinc-600">-</div>
            </motion.div>
          ))}
        </div>
      );
      break;
    case 'partition':
      displayContent = (
        <div className="w-full flex flex-col gap-4 py-2">
          {/* IT Partition */}
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-indigo-900/10 border border-indigo-900/50 rounded-xl overflow-hidden">
            <div className="bg-indigo-950/50 p-2 text-xs font-bold text-indigo-400 uppercase text-center border-b border-indigo-900/50">PARTITION: IT</div>
            {RAW_DATA.filter(r => r.dept === 'IT').map((row, i) => (
              <div key={i} className="flex p-3 border-b border-indigo-900/30 items-center">
                <div className="w-1/4 text-zinc-300 font-bold">{row.name}</div>
                <div className="w-1/4 text-center text-indigo-300">{row.dept}</div>
                <div className="w-1/4 text-center text-emerald-400 font-bold">${row.salary}</div>
                <div className="w-1/4 flex justify-end">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.1 }}
                    className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center text-white font-bold"
                  >
                    {row.salary === 100 ? 1 : 2}
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* HR Partition */}
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-orange-900/10 border border-orange-900/50 rounded-xl overflow-hidden">
            <div className="bg-orange-950/50 p-2 text-xs font-bold text-orange-400 uppercase text-center border-b border-orange-900/50">PARTITION: HR</div>
            {RAW_DATA.filter(r => r.dept === 'HR').map((row, i) => (
              <div key={i} className="flex p-3 border-b border-orange-900/30 items-center">
                <div className="w-1/4 text-zinc-300 font-bold">{row.name}</div>
                <div className="w-1/4 text-center text-orange-300">{row.dept}</div>
                <div className="w-1/4 text-center text-emerald-400 font-bold">${row.salary}</div>
                <div className="w-1/4 flex justify-end">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + i * 0.1 }}
                    className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center text-white font-bold"
                  >
                    {row.salary === 80 ? 1 : 2}
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      );
      break;
    case 'filter':
      displayContent = (
        <div className="w-full flex flex-col gap-2 py-2">
           <div className="text-xs font-mono text-emerald-400 text-center mb-2 font-bold bg-emerald-950/50 p-2 rounded-lg border border-emerald-900/50">
            WHERE rnk = 2
          </div>
          {/* IT Partition */}
          {RAW_DATA.map((row, i) => {
            const rnk = row.dept === 'IT' ? (row.salary === 100 ? 1 : 2) : (row.salary === 80 ? 1 : 2);
            const isKept = rnk === 2;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: isKept ? 1 : 0.2 }}
                className={`flex p-4 rounded-xl border items-center transition-all duration-500 ${isKept ? 'bg-emerald-900/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'bg-red-900/10 border-red-900/50 line-through'}`}
              >
                <div className="w-1/4 text-zinc-300 font-bold flex items-center gap-2">
                  {isKept && <Crown className="w-4 h-4 text-yellow-500" />} {row.name}
                </div>
                <div className="w-1/4 text-center text-zinc-400">{row.dept}</div>
                <div className="w-1/4 text-center text-emerald-400 font-bold">${row.salary}</div>
                <div className="w-1/4 flex justify-end">
                  <div className={`w-6 h-6 rounded flex items-center justify-center font-bold ${isKept ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                    {rnk}
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
