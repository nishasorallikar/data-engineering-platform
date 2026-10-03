'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Share2, CheckCircle2, XCircle } from 'lucide-react';

export function InteractiveDAG() {
  const [dagState, setDagState] = useState<'idle' | 'running' | 'a_done' | 'b_fail' | 'c_skip'>('idle');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    let step = 0;
    const interval = setInterval(() => {
      if (step === 0) setDagState('running');
      else if (step === 1) setDagState('a_done');
      else if (step === 2) setDagState('b_fail');
      else if (step === 3) setDagState('c_skip');
      else {
        step = -1;
        setDagState('idle');
      }
      step++;
    }, 2000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[400px] overflow-hidden">
        
        <div className="absolute top-4 left-4 font-mono text-xs text-zinc-500 flex items-center gap-2">
          <Share2 className="w-4 h-4" /> Directed Acyclic Graph (Airflow)
        </div>

        <div className="relative w-full max-w-md h-64 flex flex-col items-center justify-center font-mono">
          
          {/* Node A */}
          <motion.div 
            className={`absolute top-0 left-10 w-24 h-12 border-2 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg z-10 transition-colors duration-300 ${
              dagState === 'idle' ? 'bg-zinc-900 border-zinc-700 text-zinc-400' :
              dagState === 'running' ? 'bg-blue-900/50 border-blue-500 text-blue-400' :
              'bg-emerald-900/50 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
            }`}
          >
            Task A
            {['a_done','b_fail','c_skip'].includes(dagState) && <CheckCircle2 className="absolute -top-2 -right-2 w-5 h-5 text-emerald-500 bg-zinc-950 rounded-full" />}
          </motion.div>

          {/* Node B */}
          <motion.div 
            className={`absolute top-0 right-10 w-24 h-12 border-2 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg z-10 transition-colors duration-300 ${
              ['idle', 'running', 'a_done'].includes(dagState) ? 'bg-zinc-900 border-zinc-700 text-zinc-400' :
              'bg-red-900/50 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-shake'
            }`}
          >
            Task B
            {['b_fail','c_skip'].includes(dagState) && <XCircle className="absolute -top-2 -right-2 w-5 h-5 text-red-500 bg-zinc-950 rounded-full" />}
          </motion.div>

          {/* Node C (Depends on A and B) */}
          <motion.div 
            className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 w-32 h-16 border-2 rounded-lg flex flex-col items-center justify-center font-bold text-sm shadow-lg z-10 transition-colors duration-300 ${
              dagState === 'c_skip' ? 'bg-orange-900/20 border-orange-500/50 text-orange-400 opacity-50' :
              'bg-zinc-900 border-zinc-700 text-zinc-400'
            }`}
          >
            Task C
            <span className="text-[10px] font-normal mt-1 text-zinc-500">Wait for A & B</span>
          </motion.div>

          {/* Connecting Lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ zIndex: 0 }}>
            {/* A to C */}
            <path d="M 85, 48 C 85,120 220,120 220, 175" fill="none" stroke={['a_done','b_fail','c_skip'].includes(dagState) ? "#10B981" : "#3F3F46"} strokeWidth="2" />
            
            {/* B to C */}
            <path d="M 360, 48 C 360,120 220,120 220, 175" fill="none" stroke={['b_fail','c_skip'].includes(dagState) ? "#EF4444" : "#3F3F46"} strokeWidth="2" strokeDasharray={dagState === 'c_skip' ? "4 4" : "none"} />
          </svg>

        </div>

        <div className="h-12 flex items-center justify-center text-xs font-mono">
          <AnimatePresence mode="wait">
            {dagState === 'b_fail' && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-400">Task B failed! Orchestrator halts downstream branch.</motion.div>}
            {dagState === 'c_skip' && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-orange-400 font-bold bg-orange-950/50 px-3 py-1 rounded">Task C is SKIPPED (Upstream Failure)</motion.div>}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
