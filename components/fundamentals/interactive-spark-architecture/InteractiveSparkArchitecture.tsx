'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Settings, Server, Users } from 'lucide-react';

export function InteractiveSparkArchitecture() {
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  
  // Animation loop states: 'idle' -> 'driver_plan' -> 'distribute' -> 'execute'
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 4);
    }, 2500); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="w-full max-w-4xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[450px] overflow-hidden">
        
        <div className="absolute top-4 left-4 font-mono text-xs text-zinc-500 flex items-center gap-2">
          Spark Cluster Architecture
        </div>

        <div className="relative w-full max-w-2xl h-80 flex flex-col items-center font-mono text-xs">
          
          {/* Driver Node */}
          <motion.div 
            animate={{ 
              boxShadow: step === 1 ? '0 0 30px rgba(59,130,246,0.6)' : '0 0 10px rgba(59,130,246,0.2)' 
            }}
            className="absolute top-0 w-64 bg-blue-950/30 border-2 border-blue-500 rounded-xl p-4 flex flex-col items-center z-20"
          >
            <div className="flex items-center gap-2 font-bold text-blue-400 text-sm mb-2"><Settings className="w-5 h-5"/> Driver Node</div>
            <div className="text-zinc-400 text-center text-[10px]">Contains SparkContext.<br/>Translates code into a DAG.<br/>Schedules tasks to executors.</div>
            
            <AnimatePresence>
              {step === 1 && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-2 bg-blue-900/50 border border-blue-400 px-2 py-1 rounded text-blue-300 font-bold">
                  Building Execution Plan...
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Cluster Manager (Invisible middleman but exists structurally) */}
          <div className="absolute top-28 w-32 h-10 border border-zinc-700 border-dashed rounded flex items-center justify-center text-zinc-600 text-[10px] z-10 bg-zinc-950">
            Cluster Manager<br/>(YARN / K8s)
          </div>

          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Driver to Manager */}
            <path d="M 336, 100 L 336, 112" stroke="#3F3F46" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* Manager to Executors */}
            <path d="M 336, 152 L 336, 180" stroke="#3F3F46" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 336, 160 L 160, 160 L 160, 200" stroke="#3F3F46" strokeWidth="2" fill="none" />
            <path d="M 336, 160 L 512, 160 L 512, 200" stroke="#3F3F46" strokeWidth="2" fill="none" />
            
            {/* Animated task distribution */}
            {step === 2 && (
              <>
                <motion.circle cx="160" cy="180" r="4" fill="#3B82F6" initial={{ cy: 160, cx: 336 }} animate={{ cx: 160, cy: 200 }} transition={{ duration: 0.5 }} />
                <motion.circle cx="512" cy="180" r="4" fill="#3B82F6" initial={{ cy: 160, cx: 336 }} animate={{ cx: 512, cy: 200 }} transition={{ duration: 0.5, delay: 0.1 }} />
              </>
            )}
          </svg>

          {/* Executor 1 */}
          <motion.div 
            animate={{ 
              boxShadow: step === 3 ? '0 0 20px rgba(16,185,129,0.5)' : 'none' 
            }}
            className="absolute bottom-4 left-0 w-48 bg-emerald-950/20 border-2 border-emerald-500/50 rounded-xl p-3 flex flex-col z-20"
          >
            <div className="flex items-center gap-2 font-bold text-emerald-400 mb-2 justify-center"><Server className="w-4 h-4"/> Executor 1</div>
            <div className="flex flex-col gap-1">
              <div className="bg-zinc-900 border border-zinc-700 rounded p-1 text-[10px] text-zinc-400 flex justify-between"><span>Task 1</span> <span className={step===3 ? "text-emerald-400" : ""}>{step===3 ? "Running" : "Idle"}</span></div>
              <div className="bg-zinc-900 border border-zinc-700 rounded p-1 text-[10px] text-zinc-400 flex justify-between"><span>Task 2</span> <span className={step===3 ? "text-emerald-400" : ""}>{step===3 ? "Running" : "Idle"}</span></div>
              <div className="bg-zinc-900 border border-zinc-700 rounded p-1 text-[10px] text-zinc-500 text-center mt-1">Memory Cache (RAM)</div>
            </div>
          </motion.div>

          {/* Executor 2 */}
          <motion.div 
            animate={{ 
              boxShadow: step === 3 ? '0 0 20px rgba(16,185,129,0.5)' : 'none' 
            }}
            className="absolute bottom-4 right-0 w-48 bg-emerald-950/20 border-2 border-emerald-500/50 rounded-xl p-3 flex flex-col z-20"
          >
            <div className="flex items-center gap-2 font-bold text-emerald-400 mb-2 justify-center"><Server className="w-4 h-4"/> Executor 2</div>
            <div className="flex flex-col gap-1">
              <div className="bg-zinc-900 border border-zinc-700 rounded p-1 text-[10px] text-zinc-400 flex justify-between"><span>Task 3</span> <span className={step===3 ? "text-emerald-400" : ""}>{step===3 ? "Running" : "Idle"}</span></div>
              <div className="bg-zinc-900 border border-zinc-700 rounded p-1 text-[10px] text-zinc-400 flex justify-between"><span>Task 4</span> <span className={step===3 ? "text-emerald-400" : ""}>{step===3 ? "Running" : "Idle"}</span></div>
              <div className="bg-zinc-900 border border-zinc-700 rounded p-1 text-[10px] text-zinc-500 text-center mt-1">Memory Cache (RAM)</div>
            </div>
          </motion.div>

        </div>

        <div className="h-16 mt-4 text-xs font-mono text-center max-w-lg">
          <AnimatePresence mode="wait">
            {step === 0 && <motion.div key="s0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400">Code is submitted. The cluster is idle.</motion.div>}
            {step === 1 && <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-blue-400 font-bold">The Driver translates the code into a logical plan, then a physical execution graph (DAG).</motion.div>}
            {step === 2 && <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-300">The Driver schedules individual Tasks and sends them to the Executors.</motion.div>}
            {step === 3 && <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400 font-bold">Executors perform the actual computation on their subset of data in parallel, using their own RAM.</motion.div>}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
