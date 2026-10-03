'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Clock, Smartphone, Server } from 'lucide-react';

export function InteractiveWatermarks() {
  const [step, setStep] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  useEffect(() => {
    if (userInteracted || !isInView) return;
    let s = 0;
    const interval = setInterval(() => {
      if (s === 0) setStep(1); // normal event
      else if (s === 1) setStep(2); // late event created offline
      else if (s === 2) setStep(3); // phone goes online, late event sent
      else if (s === 3) setStep(4); // evaluate watermark
      else { s = -1; setStep(0); }
      s++;
    }, 2500); 
    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="w-full max-w-4xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[400px] overflow-hidden font-mono text-xs">
        
        <div className="flex w-full justify-between items-center max-w-2xl mt-8">
          
          {/* User Phone */}
          <div className="flex flex-col items-center gap-2 relative">
            <div className={`p-4 rounded-xl border-2 transition-colors ${step >= 2 ? 'bg-emerald-950/30 border-emerald-500' : 'bg-zinc-900 border-zinc-700'}`}>
              <Smartphone className={`w-8 h-8 ${step >= 2 ? 'text-emerald-400' : 'text-zinc-500'}`} />
            </div>
            <div className="text-zinc-500 font-bold">{step >= 2 ? 'Online' : 'Offline (Subway)'}</div>

            <AnimatePresence>
              {step === 0 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-12 bg-blue-900/80 text-blue-300 p-1 rounded border border-blue-500 whitespace-nowrap">
                  Click @ 12:00
                </motion.div>
              )}
              {step === 1 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-12 bg-orange-900/80 text-orange-300 p-1 rounded border border-orange-500 whitespace-nowrap">
                  Click @ 12:01<br/>(Saved locally)
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Network / Timeline */}
          <div className="flex-1 h-32 relative mx-8 flex items-center justify-center border-b-2 border-zinc-700 border-dashed">
            
            {/* Watermark Line */}
            <div className="absolute right-12 h-24 w-1 bg-red-500/50 flex flex-col items-center justify-start z-0">
              <div className="bg-red-950 text-red-400 text-[8px] font-bold p-1 rounded whitespace-nowrap -mt-6 border border-red-500">
                Watermark (12:03)
              </div>
            </div>

            <AnimatePresence>
              {/* Normal Event */}
              {(step === 0 || step === 1) && (
                <motion.div initial={{ left: '0%' }} animate={{ left: '100%' }} transition={{ duration: 1 }} className="absolute bg-blue-500 text-white p-1 text-[10px] rounded font-bold z-10 flex flex-col items-center">
                  <Clock className="w-3 h-3"/> Event: 12:00
                </motion.div>
              )}
              
              {/* Late Event */}
              {step >= 2 && (
                <motion.div initial={{ left: '0%' }} animate={{ left: '100%' }} transition={{ duration: 1 }} className="absolute bg-orange-500 text-white p-1 text-[10px] rounded font-bold z-10 flex flex-col items-center shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                  <Clock className="w-3 h-3"/> Event: 12:01
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Server / Window */}
          <div className="flex flex-col items-center gap-2 w-48 relative">
            <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-xl w-full">
              <div className="text-zinc-400 font-bold flex items-center gap-2 mb-2 border-b border-zinc-800 pb-2"><Server className="w-4 h-4"/> Processing Time: 12:05</div>
              <div className="text-zinc-500 text-[10px] mb-2">Window: 12:00 - 12:05</div>
              
              <div className="flex flex-col gap-1 min-h-[60px]">
                <AnimatePresence>
                  {step >= 1 && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-blue-950 border border-blue-500 text-blue-300 p-1 rounded text-[10px]">
                      Received Event (12:00)
                    </motion.div>
                  )}
                  {step === 4 && (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-950 border border-emerald-500 text-emerald-400 p-1 rounded text-[10px] shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                      Accepted Late Event (12:01)
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {step === 4 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-16 w-64 text-center text-emerald-400 font-bold bg-emerald-950/20 border border-emerald-900 p-2 rounded">
                Event (12:01) is older than the Watermark (12:03), so the window accepts it!
              </motion.div>
            )}
          </div>
        </div>

        <div className="h-16 mt-16 text-center max-w-lg">
          <AnimatePresence mode="wait">
            {step === 0 && <motion.div key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-blue-400 font-bold">Event Time is when the event ACTUALLY happened (e.g. click at 12:00).</motion.div>}
            {step === 1 && <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-orange-400 font-bold">User loses signal. They click at 12:01. The event is saved on the phone.</motion.div>}
            {step === 2 && <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400 font-bold">User regains signal at 12:05 (Processing Time). The phone sends the 12:01 event.</motion.div>}
            {step === 3 && <motion.div key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-400 font-bold">A Watermark is a threshold. "I am at 12:05, but I will accept late data that happened up to 2 minutes ago (Watermark = 12:03)".</motion.div>}
            {step === 4 && <motion.div key="4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400 font-bold">If the event was from 11:59, it would be dropped because it's past the watermark. This bounds memory usage!</motion.div>}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
