'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Database, Activity, FileJson, Clock, BookOpen } from 'lucide-react';

interface SourceSystem {
  name: string;
  format: string;
  frequency: string;
}

interface Props {
  sources: SourceSystem[];
}

export const SourceSystemsVisualizer: React.FC<Props> = ({ sources }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getTheory = (frequency: string, format: string) => {
    const isStreaming = frequency.toLowerCase().includes('millisecond') || frequency.toLowerCase().includes('real');
    if (isStreaming) {
      return {
        title: 'Streaming Ingestion Theory',
        text: `High-velocity ${format} data is typically ingested via message brokers (like Kafka or Event Hubs). The theory dictates an append-only, decoupled architecture to handle sudden spikes in throughput without dropping packets or locking the database.`
      };
    }
    return {
      title: 'Batch Processing Theory',
      text: `Scheduled ${frequency} ingestion of ${format} data relies on micro-batching. Data engineering theory suggests landing this raw data directly into a Data Lake (Bronze layer) before applying any schema-on-read validations to preserve total fidelity.`
    };
  };

  return (
    <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-4 h-4 text-orange-400" />
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Concept: Data Ingestion Patterns</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((source, i) => {
          const theory = getTheory(source.frequency, source.format);
          const isActive = activeIndex === i;

          return (
            <motion.div
              key={i}
              layout
              onClick={() => setActiveIndex(isActive ? null : i)}
              className={`cursor-pointer rounded-xl border transition-colors overflow-hidden ${
                isActive ? 'bg-zinc-900 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.1)]' : 'bg-zinc-950/50 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-zinc-200">{source.name}</h3>
                  <Box className={`w-4 h-4 transition-colors ${isActive ? 'text-orange-400' : 'text-zinc-600'}`} />
                </div>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  <div className="flex items-center gap-1.5 bg-zinc-900 px-2 py-1 rounded text-[10px] font-mono text-zinc-400 border border-white/5">
                    <FileJson className="w-3 h-3 text-emerald-400/70" /> {source.format}
                  </div>
                  <div className="flex items-center gap-1.5 bg-zinc-900 px-2 py-1 rounded text-[10px] font-mono text-zinc-400 border border-white/5">
                    <Clock className="w-3 h-3 text-blue-400/70" /> {source.frequency}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/5 bg-orange-950/20"
                  >
                    <div className="p-5">
                      <div className="text-[10px] font-bold text-orange-400/80 uppercase tracking-wider mb-2">
                        {theory.title}
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {theory.text}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      <p className="text-xs text-zinc-500 mt-6 text-center italic">Click on any source system to reveal the underlying ingestion theory.</p>
    </div>
  );
};
