'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Star, Database, ArrowRightLeft } from 'lucide-react';

const CONCEPTS = [
  { 
    id: 'fact', 
    label: 'Fact Table', 
    desc: 'The center of the star. Stores quantitative metrics (events/transactions) and foreign keys to dimensions.', 
    highlight: 'indigo'
  },
  { 
    id: 'dim', 
    label: 'Dimension Tables', 
    desc: 'The points of the star. Stores descriptive attributes (who, what, where, when). Highly denormalized.', 
    highlight: 'emerald'
  },
  { 
    id: 'query', 
    label: 'Analytical Queries', 
    desc: 'Why it is the default: predictable, simple JOINs (always 1-hop), fast aggregations, intuitive for BI tools.', 
    highlight: 'purple'
  }
] as const;

export function InteractiveStarSchema() {
  const [activeConcept, setActiveConcept] = useState<string>('fact');
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
    }, 5000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = CONCEPTS.find(c => c.id === activeConcept)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      {/* Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full">
        {CONCEPTS.map((concept) => {
          let bgClass = 'bg-indigo-600';
          if (concept.highlight === 'emerald') bgClass = 'bg-emerald-600';
          if (concept.highlight === 'purple') bgClass = 'bg-purple-600';

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
                  layoutId="active-concept-bg-star"
                  className={`absolute inset-0 rounded-xl -z-10 ${bgClass}`}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Star className="w-4 h-4" />
                {concept.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-12 md:h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      {/* Visualizer Architecture */}
      <div className="w-full max-w-4xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex items-center justify-center min-h-[500px] overflow-hidden">
        <StarSchemaState activeConcept={activeConcept} reduceMotion={shouldReduceMotion} />
      </div>
      
    </div>
  );
}

function StarSchemaState({ activeConcept, reduceMotion }: { activeConcept: string, reduceMotion: boolean | null }) {
  
  const factActive = activeConcept === 'fact' || activeConcept === 'query';
  const dimActive = activeConcept === 'dim' || activeConcept === 'query';
  
  return (
    <div className="relative w-full h-full flex items-center justify-center font-mono">
      
      {/* FACT TABLE (Center) */}
      <motion.div 
        animate={{ 
          scale: factActive ? 1.05 : 0.95, 
          opacity: factActive ? 1 : 0.6,
          boxShadow: factActive ? '0 0 30px rgba(79, 70, 229, 0.4)' : 'none'
        }}
        className={`absolute z-20 w-48 bg-zinc-900 border-2 rounded-xl overflow-hidden ${factActive ? 'border-indigo-500' : 'border-zinc-700'}`}
      >
        <div className={`p-2 font-bold text-center border-b ${factActive ? 'bg-indigo-900/50 text-indigo-300 border-indigo-500/50' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
          FACT_SALES
        </div>
        <div className="p-3 text-xs flex flex-col gap-1">
          <div className="flex justify-between"><span className="text-orange-400">date_id</span><span className="text-zinc-500">FK</span></div>
          <div className="flex justify-between"><span className="text-orange-400">cust_id</span><span className="text-zinc-500">FK</span></div>
          <div className="flex justify-between"><span className="text-orange-400">prod_id</span><span className="text-zinc-500">FK</span></div>
          <div className="flex justify-between"><span className="text-orange-400">store_id</span><span className="text-zinc-500">FK</span></div>
          <div className="my-1 border-t border-zinc-700/50"></div>
          <div className="flex justify-between"><span className="text-indigo-400 font-bold">qty</span><span className="text-zinc-400">10</span></div>
          <div className="flex justify-between"><span className="text-indigo-400 font-bold">revenue</span><span className="text-zinc-400">$150</span></div>
        </div>
      </motion.div>

      {/* DIMENSION TABLES (Points of Star) */}
      {/* Top Left: Date */}
      <motion.div 
        animate={{ 
          scale: dimActive ? 1 : 0.9, 
          opacity: dimActive ? 1 : 0.4,
          boxShadow: dimActive ? '0 0 20px rgba(16, 185, 129, 0.2)' : 'none',
          x: dimActive ? -180 : -140,
          y: dimActive ? -140 : -100
        }}
        className={`absolute z-10 w-36 bg-zinc-900 border-2 rounded-xl overflow-hidden ${dimActive ? 'border-emerald-500' : 'border-zinc-700'}`}
      >
        <div className={`p-1.5 font-bold text-center text-xs border-b ${dimActive ? 'bg-emerald-900/50 text-emerald-300 border-emerald-500/50' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
          DIM_DATE
        </div>
        <div className="p-2 text-[10px] flex flex-col gap-1 text-zinc-400">
          <div className="text-purple-400 font-bold">date_id (PK)</div>
          <div>full_date</div>
          <div>day_of_week</div>
          <div>month, year</div>
        </div>
      </motion.div>

      {/* Top Right: Customer */}
      <motion.div 
        animate={{ 
          scale: dimActive ? 1 : 0.9, 
          opacity: dimActive ? 1 : 0.4,
          boxShadow: dimActive ? '0 0 20px rgba(16, 185, 129, 0.2)' : 'none',
          x: dimActive ? 180 : 140,
          y: dimActive ? -140 : -100
        }}
        className={`absolute z-10 w-36 bg-zinc-900 border-2 rounded-xl overflow-hidden ${dimActive ? 'border-emerald-500' : 'border-zinc-700'}`}
      >
        <div className={`p-1.5 font-bold text-center text-xs border-b ${dimActive ? 'bg-emerald-900/50 text-emerald-300 border-emerald-500/50' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
          DIM_CUST
        </div>
        <div className="p-2 text-[10px] flex flex-col gap-1 text-zinc-400">
          <div className="text-purple-400 font-bold">cust_id (PK)</div>
          <div>first_name</div>
          <div>last_name</div>
          <div>email, city</div>
        </div>
      </motion.div>

      {/* Bottom Left: Product */}
      <motion.div 
        animate={{ 
          scale: dimActive ? 1 : 0.9, 
          opacity: dimActive ? 1 : 0.4,
          boxShadow: dimActive ? '0 0 20px rgba(16, 185, 129, 0.2)' : 'none',
          x: dimActive ? -180 : -140,
          y: dimActive ? 140 : 100
        }}
        className={`absolute z-10 w-36 bg-zinc-900 border-2 rounded-xl overflow-hidden ${dimActive ? 'border-emerald-500' : 'border-zinc-700'}`}
      >
        <div className={`p-1.5 font-bold text-center text-xs border-b ${dimActive ? 'bg-emerald-900/50 text-emerald-300 border-emerald-500/50' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
          DIM_PROD
        </div>
        <div className="p-2 text-[10px] flex flex-col gap-1 text-zinc-400">
          <div className="text-purple-400 font-bold">prod_id (PK)</div>
          <div>sku_number</div>
          <div>category</div>
          <div>brand</div>
        </div>
      </motion.div>

      {/* Bottom Right: Store */}
      <motion.div 
        animate={{ 
          scale: dimActive ? 1 : 0.9, 
          opacity: dimActive ? 1 : 0.4,
          boxShadow: dimActive ? '0 0 20px rgba(16, 185, 129, 0.2)' : 'none',
          x: dimActive ? 180 : 140,
          y: dimActive ? 140 : 100
        }}
        className={`absolute z-10 w-36 bg-zinc-900 border-2 rounded-xl overflow-hidden ${dimActive ? 'border-emerald-500' : 'border-zinc-700'}`}
      >
        <div className={`p-1.5 font-bold text-center text-xs border-b ${dimActive ? 'bg-emerald-900/50 text-emerald-300 border-emerald-500/50' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
          DIM_STORE
        </div>
        <div className="p-2 text-[10px] flex flex-col gap-1 text-zinc-400">
          <div className="text-purple-400 font-bold">store_id (PK)</div>
          <div>store_name</div>
          <div>region</div>
          <div>country</div>
        </div>
      </motion.div>

      {/* Connecting Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        
        {/* Draw lines from center to the 4 corners. */}
        {/* Since center is roughly at 50%,50%, we can use relative positioning, but SVG inside flex is tricky. We'll use hardcoded approximations relative to a 800x500 box, or just rely on CSS borders? Better yet, let's use absolute positioned divs as lines. */}
      </svg>
      
      {/* HTML Lines */}
      <Line x={-90} y={-70} rotate={-38} active={activeConcept === 'query'} />
      <Line x={90} y={-70} rotate={38} active={activeConcept === 'query'} />
      <Line x={-90} y={70} rotate={38} active={activeConcept === 'query'} />
      <Line x={90} y={70} rotate={-38} active={activeConcept === 'query'} />

      {/* Query Animation Overlay */}
      <AnimatePresence>
        {activeConcept === 'query' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-950/80 border border-purple-500 p-4 rounded-xl z-30 shadow-[0_0_30px_rgba(168,85,247,0.3)] w-max"
          >
            <div className="text-purple-300 text-xs font-bold mb-2">1-Hop Aggregation Query:</div>
            <div className="text-zinc-300 text-[11px] leading-relaxed">
              <span className="text-blue-400">SELECT</span> d.category, <span className="text-emerald-400">SUM</span>(f.revenue)<br/>
              <span className="text-blue-400">FROM</span> FACT_SALES f<br/>
              <span className="text-blue-400">JOIN</span> DIM_PROD d <span className="text-blue-400">ON</span> f.prod_id = d.prod_id<br/>
              <span className="text-blue-400">GROUP BY</span> 1;
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function Line({ x, y, rotate, active }: { x: number, y: number, rotate: number, active: boolean }) {
  return (
    <motion.div 
      className="absolute w-32 h-1 rounded-full z-0 origin-center"
      style={{ 
        translateX: x, 
        translateY: y, 
        rotate: rotate,
        background: active ? 'linear-gradient(90deg, #10B981, #4F46E5)' : '#3F3F46'
      }}
      animate={{
        opacity: active ? 1 : 0.3,
        boxShadow: active ? '0 0 10px rgba(79, 70, 229, 0.5)' : 'none'
      }}
    />
  );
}
