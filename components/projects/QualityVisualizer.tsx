'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle2, AlertTriangle, AlertCircle, Play, XOctagon } from 'lucide-react';
import { ProjectDTO } from '@/lib/dto/projectDto';

interface QualityVisualizerProps {
  project: ProjectDTO;
}

export const QualityVisualizer: React.FC<QualityVisualizerProps> = ({ project }) => {
  const [activeCheck, setActiveCheck] = useState<number | null>(null);

  const checks = project.dataQuality || [
    'Null constraint on station_id',
    'Timestamp out of bounds check',
    'Duplicate transaction filter'
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* HEADER */}
      <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest border-b border-white/5 pb-4 flex items-center gap-2">
        <Shield className="w-4 h-4" /> Data Quality Control Loop
      </div>

      {/* ANIMATED PIPELINE */}
      <div className="bg-[#131b2e] border border-white/5 rounded-xl p-8 lg:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 lg:gap-8 justify-between">
        
        {/* Step 1: Incoming Data */}
        <div className="flex flex-col items-center gap-4 relative z-10 shrink-0">
          <div className="w-16 h-16 rounded-full border border-zinc-700 bg-[#0a0e18] flex items-center justify-center">
            <Play className="w-6 h-6 text-zinc-500" />
          </div>
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest text-center">Incoming<br/>Records</div>
        </div>

        {/* Step 2: Validation Engine */}
        <div className="flex-1 min-w-[240px] relative z-10 flex flex-col gap-4">
          <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest text-center mb-2">VALIDATION ENGINE</div>
          
          <div className="relative p-6 border border-emerald-500/30 bg-emerald-950/20 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            {/* Animated Scanning Line */}
            <motion.div 
              className="absolute top-0 bottom-0 left-0 w-1 bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,1)]"
              animate={{ left: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            />
            
            <div className="flex flex-col gap-3">
              {checks.map((check, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveCheck(idx)}
                  className={`px-4 py-2 text-xs font-mono border rounded transition-colors cursor-pointer ${
                    activeCheck === idx 
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                      : 'bg-[#0a0e18] border-white/10 text-zinc-400 hover:border-emerald-500/30 hover:text-emerald-400'
                  }`}
                >
                  <span className="opacity-50 mr-2">[{idx + 1}]</span>
                  {check}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Branching */}
        <div className="flex flex-col gap-8 relative z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">PASS</div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg border border-amber-500/30 bg-amber-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">QUARANTINE</div>
          </div>
        </div>
      </div>

      {/* INSPECTOR PANEL */}
      <AnimatePresence mode="wait">
        {activeCheck !== null && (
          <motion.div 
            key={activeCheck}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#131b2e] border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.05)] rounded-xl p-8"
          >
            <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-white">
                Quality Rule Inspector
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">VALIDATION RULE</div>
                <div className="text-sm text-emerald-300 font-mono bg-[#0a0e18] p-4 rounded-lg border border-white/5">
                  {checks[activeCheck]}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">ACTION ON FAILURE</div>
                <div className="text-sm text-amber-400 font-mono bg-[#0a0e18] p-4 rounded-lg border border-white/5 flex items-center gap-2">
                  <XOctagon className="w-4 h-4 shrink-0" /> Route to Quarantine
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
