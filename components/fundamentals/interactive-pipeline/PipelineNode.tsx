'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { PipelineStageConfig } from './types';

interface PipelineNodeProps {
  stage: PipelineStageConfig;
  isSelected: boolean;
  isSubdued: boolean;
  onClick: () => void;
  delay?: number;
}

export function PipelineNode({ stage, isSelected, isSubdued, onClick, delay = 0 }: PipelineNodeProps) {
  const Icon = stage.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex-1 min-w-[140px] z-10"
    >
      <motion.button
        onClick={onClick}
        className={`w-full text-left transition-all duration-300 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 group ${
          isSubdued ? 'opacity-50 grayscale-[50%]' : 'opacity-100'
        }`}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className={`overflow-hidden transition-all duration-500 rounded-2xl border ${
          isSelected 
            ? 'bg-gradient-to-br from-blue-950/50 to-zinc-950 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]' 
            : 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-white/10 group-hover:border-blue-500/30 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] backdrop-blur-md'
        }`}>
          <div className="p-4 sm:p-5 flex flex-col items-center justify-center text-center gap-3">
            <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center transition-colors duration-500 shadow-inner ${
              isSelected 
                ? 'bg-blue-900/50 text-blue-400 border border-blue-500/20' 
                : 'bg-zinc-800/50 border border-white/5 text-zinc-300 group-hover:text-blue-300 group-hover:bg-blue-900/20'
            }`}>
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h4 className={`font-bold text-sm sm:text-base tracking-wide transition-colors duration-300 ${
                isSelected ? 'text-blue-100' : 'text-zinc-100 group-hover:text-blue-50'
              }`}>
                {stage.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-zinc-500 mt-1.5 hidden sm:block font-medium leading-relaxed">
                {stage.description}
              </p>
            </div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
