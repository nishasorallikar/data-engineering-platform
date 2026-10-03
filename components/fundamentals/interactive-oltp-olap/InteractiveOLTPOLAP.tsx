'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Database, Server, ArrowRightLeft, AlignLeft, BarChart3, GripVertical, AlertTriangle } from 'lucide-react';
import { Q3_DIMENSIONS, DimensionId, ComparisonDimension } from './types';
import { useReducedMotion } from 'framer-motion';

export function InteractiveOLTPOLAP() {
  const [activeDimension, setActiveDimension] = useState<DimensionId>('purpose');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  // Auto-rotate through dimensions
  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveDimension(current => {
        const currentIndex = Q3_DIMENSIONS.findIndex(d => d.id === current);
        const nextIndex = (currentIndex + 1) % Q3_DIMENSIONS.length;
        return Q3_DIMENSIONS[nextIndex].id;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const handleSelect = (id: DimensionId) => {
    setUserInteracted(true);
    setActiveDimension(id);
  };

  const getIconForDimension = (id: DimensionId) => {
    switch (id) {
      case 'purpose': return <AlignLeft className="w-4 h-4" />;
      case 'organization': return <GripVertical className="w-4 h-4" />;
      case 'query': return <BarChart3 className="w-4 h-4" />;
      case 'anti-pattern': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlignLeft className="w-4 h-4" />;
    }
  };

  const activeDimData = Q3_DIMENSIONS.find(d => d.id === activeDimension);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center space-y-8 font-sans">
      
      {/* Title / Instruction */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold shadow-sm">
          Two-System Comparison Laboratory
        </span>
      </div>

      {/* Main Comparison Area */}
      <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
        
        {/* OLTP Side */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="bg-gradient-to-br from-blue-950/40 to-zinc-950 border border-blue-900/50 p-6 rounded-3xl shadow-blue-900/20 shadow-2xl w-36 h-36 flex flex-col items-center justify-center gap-3 relative overflow-hidden group">
            <Database className="w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <span className="font-bold tracking-[0.2em] text-zinc-200 uppercase relative z-10">OLTP</span>
            
            {/* Always-on Animation: Small Transactions */}
            {!prefersReducedMotion && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={`tx-${i}`}
                    className="w-1 h-3 bg-blue-500 rounded-full absolute"
                    initial={{ top: '-20%', opacity: 0 }}
                    animate={{ top: '120%', opacity: [0, 1, 1, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      delay: i * 0.5,
                      ease: "linear",
                    }}
                    style={{ left: `${30 + i * 20}%` }}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="h-28 md:h-36 flex items-start justify-center w-full">
            <AnimatePresence mode="wait">
              {activeDimData && (
                <motion.div
                  key={`oltp-${activeDimData.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-sm text-blue-100/90 leading-relaxed font-medium p-5 bg-blue-950/30 rounded-2xl border border-blue-900/40 shadow-inner w-full max-w-[280px]"
                >
                  {activeDimData.oltpText}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Center Dimensions Selector */}
        <div className="flex flex-row md:flex-col items-center justify-center gap-3 w-full flex-wrap z-10">
          {Q3_DIMENSIONS.map((dim) => {
            const isActive = activeDimension === dim.id;
            return (
              <button
                key={dim.id}
                onClick={() => handleSelect(dim.id)}
                className={`relative flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 w-full md:w-56 overflow-hidden border
                  ${isActive ? 'text-white border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'text-zinc-400 bg-zinc-950/80 border-zinc-800/80 hover:text-zinc-200 hover:bg-zinc-900'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-dimension-bg"
                    className="absolute inset-0 bg-indigo-600/90 -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 35 }}
                  />
                )}
                {getIconForDimension(dim.id)}
                {dim.label}
              </button>
            );
          })}
        </div>

        {/* OLAP Side */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="bg-gradient-to-br from-purple-950/40 to-zinc-950 border border-purple-900/50 p-6 rounded-3xl shadow-purple-900/20 shadow-2xl w-36 h-36 flex flex-col items-center justify-center gap-3 relative overflow-hidden group">
            <Server className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <span className="font-bold tracking-[0.2em] text-zinc-200 uppercase relative z-10">OLAP</span>
            
            {/* Always-on Animation: Large Columnar Scan */}
            {!prefersReducedMotion && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
                <motion.div
                  className="w-16 h-8 bg-purple-500 rounded absolute left-1/2 -translate-x-1/2"
                  initial={{ top: '-30%', opacity: 0 }}
                  animate={{ top: '130%', opacity: [0, 1, 1, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "linear",
                  }}
                />
              </div>
            )}
          </div>
          
          <div className="h-28 md:h-36 flex items-start justify-center w-full">
            <AnimatePresence mode="wait">
              {activeDimData && (
                <motion.div
                  key={`olap-${activeDimData.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-sm text-purple-100/90 leading-relaxed font-medium p-5 bg-purple-950/30 rounded-2xl border border-purple-900/40 shadow-inner w-full max-w-[280px]"
                >
                  {activeDimData.olapText}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
