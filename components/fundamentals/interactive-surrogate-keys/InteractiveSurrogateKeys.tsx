'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Key, ShieldAlert } from 'lucide-react';

const CONCEPTS = [
  { 
    id: 'natural', 
    label: 'Natural Key', 
    icon: ShieldAlert, 
    desc: 'A business key (e.g. Email, SSN). Dangerous as a Primary Key because business data can change!', 
    highlight: 'orange'
  },
  { 
    id: 'surrogate', 
    label: 'Surrogate Key', 
    icon: Key, 
    desc: 'A meaningless, auto-generated integer (e.g. ID = 1). Stable forever. The warehouse standard.', 
    highlight: 'purple'
  }
] as const;

export function InteractiveSurrogateKeys() {
  const [activeConcept, setActiveConcept] = useState<string>('natural');
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
    }, 6000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = CONCEPTS.find(c => c.id === activeConcept)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      {/* Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full">
        {CONCEPTS.map((concept) => {
          let bgClass = 'bg-orange-600';
          if (concept.highlight === 'purple') bgClass = 'bg-purple-600';

          return (
            <button
              key={concept.id}
              onClick={() => {
                setUserInteracted(true);
                setActiveConcept(concept.id);
              }}
              className={`flex-1 min-w-[150px] px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative ${
                activeConcept === concept.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {activeConcept === concept.id && (
                <motion.div
                  layoutId="active-concept-bg-keys"
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

      {/* Visualizer Architecture */}
      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex items-center justify-center min-h-[300px] overflow-hidden">
        <AnimatePresence mode="wait">
          <KeyState key={activeConcept} type={activeConcept} reduceMotion={shouldReduceMotion} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function KeyState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  let displayContent;

  switch(type) {
    case 'natural':
      displayContent = (
        <div className="flex flex-col gap-4 font-mono text-xs w-full max-w-md relative">
          
          <div className="flex justify-between items-end mb-2">
            <div className="text-center font-bold text-emerald-400">USERS (Dim)</div>
            <div className="text-center font-bold text-indigo-400">ORDERS (Fact)</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-1/2 bg-zinc-900 border border-orange-500 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(249,115,22,0.2)] z-10 relative">
              <div className="flex bg-orange-950 p-2 font-bold text-orange-400 border-b border-orange-900/50">
                <span className="w-full">Email (Primary Key)</span>
              </div>
              <div className="p-3 text-zinc-300 text-center relative overflow-hidden">
                <motion.div initial={{ y: 0 }} animate={{ y: -30 }} transition={{ delay: 2, duration: 0.5 }} className="absolute inset-0 flex items-center justify-center">
                  alice@old.com
                </motion.div>
                <motion.div initial={{ y: 30 }} animate={{ y: 0 }} transition={{ delay: 2, duration: 0.5 }} className="text-emerald-400 font-bold">
                  alice@new.com
                </motion.div>
                <div className="opacity-0">placeholder</div>
              </div>
            </div>

            <div className="w-16 h-1 relative">
              <div className="absolute w-full h-full bg-orange-500/50" />
              <motion.div initial={{ scaleX: 1, backgroundColor: '#f97316', opacity: 0.5 }} animate={{ scaleX: 0, backgroundColor: '#ef4444', opacity: 1 }} transition={{ delay: 2.2, duration: 0.2 }} className="absolute w-full h-full origin-left" />
            </div>

            <div className="w-1/2 bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden z-10">
              <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400 border-b border-zinc-700">
                <span className="w-full">User_Email (Foreign Key)</span>
              </div>
              <div className="p-3 text-zinc-500 text-center">
                alice@old.com
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="text-center text-red-500 font-bold bg-red-950/50 p-2 rounded-lg mt-4 border border-red-900/50">
            DANGER: Alice changes her email. The JOIN breaks! Millions of historic fact records are now orphaned.
          </motion.div>

        </div>
      );
      break;
    case 'surrogate':
      displayContent = (
        <div className="flex flex-col gap-4 font-mono text-xs w-full max-w-md relative">
          
          <div className="flex justify-between items-end mb-2">
            <div className="text-center font-bold text-emerald-400">USERS (Dim)</div>
            <div className="text-center font-bold text-indigo-400">ORDERS (Fact)</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-1/2 bg-zinc-900 border border-purple-500 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.2)] z-10 relative">
              <div className="flex bg-purple-950 p-2 font-bold text-purple-400 border-b border-purple-900/50 justify-between">
                <span>user_id (PK)</span>
                <span className="text-zinc-500 font-normal">email</span>
              </div>
              <div className="p-3 text-center flex justify-between relative overflow-hidden">
                <span className="text-purple-400 font-bold">1</span>
                
                <div className="relative w-24 h-4 overflow-hidden">
                  <motion.div initial={{ y: 0 }} animate={{ y: -30 }} transition={{ delay: 2, duration: 0.5 }} className="absolute inset-0 text-right text-zinc-500">
                    alice@old
                  </motion.div>
                  <motion.div initial={{ y: 30 }} animate={{ y: 0 }} transition={{ delay: 2, duration: 0.5 }} className="absolute inset-0 text-right text-emerald-400 font-bold">
                    alice@new
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="w-16 h-1 bg-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />

            <div className="w-1/2 bg-zinc-900 border border-purple-500/50 rounded-xl overflow-hidden z-10">
              <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400 border-b border-zinc-700">
                <span className="w-full">user_id (FK)</span>
              </div>
              <div className="p-3 text-purple-400 font-bold text-center">
                1
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="text-center text-emerald-500 font-bold bg-emerald-950/50 p-2 rounded-lg mt-4 border border-emerald-900/50">
            SAFE: Alice changes her email, but the Surrogate Key (1) never changes. Historical joins remain perfectly intact.
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
      className="absolute inset-0 flex flex-col items-center justify-center p-4 w-full h-full"
    >
      {displayContent}
    </motion.div>
  );
}
