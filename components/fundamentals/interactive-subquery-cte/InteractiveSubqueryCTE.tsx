'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Database, Zap, FileJson, HardDrive } from 'lucide-react';

const TYPES = [
  { 
    id: 'subquery', 
    label: 'Subquery', 
    icon: FileJson, 
    desc: 'Inline, used once, small. Fine for a scalar or EXISTS check.', 
    sql: 'SELECT name\nFROM users\nWHERE id IN (\n  SELECT user_id \n  FROM active_log\n);',
    highlight: 'blue'
  },
  { 
    id: 'cte', 
    label: 'CTE (WITH)', 
    icon: Zap, 
    desc: 'Named, readable, can be referenced multiple times and recurse.', 
    sql: 'WITH ActiveUsers AS (\n  SELECT user_id FROM active_log\n)\nSELECT name\nFROM users\nJOIN ActiveUsers ON id = user_id;',
    highlight: 'purple'
  },
  { 
    id: 'temp', 
    label: 'Temp Table', 
    icon: HardDrive, 
    desc: 'Physically materialised for the session. Use for large, reused intermediate results.', 
    sql: 'CREATE TEMP TABLE active_users AS\nSELECT user_id FROM active_log;\n\nCREATE INDEX ON active_users(user_id);\n\nSELECT name\nFROM users\nJOIN active_users ON id = user_id;',
    highlight: 'emerald'
  }
] as const;

export function InteractiveSubqueryCTE() {
  const [activeType, setActiveType] = useState<string>('subquery');
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
    }, 5000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = TYPES.find(t => t.id === activeType)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      {/* Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full">
        {TYPES.map((type) => {
          let bgClass = 'bg-blue-600';
          if (type.highlight === 'purple') bgClass = 'bg-purple-600';
          if (type.highlight === 'emerald') bgClass = 'bg-emerald-600';

          return (
            <button
              key={type.id}
              onClick={() => {
                setUserInteracted(true);
                setActiveType(type.id);
              }}
              className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative ${
                activeType === type.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {activeType === type.id && (
                <motion.div
                  layoutId="active-type-bg"
                  className={`absolute inset-0 rounded-xl -z-10 ${bgClass}`}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <type.icon className="w-4 h-4" />
                {type.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      {/* Code vs Visual Split */}
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
                key={activeType}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <code>
                  {activeData.sql.split('\n').map((line, i) => {
                    const highlighted = line
                      .replace(/(CREATE TEMP TABLE|CREATE INDEX ON|SELECT|FROM|WHERE|IN|WITH|JOIN|ON|AS)/g, '<span class="text-[#569CD6] font-bold">$1</span>')
                      .replace(/(users|active_log|ActiveUsers|active_users)/g, '<span class="text-[#4EC9B0]">$1</span>')
                      .replace(/(name|user_id|id)/g, '<span class="text-[#9CDCFE]">$1</span>');
                    return <div key={i} dangerouslySetInnerHTML={{ __html: highlighted }} />;
                  })}
                </code>
              </motion.pre>
            </AnimatePresence>
          </div>
        </div>

        {/* Visualizer Architecture */}
        <div className="w-full md:w-1/2 bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex items-center justify-center min-h-[250px]">
          <AnimatePresence mode="wait">
            <ArchitectureState key={activeType} type={activeType} reduceMotion={shouldReduceMotion} />
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

function ArchitectureState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  let displayContent;

  switch(type) {
    case 'subquery':
      displayContent = (
        <div className="flex flex-col items-center gap-4">
          <div className="w-48 bg-zinc-900 border border-blue-500/30 p-3 rounded-xl flex items-center justify-center font-mono text-sm text-zinc-300">
            Outer Query
          </div>
          <div className="h-6 w-px bg-blue-500/50" />
          <div className="w-40 bg-blue-900/20 border border-blue-500/50 p-2 rounded-lg flex items-center justify-center font-mono text-xs text-blue-300">
            Inline Subquery
          </div>
          <div className="mt-4 text-xs font-mono text-zinc-500 max-w-[200px] text-center">
            Evaluated inline. Often limits optimizer choices.
          </div>
        </div>
      );
      break;
    case 'cte':
      displayContent = (
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <div className="w-32 bg-purple-900/20 border border-purple-500/50 p-2 rounded-lg flex items-center justify-center font-mono text-xs text-purple-300">
              CTE: ActiveUsers
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-6 w-px bg-purple-500/50" />
            <div className="h-6 w-px bg-purple-500/50 opacity-30" />
          </div>
          <div className="w-48 bg-zinc-900 border border-purple-500/30 p-3 rounded-xl flex items-center justify-center font-mono text-sm text-zinc-300">
            Main Query (reusable)
          </div>
          <div className="mt-4 text-xs font-mono text-zinc-500 max-w-[200px] text-center">
            Named logical blocks. May or may not be materialized by the engine.
          </div>
        </div>
      );
      break;
    case 'temp':
      displayContent = (
        <div className="flex flex-col items-center gap-4">
          <div className="w-48 bg-emerald-900/20 border-2 border-emerald-500/50 p-3 rounded-xl flex items-center justify-center gap-2 font-mono text-sm text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Database className="w-4 h-4" /> temp_table
          </div>
          <div className="h-6 w-px bg-emerald-500/50" />
          <div className="w-48 bg-zinc-900 border border-emerald-500/30 p-3 rounded-xl flex items-center justify-center font-mono text-sm text-zinc-300">
            Main Query (indexed)
          </div>
          <div className="mt-4 text-xs font-mono text-zinc-500 max-w-[200px] text-center">
            Physically written to temp storage. Can be indexed for fast multi-joins.
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
