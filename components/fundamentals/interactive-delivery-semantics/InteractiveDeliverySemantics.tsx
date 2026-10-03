'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { PackageX, CopyPlus, ShieldCheck } from 'lucide-react';

const SEMANTICS = [
  { id: 'at_most', label: 'At-most-once', icon: PackageX, highlight: 'red' },
  { id: 'at_least', label: 'At-least-once', icon: CopyPlus, highlight: 'orange' },
  { id: 'exactly', label: 'Exactly-once', icon: ShieldCheck, highlight: 'emerald' }
] as const;

export function InteractiveDeliverySemantics() {
  const [activeSemantics, setActiveSemantics] = useState<string>('at_most');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  useEffect(() => {
    if (userInteracted || !isInView) return;
    const interval = setInterval(() => {
      setActiveSemantics(current => {
        const currentIndex = SEMANTICS.findIndex(s => s.id === current);
        return SEMANTICS[(currentIndex + 1) % SEMANTICS.length].id;
      });
    }, 6000); 
    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full">
        {SEMANTICS.map((sem) => {
          let bgClass = 'bg-red-600';
          if (sem.highlight === 'orange') bgClass = 'bg-orange-600';
          if (sem.highlight === 'emerald') bgClass = 'bg-emerald-600';

          return (
            <button
              key={sem.id}
              onClick={() => { setUserInteracted(true); setActiveSemantics(sem.id); }}
              className={`flex-1 min-w-[150px] px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative ${
                activeSemantics === sem.id ? 'text-white' : 'text-zinc-500'
              }`}
            >
              {activeSemantics === sem.id && (
                <motion.div layoutId="sem-bg" className={`absolute inset-0 rounded-xl -z-10 ${bgClass}`} transition={{ type: "spring", stiffness: 350, damping: 30 }} />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2"><sem.icon className="w-4 h-4" />{sem.label}</span>
            </button>
          );
        })}
      </div>

      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[350px] overflow-hidden">
        <AnimatePresence mode="wait">
          <SemanticsState key={activeSemantics} type={activeSemantics} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function SemanticsState({ type }: { type: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let s = 0;
    const int = setInterval(() => {
      s++;
      setStep(s % 4);
    }, 1500);
    return () => clearInterval(int);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4 font-mono text-xs w-full h-full">
      
      <div className="flex w-full max-w-xl justify-between items-center h-48 relative border-b border-zinc-800 pb-4">
        
        {/* Source */}
        <div className="bg-zinc-900 border border-zinc-700 w-24 h-24 rounded-xl flex flex-col items-center justify-center z-10">
          <span className="text-zinc-500 font-bold mb-2">Kafka</span>
          <div className="bg-blue-500 text-white px-2 py-1 rounded text-[10px] font-bold">Msg A</div>
        </div>

        {/* Processing / Network */}
        <div className="relative w-48 h-full flex items-center justify-center">
          <AnimatePresence>
            {step === 1 && (
              <motion.div initial={{ x: -80 }} animate={{ x: 80 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute bg-blue-500 text-white px-2 py-1 rounded text-[10px] font-bold z-20">Msg A</motion.div>
            )}
            {step === 2 && type === 'at_least' && (
              <motion.div initial={{ x: -80 }} animate={{ x: 80 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute bg-orange-500 text-white px-2 py-1 rounded text-[10px] font-bold z-20">Msg A (Retry)</motion.div>
            )}
            {step === 2 && type === 'exactly' && (
              <motion.div initial={{ x: -80 }} animate={{ x: 80 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute bg-orange-500 text-white px-2 py-1 rounded text-[10px] font-bold z-20">Msg A (Retry)</motion.div>
            )}
            
            {/* ACK */}
            {step === 3 && type === 'exactly' && (
              <motion.div initial={{ x: 80 }} animate={{ x: -80 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute bg-zinc-700 text-emerald-400 px-2 py-1 rounded text-[10px] font-bold z-20">ACK</motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Destination (Consumer/DB) */}
        <div className="bg-zinc-900 border border-zinc-700 w-32 h-32 rounded-xl flex flex-col items-center justify-center z-10 relative overflow-hidden">
          <span className="text-zinc-500 font-bold mb-2">DB Table</span>
          <div className="w-full flex flex-col gap-1 px-2">
            <AnimatePresence>
              {(step >= 2 && type !== 'at_most') || (step === 1 && type === 'at_most') ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-zinc-800 border border-zinc-600 px-2 py-1 rounded text-[10px] text-zinc-300">Row: A</motion.div>
              ) : null}
              {step >= 3 && type === 'at_least' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-orange-950 border border-orange-500 px-2 py-1 rounded text-[10px] text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.5)]">Row: A (Dupe!)</motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Crash simulation */}
          {step === 1 && type !== 'exactly' && (
            <motion.div initial={{ opacity: 0, scale: 2 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 bg-red-500/80 flex items-center justify-center text-white font-bold text-sm">
              CRASH!
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="h-16 mt-4 text-center max-w-lg">
        <AnimatePresence mode="wait">
          {type === 'at_most' && (
            <motion.div key="most" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-400 font-bold">
              Consumer reads message, instantly ACKs, then crashes before writing to DB. When it reboots, it reads Msg B. <span className="text-white">Msg A is permanently lost.</span> (Data Loss)
            </motion.div>
          )}
          {type === 'at_least' && (
            <motion.div key="least" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-orange-400 font-bold">
              Consumer writes to DB, but crashes before sending ACK back to Kafka. When it reboots, Kafka re-sends Msg A. <span className="text-white">DB gets duplicate rows.</span> (Data Duplication)
            </motion.div>
          )}
          {type === 'exactly' && (
            <motion.div key="exact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400 font-bold">
              Requires an <span className="text-white bg-emerald-900/50 px-1 rounded">Idempotent</span> target (e.g. UPSERT in DB) or distributed transactions (Kafka Transactions). It retries under the hood, but the end state reflects exactly one application.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
