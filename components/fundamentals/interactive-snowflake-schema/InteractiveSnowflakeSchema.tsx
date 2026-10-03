'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Snowflake, Minimize2, Layers } from 'lucide-react';

const CONCEPTS = [
  { 
    id: 'star', 
    label: 'Star (Denormalized)', 
    icon: Minimize2, 
    desc: 'In a Star Schema, dimensions are wide and denormalized. One dimension table holds all related hierarchies.', 
    highlight: 'blue'
  },
  { 
    id: 'snowflake', 
    label: 'Snowflake (Normalized)', 
    icon: Snowflake, 
    desc: 'In a Snowflake, dimensions are normalized into sub-dimensions. This saves space but requires more JOINs.', 
    highlight: 'emerald'
  },
  { 
    id: 'tradeoff', 
    label: 'When is it worth it?', 
    icon: Layers, 
    desc: 'Use Snowflake only when a dimension is massive (e.g. millions of rows) and the repeated string data causes actual storage issues.', 
    highlight: 'orange'
  }
] as const;

export function InteractiveSnowflakeSchema() {
  const [activeConcept, setActiveConcept] = useState<string>('star');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveConcept(current => {
        const currentIndex = CONCEPTS.findIndex(c => c.id === current);
        return CONCEPTS[(currentIndex + 1) % CONCEPTS.length].id;
      });
    }, 5500); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = CONCEPTS.find(c => c.id === activeConcept)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      {/* Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full">
        {CONCEPTS.map((concept) => {
          let bgClass = 'bg-blue-600';
          if (concept.highlight === 'emerald') bgClass = 'bg-emerald-600';
          if (concept.highlight === 'orange') bgClass = 'bg-orange-600';

          return (
            <button
              key={concept.id}
              onClick={() => {
                setUserInteracted(true);
                setActiveConcept(concept.id);
              }}
              className={`flex-1 min-w-[150px] px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative ${
                activeConcept === concept.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {activeConcept === concept.id && (
                <motion.div
                  layoutId="active-concept-bg-snow"
                  className={`absolute inset-0 rounded-xl -z-10 ${bgClass}`}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <concept.icon className="w-4 h-4" />
                {concept.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-12 md:h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      {/* Visualizer Architecture */}
      <div className="w-full max-w-4xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex items-center justify-center min-h-[500px] overflow-hidden">
        <SnowflakeState activeConcept={activeConcept} reduceMotion={shouldReduceMotion} />
      </div>
      
    </div>
  );
}

function SnowflakeState({ activeConcept, reduceMotion }: { activeConcept: string, reduceMotion: boolean | null }) {
  
  const isSnow = activeConcept === 'snowflake' || activeConcept === 'tradeoff';
  
  return (
    <div className="relative w-full h-full flex items-center justify-center font-mono">
      
      {/* FACT TABLE (Center) */}
      <div className="absolute z-20 w-48 bg-zinc-900 border-2 border-indigo-500 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(79,70,229,0.3)]">
        <div className="p-2 font-bold text-center border-b bg-indigo-900/50 text-indigo-300 border-indigo-500/50">
          FACT_SALES
        </div>
        <div className="p-3 text-xs flex flex-col gap-1">
          <div className="flex justify-between"><span className="text-orange-400">prod_id</span><span className="text-zinc-500">FK</span></div>
          <div className="flex justify-between"><span className="text-orange-400">store_id</span><span className="text-zinc-500">FK</span></div>
        </div>
      </div>

      {/* LEFT BRANCH (Product) */}
      {/* Primary Product Dimension */}
      <motion.div 
        animate={{ 
          x: isSnow ? -160 : -140,
          y: -50,
          scale: isSnow ? 0.9 : 1
        }}
        className="absolute z-10 w-36 bg-zinc-900 border-2 border-emerald-500 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]"
      >
        <div className="p-1.5 font-bold text-center text-xs border-b bg-emerald-900/50 text-emerald-300 border-emerald-500/50">
          DIM_PROD
        </div>
        <div className="p-2 text-[10px] flex flex-col gap-1 text-zinc-400">
          <div className="text-purple-400 font-bold">prod_id (PK)</div>
          <div>name</div>
          
          <AnimatePresence mode="popLayout">
            {!isSnow && (
              <motion.div key="denorm1" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-zinc-300 font-bold bg-zinc-800 p-1 rounded mt-1">
                cat_name<br/>cat_manager
              </motion.div>
            )}
            {isSnow && (
              <motion.div key="norm1" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-orange-400 mt-1">
                cat_id (FK)
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Sub-Dimension: Category */}
      <AnimatePresence>
        {isSnow && (
          <motion.div 
            initial={{ opacity: 0, x: -160, y: -50, scale: 0 }}
            animate={{ opacity: 1, x: -320, y: -100, scale: 0.9 }}
            exit={{ opacity: 0, x: -160, y: -50, scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute z-0 w-32 bg-zinc-900 border-2 border-blue-500 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            <div className="p-1.5 font-bold text-center text-xs border-b bg-blue-900/50 text-blue-300 border-blue-500/50">
              DIM_CATEGORY
            </div>
            <div className="p-2 text-[10px] flex flex-col gap-1 text-zinc-400">
              <div className="text-purple-400 font-bold">cat_id (PK)</div>
              <div className="text-zinc-200">cat_name</div>
              <div className="text-zinc-200">cat_manager</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RIGHT BRANCH (Store) */}
      {/* Primary Store Dimension */}
      <motion.div 
        animate={{ 
          x: isSnow ? 160 : 140,
          y: 50,
          scale: isSnow ? 0.9 : 1
        }}
        className="absolute z-10 w-36 bg-zinc-900 border-2 border-emerald-500 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]"
      >
        <div className="p-1.5 font-bold text-center text-xs border-b bg-emerald-900/50 text-emerald-300 border-emerald-500/50">
          DIM_STORE
        </div>
        <div className="p-2 text-[10px] flex flex-col gap-1 text-zinc-400">
          <div className="text-purple-400 font-bold">store_id (PK)</div>
          <div>address</div>
          
          <AnimatePresence mode="popLayout">
            {!isSnow && (
              <motion.div key="denorm2" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-zinc-300 font-bold bg-zinc-800 p-1 rounded mt-1">
                city<br/>state<br/>country
              </motion.div>
            )}
            {isSnow && (
              <motion.div key="norm2" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-orange-400 mt-1">
                city_id (FK)
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Sub-Dimension: City */}
      <AnimatePresence>
        {isSnow && (
          <motion.div 
            initial={{ opacity: 0, x: 160, y: 50, scale: 0 }}
            animate={{ opacity: 1, x: 320, y: 100, scale: 0.9 }}
            exit={{ opacity: 0, x: 160, y: 50, scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute z-0 w-32 bg-zinc-900 border-2 border-blue-500 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            <div className="p-1.5 font-bold text-center text-xs border-b bg-blue-900/50 text-blue-300 border-blue-500/50">
              DIM_CITY
            </div>
            <div className="p-2 text-[10px] flex flex-col gap-1 text-zinc-400">
              <div className="text-purple-400 font-bold">city_id (PK)</div>
              <div className="text-zinc-200">city_name</div>
              <div className="text-zinc-200">state</div>
              <div className="text-zinc-200">country</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Fact -> Dim Lines */}
      <motion.div className="absolute w-28 h-1 bg-emerald-500/50 rounded-full z-0 origin-right" style={{ x: -110, y: -20, rotate: 15 }} />
      <motion.div className="absolute w-28 h-1 bg-emerald-500/50 rounded-full z-0 origin-left" style={{ x: 110, y: 20, rotate: 15 }} />

      {/* Sub-Dim Lines */}
      <AnimatePresence>
        {isSnow && (
          <motion.div 
            initial={{ opacity: 0, width: 0 }} 
            animate={{ opacity: 1, width: 100 }} 
            exit={{ opacity: 0, width: 0 }} 
            className="absolute h-1 bg-blue-500/50 rounded-full z-0 origin-right" 
            style={{ x: -270, y: -70, rotate: 15 }} 
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isSnow && (
          <motion.div 
            initial={{ opacity: 0, width: 0 }} 
            animate={{ opacity: 1, width: 100 }} 
            exit={{ opacity: 0, width: 0 }} 
            className="absolute h-1 bg-blue-500/50 rounded-full z-0 origin-left" 
            style={{ x: 230, y: 75, rotate: 15 }} 
          />
        )}
      </AnimatePresence>

      {/* Overlay Alert for Tradeoff */}
      <AnimatePresence>
        {activeConcept === 'tradeoff' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-orange-950/90 border border-orange-500 p-4 rounded-xl z-30 shadow-[0_0_30px_rgba(249,115,22,0.3)] w-max max-w-sm text-center"
          >
            <div className="text-orange-300 text-sm font-bold mb-1">Storage vs Compute</div>
            <div className="text-zinc-300 text-xs leading-relaxed">
              Snowflake saves storage by deduplicating strings (e.g. "California"), but requires a <span className="text-red-400 font-bold">3-table JOIN</span> instead of a 2-table JOIN for every query.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
