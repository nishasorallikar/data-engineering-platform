"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { parseSqlClauses, SqlClause } from "@/lib/sql/parseSqlClauses";
import { ArrowDown, Info, Database } from "lucide-react";

interface QueryFlowProps {
  sql: string;
}

export function QueryFlow({ sql }: QueryFlowProps) {
  const clauses = useMemo(() => parseSqlClauses(sql), [sql]);
  const [activeClauseIndex, setActiveClauseIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Auto cycle active clause for animation if no reduced motion
  useEffect(() => {
    if (shouldReduceMotion || clauses.length === 0) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      setActiveClauseIndex(currentIndex);
      currentIndex = (currentIndex + 1) % clauses.length;
    }, 2500); // Wait at each stage
    
    return () => clearInterval(interval);
  }, [clauses, shouldReduceMotion]);

  if (!sql || clauses.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500 text-sm font-mono p-6">
        No discernible structural flow found.
      </div>
    );
  }

  const activeClause = activeClauseIndex !== null ? clauses[activeClauseIndex] : null;

  return (
    <div className="flex flex-col h-full bg-zinc-950/50">
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar relative">
        <h4 className="text-zinc-400 text-xs font-bold tracking-wider mb-6 flex items-center gap-2 uppercase">
          <Database className="w-3.5 h-3.5" /> Logical Query Flow
        </h4>
        
        <div className="relative pl-4 space-y-6">
          {/* Vertical line connecting nodes */}
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-zinc-800" />
          
          {/* Animated packet */}
          {!shouldReduceMotion && activeClauseIndex !== null && (
            <motion.div 
              className="absolute left-[23px] w-[9px] h-[9px] bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.8)] z-10"
              initial={false}
              animate={{ 
                top: `${activeClauseIndex * 48 + 16}px` // Approximate math for spacing
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          )}

          {clauses.map((clause, idx) => {
            const isActive = idx === activeClauseIndex;
            return (
              <div 
                key={`${clause.type}-${idx}`}
                className="relative flex items-center gap-4 group cursor-pointer"
                onMouseEnter={() => setActiveClauseIndex(idx)}
              >
                {/* Node */}
                <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center border-2 z-10 transition-colors bg-zinc-900 ${
                  isActive ? "border-emerald-500" : "border-zinc-700 group-hover:border-zinc-500"
                }`}>
                  <div className={`w-2 h-2 rounded-full transition-colors ${
                    isActive ? "bg-emerald-500" : "bg-transparent group-hover:bg-zinc-600"
                  }`} />
                </div>
                
                {/* Label */}
                <span className={`font-mono text-sm transition-colors ${
                  isActive ? "text-emerald-400 font-bold" : "text-zinc-400 group-hover:text-zinc-200"
                }`}>
                  {clause.label}
                </span>
                
                {/* Line number badge */}
                <span className="ml-auto text-[10px] text-zinc-600 font-mono px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-800 hidden sm:block">
                  L{clause.line}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Inspector Panel */}
      <div className="h-32 border-t border-zinc-800/50 bg-zinc-900/50 p-4 shrink-0 flex flex-col">
        {activeClause ? (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                {activeClause.type}
              </span>
              <span className="text-zinc-500 text-xs font-mono">Line {activeClause.line}</span>
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed overflow-y-auto custom-scrollbar">
              {activeClause.description}
            </p>
          </>
        ) : (
          <div className="flex items-center gap-2 text-zinc-500 text-sm h-full">
            <Info className="w-4 h-4" />
            Hover over a stage to see its purpose.
          </div>
        )}
      </div>
    </div>
  );
}
