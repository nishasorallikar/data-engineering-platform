'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Search, Scissors, KeySquare, Combine } from 'lucide-react';

const STEPS = [
  { 
    id: 'explain', 
    label: '1. EXPLAIN', 
    icon: Search, 
    desc: 'Read the execution plan first. Never guess. Look for Seq Scans on large tables.', 
    sql: 'EXPLAIN ANALYZE\nSELECT * FROM orders\nJOIN users ON users.id = orders.user_id;' 
  },
  { 
    id: 'reduce', 
    label: '2. Reduce Data', 
    icon: Scissors, 
    desc: 'Filter early and select only needed columns to reduce memory overhead.', 
    sql: 'EXPLAIN ANALYZE\nSELECT orders.id, users.name \nFROM orders\nJOIN users ON users.id = orders.user_id\nWHERE orders.created_at >= current_date;' 
  },
  { 
    id: 'index', 
    label: '3. Index Keys', 
    icon: KeySquare, 
    desc: 'Index the join and filter keys to turn Seq Scans into Index Scans.', 
    sql: 'CREATE INDEX idx_orders_user_date \n  ON orders(user_id, created_at);\n\n-- Now the join uses Index Scan' 
  },
  { 
    id: 'join', 
    label: '4. Join Strategy', 
    icon: Combine, 
    desc: 'Ensure keys are the same type. Broadcast the small side if possible.', 
    sql: '/* Hash Join is chosen because both sides are filtered \n   and indexes are present. */\nSELECT ...' 
  }
] as const;

export function InteractiveQueryPlan() {
  const [activeStep, setActiveStep] = useState<string>('explain');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveStep(current => {
        const currentIndex = STEPS.findIndex(s => s.id === current);
        return STEPS[(currentIndex + 1) % STEPS.length].id;
      });
    }, 4500); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = STEPS.find(s => s.id === activeStep)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      {/* Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full">
        {STEPS.map((step) => (
          <button
            key={step.id}
            onClick={() => {
              setUserInteracted(true);
              setActiveStep(step.id);
            }}
            className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative ${
              activeStep === step.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {activeStep === step.id && (
              <motion.div
                layoutId="active-step-bg"
                className="absolute inset-0 bg-red-900/80 border border-red-500/50 rounded-xl -z-10 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              <step.icon className="w-4 h-4" />
              {step.label}
            </span>
          </button>
        ))}
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
                key={activeStep}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <code>
                  {activeData.sql.split('\n').map((line, i) => {
                    const highlighted = line
                      .replace(/(EXPLAIN ANALYZE|CREATE INDEX|ON|SELECT|FROM|JOIN|WHERE)/g, '<span class="text-[#569CD6] font-bold">$1</span>')
                      .replace(/(orders|users|idx_orders_user_date)/g, '<span class="text-[#4EC9B0]">$1</span>')
                      .replace(/(id|user_id|created_at|name)/g, '<span class="text-[#9CDCFE]">$1</span>')
                      .replace(/(\/\*.*\*\/|--.*)/g, '<span class="text-[#6A9955]">$1</span>');
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
            <PlanState key={activeStep} step={activeStep} reduceMotion={shouldReduceMotion} />
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

function PlanState({ step, reduceMotion }: { step: string, reduceMotion: boolean | null }) {
  let displayContent;

  switch(step) {
    case 'explain':
      displayContent = (
        <div className="flex flex-col gap-2 font-mono text-xs w-full max-w-sm">
          <div className="bg-red-950/30 border border-red-900/50 p-2 rounded text-red-400 font-bold mb-2 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            Nested Loop  (cost=0.00..15000.00 rows=1M)
          </div>
          <div className="flex pl-4 gap-2 border-l border-zinc-700">
            <div className="bg-red-950/30 border border-red-900/50 p-2 rounded text-red-300 w-full">
              -&gt; Seq Scan on users  (cost=0.00..5000.00 rows=10k)
            </div>
          </div>
          <div className="flex pl-4 gap-2 border-l border-zinc-700">
            <div className="bg-red-950/30 border border-red-900/50 p-2 rounded text-red-300 w-full">
              -&gt; Seq Scan on orders  (cost=0.00..10000.00 rows=1M)
            </div>
          </div>
        </div>
      );
      break;
    case 'reduce':
      displayContent = (
        <div className="flex flex-col gap-2 font-mono text-xs w-full max-w-sm">
          <div className="bg-orange-950/30 border border-orange-900/50 p-2 rounded text-orange-400 font-bold mb-2">
            Hash Join  (cost=100.00..8000.00 rows=5k)
          </div>
          <div className="flex pl-4 gap-2 border-l border-zinc-700">
            <div className="bg-zinc-800 border border-zinc-700 p-2 rounded text-zinc-300 w-full">
              -&gt; Seq Scan on users
            </div>
          </div>
          <div className="flex pl-4 gap-2 border-l border-zinc-700">
            <div className="bg-orange-950/30 border border-orange-900/50 p-2 rounded text-orange-300 w-full">
              -&gt; Seq Scan on orders (Filter: created_at &gt;= current_date)
            </div>
          </div>
        </div>
      );
      break;
    case 'index':
      displayContent = (
        <div className="flex flex-col gap-2 font-mono text-xs w-full max-w-sm">
          <div className="bg-emerald-950/30 border border-emerald-900/50 p-2 rounded text-emerald-400 font-bold mb-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            Hash Join  (cost=10.00..500.00 rows=5k)
          </div>
          <div className="flex pl-4 gap-2 border-l border-zinc-700">
            <div className="bg-zinc-800 border border-zinc-700 p-2 rounded text-zinc-300 w-full">
              -&gt; Seq Scan on users
            </div>
          </div>
          <div className="flex pl-4 gap-2 border-l border-zinc-700">
            <div className="bg-emerald-950/30 border border-emerald-900/50 p-2 rounded text-emerald-300 w-full">
              -&gt; Index Scan using idx_orders_user_date
            </div>
          </div>
        </div>
      );
      break;
    case 'join':
      displayContent = (
        <div className="flex flex-col gap-2 font-mono text-xs w-full max-w-sm items-center justify-center h-full">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-900/30 border-2 border-blue-500 rounded-lg flex items-center justify-center text-center">
              Small<br/>Side
            </div>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="text-emerald-500">
              <Combine className="w-8 h-8" />
            </motion.div>
            <div className="w-24 h-24 bg-purple-900/30 border-2 border-purple-500 rounded-lg flex items-center justify-center text-center">
              Large<br/>Indexed<br/>Side
            </div>
          </div>
          <div className="mt-4 text-emerald-400 font-bold">Fast Hash Join!</div>
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
