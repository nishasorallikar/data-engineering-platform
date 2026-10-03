'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Flame, CheckCircle, Activity } from 'lucide-react';

export function InteractiveDataSkew() {
  const [step, setStep] = useState<number>(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    let stepCount = 0;
    const interval = setInterval(() => {
      if (stepCount === 0) setStep(1); // Processing
      else if (stepCount === 1) setStep(2); // Others done, 1 stuck
      else if (stepCount === 2) setStep(3); // Fix applied (Salt)
      else if (stepCount === 3) setStep(4); // Even processing
      else {
        stepCount = -1;
        setStep(0); // Reset
      }
      stepCount++;
    }, 3000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="w-full max-w-4xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[400px] overflow-hidden">
        
        <div className="absolute top-4 left-4 font-mono text-xs flex items-center gap-2">
          {step < 3 ? <span className="text-red-400 font-bold flex items-center gap-1"><Flame className="w-4 h-4"/> Data Skew (groupBy "city")</span> : <span className="text-emerald-400 font-bold flex items-center gap-1"><Activity className="w-4 h-4"/> Salting Applied</span>}
        </div>

        <div className="flex justify-around w-full max-w-2xl font-mono text-xs mt-8">
          
          {/* Node 1 - Small City (Austin) */}
          <div className="flex flex-col items-center gap-2 w-32">
            <div className="font-bold text-zinc-500">Executor 1</div>
            <div className="bg-zinc-900 border border-zinc-700 w-full h-48 rounded-xl relative flex flex-col justify-end p-2 overflow-hidden shadow-lg">
              <div className="absolute top-2 w-full text-center text-zinc-400">Austin (1MB)</div>
              
              <AnimatePresence mode="wait">
                {step === 0 && <motion.div key="empty" className="h-4 w-full bg-zinc-800 rounded" />}
                {step === 1 && <motion.div key="proc1" initial={{ height: '0%' }} animate={{ height: '20%' }} className="w-full bg-blue-500 rounded" />}
                {step === 2 && <motion.div key="done1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center text-emerald-500 font-bold"><CheckCircle className="w-8 h-8"/></motion.div>}
                
                {step === 3 && <motion.div key="proc1b" initial={{ height: '0%' }} animate={{ height: '80%' }} className="w-full bg-blue-500 rounded" />}
                {step === 4 && <motion.div key="done1b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center text-emerald-500 font-bold"><CheckCircle className="w-8 h-8"/></motion.div>}
              </AnimatePresence>
            </div>
            {step === 3 && <div className="text-orange-400 text-[10px] font-bold">New York_1 (33GB)</div>}
          </div>

          {/* Node 2 - Massive City (New York) */}
          <div className="flex flex-col items-center gap-2 w-32">
            <div className="font-bold text-zinc-500">Executor 2</div>
            <div className={`bg-zinc-900 border w-full h-48 rounded-xl relative flex flex-col justify-end p-2 overflow-hidden shadow-lg transition-colors ${step === 2 ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'border-zinc-700'}`}>
              <div className="absolute top-2 w-full text-center text-zinc-400">New York (100GB)</div>
              
              <AnimatePresence mode="wait">
                {step === 0 && <motion.div key="empty" className="h-4 w-full bg-zinc-800 rounded" />}
                {step === 1 && <motion.div key="proc2" initial={{ height: '0%' }} animate={{ height: '30%' }} className="w-full bg-red-500 rounded" />}
                {step === 2 && <motion.div key="stuck2" initial={{ height: '30%' }} animate={{ height: '35%' }} className="w-full bg-red-500 rounded flex items-center justify-center font-bold text-white text-[10px]">OOM Error</motion.div>}
                
                {step === 3 && <motion.div key="proc2b" initial={{ height: '0%' }} animate={{ height: '80%' }} className="w-full bg-blue-500 rounded" />}
                {step === 4 && <motion.div key="done2b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center text-emerald-500 font-bold"><CheckCircle className="w-8 h-8"/></motion.div>}
              </AnimatePresence>
            </div>
            {step === 3 && <div className="text-orange-400 text-[10px] font-bold">New York_2 (33GB)</div>}
          </div>

          {/* Node 3 - Medium City (Seattle) */}
          <div className="flex flex-col items-center gap-2 w-32">
            <div className="font-bold text-zinc-500">Executor 3</div>
            <div className="bg-zinc-900 border border-zinc-700 w-full h-48 rounded-xl relative flex flex-col justify-end p-2 overflow-hidden shadow-lg">
              <div className="absolute top-2 w-full text-center text-zinc-400">Seattle (2MB)</div>
              
              <AnimatePresence mode="wait">
                {step === 0 && <motion.div key="empty" className="h-4 w-full bg-zinc-800 rounded" />}
                {step === 1 && <motion.div key="proc3" initial={{ height: '0%' }} animate={{ height: '40%' }} className="w-full bg-blue-500 rounded" />}
                {step === 2 && <motion.div key="done3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center text-emerald-500 font-bold"><CheckCircle className="w-8 h-8"/></motion.div>}
                
                {step === 3 && <motion.div key="proc3b" initial={{ height: '0%' }} animate={{ height: '80%' }} className="w-full bg-blue-500 rounded" />}
                {step === 4 && <motion.div key="done3b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center text-emerald-500 font-bold"><CheckCircle className="w-8 h-8"/></motion.div>}
              </AnimatePresence>
            </div>
            {step === 3 && <div className="text-orange-400 text-[10px] font-bold">New York_3 (33GB)</div>}
          </div>

        </div>

        <div className="h-16 mt-8 text-xs font-mono text-center max-w-lg">
          <AnimatePresence mode="wait">
            {step === 0 && <motion.div key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400">groupBy("city"). Data is shuffled to executors.</motion.div>}
            {step === 1 && <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-blue-400">Executors start aggregating their assigned keys.</motion.div>}
            {step === 2 && <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-400 font-bold bg-red-950/20 border border-red-900 p-2 rounded">Executors 1 & 3 finish instantly. Executor 2 receives 99% of the data (New York) and crashes! The whole job fails.</motion.div>}
            {step === 3 && <motion.div key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-orange-400 font-bold">SOLUTION (Salting): Append a random number (1-3) to the skewed key so it gets distributed across all nodes.</motion.div>}
            {step === 4 && <motion.div key="4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400 font-bold bg-emerald-950/20 border border-emerald-900 p-2 rounded">Data is evenly distributed. All nodes finish simultaneously. Job Succeeds!</motion.div>}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
