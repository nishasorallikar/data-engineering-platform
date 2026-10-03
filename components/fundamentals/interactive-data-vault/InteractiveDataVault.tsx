'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Building2, Layers, Network } from 'lucide-react';

const MODELS = [
  { 
    id: 'inmon', 
    label: 'Inmon (Top-Down)', 
    icon: Building2, 
    desc: 'Enterprise Data Warehouse (3NF) is built first. Data Marts are extracted from it for reporting.', 
    highlight: 'blue'
  },
  { 
    id: 'kimball', 
    label: 'Kimball (Bottom-Up)', 
    icon: Layers, 
    desc: 'Starts with Data Marts (Star Schemas) tied together by Conformed Dimensions (the Bus).', 
    highlight: 'emerald'
  },
  { 
    id: 'datavault', 
    label: 'Data Vault', 
    icon: Network, 
    desc: 'Hubs (keys), Links (relationships), and Satellites (attributes). Highly agile, append-only, and auditable.', 
    highlight: 'orange'
  }
] as const;

export function InteractiveDataVault() {
  const [activeModel, setActiveModel] = useState<string>('inmon');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveModel(current => {
        const currentIndex = MODELS.findIndex(m => m.id === current);
        return MODELS[(currentIndex + 1) % MODELS.length].id;
      });
    }, 6000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = MODELS.find(m => m.id === activeModel)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      {/* Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-4xl w-full">
        {MODELS.map((model) => {
          let bgClass = 'bg-blue-600';
          if (model.highlight === 'emerald') bgClass = 'bg-emerald-600';
          if (model.highlight === 'orange') bgClass = 'bg-orange-600';

          return (
            <button
              key={model.id}
              onClick={() => {
                setUserInteracted(true);
                setActiveModel(model.id);
              }}
              className={`flex-1 min-w-[150px] px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 relative ${
                activeModel === model.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {activeModel === model.id && (
                <motion.div
                  layoutId="active-model-bg"
                  className={`absolute inset-0 rounded-xl -z-10 ${bgClass}`}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <model.icon className="w-4 h-4 hidden sm:block" />
                {model.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-12 md:h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      {/* Visualizer Architecture */}
      <div className="w-full max-w-4xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex items-center justify-center min-h-[450px] overflow-hidden">
        <AnimatePresence mode="wait">
          <ModelState key={activeModel} type={activeModel} reduceMotion={shouldReduceMotion} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function ModelState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  let displayContent;

  switch(type) {
    case 'inmon':
      displayContent = (
        <div className="flex flex-col items-center gap-6 font-mono text-xs w-full">
          <div className="flex gap-4">
            <div className="w-24 h-16 bg-zinc-900 border-2 border-zinc-700 rounded-lg flex items-center justify-center text-center text-zinc-400">Source<br/>Systems</div>
          </div>
          
          <div className="h-6 w-px bg-blue-500/50" />
          
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-64 bg-blue-950/30 border-2 border-blue-500 rounded-xl p-4 flex flex-col items-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <Building2 className="w-8 h-8 text-blue-400 mb-2" />
            <div className="font-bold text-blue-400 mb-1 text-center">Enterprise Data Warehouse (EDW)</div>
            <div className="text-[10px] text-zinc-400 text-center">Normalized (3NF). Centralized truth. Massive upfront design effort.</div>
          </motion.div>
          
          <div className="flex gap-16 relative w-64 justify-center">
            <div className="absolute top-0 w-32 h-6 border-t border-l border-r border-blue-500/50 rounded-t-lg" />
          </div>

          <div className="flex gap-8 mt-2">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="w-24 bg-emerald-950/20 border border-emerald-500/50 rounded-lg p-2 text-center text-emerald-400">Sales<br/>Data Mart</motion.div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="w-24 bg-emerald-950/20 border border-emerald-500/50 rounded-lg p-2 text-center text-emerald-400">HR<br/>Data Mart</motion.div>
          </div>
        </div>
      );
      break;
    case 'kimball':
      displayContent = (
        <div className="flex flex-col items-center gap-6 font-mono text-xs w-full">
          <div className="flex gap-4">
            <div className="w-24 h-16 bg-zinc-900 border-2 border-zinc-700 rounded-lg flex items-center justify-center text-center text-zinc-400">Source<br/>Systems</div>
          </div>
          
          <div className="flex gap-16 relative w-64 justify-center h-8">
            <div className="absolute top-0 w-32 h-full border-t border-l border-r border-emerald-500/50 rounded-t-lg" />
          </div>

          <div className="flex gap-8 relative z-10">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-32 bg-emerald-950/30 border-2 border-emerald-500 rounded-xl p-3 flex flex-col items-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <div className="font-bold text-emerald-400 mb-1">Sales Process</div>
              <div className="text-[10px] text-zinc-400 text-center">Star Schema</div>
            </motion.div>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="w-32 bg-emerald-950/30 border-2 border-emerald-500 rounded-xl p-3 flex flex-col items-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <div className="font-bold text-emerald-400 mb-1">HR Process</div>
              <div className="text-[10px] text-zinc-400 text-center">Star Schema</div>
            </motion.div>
          </div>
          
          <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 300, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="h-8 bg-blue-900/40 border border-blue-500/50 rounded-lg flex items-center justify-center -mt-10 z-0">
            <span className="text-blue-300 font-bold z-20 bg-zinc-950 px-2 mt-12">Conformed Dimensions (The Bus)</span>
          </motion.div>
          
          <div className="mt-8 text-center text-zinc-400 max-w-sm">
            Faster time-to-value. Build mart-by-mart, tied together by shared dimensions (e.g. standard Date or Employee dims).
          </div>
        </div>
      );
      break;
    case 'datavault':
      displayContent = (
        <div className="flex flex-col items-center gap-6 font-mono text-xs w-full relative">
          
          <div className="flex items-center justify-center gap-12 mt-10">
            {/* Hub */}
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col items-center gap-2 relative">
              <div className="w-16 h-16 rounded-full bg-blue-900/30 border-4 border-blue-500 flex items-center justify-center font-bold text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] z-10">HUB</div>
              <div className="text-center w-24">Business Key<br/>(e.g. Cust_ID)</div>
              
              {/* Satellites attached to Hub */}
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} className="absolute -top-12 -left-8 w-12 h-12 rounded-full bg-orange-900/30 border-2 border-orange-500 flex items-center justify-center text-[10px] text-orange-400">SAT</motion.div>
              <div className="absolute -top-6 -left-3 w-4 h-6 border-l-2 border-zinc-600 -rotate-45" />
              
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} className="absolute -bottom-10 -left-6 w-12 h-12 rounded-full bg-orange-900/30 border-2 border-orange-500 flex items-center justify-center text-[10px] text-orange-400">SAT</motion.div>
            </motion.div>

            {/* Link */}
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col items-center gap-2 relative">
              <div className="absolute w-24 h-1 bg-zinc-600 -left-16 top-8 -z-10" />
              <div className="absolute w-24 h-1 bg-zinc-600 -right-16 top-8 -z-10" />
              
              <div className="w-16 h-16 bg-emerald-900/30 border-4 border-emerald-500 rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] z-10">
                <div className="-rotate-45 font-bold text-emerald-400">LINK</div>
              </div>
              <div className="text-center w-24 mt-2">Transaction<br/>/ Relationship</div>

              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} className="absolute -top-12 w-12 h-12 rounded-full bg-orange-900/30 border-2 border-orange-500 flex items-center justify-center text-[10px] text-orange-400">SAT</motion.div>
            </motion.div>

            {/* Hub 2 */}
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col items-center gap-2 relative">
              <div className="w-16 h-16 rounded-full bg-blue-900/30 border-4 border-blue-500 flex items-center justify-center font-bold text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] z-10">HUB</div>
              <div className="text-center w-24">Business Key<br/>(e.g. Prod_ID)</div>
            </motion.div>
          </div>

          <div className="mt-8 text-center text-zinc-400 max-w-md bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
            Highly agile. Never update, only append. <span className="text-blue-400">Hubs</span> store keys, <span className="text-emerald-400">Links</span> map relationships, <span className="text-orange-400">Satellites</span> store context over time.
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
