'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Fingerprint, Ban, Link, CheckSquare } from 'lucide-react';

const CHECKS = [
  { 
    id: 'unique', 
    label: 'Uniqueness', 
    icon: Fingerprint, 
    desc: 'Ensures the Primary Key has no duplicates. E.g. No two users can have user_id = 1.', 
    highlight: 'blue'
  },
  { 
    id: 'not_null', 
    label: 'Not Null', 
    icon: Ban, 
    desc: 'Ensures critical columns are never empty. E.g. An order must have an amount.', 
    highlight: 'emerald'
  },
  { 
    id: 'ref', 
    label: 'Referential', 
    icon: Link, 
    desc: 'Ensures Foreign Keys actually exist in the parent table. E.g. store_id must exist in DIM_STORE.', 
    highlight: 'purple'
  },
  { 
    id: 'values', 
    label: 'Accepted Values', 
    icon: CheckSquare, 
    desc: 'Ensures data falls within an allowed list. E.g. status must be "placed", "shipped", or "delivered".', 
    highlight: 'orange'
  }
] as const;

export function InteractiveDataQuality() {
  const [activeCheck, setActiveCheck] = useState<string>('unique');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveCheck(current => {
        const currentIndex = CHECKS.findIndex(c => c.id === current);
        return CHECKS[(currentIndex + 1) % CHECKS.length].id;
      });
    }, 6000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = CHECKS.find(c => c.id === activeCheck)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full">
        {CHECKS.map((check) => {
          let bgClass = 'bg-blue-600';
          if (check.highlight === 'emerald') bgClass = 'bg-emerald-600';
          if (check.highlight === 'purple') bgClass = 'bg-purple-600';
          if (check.highlight === 'orange') bgClass = 'bg-orange-600';

          return (
            <button
              key={check.id}
              onClick={() => {
                setUserInteracted(true);
                setActiveCheck(check.id);
              }}
              className={`flex-1 min-w-[150px] px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 relative ${
                activeCheck === check.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {activeCheck === check.id && (
                <motion.div
                  layoutId="active-check-bg"
                  className={`absolute inset-0 rounded-xl -z-10 ${bgClass}`}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <check.icon className="w-4 h-4 hidden sm:block" />
                {check.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-12 md:h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex items-center justify-center min-h-[350px] overflow-hidden">
        <AnimatePresence mode="wait">
          <QualityState key={activeCheck} type={activeCheck} reduceMotion={shouldReduceMotion} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function QualityState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  let displayContent;

  switch(type) {
    case 'unique':
      displayContent = (
        <div className="flex flex-col gap-4 font-mono text-xs w-full max-w-lg items-center">
          <div className="text-center font-bold text-zinc-500">Pipeline validates incoming batch...</div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-lg w-full">
            <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400 border-b border-zinc-700">
              <span className="w-1/3">user_id (PK)</span><span className="w-2/3">name</span>
            </div>
            <div className="flex p-3 border-b border-zinc-800/50">
              <span className="w-1/3 text-blue-400 font-bold">1</span><span className="w-2/3 text-zinc-300">Alice</span>
            </div>
            <div className="flex p-3 border-b border-zinc-800/50">
              <span className="w-1/3 text-blue-400 font-bold">2</span><span className="w-2/3 text-zinc-300">Bob</span>
            </div>
            <motion.div initial={{ backgroundColor: 'transparent' }} animate={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }} transition={{ delay: 1 }} className="flex p-3 items-center relative">
              <span className="w-1/3 text-red-400 font-bold relative">
                1
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">!</motion.div>
              </span>
              <span className="w-2/3 text-zinc-300">Charlie</span>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-red-400 font-bold bg-red-950/50 px-4 py-2 rounded-lg border border-red-900/50">
            FAIL: Duplicate primary key (1) detected!
          </motion.div>
        </div>
      );
      break;
    case 'not_null':
      displayContent = (
        <div className="flex flex-col gap-4 font-mono text-xs w-full max-w-lg items-center">
          <div className="text-center font-bold text-zinc-500">Pipeline validates incoming batch...</div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-lg w-full">
            <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400 border-b border-zinc-700">
              <span className="w-1/3">order_id</span><span className="w-2/3">amount (NOT NULL)</span>
            </div>
            <div className="flex p-3 border-b border-zinc-800/50">
              <span className="w-1/3 text-zinc-300">101</span><span className="w-2/3 text-emerald-400 font-bold">$50.00</span>
            </div>
            <motion.div initial={{ backgroundColor: 'transparent' }} animate={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }} transition={{ delay: 1 }} className="flex p-3 items-center relative">
              <span className="w-1/3 text-zinc-300 relative">
                102
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">!</motion.div>
              </span>
              <span className="w-2/3 text-red-400 font-bold">NULL</span>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-red-400 font-bold bg-red-950/50 px-4 py-2 rounded-lg border border-red-900/50">
            FAIL: Missing required amount field!
          </motion.div>
        </div>
      );
      break;
    case 'ref':
      displayContent = (
        <div className="flex flex-col gap-4 font-mono text-xs w-full max-w-lg items-center">
          
          <div className="flex w-full gap-4 items-end justify-center">
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-lg w-1/2">
              <div className="bg-zinc-800 p-2 text-center font-bold text-zinc-400 border-b border-zinc-700">DIM_STORE</div>
              <div className="p-2 text-center border-b border-zinc-800/50">store_id: 1</div>
              <div className="p-2 text-center border-b border-zinc-800/50">store_id: 2</div>
              <div className="p-2 text-center">store_id: 3</div>
            </div>

            <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-lg w-1/2">
              <div className="bg-zinc-800 p-2 text-center font-bold text-zinc-400 border-b border-zinc-700">FACT_SALES</div>
              <div className="p-2 text-center border-b border-zinc-800/50 text-emerald-400">FK: 2 (OK)</div>
              <div className="p-2 text-center border-b border-zinc-800/50 text-emerald-400">FK: 3 (OK)</div>
              <motion.div initial={{ backgroundColor: 'transparent' }} animate={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }} transition={{ delay: 1 }} className="p-2 text-center font-bold text-red-400">
                FK: 99
              </motion.div>
            </div>
          </div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-red-400 font-bold bg-red-950/50 px-4 py-2 rounded-lg border border-red-900/50 text-center">
            FAIL: store_id 99 does not exist in DIM_STORE!<br/>(Orphaned Record)
          </motion.div>
        </div>
      );
      break;
    case 'values':
      displayContent = (
        <div className="flex flex-col gap-4 font-mono text-xs w-full max-w-lg items-center">
          <div className="text-center font-bold text-zinc-500">Allowed: ['placed', 'shipped', 'delivered']</div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-lg w-full">
            <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400 border-b border-zinc-700">
              <span className="w-1/3">order_id</span><span className="w-2/3">status</span>
            </div>
            <div className="flex p-3 border-b border-zinc-800/50">
              <span className="w-1/3 text-zinc-300">101</span><span className="w-2/3 text-emerald-400 font-bold">placed</span>
            </div>
            <motion.div initial={{ backgroundColor: 'transparent' }} animate={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }} transition={{ delay: 1 }} className="flex p-3 items-center relative">
              <span className="w-1/3 text-zinc-300 relative">
                102
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">!</motion.div>
              </span>
              <span className="w-2/3 text-red-400 font-bold">in_transit</span>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-red-400 font-bold bg-red-950/50 px-4 py-2 rounded-lg border border-red-900/50">
            FAIL: "in_transit" is an unknown status!
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
