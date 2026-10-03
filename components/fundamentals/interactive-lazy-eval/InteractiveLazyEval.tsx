'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Play, Coffee, Activity } from 'lucide-react';

export function InteractiveLazyEval() {
  const [step, setStep] = useState<number>(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 6);
    }, 2000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[400px] overflow-hidden">
        
        <div className="absolute top-4 left-4 font-mono text-xs text-zinc-500 flex items-center gap-2">
          <Coffee className="w-4 h-4" /> Lazy Evaluation in Spark
        </div>

        <div className="relative w-full max-w-lg h-64 flex justify-between font-mono text-xs">
          
          {/* Driver code column */}
          <div className="w-1/2 flex flex-col gap-2 pr-4 relative z-10">
            <div className="text-zinc-500 font-bold mb-2">Driver Program (Python)</div>
            
            <div className={`p-2 rounded border transition-colors ${step >= 0 ? 'bg-zinc-800 text-zinc-300 border-zinc-700' : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}>
              df1 = spark.read.csv("data")
            </div>
            
            <div className={`p-2 rounded border transition-colors ${step >= 1 ? 'bg-zinc-800 text-zinc-300 border-zinc-700' : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}>
              <span className="text-blue-400 font-bold text-[10px] block mb-1">TRANSFORMATION</span>
              df2 = df1.filter(age &gt; 21)
            </div>
            
            <div className={`p-2 rounded border transition-colors ${step >= 2 ? 'bg-zinc-800 text-zinc-300 border-zinc-700' : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}>
              <span className="text-blue-400 font-bold text-[10px] block mb-1">TRANSFORMATION</span>
              df3 = df2.select("name")
            </div>

            <div className={`p-2 rounded border transition-colors ${step >= 4 ? 'bg-emerald-900/50 text-emerald-400 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}>
              <span className="text-emerald-400 font-bold text-[10px] block mb-1 flex items-center gap-1"><Play className="w-3 h-3"/> ACTION</span>
              df3.count()
            </div>
          </div>

          {/* Cluster execution column */}
          <div className="w-1/2 flex flex-col items-center justify-center border-l border-zinc-800 pl-4 relative z-10">
            <div className="absolute top-0 text-zinc-500 font-bold w-full text-center mb-2">Spark Cluster (Executors)</div>
            
            <AnimatePresence mode="wait">
              {step <= 2 && (
                <motion.div key="lazy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-zinc-500 gap-4 mt-8">
                  <Coffee className="w-12 h-12" />
                  <span className="text-center">Cluster is sleeping.<br/>Building DAG in memory...<br/>0 bytes processed.</span>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="optimize" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-blue-400 gap-4 mt-8 font-bold">
                  <Activity className="w-12 h-12" />
                  <span className="text-center">Catalyst Engine optimizes the plan!<br/>(e.g., pushes filter down to source)</span>
                </motion.div>
              )}
              {step >= 4 && (
                <motion.div key="exec" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-emerald-400 gap-4 mt-8 font-bold w-full">
                  <div className="w-full bg-emerald-950/20 border-2 border-emerald-500 rounded-lg p-2 text-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    Executing Job!
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="w-1/2 h-16 bg-zinc-900 border border-zinc-700 rounded m-1 flex items-center justify-center relative overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1 }} className="absolute left-0 top-0 bottom-0 bg-emerald-900/50 -z-10" />
                      Task 1
                    </div>
                    <div className="w-1/2 h-16 bg-zinc-900 border border-zinc-700 rounded m-1 flex items-center justify-center relative overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, delay: 0.2 }} className="absolute left-0 top-0 bottom-0 bg-emerald-900/50 -z-10" />
                      Task 2
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        <div className="h-16 mt-4 text-xs font-mono text-center max-w-lg">
          <AnimatePresence mode="wait">
            {step === 0 && <motion.div key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400">Spark sees the read command. It creates a pointer, but reads nothing.</motion.div>}
            {step === 1 && <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-blue-400 font-bold">Transformation: filter() is added to the DAG. No data is moved.</motion.div>}
            {step === 2 && <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-blue-400 font-bold">Transformation: select() is added. Still 100% lazy.</motion.div>}
            {step === 3 && <motion.div key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-purple-400 font-bold">Spark looks at the entire DAG chain and optimizes it before running.</motion.div>}
            {step === 4 && <motion.div key="4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400 font-bold">Action: count() triggers execution! The cluster finally wakes up and runs.</motion.div>}
            {step === 5 && <motion.div key="5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-400 font-bold bg-red-950/20 border border-red-900 rounded p-1">If there was a syntax error in filter(), it would only crash NOW, not at step 1!</motion.div>}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
