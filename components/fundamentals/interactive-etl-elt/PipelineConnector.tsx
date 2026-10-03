'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface PipelineConnectorProps {
  isActive: boolean;
}

export function PipelineConnector({ isActive }: PipelineConnectorProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div 
      layout
      className="relative w-0.5 h-6 sm:h-8 bg-zinc-800 mx-auto my-1 lg:w-8 lg:h-0.5 lg:my-auto lg:mx-1 shrink-0 overflow-hidden rounded-full z-0"
    >
      <motion.div
        className="absolute inset-0 bg-zinc-700/50"
      />
      
      {!shouldReduceMotion && (
        <motion.div
          className="absolute bg-blue-400 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)] rounded-full
            w-1.5 h-1.5 left-1/2 -translate-x-1/2 lg:w-2 lg:h-2 lg:top-1/2 lg:-translate-y-1/2 lg:left-0"
          initial={{ top: '0%', left: '0%', opacity: 0 }}
          animate={{ 
            top: ['0%', '100%'], 
            left: ['0%', '100%'], 
            opacity: [0, 1, 1, 0] 
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
          }}
        />
      )}
    </motion.div>
  );
}
