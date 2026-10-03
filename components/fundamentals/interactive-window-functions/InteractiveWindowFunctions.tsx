'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Trophy, Hash, Layers } from 'lucide-react';

type WindowType = 'row_number' | 'rank' | 'dense_rank';

const WINDOW_TYPES = [
  { id: 'row_number', label: 'ROW_NUMBER()', icon: Hash, desc: 'Assigns a unique, sequential integer to each row.', sql: 'SELECT name, score,\n  ROW_NUMBER() OVER (ORDER BY score DESC) as rn\nFROM players;' },
  { id: 'rank', label: 'RANK()', icon: Trophy, desc: 'Ties get the same rank, leaving gaps in the sequence.', sql: 'SELECT name, score,\n  RANK() OVER (ORDER BY score DESC) as rnk\nFROM players;' },
  { id: 'dense_rank', label: 'DENSE_RANK()', icon: Layers, desc: 'Ties get the same rank, but without leaving gaps.', sql: 'SELECT name, score,\n  DENSE_RANK() OVER (ORDER BY score DESC) as drnk\nFROM players;' }
] as const;

const RAW_DATA = [
  { id: 1, name: 'Alice', score: 100 },
  { id: 2, name: 'Bob', score: 100 },
  { id: 3, name: 'Charlie', score: 90 },
  { id: 4, name: 'Dave', score: 80 }
];

export function InteractiveWindowFunctions() {
  const [activeFunc, setActiveFunc] = useState<WindowType>('row_number');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  // Always-On Auto-Rotation Logic
  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveFunc(current => {
        const currentIndex = WINDOW_TYPES.findIndex(w => w.id === current);
        return WINDOW_TYPES[(currentIndex + 1) % WINDOW_TYPES.length].id as WindowType;
      });
    }, 4000); // 4-second cycle

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = WINDOW_TYPES.find(w => w.id === activeFunc)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      {/* Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl">
        {WINDOW_TYPES.map(func => (
          <button
            key={func.id}
            onClick={() => {
              setUserInteracted(true);
              setActiveFunc(func.id as WindowType);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-bold font-mono transition-all duration-300 relative ${
              activeFunc === func.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {activeFunc === func.id && (
              <motion.div
                layoutId="active-func-bg"
                className="absolute inset-0 bg-indigo-600 rounded-xl -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <func.icon className="w-4 h-4" />
              {func.label}
            </span>
          </button>
        ))}
      </div>

      <div className="text-sm font-mono text-indigo-400 h-8">{activeData.desc}</div>

      {/* SQL Codeblock */}
      <div className="w-full max-w-2xl bg-[#1E1E1E] rounded-xl overflow-hidden border border-zinc-700 shadow-xl relative">
        <div className="flex items-center px-4 py-2 bg-[#2D2D2D] border-b border-zinc-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="ml-4 text-xs font-mono text-zinc-400">query.sql</span>
        </div>
        <div className="p-4 font-mono text-sm leading-relaxed overflow-x-auto text-[#D4D4D4] min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeFunc}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <code>
                {activeData.sql.split('\n').map((line, i) => {
                  const highlighted = line
                    .replace(/(SELECT|FROM|OVER|ORDER BY|DESC|AS)/g, '<span class="text-[#569CD6] font-bold">$1</span>')
                    .replace(/(ROW_NUMBER|RANK|DENSE_RANK)/g, '<span class="text-[#DCDCAA]">$1</span>')
                    .replace(/(players)/g, '<span class="text-[#4EC9B0]">$1</span>')
                    .replace(/(name|score|rn|rnk|drnk)/g, '<span class="text-[#9CDCFE]">$1</span>');
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
          <div className="w-1/3">Name</div>
          <div className="w-1/3 text-center">Score</div>
          <div className="w-1/3 text-right text-indigo-400">Result</div>
        </div>
        
        <div className="relative font-mono text-sm">
          <AnimatePresence mode="wait">
            <WindowResult key={activeFunc} type={activeFunc} reduceMotion={shouldReduceMotion} />
          </AnimatePresence>
        </div>
      </div>
      
    </div>
  );
}

function WindowResult({ type, reduceMotion }: { type: WindowType, reduceMotion: boolean | null }) {
  // Compute results
  let results = [];
  switch(type) {
    case 'row_number':
      results = [1, 2, 3, 4];
      break;
    case 'rank':
      results = [1, 1, 3, 4]; // tied 1s, skips 2
      break;
    case 'dense_rank':
      results = [1, 1, 2, 3]; // tied 1s, doesn't skip
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col"
    >
      {RAW_DATA.map((row, i) => {
        const val = results[i];
        
        return (
          <motion.div
            key={i}
            initial={reduceMotion ? { opacity: 1 } : { x: -10, opacity: 0, backgroundColor: 'rgba(24, 24, 27, 0)' }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0, opacity: 1, backgroundColor: 'rgba(67, 56, 202, 0.2)' }}
            transition={{ delay: reduceMotion ? 0 : i * 0.15, duration: 0.4 }}
            className="flex p-4 border-b border-zinc-900/50 items-center transition-colors"
          >
            <div className="w-1/3 text-zinc-300 font-bold">{row.name}</div>
            <div className="w-1/3 text-center text-emerald-400 font-bold">{row.score}</div>
            <div className="w-1/3 text-right font-bold text-indigo-300 flex items-center justify-end gap-2">
              <motion.div 
                initial={reduceMotion ? { scale: 1 } : { scale: 0.5 }}
                animate={reduceMotion ? { scale: 1 } : { scale: 1 }}
                transition={{ delay: reduceMotion ? 0 : i * 0.15 + 0.1, type: 'spring' }}
                className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white"
              >
                {val}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
