'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface PipelineConnectorProps {
  isActive: boolean;
  delay?: number;
}

export function PipelineConnector({ isActive, delay = 0 }: PipelineConnectorProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-0.5 h-6 sm:h-10 bg-zinc-800 mx-auto my-1 lg:w-10 lg:h-0.5 lg:my-auto lg:mx-1 shrink-0 overflow-hidden rounded-full">
      {/* Base line reveal */}
      <motion.div
        className="absolute inset-0 bg-zinc-700/50 origin-top lg:origin-left"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay, ease: "easeInOut" }}
      />
      
      {/* Continuous Data Flow indicator */}
      {!shouldReduceMotion && (
        <>
          {/* Vertical flow (mobile) */}
          <motion.div
            className="absolute bg-blue-400 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)] rounded-full
              w-1.5 h-1.5 left-1/2 -translate-x-1/2 lg:hidden"
            initial={{ top: '0%', opacity: 0 }}
            animate={{ 
              top: ['0%', '100%'], 
              opacity: [0, 1, 1, 0] 
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: delay,
              ease: "linear",
            }}
          />
          {/* Horizontal flow (desktop) */}
          <motion.div
            className="absolute bg-blue-400 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)] rounded-full
              hidden lg:block w-2 h-2 top-1/2 -translate-y-1/2"
            initial={{ left: '0%', opacity: 0 }}
            animate={{ 
              left: ['0%', '100%'], 
              opacity: [0, 1, 1, 0] 
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: delay,
              ease: "linear",
            }}
          />
        </>
      )}
    </div>
  );
}
