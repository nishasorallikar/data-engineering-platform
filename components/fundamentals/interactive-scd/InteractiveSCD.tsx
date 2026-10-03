'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Delete, History, ArrowRightToLine } from 'lucide-react';

const TYPES = [
  { 
    id: 'type1', 
    label: 'Type 1 (Overwrite)', 
    icon: Delete, 
    desc: 'Overwrites the old value. History is lost. Used for correcting typos.', 
    highlight: 'red'
  },
  { 
    id: 'type2', 
    label: 'Type 2 (History Row)', 
    icon: History, 
    desc: 'Adds a new row with validity dates (start/end) and an active flag. The gold standard for warehouse history.', 
    highlight: 'emerald'
  },
  { 
    id: 'type3', 
    label: 'Type 3 (New Column)', 
    icon: ArrowRightToLine, 
    desc: 'Adds a "previous_value" column. Keeps only current and previous state. Rarely used.', 
    highlight: 'blue'
  }
] as const;

export function InteractiveSCD() {
  const [activeType, setActiveType] = useState<string>('type1');
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
    }, 6000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = TYPES.find(t => t.id === activeType)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      {/* Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full">
        {TYPES.map((type) => {
          let bgClass = 'bg-red-600';
          if (type.highlight === 'emerald') bgClass = 'bg-emerald-600';
          if (type.highlight === 'blue') bgClass = 'bg-blue-600';

          return (
            <button
              key={type.id}
              onClick={() => {
                setUserInteracted(true);
                setActiveType(type.id);
              }}
              className={`flex-1 min-w-[150px] px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative ${
                activeType === type.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {activeType === type.id && (
                <motion.div
                  layoutId="active-type-bg-scd"
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

      {/* Visualizer Architecture */}
      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex items-center justify-center min-h-[350px] overflow-hidden">
        <AnimatePresence mode="wait">
          <SCDState key={activeType} type={activeType} reduceMotion={shouldReduceMotion} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function SCDState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  let displayContent;

  switch(type) {
    case 'type1':
      displayContent = (
        <div className="flex flex-col gap-4 font-mono text-xs w-full max-w-lg">
          <div className="text-center font-bold text-zinc-500 mb-2">Event: Bob moves from NY to SF</div>
          <div className="bg-zinc-900 border border-red-900/50 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(239,68,68,0.1)] relative">
            <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400 border-b border-zinc-700">
              <span className="w-1/3">User_ID</span><span className="w-1/3">Name</span><span className="w-1/3">City</span>
            </div>
            <div className="p-4 flex items-center text-sm relative overflow-hidden h-16">
              <span className="w-1/3 text-purple-400 font-bold">1</span>
              <span className="w-1/3 text-zinc-300">Bob</span>
              
              <div className="w-1/3 relative h-6">
                <motion.div initial={{ y: 0 }} animate={{ y: 30, opacity: 0 }} transition={{ delay: 1, duration: 0.5 }} className="absolute inset-0 text-red-400 line-through">
                  NY
                </motion.div>
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }} className="absolute inset-0 text-emerald-400 font-bold">
                  SF
                </motion.div>
              </div>
            </div>
            <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: "100%", opacity: 1 }} transition={{ delay: 1, duration: 0.2 }} className="absolute h-1 bg-red-500 bottom-0 left-0" />
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-center text-red-500 font-bold mt-2">
            History is destroyed. We cannot know Bob ever lived in NY.
          </motion.div>
        </div>
      );
      break;
    case 'type2':
      displayContent = (
        <div className="flex flex-col gap-2 font-mono text-xs w-full max-w-2xl">
          <div className="text-center font-bold text-zinc-500 mb-2">Event: Bob moves from NY to SF</div>
          <div className="bg-zinc-900 border border-emerald-900/50 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)] relative">
            <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400 border-b border-zinc-700">
              <span className="w-2/12">Surr_Key</span>
              <span className="w-2/12">Name</span>
              <span className="w-2/12">City</span>
              <span className="w-2/12 text-center">Start_Dt</span>
              <span className="w-2/12 text-center">End_Dt</span>
              <span className="w-2/12 text-center">Is_Active</span>
            </div>
            
            {/* Original Row, gets updated */}
            <div className="flex p-3 items-center border-b border-zinc-800 relative">
              <span className="w-2/12 text-purple-400 font-bold">100</span>
              <span className="w-2/12 text-zinc-300">Bob</span>
              <span className="w-2/12 text-zinc-400">NY</span>
              <span className="w-2/12 text-center text-zinc-500">2023-01-01</span>
              
              <div className="w-2/12 relative h-4 text-center">
                <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 1 }} className="absolute inset-0 text-zinc-500">9999-12-31</motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute inset-0 text-red-400 font-bold">2024-02-15</motion.div>
              </div>
              
              <div className="w-2/12 relative h-4 text-center">
                <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 1 }} className="absolute inset-0 text-emerald-400 font-bold">TRUE</motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute inset-0 text-red-400 font-bold">FALSE</motion.div>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute inset-0 bg-red-900/10 pointer-events-none" />
            </div>

            {/* New Row, gets inserted */}
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: 'auto', opacity: 1 }} 
              transition={{ delay: 2, duration: 0.5 }}
              className="flex p-3 items-center bg-emerald-900/20 border-l-4 border-emerald-500"
            >
              <span className="w-2/12 text-purple-400 font-bold">101</span>
              <span className="w-2/12 text-zinc-300">Bob</span>
              <span className="w-2/12 text-emerald-400 font-bold">SF</span>
              <span className="w-2/12 text-center text-zinc-300">2024-02-15</span>
              <span className="w-2/12 text-center text-emerald-400 font-bold">9999-12-31</span>
              <span className="w-2/12 text-center text-emerald-400 font-bold">TRUE</span>
            </motion.div>

          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="text-center text-emerald-400 font-bold mt-2">
            Perfect history preservation using a new Surrogate Key.
          </motion.div>
        </div>
      );
      break;
    case 'type3':
      displayContent = (
        <div className="flex flex-col gap-4 font-mono text-xs w-full max-w-xl">
          <div className="text-center font-bold text-zinc-500 mb-2">Event: Bob moves from NY to SF</div>
          <div className="bg-zinc-900 border border-blue-900/50 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.1)] relative">
            <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400 border-b border-zinc-700">
              <span className="w-1/4">User_ID</span>
              <span className="w-1/4">Name</span>
              <span className="w-1/4 text-blue-400">Current_City</span>
              <span className="w-1/4 text-zinc-500">Prev_City</span>
            </div>
            <div className="p-4 flex items-center text-sm relative overflow-hidden h-16">
              <span className="w-1/4 text-purple-400 font-bold">1</span>
              <span className="w-1/4 text-zinc-300">Bob</span>
              
              <div className="w-1/4 relative h-6">
                <motion.div initial={{ y: 0 }} animate={{ y: 30, opacity: 0 }} transition={{ delay: 1, duration: 0.5 }} className="absolute inset-0 text-zinc-400">
                  NY
                </motion.div>
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }} className="absolute inset-0 text-emerald-400 font-bold">
                  SF
                </motion.div>
              </div>

              <div className="w-1/4 relative h-6">
                <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 1, duration: 0 }} className="absolute inset-0 text-zinc-600">
                  NULL
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.5 }} className="absolute inset-0 text-blue-400 font-bold">
                  NY
                </motion.div>
              </div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-center text-blue-400 font-bold mt-2">
            Keeps exactly one layer of history in the same row.
          </motion.div>
        </div>
      );
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-4 w-full h-full"
    >
      {displayContent}
    </motion.div>
  );
}
