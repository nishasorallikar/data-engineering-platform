'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';

interface ReliabilityLayerProps {
  children: ReactNode;
  delay?: number;
}

export function ReliabilityLayer({ children, delay = 0 }: ReliabilityLayerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="relative w-full border-2 border-dashed border-zinc-800/80 rounded-2xl p-4 sm:p-8 mt-8 mb-4 bg-zinc-950/30"
    >
      {/* Label for the reliability layer */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-zinc-950 px-4 flex items-center gap-2 text-zinc-400 border border-zinc-800 rounded-full">
        <ShieldCheck className="h-4 w-4 text-emerald-500/80" />
        <span className="text-xs font-mono uppercase tracking-widest font-semibold">Reliability</span>
      </div>
      
      {/* Description text for Reliability */}
      <div className="text-center mb-6 mt-2 text-xs text-zinc-500">
        Orchestration • Quality • Monitoring • Cost Control
      </div>
      
      {/* Content (The main pipeline) */}
      <div className="w-full flex justify-center">
        {children}
      </div>
    </motion.div>
  );
}
