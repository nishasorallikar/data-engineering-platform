'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FileText, AlignEndVertical, Columns3 } from 'lucide-react';

const FORMATS = [
  { id: 'csv', label: 'CSV (Row)', icon: FileText, color: 'zinc' },
  { id: 'avro', label: 'Avro (Row, Binary)', icon: AlignEndVertical, color: 'blue' },
  { id: 'parquet', label: 'Parquet (Columnar)', icon: Columns3, color: 'emerald' }
] as const;

export function InteractiveFileFormats() {
  const [activeFormat, setActiveFormat] = useState<string>('csv');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveFormat(current => {
        const currentIndex = FORMATS.findIndex(f => f.id === current);
        return FORMATS[(currentIndex + 1) % FORMATS.length].id;
      });
    }, 5000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full">
        {FORMATS.map((f) => (
          <button
            key={f.id}
            onClick={() => { setUserInteracted(true); setActiveFormat(f.id); }}
            className={`flex-1 min-w-[150px] px-4 py-3 rounded-xl text-sm font-bold transition-all relative ${
              activeFormat === f.id ? 'text-white' : 'text-zinc-500'
            }`}
          >
            {activeFormat === f.id && (
              <motion.div layoutId="format-bg" className={`absolute inset-0 rounded-xl -z-10 bg-${f.color}-600`} transition={{ type: "spring", stiffness: 350, damping: 30 }} />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2"><f.icon className="w-4 h-4" />{f.label}</span>
          </button>
        ))}
      </div>

      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[400px] overflow-hidden font-mono text-xs">
        
        <div className="text-zinc-400 mb-6 font-bold text-center">
          Query: <span className="text-purple-400">SELECT age FROM users</span>
        </div>

        <div className="flex w-full max-w-xl justify-between h-48 relative">
          
          <AnimatePresence mode="wait">
            {activeFormat === 'csv' && (
              <motion.div key="csv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center">
                <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-xl flex flex-col gap-1 w-full max-w-sm overflow-hidden">
                  <div className="bg-red-950/30 border border-red-500/50 p-2 text-zinc-400">1,Alice,<span className="text-emerald-400 font-bold bg-emerald-950/50 p-1 rounded">25</span>,NY</div>
                  <div className="bg-red-950/30 border border-red-500/50 p-2 text-zinc-400">2,Bob,<span className="text-emerald-400 font-bold bg-emerald-950/50 p-1 rounded">30</span>,SF</div>
                  <div className="bg-red-950/30 border border-red-500/50 p-2 text-zinc-400">3,Charlie,<span className="text-emerald-400 font-bold bg-emerald-950/50 p-1 rounded">28</span>,LA</div>
                </div>
                <div className="mt-8 text-red-400 text-center font-bold bg-red-950/30 p-2 border border-red-900 rounded">
                  CSV stores data row-by-row.<br/>To read 'age', the disk MUST read every single byte of every line and parse it. Extremely slow!
                </div>
              </motion.div>
            )}

            {activeFormat === 'avro' && (
              <motion.div key="avro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center">
                <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-xl flex flex-col gap-2 w-full max-w-sm">
                  <div className="bg-blue-950/50 border border-blue-500/50 p-1 text-center text-blue-400 text-[10px]">Embedded Schema Header</div>
                  <div className="bg-zinc-800 p-2 text-zinc-500 break-words opacity-50 flex gap-2 overflow-hidden">
                    <span>1Alice<span className="text-emerald-400 font-bold opacity-100">25</span>NY</span>
                    <span>2Bob<span className="text-emerald-400 font-bold opacity-100">30</span>SF</span>
                  </div>
                </div>
                <div className="mt-8 text-blue-400 text-center font-bold bg-blue-950/30 p-2 border border-blue-900 rounded">
                  Avro is also row-based (binary). Still reads the whole row.<br/>BUT it contains the schema and is splittable. Best for Kafka/Streaming.
                </div>
              </motion.div>
            )}

            {activeFormat === 'parquet' && (
              <motion.div key="parquet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center">
                <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-xl flex w-full max-w-sm justify-between gap-2 h-32">
                  <div className="w-1/4 bg-zinc-800 rounded flex flex-col p-1 text-zinc-600 opacity-30 items-center justify-center border border-zinc-700">1<br/>2<br/>3</div>
                  <div className="w-1/4 bg-zinc-800 rounded flex flex-col p-1 text-zinc-600 opacity-30 items-center justify-center border border-zinc-700">Alice<br/>Bob<br/>Char</div>
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1.1 }} transition={{ delay: 0.5 }} className="w-1/4 bg-emerald-950 border-2 border-emerald-500 rounded flex flex-col p-1 text-emerald-400 font-bold items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">25<br/>30<br/>28</motion.div>
                  <div className="w-1/4 bg-zinc-800 rounded flex flex-col p-1 text-zinc-600 opacity-30 items-center justify-center border border-zinc-700">NY<br/>SF<br/>LA</div>
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 text-emerald-400 text-center font-bold bg-emerald-950/30 p-2 border border-emerald-900 rounded">
                  Parquet is columnar. Values for one column are stored contiguously.<br/>Spark jumps straight to the 'age' block. 0% disk wasted.
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
