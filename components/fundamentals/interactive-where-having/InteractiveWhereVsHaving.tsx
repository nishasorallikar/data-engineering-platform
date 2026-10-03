'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Filter, Database, Users, ListFilter } from 'lucide-react';

const STAGES = [
  { id: 'from', label: 'FROM', desc: 'Read all raw rows', icon: Database, sqlSegment: 'FROM users' },
  { id: 'where', label: 'WHERE', desc: 'Filter individual rows (e.g. status = active)', icon: Filter, highlight: 'blue', sqlSegment: "WHERE status = 'active'" },
  { id: 'group_by', label: 'GROUP BY', desc: 'Group remaining rows by key', icon: Users, sqlSegment: 'GROUP BY name' },
  { id: 'having', label: 'HAVING', desc: 'Filter groups (e.g. count > 1)', icon: ListFilter, highlight: 'emerald', sqlSegment: 'HAVING SUM(amount) > 200' },
  { id: 'select', label: 'SELECT', desc: 'Output final result', icon: Database, sqlSegment: 'SELECT name, SUM(amount)' }
];

const FULL_SQL_LINES = [
  { stageId: 'select', text: 'SELECT name, SUM(amount)' },
  { stageId: 'from', text: 'FROM users' },
  { stageId: 'where', text: "WHERE status = 'active'" },
  { stageId: 'group_by', text: 'GROUP BY name' },
  { stageId: 'having', text: 'HAVING SUM(amount) > 200;' }
];

export function InteractiveWhereVsHaving() {
  const [activeStage, setActiveStage] = useState<string>('from');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  // Always-On Auto-Rotation Logic
  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveStage(current => {
        const currentIndex = STAGES.findIndex(s => s.id === current);
        return STAGES[(currentIndex + 1) % STAGES.length].id;
      });
    }, 3000); // 3 seconds per stage

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-12">
      
      {/* Animated SQL Codeblock */}
      <div className="w-full max-w-2xl bg-[#1E1E1E] rounded-xl overflow-hidden border border-zinc-700 shadow-xl relative">
        <div className="flex items-center px-4 py-2 bg-[#2D2D2D] border-b border-zinc-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="ml-4 text-xs font-mono text-zinc-400">query.sql</span>
        </div>
        <div className="p-4 font-mono text-sm leading-relaxed overflow-x-auto text-[#D4D4D4] flex flex-col gap-1">
          {FULL_SQL_LINES.map((line, i) => {
            const isHighlight = line.stageId === activeStage;
            const highlightedHtml = line.text
              .replace(/(SELECT|FROM|WHERE|GROUP BY|HAVING)/g, '<span class="text-[#569CD6] font-bold">$1</span>')
              .replace(/(SUM|COUNT)/g, '<span class="text-[#DCDCAA]">$1</span>')
              .replace(/('active')/g, '<span class="text-[#CE9178]">$1</span>');

            return (
              <div 
                key={i} 
                className={`px-3 py-1 -mx-3 rounded transition-all duration-300 flex items-center ${isHighlight ? 'bg-[#264F78]' : 'bg-transparent'}`}
              >
                {isHighlight && (
                  <motion.div layoutId="sql-indicator" className="w-1 h-full bg-blue-500 absolute left-0 top-0 bottom-0" />
                )}
                <div className="relative z-10 pl-2" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Visualizer Pipeline */}
      <div className="w-full max-w-4xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative flex flex-col md:flex-row items-stretch justify-between gap-4">
        
        {/* Stages Pipeline */}
        <div className="flex flex-col w-full md:w-1/3 gap-3 relative z-10">
          <div className="text-xs font-mono font-bold text-zinc-500 uppercase mb-2">Order of Execution</div>
          {STAGES.map((stage, idx) => {
            const isActive = activeStage === stage.id;
            const Icon = stage.icon;
            
            let colorClasses = 'bg-zinc-900 border-zinc-700 text-zinc-400';
            if (isActive) {
              if (stage.highlight === 'blue') colorClasses = 'bg-blue-950/50 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]';
              else if (stage.highlight === 'emerald') colorClasses = 'bg-emerald-950/50 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]';
              else colorClasses = 'bg-zinc-800 border-zinc-500 text-white';
            }

            return (
              <div key={stage.id} className="relative">
                <button
                  onClick={() => {
                    setUserInteracted(true);
                    setActiveStage(stage.id);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${colorClasses}`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <div className="flex flex-col items-start text-left">
                    <span className="font-bold font-mono text-sm">{stage.label}</span>
                    <span className="text-[10px] opacity-80 font-medium">{stage.desc}</span>
                  </div>
                </button>
                {/* Connecting Line */}
                {idx < STAGES.length - 1 && (
                  <div className="absolute left-6 top-full h-3 w-px bg-zinc-700 z-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Data Animation Area */}
        <div className="flex-1 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 relative overflow-hidden min-h-[300px]">
          <div className="text-xs font-mono font-bold text-zinc-500 uppercase mb-4 text-center">Data State</div>
          
          <div className="w-full h-full flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              <DataState key={activeStage} stage={activeStage} reduceMotion={shouldReduceMotion} />
            </AnimatePresence>
          </div>
        </div>
      </div>
      
    </div>
  );
}

function DataState({ stage, reduceMotion }: { stage: string, reduceMotion: boolean | null }) {
  // Raw data:
  // Alice (active), Bob (inactive), Charlie (active)
  
  const rawRows = [
    { id: 1, name: 'Alice', status: 'active', amount: 100 },
    { id: 2, name: 'Bob', status: 'inactive', amount: 50 },
    { id: 3, name: 'Charlie', status: 'active', amount: 200 },
    { id: 4, name: 'Alice', status: 'active', amount: 150 },
  ];

  let displayContent;

  switch(stage) {
    case 'from':
      displayContent = (
        <div className="flex flex-col gap-2 w-full max-w-xs">
          {rawRows.map(r => (
            <div key={r.id} className="bg-zinc-800 p-2 rounded flex justify-between text-xs font-mono border border-zinc-700 text-zinc-300">
              <span>{r.name}</span>
              <span className={r.status === 'active' ? 'text-blue-400' : 'text-red-400'}>{r.status}</span>
              <span>${r.amount}</span>
            </div>
          ))}
        </div>
      );
      break;
    case 'where':
      displayContent = (
        <div className="flex flex-col gap-2 w-full max-w-xs relative">
          {rawRows.map((r, i) => {
            const isKept = r.status === 'active';
            return (
              <motion.div 
                key={r.id} 
                className={`p-2 rounded flex justify-between text-xs font-mono border ${isKept ? 'bg-blue-900/30 border-blue-500/50 text-blue-100' : 'bg-red-900/10 border-red-900/50 text-zinc-600 opacity-30 line-through'}`}
                initial={reduceMotion ? { opacity: 1 } : { x: isKept ? 0 : 20, opacity: isKept ? 1 : 0.5 }}
                animate={reduceMotion ? { opacity: 1 } : { x: 0, opacity: isKept ? 1 : 0.3 }}
                transition={{ duration: 0.3, delay: reduceMotion ? 0 : i * 0.1 }}
              >
                <span>{r.name}</span>
                <span>{r.status}</span>
                <span>${r.amount}</span>
              </motion.div>
            )
          })}
        </div>
      );
      break;
    case 'group_by':
      displayContent = (
        <div className="flex flex-col gap-4 w-full max-w-xs">
          {/* Alice Group */}
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-600">
            <div className="text-[10px] uppercase text-zinc-500 font-bold mb-2">Group: Alice</div>
            <div className="flex flex-col gap-1 text-xs font-mono">
              <div className="bg-zinc-700/50 p-1.5 rounded flex justify-between"><span>Alice</span><span>$100</span></div>
              <div className="bg-zinc-700/50 p-1.5 rounded flex justify-between"><span>Alice</span><span>$150</span></div>
              <div className="mt-1 pt-1 border-t border-zinc-600 font-bold flex justify-between text-emerald-400">
                <span>SUM</span><span>$250</span>
              </div>
            </div>
          </motion.div>
          {/* Charlie Group */}
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-600">
            <div className="text-[10px] uppercase text-zinc-500 font-bold mb-2">Group: Charlie</div>
            <div className="flex flex-col gap-1 text-xs font-mono">
              <div className="bg-zinc-700/50 p-1.5 rounded flex justify-between"><span>Charlie</span><span>$200</span></div>
              <div className="mt-1 pt-1 border-t border-zinc-600 font-bold flex justify-between text-emerald-400">
                <span>SUM</span><span>$200</span>
              </div>
            </div>
          </motion.div>
        </div>
      );
      break;
    case 'having':
      displayContent = (
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <div className="text-xs font-mono text-emerald-400 text-center mb-2 font-bold bg-emerald-950/50 p-2 rounded-lg border border-emerald-900/50">
            HAVING SUM(amount) {'>'} 200
          </div>
          {/* Alice Group - KEPT */}
          <motion.div className="bg-emerald-900/30 p-3 rounded-xl border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <div className="flex flex-col gap-1 text-xs font-mono">
              <div className="font-bold flex justify-between text-emerald-300">
                <span>Alice</span><span>$250</span>
              </div>
            </div>
          </motion.div>
          {/* Charlie Group - FILTERED */}
          <motion.div className="bg-red-900/10 p-3 rounded-xl border border-red-900/50 opacity-30 line-through">
            <div className="flex flex-col gap-1 text-xs font-mono text-zinc-500">
              <div className="font-bold flex justify-between">
                <span>Charlie</span><span>$200</span>
              </div>
            </div>
          </motion.div>
        </div>
      );
      break;
    case 'select':
      displayContent = (
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-indigo-900/40 p-3 rounded-xl border border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)] flex justify-between text-sm font-mono font-bold text-indigo-100">
            <span>Alice</span>
            <span className="text-emerald-400">$250</span>
          </motion.div>
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
      className="absolute inset-0 flex flex-col items-center justify-center p-4"
    >
      {displayContent}
    </motion.div>
  );
}
