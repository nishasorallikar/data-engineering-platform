'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Repeat } from 'lucide-react';

const CONCEPTS = [
  { 
    id: 'non_idempotent', 
    label: 'Non-Idempotent (INSERT)', 
    icon: AlertTriangle, 
    desc: 'Running the pipeline twice duplicates the data. A nightmare for retries.', 
    highlight: 'red'
  },
  { 
    id: 'idempotent', 
    label: 'Idempotent (UPSERT)', 
    icon: ShieldCheck, 
    desc: 'Running the pipeline 100 times yields the exact same result as running it once.', 
    highlight: 'emerald'
  }
] as const;

export function InteractiveIdempotency() {
  const [activeConcept, setActiveConcept] = useState<string>('non_idempotent');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveConcept(current => {
        const currentIndex = CONCEPTS.findIndex(c => c.id === current);
        return CONCEPTS[(currentIndex + 1) % CONCEPTS.length].id;
      });
    }, 5500); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = CONCEPTS.find(c => c.id === activeConcept)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full">
        {CONCEPTS.map((concept) => {
          let bgClass = 'bg-red-600';
          if (concept.highlight === 'emerald') bgClass = 'bg-emerald-600';

          return (
            <button
              key={concept.id}
              onClick={() => {
                setUserInteracted(true);
                setActiveConcept(concept.id);
              }}
              className={`flex-1 min-w-[200px] px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative ${
                activeConcept === concept.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {activeConcept === concept.id && (
                <motion.div
                  layoutId="active-concept-bg-idem"
                  className={`absolute inset-0 rounded-xl -z-10 ${bgClass}`}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <concept.icon className="w-4 h-4" />
                {concept.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[350px] overflow-hidden">
        
        <div className="flex gap-4 font-mono text-sm w-full max-w-lg mb-8">
          <div className="w-1/2 text-center text-zinc-500 font-bold">Source Data</div>
          <div className="w-1/2 text-center text-zinc-500 font-bold">Destination Table</div>
        </div>

        <div className="relative w-full max-w-lg h-32">
          {/* Source Box */}
          <div className="absolute left-0 w-32 h-24 bg-zinc-900 border border-zinc-700 rounded-xl flex items-center justify-center shadow-lg z-10">
            <div className="bg-blue-900/50 border border-blue-500/50 p-2 rounded text-blue-300 font-mono text-xs">
              ID: 1<br/>Val: 100
            </div>
          </div>

          {/* Destination Box */}
          <div className="absolute right-0 w-48 h-32 bg-zinc-900 border-2 border-zinc-700 rounded-xl p-2 shadow-lg z-10 flex flex-col gap-1 overflow-hidden">
            <AnimatePresence mode="popLayout">
              {/* Initial load */}
              <motion.div key="load1" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="bg-emerald-900/20 border border-emerald-500/30 p-1.5 rounded text-emerald-400 font-mono text-[10px] flex justify-between">
                <span>ID: 1</span><span>Val: 100</span>
              </motion.div>
              
              {/* Retry logic based on type */}
              {activeConcept === 'non_idempotent' && (
                <motion.div key="load2_non" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.5 }} className="bg-red-900/20 border border-red-500/50 p-1.5 rounded text-red-400 font-mono text-[10px] flex justify-between shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                  <span>ID: 1</span><span>Val: 100</span>
                </motion.div>
              )}
              {activeConcept === 'idempotent' && (
                <motion.div key="load2_idem" initial={{ opacity: 0, scale: 1.2, backgroundColor: '#10b981' }} animate={{ opacity: 1, scale: 1, backgroundColor: 'transparent' }} transition={{ delay: 2.5 }} className="bg-emerald-900/20 border border-emerald-500/50 p-1.5 rounded text-emerald-400 font-mono text-[10px] flex justify-between absolute top-2 left-2 right-2 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                  <span>ID: 1</span><span>Val: 100</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Connecting Pipe */}
          <div className="absolute left-32 right-48 top-12 h-2 bg-zinc-800" />
          
          {/* Data Packets */}
          <motion.div 
            initial={{ left: 128, opacity: 1 }} 
            animate={{ left: 250, opacity: 0 }} 
            transition={{ delay: 0.3, duration: 0.5, ease: "linear" }} 
            className="absolute top-10 w-4 h-4 bg-blue-500 rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          />
          <motion.div 
            key={`${activeConcept}-retry`}
            initial={{ left: 128, opacity: 1 }} 
            animate={{ left: 250, opacity: 0 }} 
            transition={{ delay: 2.3, duration: 0.5, ease: "linear" }} 
            className={`absolute top-10 w-4 h-4 rounded-sm shadow-lg ${activeConcept === 'non_idempotent' ? 'bg-red-500 shadow-red-500' : 'bg-emerald-500 shadow-emerald-500'}`}
          />

          {/* Action Labels */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ delay: 0, duration: 1.5 }} className="absolute left-1/2 top-4 transform -translate-x-1/2 text-xs font-mono text-blue-400 font-bold">
            Run 1: SUCCESS
          </motion.div>
          <motion.div key={`${activeConcept}-label`} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ delay: 2, duration: 1.5 }} className={`absolute left-1/2 top-4 transform -translate-x-1/2 text-xs font-mono font-bold ${activeConcept === 'non_idempotent' ? 'text-red-400' : 'text-emerald-400'}`}>
            Run 2 (Retry): {activeConcept === 'non_idempotent' ? 'INSERT' : 'UPSERT'}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
