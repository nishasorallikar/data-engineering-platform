'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Server, ArrowRightCircle, Users } from 'lucide-react';

export function InteractiveKafkaArch() {
  const [step, setStep] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  useEffect(() => {
    if (userInteracted || !isInView) return;
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 4);
    }, 3000); 
    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      <div className="w-full max-w-4xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[450px] overflow-hidden">
        
        <div className="absolute top-4 left-4 font-mono text-xs flex items-center gap-2 text-zinc-500 font-bold">
          <Server className="w-4 h-4" /> Kafka Architecture
        </div>

        <div className="flex justify-between w-full max-w-3xl items-center mt-8">
          
          {/* Producers */}
          <div className="flex flex-col gap-4">
            <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-xl flex items-center gap-2">
              <span className="text-zinc-400 font-bold text-xs">Producer 1</span>
              {step > 0 && <motion.div animate={{ x: [0, 40], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-blue-500 rounded-full" />}
            </div>
            <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-xl flex items-center gap-2">
              <span className="text-zinc-400 font-bold text-xs">Producer 2</span>
              {step > 0 && <motion.div animate={{ x: [0, 40], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.3 }} className="w-2 h-2 bg-emerald-500 rounded-full" />}
            </div>
          </div>

          {/* Topic & Partitions */}
          <div className="bg-zinc-900 border-2 border-zinc-700 p-4 rounded-xl flex flex-col gap-4 relative shadow-lg w-64">
            <div className="text-center font-bold text-zinc-300">Topic: "page_views"</div>
            
            <div className="flex flex-col gap-2">
              <div className="flex border border-zinc-700 bg-black h-8 rounded relative overflow-hidden">
                <div className="absolute left-1 top-1 text-[8px] text-zinc-600 font-bold">Partition 0</div>
                <div className="w-full h-full flex items-end px-1 gap-1 pb-1 justify-start pl-16">
                  <div className="w-4 h-4 bg-blue-900/50 border border-blue-500 rounded-sm text-[8px] flex items-center justify-center text-blue-300">0</div>
                  <div className="w-4 h-4 bg-blue-900/50 border border-blue-500 rounded-sm text-[8px] flex items-center justify-center text-blue-300">1</div>
                  {step >= 1 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 bg-blue-500 rounded-sm text-[8px] flex items-center justify-center text-white font-bold">2</motion.div>}
                </div>
              </div>
              
              <div className="flex border border-zinc-700 bg-black h-8 rounded relative overflow-hidden">
                <div className="absolute left-1 top-1 text-[8px] text-zinc-600 font-bold">Partition 1</div>
                <div className="w-full h-full flex items-end px-1 gap-1 pb-1 justify-start pl-16">
                  <div className="w-4 h-4 bg-emerald-900/50 border border-emerald-500 rounded-sm text-[8px] flex items-center justify-center text-emerald-300">0</div>
                  {step >= 2 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 bg-emerald-500 rounded-sm text-[8px] flex items-center justify-center text-white font-bold">1</motion.div>}
                </div>
              </div>
            </div>
          </div>

          {/* Consumers */}
          <div className="flex flex-col gap-4">
            <div className="bg-zinc-900 border border-purple-500/50 p-2 rounded-xl flex flex-col items-center shadow-[0_0_15px_rgba(168,85,247,0.15)] relative">
              <div className="absolute -top-3 bg-purple-950 border border-purple-500 text-purple-400 text-[8px] px-2 rounded-full font-bold">Consumer Group A</div>
              <div className="text-zinc-300 font-bold text-xs mt-2 flex items-center gap-1"><Users className="w-3 h-3"/> Consumer 1</div>
              <div className="text-[10px] text-zinc-500">Reads P0</div>
              {step >= 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 bg-purple-500/20 text-purple-300 text-[8px] px-1 rounded">Offset: 2</motion.div>}
            </div>
            <div className="bg-zinc-900 border border-purple-500/50 p-2 rounded-xl flex flex-col items-center shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <div className="text-zinc-300 font-bold text-xs mt-2 flex items-center gap-1"><Users className="w-3 h-3"/> Consumer 2</div>
              <div className="text-[10px] text-zinc-500">Reads P1</div>
              {step >= 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 bg-purple-500/20 text-purple-300 text-[8px] px-1 rounded">Offset: 1</motion.div>}
            </div>
          </div>

        </div>

        <div className="h-20 mt-12 text-xs font-mono text-center max-w-lg">
          <AnimatePresence mode="wait">
            {step === 0 && <motion.div key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400">A Topic is a logical stream of records. It is physically split into Partitions for parallel processing.</motion.div>}
            {step === 1 && <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-blue-400">Producers append records to the end of a specific partition. Once written, they are immutable.</motion.div>}
            {step === 2 && <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400">Each record gets a sequential ID called an Offset (0, 1, 2...).</motion.div>}
            {step === 3 && <motion.div key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-purple-400 font-bold">Consumer Groups read partitions in parallel. They track their progress by storing their current Offset.</motion.div>}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
