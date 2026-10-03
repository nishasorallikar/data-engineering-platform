'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { AlertCircle, Calculator, Database, Filter } from 'lucide-react';

const MISTAKES = [
  {
    id: 'equality',
    label: 'NULL = NULL',
    icon: Filter,
    desc: 'NULL equals nothing, not even itself. It is "Unknown".',
    sql: '-- WRONG\nSELECT * FROM users \nWHERE status = NULL;\n\n-- RIGHT\nSELECT * FROM users \nWHERE status IS NULL;',
    highlight: 'red'
  },
  {
    id: 'notin',
    label: 'NOT IN (NULL)',
    icon: AlertCircle,
    desc: 'A NULL in a NOT IN subquery causes the whole query to return 0 rows.',
    sql: '-- DANGEROUS\nSELECT id FROM users \nWHERE id NOT IN (SELECT mgr_id FROM depts);\n\n-- SAFER\nSELECT id FROM users u\nWHERE NOT EXISTS (\n  SELECT 1 FROM depts d WHERE d.mgr_id = u.id\n);',
    highlight: 'orange'
  },
  {
    id: 'count',
    label: 'COUNT(*)',
    icon: Calculator,
    desc: 'COUNT(*) counts rows. COUNT(col) skips NULLs.',
    sql: 'SELECT\n  COUNT(*) as total_rows,\n  COUNT(bonus) as users_with_bonus\nFROM employees;',
    highlight: 'blue'
  },
  {
    id: 'math',
    label: 'Math & Concat',
    icon: Database,
    desc: 'Any math or string concatenation with NULL results in NULL.',
    sql: '-- WRONG (yields NULL if no bonus)\nSELECT salary + bonus AS total_comp\nFROM employees;\n\n-- RIGHT\nSELECT salary + COALESCE(bonus, 0) AS total_comp\nFROM employees;',
    highlight: 'purple'
  }
] as const;

export function InteractiveNulls() {
  const [activeFunc, setActiveFunc] = useState<string>('equality');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveFunc(current => {
        const currentIndex = MISTAKES.findIndex(w => w.id === current);
        return MISTAKES[(currentIndex + 1) % MISTAKES.length].id;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = MISTAKES.find(w => w.id === activeFunc)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      {/* Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-4xl w-full">
        {MISTAKES.map((func) => {
          let bgClass = 'bg-red-600';
          if (func.highlight === 'orange') bgClass = 'bg-orange-600';
          if (func.highlight === 'blue') bgClass = 'bg-blue-600';
          if (func.highlight === 'purple') bgClass = 'bg-purple-600';

          return (
            <button
              key={func.id}
              onClick={() => {
                setUserInteracted(true);
                setActiveFunc(func.id);
              }}
              className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all duration-300 relative ${
                activeFunc === func.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {activeFunc === func.id && (
                <motion.div
                  layoutId="active-func-bg-nulls"
                  className={`absolute inset-0 rounded-xl -z-10 ${bgClass}`}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <func.icon className="w-4 h-4 hidden sm:block" />
                {func.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      <div className="w-full max-w-4xl flex flex-col md:flex-row items-stretch gap-6">
        
        {/* SQL Codeblock */}
        <div className="w-full md:w-1/2 bg-[#1E1E1E] rounded-xl overflow-hidden border border-zinc-700 shadow-xl relative min-h-[250px]">
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
                key={activeFunc}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <code>
                  {activeData.sql.split('\n').map((line, i) => {
                    const highlighted = line
                      .replace(/(SELECT|FROM|WHERE|NOT IN|IS|NOT EXISTS|AS)/g, '<span class="text-[#569CD6] font-bold">$1</span>')
                      .replace(/(NULL)/g, '<span class="text-[#569CD6] font-bold">$1</span>')
                      .replace(/(COUNT|COALESCE)/g, '<span class="text-[#DCDCAA]">$1</span>')
                      .replace(/(users|depts|employees)/g, '<span class="text-[#4EC9B0]">$1</span>')
                      .replace(/(--.*)/g, '<span class="text-[#6A9955]">$1</span>');
                    return <div key={i} dangerouslySetInnerHTML={{ __html: highlighted }} />;
                  })}
                </code>
              </motion.pre>
            </AnimatePresence>
          </div>
        </div>

        {/* Visualizer Result */}
        <div className="w-full md:w-1/2 bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex items-center justify-center min-h-[250px]">
          <AnimatePresence mode="wait">
            <NullState key={activeFunc} type={activeFunc} reduceMotion={shouldReduceMotion} />
          </AnimatePresence>
        </div>

      </div>
      
    </div>
  );
}

function NullState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  let displayContent;

  switch(type) {
    case 'equality':
      displayContent = (
        <div className="flex flex-col gap-4 items-center font-mono">
          <div className="flex items-center gap-4 text-xl font-bold">
            <span className="bg-zinc-800 text-zinc-400 p-2 rounded">NULL</span>
            <span className="text-zinc-600">=</span>
            <span className="bg-zinc-800 text-zinc-400 p-2 rounded">NULL</span>
            <motion.span 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}
              className="text-red-500 ml-4 bg-red-950/50 p-2 rounded border border-red-900/50"
            >
              UNKNOWN
            </motion.span>
          </div>
          <div className="flex items-center gap-4 text-xl font-bold mt-4">
            <span className="bg-zinc-800 text-zinc-400 p-2 rounded">NULL</span>
            <span className="text-zinc-600">IS</span>
            <span className="bg-zinc-800 text-zinc-400 p-2 rounded">NULL</span>
            <motion.span 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.0, type: 'spring' }}
              className="text-emerald-500 ml-4 bg-emerald-950/50 p-2 rounded border border-emerald-900/50"
            >
              TRUE
            </motion.span>
          </div>
        </div>
      );
      break;
    case 'notin':
      displayContent = (
        <div className="flex flex-col gap-4 font-mono w-full max-w-sm">
          <div className="text-center text-zinc-400 text-xs">NOT IN (1, 2, NULL) translates to:</div>
          <div className="bg-red-950/20 border border-red-900/50 p-4 rounded-xl text-sm flex flex-col gap-2 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <div className="flex justify-between"><span>id != 1</span><span className="text-emerald-400">TRUE</span></div>
            <div className="text-center text-zinc-600 text-xs">AND</div>
            <div className="flex justify-between"><span>id != 2</span><span className="text-emerald-400">TRUE</span></div>
            <div className="text-center text-zinc-600 text-xs">AND</div>
            <motion.div initial={{ scale: 1 }} animate={{ scale: [1, 1.05, 1], color: ['#9ca3af', '#ef4444', '#ef4444'] }} transition={{ delay: 0.5, duration: 0.5 }} className="flex justify-between">
              <span>id != NULL</span><span className="font-bold">UNKNOWN</span>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-center text-red-500 font-bold bg-red-950/50 p-2 rounded">
            Overall Result: UNKNOWN (0 rows)
          </motion.div>
        </div>
      );
      break;
    case 'count':
      displayContent = (
        <div className="flex flex-col gap-4 font-mono w-full max-w-sm">
          <div className="flex flex-col border border-zinc-700 rounded-xl overflow-hidden">
            <div className="bg-zinc-800 p-2 flex justify-between font-bold text-xs text-zinc-400">
              <span className="w-1/3">Name</span><span className="w-2/3 text-right">Bonus</span>
            </div>
            <div className="p-2 flex justify-between border-b border-zinc-800 text-sm">
              <span className="w-1/3">Alice</span><span className="w-2/3 text-right text-emerald-400">500</span>
            </div>
            <div className="p-2 flex justify-between border-b border-zinc-800 text-sm">
              <span className="w-1/3">Bob</span><span className="w-2/3 text-right text-zinc-500 italic">NULL</span>
            </div>
            <div className="p-2 flex justify-between text-sm bg-zinc-900/50">
              <span className="w-1/3">Charlie</span><span className="w-2/3 text-right text-emerald-400">300</span>
            </div>
          </div>
          <div className="flex justify-around mt-2">
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center flex flex-col gap-1">
              <span className="text-xs text-zinc-500">COUNT(*)</span>
              <span className="text-2xl font-bold text-blue-400">3</span>
            </motion.div>
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="text-center flex flex-col gap-1">
              <span className="text-xs text-zinc-500">COUNT(bonus)</span>
              <span className="text-2xl font-bold text-orange-400">2</span>
            </motion.div>
          </div>
        </div>
      );
      break;
    case 'math':
      displayContent = (
        <div className="flex flex-col gap-4 font-mono items-center w-full max-w-sm">
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm sm:text-base bg-red-950/20 border border-red-900/50 p-4 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.1)] w-full">
            <span className="text-zinc-300">100000</span>
            <span className="text-zinc-600">+</span>
            <span className="text-zinc-500 italic">NULL</span>
            <span className="text-zinc-600">=</span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-red-500 font-bold bg-red-950/50 px-2 py-1 rounded">
              NULL
            </motion.span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-2 text-xs sm:text-sm bg-emerald-950/20 border border-emerald-900/50 p-4 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.1)] w-full">
            <span className="text-zinc-300">100000</span>
            <span className="text-zinc-600">+</span>
            <span className="whitespace-nowrap"><span className="text-purple-400">COALESCE(</span><span className="text-zinc-500 italic">NULL</span><span className="text-zinc-600">,</span> <span className="text-emerald-400">0</span><span className="text-purple-400">)</span></span>
            <span className="text-zinc-600">=</span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="text-emerald-500 font-bold bg-emerald-950/50 px-2 py-1 rounded">
              100000
            </motion.span>
          </div>
        </div>
      );
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-4 w-full h-full"
    >
      {displayContent}
    </motion.div>
  );
}
