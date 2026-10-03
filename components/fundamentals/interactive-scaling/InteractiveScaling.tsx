'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { HardDrive, Server, Copy, SplitSquareHorizontal } from 'lucide-react';

const CONCEPTS = [
  { id: 'sharding', label: 'Sharding (Horizontal)', icon: SplitSquareHorizontal, highlight: 'emerald' },
  { id: 'replication', label: 'Replication (Copying)', icon: Copy, highlight: 'blue' }
] as const;

export function InteractiveScaling() {
  const [activeType, setActiveType] = useState<string>('sharding');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

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

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full">
        {CONCEPTS.map((concept) => (
          <button
            key={concept.id}
            onClick={() => { setUserInteracted(true); setActiveType(concept.id); }}
            className={`flex-1 min-w-[200px] px-4 py-3 rounded-xl text-sm font-bold transition-all relative ${
              activeType === concept.id ? 'text-white' : 'text-zinc-500'
            }`}
          >
            {activeType === concept.id && (
              <motion.div layoutId="scale-bg" className={`absolute inset-0 rounded-xl -z-10 ${concept.highlight === 'emerald' ? 'bg-emerald-600' : 'bg-blue-600'}`} transition={{ type: "spring", stiffness: 350, damping: 30 }} />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2"><concept.icon className="w-4 h-4" />{concept.label}</span>
          </button>
        ))}
      </div>

      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[350px] overflow-hidden">
        <AnimatePresence mode="wait">
          <ScaleState key={activeType} type={activeType} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function ScaleState({ type }: { type: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let s = 0;
    const int = setInterval(() => {
      s++;
      setStep(s % 3);
    }, 2000);
    return () => clearInterval(int);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6 font-mono text-xs w-full h-full">
      
      <div className="flex w-full max-w-xl justify-center items-center h-48 relative gap-12">
        
        {/* Source DB */}
        <div className="bg-zinc-900 border border-zinc-700 w-32 rounded-xl p-4 flex flex-col items-center z-10 shadow-lg relative">
          <div className="text-zinc-400 font-bold mb-2 flex flex-col items-center gap-1"><HardDrive className="w-6 h-6"/> Total Data</div>
          <div className="w-full flex flex-col gap-1 text-[10px] text-white">
            <div className="bg-red-500 rounded p-1 text-center font-bold shadow-[0_0_10px_rgba(239,68,68,0.5)]">Users A-M</div>
            <div className="bg-blue-500 rounded p-1 text-center font-bold shadow-[0_0_10px_rgba(59,130,246,0.5)]">Users N-Z</div>
          </div>
        </div>

        {/* Distributed Nodes */}
        <div className="flex flex-col gap-4">
          <div className="bg-zinc-900 border border-zinc-700 w-32 rounded-xl p-4 flex flex-col items-center z-10 shadow-lg relative">
            <div className="text-zinc-400 font-bold mb-2 flex items-center gap-1"><Server className="w-4 h-4"/> Node 1</div>
            <div className="w-full flex flex-col gap-1 text-[10px] text-white">
              <AnimatePresence>
                {step >= 1 && (
                  <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-red-500 rounded p-1 text-center font-bold">Users A-M</motion.div>
                )}
                {step >= 1 && type === 'replication' && (
                  <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-blue-500 rounded p-1 text-center font-bold mt-1">Users N-Z</motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 w-32 rounded-xl p-4 flex flex-col items-center z-10 shadow-lg relative">
            <div className="text-zinc-400 font-bold mb-2 flex items-center gap-1"><Server className="w-4 h-4"/> Node 2</div>
            <div className="w-full flex flex-col gap-1 text-[10px] text-white h-[44px]">
              <AnimatePresence>
                {step >= 2 && type === 'sharding' && (
                  <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-blue-500 rounded p-1 text-center font-bold">Users N-Z</motion.div>
                )}
                {step >= 2 && type === 'replication' && (
                  <>
                    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-red-500 rounded p-1 text-center font-bold">Users A-M</motion.div>
                    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-blue-500 rounded p-1 text-center font-bold mt-1">Users N-Z</motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-20 mt-4 text-center max-w-lg">
        {type === 'sharding' && <div className="text-emerald-400 font-bold bg-emerald-950/20 p-4 rounded border border-emerald-900">Sharding splits the data. Node 1 only holds half, Node 2 holds the other half. Great for massive write throughput and scaling storage infinitely.</div>}
        {type === 'replication' && <div className="text-blue-400 font-bold bg-blue-950/20 p-4 rounded border border-blue-900">Replication copies ALL data to every node. Node 1 and Node 2 are identical. Great for massive read throughput and high availability (failover).</div>}
      </div>

    </motion.div>
  );
}
