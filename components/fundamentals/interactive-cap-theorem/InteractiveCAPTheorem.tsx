'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { CheckCircle2, Zap, ServerCrash } from 'lucide-react';

const NODES = [
  { id: 'cp', label: 'CP (Consistency + Partition Tolerance)', desc: 'HBase, MongoDB. If network splits, nodes refuse reads/writes to prevent stale data.', highlight: 'blue' },
  { id: 'ap', label: 'AP (Availability + Partition Tolerance)', desc: 'Cassandra, DynamoDB. If network splits, nodes keep accepting writes (resulting in stale/conflicting data later).', highlight: 'emerald' },
  { id: 'ca', label: 'CA (Consistency + Availability)', desc: 'PostgreSQL, MySQL (Single Node). Cannot tolerate a network partition (it just goes down).', highlight: 'orange' }
] as const;

export function InteractiveCAPTheorem() {
  const [activeType, setActiveType] = useState<string>('cp');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  useEffect(() => {
    if (userInteracted || !isInView) return;
    const interval = setInterval(() => {
      setActiveType(current => {
        const currentIndex = NODES.findIndex(n => n.id === current);
        return NODES[(currentIndex + 1) % NODES.length].id;
      });
    }, 6000); 
    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = NODES.find(n => n.id === activeType)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full">
        {NODES.map((node) => {
          let bgClass = 'bg-blue-600';
          if (node.highlight === 'emerald') bgClass = 'bg-emerald-600';
          if (node.highlight === 'orange') bgClass = 'bg-orange-600';

          return (
            <button
              key={node.id}
              onClick={() => { setUserInteracted(true); setActiveType(node.id); }}
              className={`flex-1 min-w-[200px] px-4 py-3 rounded-xl text-sm font-bold transition-all relative ${
                activeType === node.id ? 'text-white' : 'text-zinc-500'
              }`}
            >
              {activeType === node.id && (
                <motion.div layoutId="cap-bg" className={`absolute inset-0 rounded-xl -z-10 ${bgClass}`} transition={{ type: "spring", stiffness: 350, damping: 30 }} />
              )}
              <span className="relative z-10 text-center block w-full">{node.label}</span>
            </button>
          );
        })}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-12 md:h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[350px] overflow-hidden">
        <AnimatePresence mode="wait">
          <CAPState key={activeType} type={activeType} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function CAPState({ type }: { type: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let s = 0;
    const int = setInterval(() => {
      s++;
      setStep(s % 3);
    }, 2000);
    return () => clearInterval(int);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4 font-mono text-xs w-full h-full">
      
      <div className="flex w-full max-w-lg justify-between items-center h-48 relative">
        
        {/* Node A */}
        <div className="w-32 bg-zinc-900 border border-zinc-700 rounded-xl p-4 flex flex-col items-center z-10 shadow-lg relative">
          <div className="text-zinc-400 font-bold mb-2">Node A (US)</div>
          <div className="text-white text-lg font-bold bg-black px-4 py-2 rounded border border-zinc-800">
            x = 5
          </div>
          {step === 1 && (
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute -left-20 top-10 bg-blue-950 text-blue-300 p-2 border border-blue-500 rounded font-bold shadow-lg">
              Write: x=5
            </motion.div>
          )}
        </div>

        {/* Network link */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-0 h-full">
          {type === 'ca' ? (
             <div className="w-full h-2 bg-emerald-500/20 relative overflow-hidden flex items-center justify-center border-y border-emerald-900/50">
               <motion.div initial={{ left: '0%' }} animate={{ left: '100%' }} transition={{ duration: 1, repeat: Infinity }} className="w-8 h-full bg-emerald-500 absolute" />
             </div>
          ) : (
            <div className="relative flex flex-col items-center justify-center w-full h-full">
               <div className="w-full border-t-2 border-dashed border-red-500/50 absolute top-1/2" />
               <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="bg-red-950 border border-red-500 p-2 rounded text-red-400 font-bold z-10 flex items-center gap-2">
                 <ServerCrash className="w-4 h-4"/> Network Split!
               </motion.div>
            </div>
          )}
        </div>

        {/* Node B */}
        <div className="w-32 bg-zinc-900 border border-zinc-700 rounded-xl p-4 flex flex-col items-center z-10 shadow-lg relative">
          <div className="text-zinc-400 font-bold mb-2">Node B (EU)</div>
          
          <div className="text-white text-lg font-bold bg-black px-4 py-2 rounded border border-zinc-800 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {type === 'ca' ? (
                 <motion.span key="ca">x = 5</motion.span>
              ) : step < 2 ? (
                 <motion.span key="old">x = 1</motion.span>
              ) : type === 'ap' ? (
                 <motion.span key="ap">x = 1</motion.span> 
              ) : (
                 <motion.span key="cp" className="text-red-500 text-sm">ERR</motion.span>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {step === 2 && (
              <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="absolute -right-24 top-10 bg-zinc-800 text-zinc-300 p-2 border border-zinc-600 rounded font-bold shadow-lg flex flex-col items-center gap-1">
                Read: x=?
                {type === 'ap' && <span className="text-emerald-400 text-[10px]">Returns stale 1</span>}
                {type === 'cp' && <span className="text-red-400 text-[10px]">Refuses read</span>}
                {type === 'ca' && <span className="text-emerald-400 text-[10px]">Returns 5</span>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="h-16 mt-4 text-center max-w-lg">
        {type === 'ca' && <div className="text-orange-400 font-bold bg-orange-950/20 p-2 rounded border border-orange-900">Single-node database. Never partitions. Always available and consistent, but cannot scale infinitely.</div>}
        {type === 'cp' && <div className="text-blue-400 font-bold bg-blue-950/20 p-2 rounded border border-blue-900">If EU cannot talk to US, EU shuts down rather than serving old data. Prioritizes Consistency.</div>}
        {type === 'ap' && <div className="text-emerald-400 font-bold bg-emerald-950/20 p-2 rounded border border-emerald-900">If EU cannot talk to US, EU stays online and serves "x=1". Prioritizes Availability (uptime) over accuracy.</div>}
      </div>

    </motion.div>
  );
}
