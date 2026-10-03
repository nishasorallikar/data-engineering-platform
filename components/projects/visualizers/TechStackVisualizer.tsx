'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, BookOpen, ChevronRight } from 'lucide-react';

interface Props {
  technologies: string[];
}

export const TechStackVisualizer: React.FC<Props> = ({ technologies }) => {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  // Concept mapping for Data Engineering stacks
  const getTechTheory = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes('databricks') || t.includes('spark')) {
      return {
        role: 'Distributed Compute Engine',
        theory: 'Utilizes resilient distributed datasets (RDDs) and in-memory processing to perform massive parallel transformations. Crucial for moving data between Bronze, Silver, and Gold layers at scale without hitting single-node memory limits.'
      };
    }
    if (t.includes('delta') || t.includes('lake')) {
      return {
        role: 'Table Format / Storage',
        theory: 'Brings ACID transactions to object storage. It solves the classic Data Lake problem of dirty reads by using a transaction log (Delta Log), enabling time-travel, concurrent writes, and schema enforcement.'
      };
    }
    if (t.includes('hub') || t.includes('kafka') || t.includes('event')) {
      return {
        role: 'Event Streaming Broker',
        theory: 'Acts as a durable buffer for high-velocity streaming data. It decouples producers from consumers, allowing downstream systems to ingest data at their own pace and survive temporary outages without data loss.'
      };
    }
    if (t.includes('factory') || t.includes('airflow') || t.includes('dbt')) {
      return {
        role: 'Orchestration & Transformation',
        theory: 'Manages the Directed Acyclic Graph (DAG) of dependencies. It ensures data lineage is preserved and pipelines execute in the correct order, handling retries and failures idempotently.'
      };
    }
    return {
      role: 'Ecosystem Component',
      theory: 'A critical integration in the modern data stack providing specialized capabilities for either storage, compute, security, or observability.'
    };
  };

  return (
    <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-8 relative overflow-hidden">
      <div className="flex items-center gap-2 mb-8 relative z-10">
        <BookOpen className="w-4 h-4 text-zinc-400" />
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Concept: The Modern Data Stack</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        <div className="w-full md:w-1/2 flex flex-wrap gap-2 content-start">
          {technologies.map((tech) => {
            const isActive = activeTech === tech;
            return (
              <motion.button
                key={tech}
                onClick={() => setActiveTech(isActive ? null : tech)}
                className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-300 border flex items-center gap-2 ${
                  isActive 
                    ? 'bg-white text-zinc-950 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105' 
                    : 'bg-zinc-950/50 text-zinc-400 border-white/10 hover:border-white/30 hover:bg-zinc-900'
                }`}
              >
                {tech}
                {isActive && <ChevronRight className="w-3 h-3" />}
              </motion.button>
            );
          })}
        </div>

        <div className="w-full md:w-1/2 min-h-[160px]">
          <AnimatePresence mode="wait">
            {activeTech ? (
              <motion.div
                key={activeTech}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-zinc-950 border border-white/10 rounded-xl p-6 h-full shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-4">
                  <div className="w-8 h-8 rounded bg-zinc-900 flex items-center justify-center border border-white/5">
                    <Cpu className="w-4 h-4 text-zinc-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white tracking-tight">{activeTech}</h4>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500">{getTechTheory(activeTech).role}</div>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {getTechTheory(activeTech).theory}
                </p>
              </motion.div>
            ) : (
              <div className="h-full border border-dashed border-white/10 rounded-xl flex items-center justify-center text-zinc-600 text-sm p-6 text-center bg-zinc-950/30">
                Select a technology to explore its theoretical role in the data architecture.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
