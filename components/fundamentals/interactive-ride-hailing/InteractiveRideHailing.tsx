'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Smartphone, Database, Zap, HardDrive, BarChart3, Activity } from 'lucide-react';

export function InteractiveRideHailing() {
  const [step, setStep] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  useEffect(() => {
    if (userInteracted || !isInView) return;
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 6);
    }, 2500); 
    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="w-full max-w-5xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[500px] overflow-hidden font-mono text-xs">
        
        <div className="absolute top-4 left-4 text-emerald-500 font-bold flex items-center gap-2 text-sm bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-900/50">
          <Activity className="w-4 h-4"/> Lambda Architecture: Ride-Hailing App
        </div>

        <div className="flex w-full items-center justify-between mt-12 relative h-[300px]">
          
          {/* Source Layer */}
          <div className="flex flex-col items-center w-32 gap-2 z-10">
            <div className="text-zinc-500 font-bold mb-2">Sources</div>
            <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-xl flex flex-col items-center shadow-lg relative">
              <Smartphone className="w-8 h-8 text-blue-400 mb-2"/>
              <div className="text-zinc-400 font-bold">Rider App</div>
              <div className="text-[10px] text-zinc-500 text-center mt-1">GPS (1s ping)<br/>Booking Req</div>
              {step >= 1 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.8)]" />}
            </div>
          </div>

          {/* Ingestion Layer */}
          <div className="flex flex-col items-center w-32 gap-2 z-10">
            <div className="text-zinc-500 font-bold mb-2">Ingestion</div>
            <div className="bg-zinc-900 border border-emerald-500 p-4 rounded-xl flex flex-col items-center shadow-[0_0_20px_rgba(16,185,129,0.15)] relative">
              <Database className="w-8 h-8 text-emerald-400 mb-2"/>
              <div className="text-emerald-400 font-bold text-center">Kafka Log</div>
              <div className="text-[10px] text-emerald-500/50 text-center mt-1">Distributed<br/>Pub/Sub</div>
              <AnimatePresence>
                {step >= 2 && <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} className="absolute inset-0 bg-emerald-500/10 rounded-xl" />}
              </AnimatePresence>
            </div>
          </div>

          {/* Processing Layer (Split) */}
          <div className="flex flex-col items-center w-48 gap-8 z-10 h-full justify-center">
            <div className="text-zinc-500 font-bold absolute top-0">Processing</div>
            
            {/* Speed Layer */}
            <div className="bg-zinc-900 border border-purple-500/50 p-3 rounded-xl flex flex-col items-center w-full shadow-lg relative mt-4">
              <div className="absolute -left-6 -top-2 bg-purple-950 text-purple-400 text-[10px] px-2 py-0.5 rounded border border-purple-500/50 font-bold">Speed Layer</div>
              <Zap className="w-6 h-6 text-purple-400 mb-1"/>
              <div className="text-purple-300 font-bold text-center">Spark Streaming</div>
              <div className="text-[10px] text-zinc-500 text-center mt-1">Real-time Surge Pricing<br/>Driver matching</div>
              <AnimatePresence>
                {step >= 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-purple-500/10 rounded-xl animate-pulse" />}
              </AnimatePresence>
            </div>

            {/* Batch Layer */}
            <div className="bg-zinc-900 border border-orange-500/50 p-3 rounded-xl flex flex-col items-center w-full shadow-lg relative">
              <div className="absolute -left-6 -top-2 bg-orange-950 text-orange-400 text-[10px] px-2 py-0.5 rounded border border-orange-500/50 font-bold">Batch Layer</div>
              <HardDrive className="w-6 h-6 text-orange-400 mb-1"/>
              <div className="text-orange-300 font-bold text-center">Airflow + Spark</div>
              <div className="text-[10px] text-zinc-500 text-center mt-1">Nightly ETL<br/>Data Quality Checks</div>
              <AnimatePresence>
                {step >= 4 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-orange-500/10 rounded-xl" />}
              </AnimatePresence>
            </div>
          </div>

          {/* Serving Layer */}
          <div className="flex flex-col items-center w-40 gap-8 z-10 h-full justify-center">
            <div className="text-zinc-500 font-bold absolute top-0">Serving & Storage</div>
            
            <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-xl flex flex-col items-center shadow-lg relative w-full mt-4">
              <Database className="w-6 h-6 text-blue-400 mb-1"/>
              <div className="text-zinc-300 font-bold text-center text-[10px]">Redis (Cache)</div>
              <AnimatePresence>
                {step >= 3 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-purple-500 text-white text-[8px] px-1 rounded font-bold">Surge = 2.5x</motion.div>}
              </AnimatePresence>
            </div>

            <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-xl flex flex-col items-center shadow-lg relative w-full">
              <Database className="w-6 h-6 text-zinc-400 mb-1"/>
              <div className="text-zinc-300 font-bold text-center text-[10px]">S3 Datalake &<br/>Snowflake DW</div>
              <AnimatePresence>
                {step >= 5 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -bottom-4 right-0 bg-emerald-500 text-white text-[8px] px-1 rounded font-bold flex items-center gap-1"><BarChart3 className="w-3 h-3"/> BI Reports</motion.div>}
              </AnimatePresence>
            </div>
          </div>

          {/* Data Flow Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* App to Kafka */}
            {step >= 1 && <motion.path d="M 128 150 L 230 150" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" initial={{ strokeDashoffset: 20 }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }} />}
            
            {/* Kafka to Streaming */}
            {step >= 2 && <motion.path d="M 358 150 C 400 150, 400 90, 440 90" fill="none" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4" initial={{ strokeDashoffset: 20 }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }} />}
            
            {/* Kafka to Batch */}
            {step >= 2 && <motion.path d="M 358 150 C 400 150, 400 210, 440 210" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="4 4" initial={{ strokeDashoffset: 20 }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }} />}
            
            {/* Streaming to Redis */}
            {step >= 3 && <motion.path d="M 632 90 L 710 90" fill="none" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4" initial={{ strokeDashoffset: 20 }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }} />}
            
            {/* Batch to Snowflake */}
            {step >= 4 && <motion.path d="M 632 210 L 710 210" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="4 4" initial={{ strokeDashoffset: 20 }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }} />}
          </svg>

        </div>

        <div className="h-16 mt-8 text-center max-w-2xl font-bold bg-zinc-950 border border-zinc-800 rounded p-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 0 && <motion.div key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400">Design a pipeline for a Ride-Hailing app.</motion.div>}
            {step === 1 && <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-blue-400">1. Mobile apps send GPS pings and ride requests via API Gateway.</motion.div>}
            {step === 2 && <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400">2. All events land in Kafka. This is the central nervous system buffer.</motion.div>}
            {step === 3 && <motion.div key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-purple-400">3. SPEED LAYER: Spark Streaming reads Kafka, calculates dynamic surge pricing instantly, and writes to Redis cache so the app can fetch it.</motion.div>}
            {step === 4 && <motion.div key="4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-orange-400">4. BATCH LAYER: Airflow runs jobs nightly, dumping raw Kafka data into S3 (Data Lake), transforming it, and loading it into Snowflake.</motion.div>}
            {step === 5 && <motion.div key="5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white">5. Analysts run BI reports (Tableau/Looker) on Snowflake to calculate monthly revenue. Both real-time and historical needs are met!</motion.div>}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
