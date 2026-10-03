'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { FileJson, DatabaseBackup } from 'lucide-react';

export function InteractiveSchemaDrift() {
  const [step, setStep] = useState<number>(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 4);
    }, 4000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[400px] overflow-hidden">
        
        <div className="text-zinc-500 font-bold mb-4 font-mono text-sm border-b border-zinc-700 pb-2 w-full text-center">
          The Problem: Software Engineers adding/dropping DB columns
        </div>

        <div className="flex justify-between items-center w-full max-w-lg font-mono relative mt-8 h-48">
          
          {/* Software Engineer (Upstream) */}
          <div className="flex flex-col items-center gap-2 relative z-10 w-48">
            <div className="bg-zinc-900 border-2 border-zinc-700 p-3 rounded-xl w-full">
              <div className="text-zinc-500 text-xs font-bold mb-2">App Backend (V1)</div>
              <div className="text-[10px] text-zinc-300 flex flex-col gap-1">
                <span>id: int</span>
                <span>name: string</span>
                <AnimatePresence>
                  {step >= 1 && (
                    <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="text-emerald-400 font-bold bg-emerald-950/30 px-1 rounded">
                      + age: int
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Data Engineer (Downstream) */}
          <div className="flex flex-col items-center gap-2 relative z-10 w-48">
            <div className={`bg-zinc-900 border-2 p-3 rounded-xl w-full transition-colors duration-500 ${step === 2 ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : step === 3 ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-zinc-700'}`}>
              <div className="text-zinc-500 text-xs font-bold mb-2">Data Warehouse</div>
              <div className="text-[10px] text-zinc-300 flex flex-col gap-1">
                <span>id: int</span>
                <span>name: string</span>
                <AnimatePresence>
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-400 font-bold mt-2">
                      CRASH! Column "age" does not exist in target table!
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-blue-400 font-bold mt-1 bg-blue-950/30 p-1 rounded">
                      _raw_json: JSONB
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="absolute top-1/2 left-48 right-48 h-0.5 bg-zinc-700 -translate-y-1/2 -z-10" />

          {/* Payloads */}
          <AnimatePresence>
            {step === 0 && (
              <motion.div initial={{ x: 0 }} animate={{ x: 180 }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute top-1/2 left-32 -translate-y-1/2 w-8 h-6 bg-zinc-800 border border-zinc-600 rounded text-[8px] flex items-center justify-center text-zinc-400 z-0">
                Data
              </motion.div>
            )}
            {step === 1 && (
              <motion.div initial={{ x: 0 }} animate={{ x: 180 }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute top-1/2 left-32 -translate-y-1/2 w-8 h-6 bg-emerald-900/50 border border-emerald-500/50 rounded text-[8px] flex items-center justify-center text-emerald-400 z-0 font-bold">
                +age
              </motion.div>
            )}
            {step === 2 && (
              <motion.div initial={{ x: 0 }} animate={{ x: 120, opacity: 0, scale: 2, backgroundColor: '#ef4444' }} transition={{ duration: 0.5 }} className="absolute top-1/2 left-32 -translate-y-1/2 w-8 h-6 bg-red-500 rounded z-0" />
            )}
            {step === 3 && (
              <motion.div initial={{ x: 0 }} animate={{ x: 180 }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute top-1/2 left-32 -translate-y-1/2 w-12 h-6 bg-blue-900/50 border border-blue-500/50 rounded text-[8px] flex items-center justify-center text-blue-400 z-0 font-bold">
                {'{JSON}'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-16 mt-4 text-xs font-mono text-center max-w-md">
          <AnimatePresence mode="wait">
            {step === 0 && <motion.div key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400">Normal operation. Pipeline expects `id` and `name`.</motion.div>}
            {step === 1 && <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400">Software engineer pushes a feature adding an `age` column to the source.</motion.div>}
            {step === 2 && <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-400 font-bold bg-red-950/50 p-2 rounded-lg border border-red-900/50">Pipeline breaks in the middle of the night! Destination schema rejects the unknown column.</motion.div>}
            {step === 3 && <motion.div key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-blue-400 font-bold bg-blue-950/50 p-2 rounded-lg border border-blue-900/50">SOLUTION: Use Schema Registries (Avro) OR dump everything into a VARIANT/JSONB column first (ELT pattern) so pipelines never break.</motion.div>}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
