'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { AlertCircle, TerminalSquare, RotateCcw, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { 
    id: 'triage', 
    label: '1. Triage & Impact', 
    icon: AlertCircle, 
    desc: 'Is it actually critical? Does it block the CEO dashboard or is it an internal log that can wait until 9 AM?', 
    highlight: 'orange'
  },
  { 
    id: 'diagnose', 
    label: '2. Diagnose', 
    icon: TerminalSquare, 
    desc: 'Check the logs. Is the source API down? Did schema drift break the target? Out of memory?', 
    highlight: 'blue'
  },
  { 
    id: 'remediate', 
    label: '3. Remediate', 
    icon: RotateCcw, 
    desc: 'Fix the code, clear the failed state, and safely backfill/rerun the idempotent pipeline.', 
    highlight: 'purple'
  },
  { 
    id: 'prevent', 
    label: '4. Prevent (Post-Mortem)', 
    icon: CheckCircle2, 
    desc: 'Write a post-mortem. Add a data quality check or alert so it never happens again.', 
    highlight: 'emerald'
  }
] as const;

export function InteractiveIncident() {
  const [activeStep, setActiveStep] = useState<string>('triage');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveStep(current => {
        const currentIndex = STEPS.findIndex(s => s.id === current);
        return STEPS[(currentIndex + 1) % STEPS.length].id;
      });
    }, 5500); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = STEPS.find(s => s.id === activeStep)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-4xl w-full">
        {STEPS.map((step) => {
          let bgClass = 'bg-orange-600';
          if (step.highlight === 'blue') bgClass = 'bg-blue-600';
          if (step.highlight === 'purple') bgClass = 'bg-purple-600';
          if (step.highlight === 'emerald') bgClass = 'bg-emerald-600';

          return (
            <button
              key={step.id}
              onClick={() => {
                setUserInteracted(true);
                setActiveStep(step.id);
              }}
              className={`flex-1 min-w-[180px] px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 relative ${
                activeStep === step.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {activeStep === step.id && (
                <motion.div
                  layoutId="active-step-bg-incident"
                  className={`absolute inset-0 rounded-xl -z-10 ${bgClass}`}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <step.icon className="w-4 h-4 hidden sm:block" />
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-12 md:h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex items-center justify-center min-h-[300px] overflow-hidden">
        <AnimatePresence mode="wait">
          <IncidentState key={activeStep} type={activeStep} reduceMotion={shouldReduceMotion} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function IncidentState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  let displayContent;

  switch(type) {
    case 'triage':
      displayContent = (
        <div className="flex flex-col items-center gap-6 font-mono text-xs w-full max-w-md">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-red-950/50 border-2 border-red-500 p-4 rounded-xl flex items-center gap-4 w-full shadow-[0_0_20px_rgba(239,68,68,0.4)]">
            <AlertCircle className="w-10 h-10 text-red-500" />
            <div>
              <div className="font-bold text-red-400 text-sm">PagerDuty Alert (3:00 AM)</div>
              <div className="text-red-300">Pipeline "core_sales_daily" failed.</div>
            </div>
          </motion.div>
          <div className="flex justify-between w-full gap-4 text-center">
            <div className="bg-zinc-900 border border-zinc-700 p-3 rounded flex-1">
              <div className="text-zinc-500 mb-1">Downstream Users</div>
              <div className="text-zinc-300 font-bold">CEO Dashboard (Critical)</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-700 p-3 rounded flex-1">
              <div className="text-zinc-500 mb-1">Action</div>
              <div className="text-orange-400 font-bold">Wake up and fix it!</div>
            </div>
          </div>
        </div>
      );
      break;
    case 'diagnose':
      displayContent = (
        <div className="flex flex-col w-full max-w-2xl font-mono text-xs">
          <div className="bg-zinc-900 rounded-t-xl p-2 border-b border-zinc-800 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-zinc-500 ml-2">Airflow Logs</span>
          </div>
          <div className="bg-black p-4 rounded-b-xl border-x border-b border-zinc-800 h-48 overflow-hidden text-zinc-300 flex flex-col gap-1">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>[2024-03-01 03:00:01] INFO - Executing task extract_sales</motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>[2024-03-01 03:00:15] INFO - Read 500,000 rows from source.</motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>[2024-03-01 03:00:20] INFO - Writing to Snowflake destination...</motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }} className="text-red-400 font-bold mt-2">
              [2024-03-01 03:00:25] ERROR - SnowflakeSQLException: Column 'tax_rate' not found in table 'FACT_SALES'.
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} className="text-blue-400 font-bold mt-4 animate-pulse">
              Diagnosis: Schema Drift! The upstream API added a 'tax_rate' column.
            </motion.div>
          </div>
        </div>
      );
      break;
    case 'remediate':
      displayContent = (
        <div className="flex flex-col items-center gap-4 font-mono text-xs w-full max-w-lg">
          <div className="bg-purple-950/20 border border-purple-500/50 p-4 rounded-xl w-full">
            <div className="text-purple-400 font-bold mb-2 flex items-center gap-2"><RotateCcw className="w-4 h-4"/> Step 1: Fix Code</div>
            <div className="text-zinc-300">ALTER TABLE FACT_SALES ADD COLUMN tax_rate FLOAT;</div>
          </div>
          <div className="bg-purple-950/20 border border-purple-500/50 p-4 rounded-xl w-full">
            <div className="text-purple-400 font-bold mb-2 flex items-center gap-2"><RotateCcw className="w-4 h-4"/> Step 2: Clear Failed State</div>
            <div className="text-zinc-300">Airflow UI -&gt; &quot;Clear Task&quot; for today&apos;s run.</div>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/50 p-4 rounded-xl w-full">
            <div className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Step 3: Rerun</div>
            <div className="text-zinc-300">Pipeline resumes. Idempotent UPSERT safely writes data. CEO dashboard updates by 4:00 AM.</div>
          </div>
        </div>
      );
      break;
    case 'prevent':
      displayContent = (
        <div className="flex flex-col items-center gap-4 font-mono text-[11px] sm:text-xs w-full max-w-lg text-center">
          <div className="bg-emerald-950/20 border border-emerald-500 p-6 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <div className="text-emerald-400 font-bold text-sm mb-4">Post-Mortem: "The Tax Rate Incident"</div>
            <div className="text-zinc-300 mb-2"><span className="text-zinc-500">Root Cause:</span> Upstream engineering deployed tax calculation feature without notifying data team.</div>
            <div className="text-zinc-300 mb-2"><span className="text-zinc-500">Action Item 1:</span> Implement schema evolution (e.g., auto-add columns) or capture unknowns in JSON.</div>
            <div className="text-zinc-300"><span className="text-zinc-500">Action Item 2:</span> Talk to software engineers about communicating schema changes!</div>
          </div>
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
