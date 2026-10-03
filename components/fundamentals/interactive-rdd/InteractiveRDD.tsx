'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Braces, Table2, Shield } from 'lucide-react';

const TYPES = [
  { 
    id: 'rdd', 
    label: 'RDD (Resilient Distributed Dataset)', 
    icon: Braces, 
    desc: 'The original Spark structure. Low-level, untyped, unstructured objects. Hard to optimize.', 
    highlight: 'orange'
  },
  { 
    id: 'df', 
    label: 'DataFrame', 
    icon: Table2, 
    desc: 'Organized into named columns like a relational table. Optimized by Catalyst Engine. Untyped at compile time.', 
    highlight: 'blue'
  },
  { 
    id: 'ds', 
    label: 'Dataset', 
    icon: Shield, 
    desc: 'Strongly typed JVM objects + Catalyst optimization. Best of both worlds, but only in Scala/Java.', 
    highlight: 'emerald'
  }
] as const;

export function InteractiveRDD() {
  const [activeType, setActiveType] = useState<string>('rdd');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveType(current => {
        const currentIndex = TYPES.findIndex(t => t.id === current);
        return TYPES[(currentIndex + 1) % TYPES.length].id;
      });
    }, 6000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = TYPES.find(t => t.id === activeType)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full">
        {TYPES.map((type) => {
          let bgClass = 'bg-orange-600';
          if (type.highlight === 'blue') bgClass = 'bg-blue-600';
          if (type.highlight === 'emerald') bgClass = 'bg-emerald-600';

          return (
            <button
              key={type.id}
              onClick={() => {
                setUserInteracted(true);
                setActiveType(type.id);
              }}
              className={`flex-1 min-w-[200px] px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 relative ${
                activeType === type.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {activeType === type.id && (
                <motion.div
                  layoutId="active-type-bg-rdd"
                  className={`absolute inset-0 rounded-xl -z-10 ${bgClass}`}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <type.icon className="w-4 h-4" />
                {type.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-12 md:h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[350px] overflow-hidden">
        <AnimatePresence mode="wait">
          <DataTypeState key={activeType} type={activeType} reduceMotion={shouldReduceMotion} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function DataTypeState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  let displayContent;

  switch(type) {
    case 'rdd':
      displayContent = (
        <div className="flex flex-col items-center gap-4 font-mono text-xs w-full max-w-lg">
          <div className="bg-orange-950/20 border-2 border-orange-500/50 p-4 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.2)] w-full text-zinc-300">
            <div className="text-orange-400 font-bold border-b border-orange-900/50 pb-2 mb-2">Unstructured Blob (RDD[String])</div>
            <div>"1,Alice,25"</div>
            <div>"2,Bob,30"</div>
            <div>"3,Charlie,28"</div>
          </div>
          <div className="w-full bg-zinc-900 p-3 rounded-lg border border-zinc-700 text-zinc-400">
            <span className="text-blue-400">Code:</span> <br/>
            rdd.map(row =&gt; row.split(",")(1))
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-orange-400 text-center font-bold">
            Spark engine doesn't understand what's inside. It cannot optimize the code.
          </motion.div>
        </div>
      );
      break;
    case 'df':
      displayContent = (
        <div className="flex flex-col items-center gap-4 font-mono text-xs w-full max-w-lg">
          <div className="bg-blue-950/20 border-2 border-blue-500/50 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.2)] w-full overflow-hidden">
            <div className="text-blue-400 font-bold bg-blue-900/30 p-2 border-b border-blue-500/50">Structured Table (DataFrame)</div>
            <div className="flex p-2 border-b border-zinc-800 text-zinc-500 font-bold bg-zinc-900">
              <span className="w-1/3">id (int)</span><span className="w-1/3">name (str)</span><span className="w-1/3">age (int)</span>
            </div>
            <div className="flex p-2 border-b border-zinc-800/50 text-zinc-300"><span className="w-1/3">1</span><span className="w-1/3">Alice</span><span className="w-1/3">25</span></div>
            <div className="flex p-2 text-zinc-300"><span className="w-1/3">2</span><span className="w-1/3">Bob</span><span className="w-1/3">30</span></div>
          </div>
          <div className="w-full bg-zinc-900 p-3 rounded-lg border border-zinc-700 text-zinc-400">
            <span className="text-blue-400">Code (PySpark):</span> <br/>
            df.select("name").filter(col("age") &gt; 20)
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-blue-400 text-center font-bold">
            Catalyst Optimizer pushes the filter down to the database before reading!
          </motion.div>
        </div>
      );
      break;
    case 'ds':
      displayContent = (
        <div className="flex flex-col items-center gap-4 font-mono text-xs w-full max-w-lg">
          <div className="bg-emerald-950/20 border-2 border-emerald-500/50 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] w-full overflow-hidden">
            <div className="text-emerald-400 font-bold bg-emerald-900/30 p-2 border-b border-emerald-500/50 flex justify-between">
              <span>Typed Object (Dataset[User])</span>
              <span className="text-[10px] bg-emerald-900/50 px-2 py-0.5 rounded text-emerald-300">Scala/Java</span>
            </div>
            <div className="p-3 text-emerald-300 font-bold flex flex-col gap-1">
              <span>User(id=1, name="Alice", age=25)</span>
              <span>User(id=2, name="Bob", age=30)</span>
            </div>
          </div>
          <div className="w-full bg-zinc-900 p-3 rounded-lg border border-zinc-700 text-zinc-400">
            <span className="text-blue-400">Code (Scala):</span> <br/>
            ds.filter(user =&gt; user.age &gt; 20).map(_.name)
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-emerald-400 text-center font-bold">
            Compile-time safety + Catalyst Optimization. (Python doesn't have Datasets because it's untyped).
          </motion.div>
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
