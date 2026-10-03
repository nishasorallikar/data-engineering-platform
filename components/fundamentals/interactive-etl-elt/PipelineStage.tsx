'use client';

import { motion } from 'framer-motion';
import { StageConfig } from './types';

interface PipelineStageProps {
  stage: StageConfig;
  isActive: boolean;
  onClick: () => void;
}

export function PipelineStage({ stage, isActive, onClick }: PipelineStageProps) {
  const Icon = stage.icon;

  return (
    <motion.div
      layout
      layoutId={`stage-${stage.id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex-1 min-w-[140px] z-10"
    >
      <motion.button
        onClick={onClick}
        className="w-full text-left transition-all duration-300 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 group"
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className={`overflow-hidden transition-all duration-500 rounded-2xl border ${
          isActive 
            ? 'bg-gradient-to-br from-indigo-950/50 to-zinc-950 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.2)]' 
            : 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-white/10 group-hover:border-indigo-500/30 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] backdrop-blur-md'
        }`}>
          <div className="p-4 sm:p-5 flex flex-col items-center justify-center text-center gap-3">
            <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center transition-colors duration-500 shadow-inner ${
              isActive 
                ? 'bg-indigo-900/50 text-indigo-400 border border-indigo-500/20' 
                : 'bg-zinc-800/50 border border-white/5 text-zinc-300 group-hover:text-indigo-300 group-hover:bg-indigo-900/20'
            }`}>
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h4 className={`font-bold text-sm sm:text-base tracking-wide transition-colors duration-300 ${
                isActive ? 'text-indigo-100' : 'text-zinc-100 group-hover:text-indigo-50'
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
