'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Search, Activity } from 'lucide-react';

const CONCEPTS = [
  { 
    id: 'polling', 
    label: 'Polling (Batch Query)', 
    icon: Search, 
    desc: 'Querying the DB every 5 minutes: SELECT * WHERE updated_at > last_run. Puts heavy load on the source.', 
    highlight: 'blue'
  },
  { 
    id: 'cdc', 
    label: 'Change Data Capture (CDC)', 
    icon: Activity, 
    desc: 'Tailing the database write-ahead log (WAL) in real-time. Zero query load on the source DB.', 
    highlight: 'emerald'
  }
] as const;

export function InteractiveCDC() {
  const [activeType, setActiveType] = useState<string>('polling');
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
      
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full">
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
                layoutId="active-type-bg-cdc"
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

      <div className="text-sm font-mono text-zinc-400 h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[350px] overflow-hidden">
        <AnimatePresence mode="wait">
          <CDCState key={activeType} type={activeType} reduceMotion={shouldReduceMotion} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function CDCState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  
  if (type === 'polling') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6 font-mono w-full h-full">
        <div className="flex w-full max-w-md justify-between items-center relative">
          
          <div className="bg-zinc-900 border border-zinc-700 w-32 h-32 rounded-xl flex flex-col items-center justify-center z-10 relative">
            <div className="font-bold text-zinc-300 mb-2">Source DB</div>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}>
              <div className="w-12 h-12 border-4 border-t-blue-500 border-zinc-700 rounded-full" />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.1, 0.4, 0.5] }} className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] px-2 py-1 rounded font-bold shadow-[0_0_10px_rgba(239,68,68,0.8)]">
              CPU SPIKE!
            </motion.div>
          </div>

          <div className="relative w-32 h-16 flex flex-col items-center justify-center">
            <motion.div 
              initial={{ x: 50, opacity: 0 }} 
              animate={{ x: -30, opacity: 1 }} 
              transition={{ repeat: Infinity, duration: 4, times: [0, 0.2] }} 
              className="text-[10px] text-blue-400 bg-blue-950/80 border border-blue-500/50 p-1 rounded mb-1 whitespace-nowrap"
            >
              SELECT * WHERE...
            </motion.div>
            <motion.div 
              initial={{ x: -30, opacity: 0 }} 
              animate={{ x: 50, opacity: 1 }} 
              transition={{ repeat: Infinity, duration: 4, delay: 0.8, times: [0, 0.2] }} 
              className="w-4 h-4 bg-emerald-500 rounded-sm shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            />
          </div>

          <div className="bg-zinc-900 border border-zinc-700 w-32 h-32 rounded-xl flex items-center justify-center z-10">
            <div className="font-bold text-zinc-300 text-center">ETL<br/>Worker</div>
          </div>
        </div>
        <div className="text-xs text-zinc-400 text-center max-w-sm mt-4 border border-zinc-800 bg-zinc-900/50 p-3 rounded-lg">
          The ETL worker executes a heavy table scan every 5 minutes. If no data changed, the query is wasted. Source DB performance suffers.
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6 font-mono w-full h-full">
        <div className="flex w-full max-w-md justify-between items-center relative">
          
          <div className="bg-zinc-900 border border-zinc-700 w-32 h-32 rounded-xl flex flex-col items-center justify-center z-10 relative overflow-hidden">
            <div className="font-bold text-zinc-300 mb-2">Source DB</div>
            <div className="text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-900/50 p-1 rounded">Idle (0% CPU)</div>
            
            {/* The WAL Log visual */}
            <div className="absolute bottom-0 w-full h-8 bg-zinc-950 border-t border-zinc-800 flex flex-col justify-end text-[8px] p-1 text-zinc-600">
              <div className="flex justify-between"><span>LSN:101</span><span className="text-emerald-400">INSERT</span></div>
              <div className="flex justify-between"><span>LSN:102</span><span className="text-orange-400">UPDATE</span></div>
            </div>
            <div className="absolute bottom-6 right-2 text-[8px] bg-zinc-800 text-zinc-300 px-1 rounded border border-zinc-600">WAL File</div>
          </div>

          <div className="relative w-32 h-16 flex items-end justify-center pb-2">
            {/* Continuous stream of CDC events */}
            <motion.div animate={{ x: [0, 80] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-2 h-2 bg-emerald-500 rounded-sm shadow-[0_0_10px_rgba(16,185,129,0.8)] absolute bottom-2 left-4" />
            <motion.div animate={{ x: [0, 80] }} transition={{ repeat: Infinity, duration: 1, ease: "linear", delay: 0.3 }} className="w-2 h-2 bg-orange-500 rounded-sm shadow-[0_0_10px_rgba(249,115,22,0.8)] absolute bottom-2 left-4" />
            <motion.div animate={{ x: [0, 80] }} transition={{ repeat: Infinity, duration: 1, ease: "linear", delay: 0.6 }} className="w-2 h-2 bg-emerald-500 rounded-sm shadow-[0_0_10px_rgba(16,185,129,0.8)] absolute bottom-2 left-4" />
          </div>

          <div className="bg-zinc-900 border border-emerald-500/50 w-32 h-32 rounded-xl flex flex-col items-center justify-center z-10 shadow-[0_0_20px_rgba(16,185,129,0.15)] relative">
            <div className="font-bold text-zinc-300 text-center">Debezium<br/>(Kafka)</div>
            <div className="text-[10px] text-zinc-500 mt-2">Listening to WAL</div>
          </div>
        </div>
        <div className="text-xs text-emerald-400 font-bold text-center max-w-sm mt-4 border border-emerald-900/50 bg-emerald-950/20 p-3 rounded-lg">
          CDC tools (like Debezium) invisibly read the transaction log file (WAL) directly from disk. Real-time streaming with ZERO database queries.
        </div>
      </motion.div>
  );
}
