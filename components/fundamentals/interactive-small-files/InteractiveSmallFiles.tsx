'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Database, File, ArrowRight, Zap } from 'lucide-react';

export function InteractiveSmallFiles() {
  const [step, setStep] = useState<number>(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    let stepCount = 0;
    const interval = setInterval(() => {
      if (stepCount === 0) setStep(1); // Show small files
      else if (stepCount === 1) setStep(2); // Show HDFS Namenode crash
      else if (stepCount === 2) setStep(3); // Show compaction
      else if (stepCount === 3) setStep(4); // Show large file
      else {
        stepCount = -1;
        setStep(0);
      }
      stepCount++;
    }, 3000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="w-full max-w-4xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[400px] overflow-hidden">
        
        <div className="flex w-full justify-between items-center font-mono text-xs max-w-2xl h-64 relative">
          
          {/* HDFS NameNode / Storage */}
          <div className="flex flex-col items-center w-64 h-full relative z-10 bg-zinc-900 border border-zinc-700 rounded-xl p-4 shadow-lg">
            <div className="text-zinc-400 font-bold mb-4 flex items-center gap-2"><Database className="w-5 h-5"/> Storage Engine</div>
            
            <AnimatePresence mode="wait">
              {step < 3 ? (
                <motion.div key="small" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-wrap gap-1 justify-center w-full">
                  {/* Generate 50 small file icons */}
                  {Array.from({ length: 48 }).map((_, i) => (
                    <motion.div 
                      key={i} 
                      animate={step === 2 ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.01 }}
                      className={`w-4 h-4 rounded-sm flex items-center justify-center ${step === 2 ? 'bg-red-500' : 'bg-orange-500/50 border border-orange-500'}`}
                    />
                  ))}
                  <div className="text-orange-400 mt-2 font-bold w-full text-center">10,000 files x 10KB</div>
                  {step === 2 && <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-950 border-2 border-red-500 text-red-400 font-bold p-2 rounded shadow-[0_0_20px_rgba(239,68,68,0.8)] z-20">NameNode OOM!</motion.div>}
                </motion.div>
              ) : (
                <motion.div key="large" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-full w-full">
                  <div className="w-32 h-32 bg-emerald-900/30 border-2 border-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] text-emerald-400">
                    <File className="w-12 h-12" />
                  </div>
                  <div className="text-emerald-400 mt-2 font-bold text-center">1 file x 100MB</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Area */}
          <div className="flex flex-col items-center w-32 relative z-10">
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-blue-400 flex flex-col items-center bg-blue-950/50 p-2 border border-blue-900 rounded font-bold">
                <Zap className="w-6 h-6 mb-1"/> Compaction Job
              </motion.div>
            )}
          </div>

          {/* Spark Reader */}
          <div className="flex flex-col items-center w-48 h-full relative z-10 bg-zinc-900 border border-zinc-700 rounded-xl p-4 shadow-lg">
            <div className="text-zinc-400 font-bold mb-4">Spark Reader</div>
            <div className="h-full flex flex-col justify-end w-full">
              <AnimatePresence mode="wait">
                {step < 3 ? (
                  <motion.div key="slow" className="w-full bg-zinc-950 border border-zinc-800 h-32 rounded flex items-end overflow-hidden p-1">
                    <motion.div initial={{ height: 0 }} animate={{ height: step === 2 ? '10%' : '100%' }} transition={{ duration: step===2? 0 : 30 }} className="w-full bg-red-500 rounded-sm flex items-end justify-center pb-2 text-[10px] text-white">Opening files...</motion.div>
                  </motion.div>
                ) : (
                  <motion.div key="fast" className="w-full bg-zinc-950 border border-zinc-800 h-32 rounded flex items-end overflow-hidden p-1">
                    <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 0.5 }} className="w-full bg-emerald-500 rounded-sm flex items-end justify-center pb-2 text-[10px] text-white font-bold">Read Complete!</motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        <div className="h-16 mt-8 text-xs font-mono text-center max-w-lg">
          <AnimatePresence mode="wait">
            {step === 1 && <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-orange-400">Streaming systems often write tiny 10KB files every second.</motion.div>}
            {step === 2 && <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-400 font-bold bg-red-950/20 p-2 rounded border border-red-900">Spark spends 90% of its time just opening and closing files. HDFS NameNode RAM crashes keeping track of 10M file locations.</motion.div>}
            {step === 3 && <motion.div key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-blue-400 font-bold">SOLUTION: Run a periodic Compaction job to merge small files.</motion.div>}
            {step === 4 && <motion.div key="4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400 font-bold bg-emerald-950/20 p-2 rounded border border-emerald-900">Spark loves ~128MB to 1GB files. 1 large file reads infinitely faster than 10,000 tiny files.</motion.div>}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
