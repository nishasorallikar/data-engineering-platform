'use client';

import { motion } from 'framer-motion';
import { ArchitectureType } from './types';

interface ETLELTToggleProps {
  activeMode: ArchitectureType;
  onChange: (mode: ArchitectureType) => void;
}

export function ETLELTToggle({ activeMode, onChange }: ETLELTToggleProps) {
  return (
    <div className="flex bg-zinc-950 border border-white/5 rounded-full p-1 mx-auto relative w-fit shadow-inner backdrop-blur-sm">
      {(['etl', 'elt'] as ArchitectureType[]).map((mode) => {
        const isActive = activeMode === mode;
        return (
          <button
            key={mode}
            onClick={() => onChange(mode)}
            className={`relative px-8 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 z-10 ${
              isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
            aria-pressed={isActive}
          >
            {isActive && (
              <motion.div
                layoutId="active-toggle"
                className="absolute inset-0 bg-indigo-600 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.4)] -z-10 border border-indigo-500/50"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {mode}
          </button>
        );
      })}
    </div>
  );
}
