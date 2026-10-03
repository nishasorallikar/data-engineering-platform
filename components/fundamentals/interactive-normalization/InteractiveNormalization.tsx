'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Box, SplitSquareHorizontal, Waypoints } from 'lucide-react';

const STAGES = [
  { 
    id: '1nf', 
    label: '1NF', 
    icon: Box, 
    desc: 'Atomic values. No arrays or repeating groups in a column.', 
    sql: '-- Unnormalized\nSELECT id, name, skills \nFROM employees;\n-- skills: "SQL, Python, Java"\n\n-- 1NF Normalized\nSELECT id, name, skill_id \nFROM employee_skills;' 
  },
  { 
    id: '2nf', 
    label: '2NF', 
    icon: SplitSquareHorizontal, 
    desc: '1NF + No partial dependencies on a composite key.', 
    sql: '-- 1NF (Composite Key: order_id, product_id)\n-- product_name depends ONLY on product_id\nSELECT order_id, product_id, qty, product_name\nFROM order_details;\n\n-- 2NF Normalized\nSELECT order_id, product_id, qty \nFROM order_details;\nSELECT product_id, product_name \nFROM products;' 
  },
  { 
    id: '3nf', 
    label: '3NF', 
    icon: Waypoints, 
    desc: '2NF + No transitive dependencies between non-key attributes.', 
    sql: '-- 2NF (Key: emp_id)\n-- dept_name depends on dept_id, not emp_id\nSELECT emp_id, name, dept_id, dept_name\nFROM employees;\n\n-- 3NF Normalized\nSELECT emp_id, name, dept_id \nFROM employees;\nSELECT dept_id, dept_name \nFROM departments;' 
  }
] as const;

export function InteractiveNormalization() {
  const [activeStage, setActiveStage] = useState<string>('1nf');
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
    }, 5500); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = STAGES.find(s => s.id === activeStage)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      {/* Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full">
        {STAGES.map((stage) => (
          <button
            key={stage.id}
            onClick={() => {
              setUserInteracted(true);
              setActiveStage(stage.id);
            }}
            className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-sm font-bold font-mono transition-all duration-300 relative ${
              activeStage === stage.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {activeStage === stage.id && (
              <motion.div
                layoutId="active-stage-bg-norm"
                className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              <stage.icon className="w-4 h-4" />
              {stage.label}
            </span>
          </button>
        ))}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      <div className="w-full max-w-4xl flex flex-col md:flex-row items-stretch gap-6">
        
        {/* SQL Codeblock */}
        <div className="w-full md:w-1/2 bg-[#1E1E1E] rounded-xl overflow-hidden border border-zinc-700 shadow-xl relative min-h-[300px]">
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
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <code>
                  {activeData.sql.split('\n').map((line, i) => {
                    const highlighted = line
                      .replace(/(SELECT|FROM)/g, '<span class="text-[#569CD6] font-bold">$1</span>')
                      .replace(/(employees|employee_skills|order_details|products|departments)/g, '<span class="text-[#4EC9B0]">$1</span>')
                      .replace(/(id|name|skills|skill_id|order_id|product_id|qty|product_name|emp_id|dept_id|dept_name)/g, '<span class="text-[#9CDCFE]">$1</span>')
                      .replace(/(--.*)/g, '<span class="text-[#6A9955]">$1</span>');
                    return <div key={i} dangerouslySetInnerHTML={{ __html: highlighted }} />;
                  })}
                </code>
              </motion.pre>
            </AnimatePresence>
          </div>
        </div>

        {/* Visualizer Result */}
        <div className="w-full md:w-1/2 bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex items-center justify-center min-h-[300px]">
          <AnimatePresence mode="wait">
            <NormState key={activeStage} stage={activeStage} reduceMotion={shouldReduceMotion} />
          </AnimatePresence>
        </div>

      </div>
      
    </div>
  );
}

function NormState({ stage, reduceMotion }: { stage: string, reduceMotion: boolean | null }) {
  let displayContent;

  switch(stage) {
    case '1nf':
      displayContent = (
        <div className="flex flex-col gap-4 font-mono text-xs w-full max-w-sm">
          <div className="text-zinc-500 font-bold mb-2 text-center uppercase tracking-wider">Before (Array)</div>
          <div className="bg-red-950/20 border border-red-900/50 p-2 rounded-xl flex items-center shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <div className="w-8 text-center text-zinc-400">1</div>
            <div className="flex-1 text-center text-blue-400">Alice</div>
            <div className="flex-1 text-center text-red-400 line-through">SQL, Python</div>
          </div>
          <div className="flex justify-center py-2"><div className="w-px h-8 bg-zinc-700"></div></div>
          <div className="text-zinc-500 font-bold mb-2 text-center uppercase tracking-wider">After (Atomic)</div>
          <div className="flex flex-col gap-2">
            <div className="bg-emerald-950/20 border border-emerald-900/50 p-2 rounded-xl flex items-center">
              <div className="w-8 text-center text-zinc-400">1</div>
              <div className="flex-1 text-center text-blue-400">Alice</div>
              <div className="flex-1 text-center text-emerald-400 font-bold">SQL</div>
            </div>
            <div className="bg-emerald-950/20 border border-emerald-900/50 p-2 rounded-xl flex items-center">
              <div className="w-8 text-center text-zinc-400">1</div>
              <div className="flex-1 text-center text-blue-400">Alice</div>
              <div className="flex-1 text-center text-emerald-400 font-bold">Python</div>
            </div>
          </div>
        </div>
      );
      break;
    case '2nf':
      displayContent = (
        <div className="flex flex-col gap-4 font-mono text-xs w-full max-w-sm">
          <div className="text-zinc-500 font-bold mb-2 text-center uppercase tracking-wider">Before (Partial Dep)</div>
          <div className="bg-red-950/20 border border-red-900/50 p-2 rounded-xl flex items-center shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <div className="flex-1 text-center text-yellow-500">ord_1<br/>prod_A</div>
            <div className="flex-1 text-center text-zinc-400">qty 5</div>
            <div className="flex-1 text-center text-red-400 border border-red-500/50 rounded p-1">Apple</div>
          </div>
          <div className="flex justify-center"><div className="w-px h-4 bg-zinc-700"></div></div>
          <div className="text-zinc-500 font-bold mb-2 text-center uppercase tracking-wider">After (Split)</div>
          <div className="flex flex-col gap-2">
            <div className="bg-emerald-950/20 border border-emerald-900/50 p-2 rounded-xl flex items-center">
              <div className="w-1/2 text-center text-yellow-500">ord_1 | prod_A</div>
              <div className="w-1/2 text-center text-zinc-400">qty 5</div>
            </div>
            <div className="bg-emerald-950/20 border border-emerald-900/50 p-2 rounded-xl flex items-center">
              <div className="w-1/2 text-center text-yellow-500">prod_A</div>
              <div className="w-1/2 text-center text-emerald-400">Apple</div>
            </div>
          </div>
        </div>
      );
      break;
    case '3nf':
      displayContent = (
        <div className="flex flex-col gap-4 font-mono text-xs w-full max-w-sm">
          <div className="text-zinc-500 font-bold mb-2 text-center uppercase tracking-wider">Before (Transitive Dep)</div>
          <div className="bg-red-950/20 border border-red-900/50 p-2 rounded-xl flex items-center shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <div className="flex-1 text-center text-yellow-500">emp_1</div>
            <div className="flex-1 text-center text-zinc-400">Alice</div>
            <div className="flex-1 text-center text-orange-400">dept_4</div>
            <div className="flex-1 text-center text-red-400 border border-red-500/50 rounded p-1">Sales</div>
          </div>
          <div className="flex justify-center"><div className="w-px h-4 bg-zinc-700"></div></div>
          <div className="text-zinc-500 font-bold mb-2 text-center uppercase tracking-wider">After (Split)</div>
          <div className="flex flex-col gap-2">
            <div className="bg-emerald-950/20 border border-emerald-900/50 p-2 rounded-xl flex items-center">
              <div className="w-1/3 text-center text-yellow-500">emp_1</div>
              <div className="w-1/3 text-center text-zinc-400">Alice</div>
              <div className="w-1/3 text-center text-orange-400">dept_4</div>
            </div>
            <div className="bg-emerald-950/20 border border-emerald-900/50 p-2 rounded-xl flex items-center justify-center gap-4">
              <div className="text-center text-orange-400">dept_4</div>
              <div className="text-center text-emerald-400">Sales</div>
            </div>
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
