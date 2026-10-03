'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Save, Radio } from 'lucide-react';

const CONCEPTS = [
  { 
    id: 'cache', 
    label: 'Cache / Persist', 
    icon: Save, 
    desc: 'Saves a DataFrame in executor memory so you don\'t recompute it from scratch multiple times.', 
    highlight: 'blue'
  },
  { 
    id: 'broadcast', 
    label: 'Broadcast Join', 
    icon: Radio, 
    desc: 'Sends a tiny table to EVERY executor to join with a massive table locally, avoiding a network shuffle.', 
    highlight: 'emerald'
  }
] as const;

export function InteractiveCache() {
  const [activeType, setActiveType] = useState<string>('cache');
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
    }, 7000); 

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
                layoutId="active-type-bg-cache"
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

      <div className="text-sm font-mono text-zinc-400 h-12 md:h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[400px] overflow-hidden">
        <AnimatePresence mode="wait">
          <StrategyState key={activeType} type={activeType} reduceMotion={shouldReduceMotion} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function StrategyState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    let s = 0;
    const int = setInterval(() => {
      if (s === 0) setStep(1);
      else if (s === 1) setStep(2);
      else {
        s = -1;
        setStep(0);
      }
      s++;
    }, 2000);
    return () => clearInterval(int);
  }, [type]);

  if (type === 'cache') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6 font-mono w-full h-full text-xs">
        <div className="flex justify-between w-full max-w-xl h-56 relative items-center">
          
          <div className="w-48 bg-zinc-900 border border-zinc-700 rounded p-4 shadow-lg text-zinc-400">
            <div className="text-blue-400 font-bold mb-2">Driver Code</div>
            <div className="mb-2">df = read("1TB").filter(...)</div>
            <div className="bg-blue-950/50 border border-blue-500 rounded p-1 text-blue-300 font-bold mb-2">df.cache()</div>
            <div className={`transition-colors ${step >= 1 ? 'text-white' : 'text-zinc-600'}`}>df.count() // Action 1</div>
            <div className={`transition-colors ${step >= 2 ? 'text-white' : 'text-zinc-600'}`}>df.show() // Action 2</div>
          </div>

          <div className="w-48 bg-zinc-900 border border-zinc-700 rounded p-4 shadow-lg flex flex-col items-center">
            <div className="text-zinc-400 font-bold mb-4">Executor RAM</div>
            <div className="w-32 h-32 border-2 border-zinc-700 bg-zinc-950 rounded flex flex-col justify-end overflow-hidden relative">
              <AnimatePresence>
                {step >= 1 && (
                  <motion.div initial={{ height: 0 }} animate={{ height: '50%' }} className="w-full bg-blue-500/50 border-t-2 border-blue-500 flex items-center justify-center font-bold text-blue-300 text-[10px]">
                    Cached df
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <AnimatePresence>
            {step === 1 && <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-24 left-52 text-[10px] text-zinc-400 bg-zinc-800 p-1 rounded">Reads from DISK</motion.div>}
            {step === 2 && <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ opacity: 0 }} className="absolute bottom-16 right-52 text-[10px] text-blue-400 bg-blue-950 p-1 rounded font-bold border border-blue-900 z-10">Reads from RAM!<br/>(100x Faster)</motion.div>}
          </AnimatePresence>

        </div>
        
        <div className="h-12 text-center text-blue-400 font-bold max-w-md">
          {step === 0 && "Defining operations..."}
          {step === 1 && "Action 1 triggers disk read and computation. Data is then saved to RAM."}
          {step === 2 && "Action 2 skips the disk and recomputation, reading directly from RAM cache."}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6 font-mono w-full h-full text-xs">
        <div className="flex flex-col items-center w-full max-w-xl h-56 relative">
          
          <div className="absolute top-0 text-emerald-400 font-bold">Driver Code: <span className="text-zinc-300">big_sales.join(broadcast(small_stores))</span></div>
          
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-24 h-16 bg-zinc-900 border border-emerald-500/50 rounded flex flex-col items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="text-zinc-400 text-[10px]">Driver</span>
            <span className="text-emerald-400 font-bold text-[10px]">Small Table (10MB)</span>
            <Radio className="w-4 h-4 text-emerald-500 mt-1" />
          </div>

          <div className="absolute bottom-0 w-full flex justify-between">
            <div className="w-40 bg-zinc-900 border border-zinc-700 rounded p-2 flex flex-col items-center h-24">
              <span className="text-zinc-500 font-bold">Executor 1</span>
              <div className="w-full h-8 bg-zinc-800 rounded mt-1 text-center text-[10px] leading-8 text-zinc-500">Big Table Chunk</div>
              <AnimatePresence>
                {step >= 1 && <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full h-8 bg-emerald-950 border border-emerald-500 rounded mt-1 text-center text-[10px] leading-8 text-emerald-400 font-bold">Small Table Copy</motion.div>}
              </AnimatePresence>
            </div>
            <div className="w-40 bg-zinc-900 border border-zinc-700 rounded p-2 flex flex-col items-center h-24">
              <span className="text-zinc-500 font-bold">Executor 2</span>
              <div className="w-full h-8 bg-zinc-800 rounded mt-1 text-center text-[10px] leading-8 text-zinc-500">Big Table Chunk</div>
              <AnimatePresence>
                {step >= 1 && <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full h-8 bg-emerald-950 border border-emerald-500 rounded mt-1 text-center text-[10px] leading-8 text-emerald-400 font-bold">Small Table Copy</motion.div>}
              </AnimatePresence>
            </div>
          </div>

          {/* SVG Signals */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10">
            {step >= 1 && (
              <>
                <motion.path d="M 288 80 L 160 160" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
                <motion.path d="M 288 80 L 416 160" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
              </>
            )}
          </svg>

        </div>
        
        <div className="h-12 mt-4 text-center text-emerald-400 font-bold max-w-md">
          {step === 0 && "A normal join requires a massive, expensive network shuffle of the Big Table."}
          {step >= 1 && "By broadcasting the 10MB table to all nodes, the join happens 100% locally on each executor. Zero shuffle!"}
        </div>
      </motion.div>
  );
}
