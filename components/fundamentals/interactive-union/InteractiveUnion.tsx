'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Layers, ListFilter } from 'lucide-react';

const TYPES = [
  { 
    id: 'union_all', 
    label: 'UNION ALL', 
    icon: Layers, 
    desc: 'Simply stacks results. Fast. Does NOT remove duplicates.', 
    sql: 'SELECT id, item FROM sales_jan\nUNION ALL\nSELECT id, item FROM sales_feb;' 
  },
  { 
    id: 'union', 
    label: 'UNION', 
    icon: ListFilter, 
    desc: 'Removes duplicates. Requires a costly SORT or HASH.', 
    sql: 'SELECT id, item FROM sales_jan\nUNION\nSELECT id, item FROM sales_feb;' 
  }
] as const;

export function InteractiveUnion() {
  const [activeType, setActiveType] = useState<string>('union_all');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveType(current => {
        const currentIndex = TYPES.findIndex(t => t.id === current);
        return TYPES[(currentIndex + 1) % TYPES.length].id;
      });
    }, 4500); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = TYPES.find(t => t.id === activeType)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      {/* Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full">
        {TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => {
              setUserInteracted(true);
              setActiveType(type.id);
            }}
            className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative ${
              activeType === type.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {activeType === type.id && (
              <motion.div
                layoutId="active-type-bg-union"
                className="absolute inset-0 bg-emerald-600 rounded-xl -z-10 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              <type.icon className="w-4 h-4" />
              {type.label}
            </span>
          </button>
        ))}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      <div className="w-full max-w-4xl flex flex-col md:flex-row items-stretch gap-6">
        
        {/* SQL Codeblock */}
        <div className="w-full md:w-1/2 bg-[#1E1E1E] rounded-xl overflow-hidden border border-zinc-700 shadow-xl relative min-h-[200px]">
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
                key={activeType}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <code>
                  {activeData.sql.split('\n').map((line, i) => {
                    const highlighted = line
                      .replace(/(SELECT|FROM)/g, '<span class="text-[#569CD6] font-bold">$1</span>')
                      .replace(/(UNION ALL|UNION)/g, '<span class="text-[#C586C0] font-bold">$1</span>')
                      .replace(/(sales_jan|sales_feb)/g, '<span class="text-[#4EC9B0]">$1</span>')
                      .replace(/(id|item)/g, '<span class="text-[#9CDCFE]">$1</span>');
                    return <div key={i} dangerouslySetInnerHTML={{ __html: highlighted }} />;
                  })}
                </code>
              </motion.pre>
            </AnimatePresence>
          </div>
        </div>

        {/* Visualizer Plan */}
        <div className="w-full md:w-1/2 bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex items-center justify-center min-h-[250px]">
          <AnimatePresence mode="wait">
            <ResultState key={activeType} type={activeType} reduceMotion={shouldReduceMotion} />
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

function ResultState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  const row1 = { id: 1, item: 'A' };
  const row2 = { id: 2, item: 'B' };
  const row3 = { id: 2, item: 'B' }; // Duplicate from Feb
  const row4 = { id: 3, item: 'C' };

  let displayContent;

  switch(type) {
    case 'union_all':
      displayContent = (
        <div className="flex flex-col gap-1 w-full max-w-xs font-mono text-sm">
          <div className="text-xs text-blue-400 font-bold mb-1">Table A (Jan)</div>
          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-between bg-blue-900/30 border border-blue-900/50 p-2 rounded">
            <span>{row1.id}</span><span>{row1.item}</span>
          </motion.div>
          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex justify-between bg-blue-900/30 border border-blue-900/50 p-2 rounded">
            <span>{row2.id}</span><span>{row2.item}</span>
          </motion.div>
          
          <div className="text-xs text-orange-400 font-bold mb-1 mt-2">Table B (Feb)</div>
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex justify-between bg-orange-900/30 border border-orange-900/50 p-2 rounded relative">
            <span>{row3.id}</span><span>{row3.item}</span>
            <div className="absolute -right-24 top-2 text-xs text-red-400 whitespace-nowrap hidden sm:block">&lt;-- Duplicate</div>
          </motion.div>
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex justify-between bg-orange-900/30 border border-orange-900/50 p-2 rounded">
            <span>{row4.id}</span><span>{row4.item}</span>
          </motion.div>
        </div>
      );
      break;
    case 'union':
      displayContent = (
        <div className="flex flex-col gap-1 w-full max-w-xs font-mono text-sm">
          <div className="text-xs text-emerald-400 font-bold mb-1">Result (Deduplicated)</div>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-between bg-emerald-900/20 border border-emerald-500/50 p-2 rounded shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span>{row1.id}</span><span>{row1.item}</span>
          </motion.div>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="flex justify-between bg-emerald-900/20 border border-emerald-500/50 p-2 rounded shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span>{row2.id}</span><span>{row2.item}</span>
          </motion.div>
          <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0.1, height: 0, margin: 0, padding: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="flex justify-between bg-red-900/10 border border-red-900/50 p-2 rounded line-through overflow-hidden">
            <span>{row3.id}</span><span>{row3.item}</span>
          </motion.div>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="flex justify-between bg-emerald-900/20 border border-emerald-500/50 p-2 rounded shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span>{row4.id}</span><span>{row4.item}</span>
          </motion.div>
        </div>
      );
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-4 w-full h-full"
    >
      {displayContent}
    </motion.div>
  );
}
