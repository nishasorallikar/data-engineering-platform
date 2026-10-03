'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Mail, Database, Zap } from 'lucide-react';

const CONCEPTS = [
  { 
    id: 'mq', 
    label: 'Traditional MQ (RabbitMQ)', 
    icon: Mail, 
    desc: 'Point-to-point. Once a message is read, it is deleted from the queue.', 
    highlight: 'red'
  },
  { 
    id: 'kafka', 
    label: 'Kafka (Event Log)', 
    icon: Database, 
    desc: 'Pub/Sub distributed log. Messages are persisted to disk and can be read by many groups.', 
    highlight: 'emerald'
  }
] as const;

export function InteractiveKafkaVsMQ() {
  const [activeType, setActiveType] = useState<string>('mq');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveType(current => {
        const currentIndex = CONCEPTS.findIndex(c => c.id === current);
        return CONCEPTS[(currentIndex + 1) % CONCEPTS.length].id;
      });
    }, 6000); 

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const activeData = CONCEPTS.find(c => c.id === activeType)!;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full">
        {CONCEPTS.map((concept) => (
          <button
            key={concept.id}
            onClick={() => {
              setUserInteracted(true);
              setActiveType(concept.id);
            }}
            className={`flex-1 min-w-[250px] px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative ${
              activeType === concept.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {activeType === concept.id && (
              <motion.div
                layoutId="active-type-bg-mq"
                className={`absolute inset-0 rounded-xl -z-10 ${concept.highlight === 'emerald' ? 'bg-emerald-600' : 'bg-red-600'}`}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              <concept.icon className="w-4 h-4" />
              {concept.label}
            </span>
          </button>
        ))}
      </div>

      <div className="text-sm font-mono text-zinc-400 h-12 md:h-8 text-center px-4 max-w-2xl">{activeData.desc}</div>

      <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center justify-center min-h-[350px] overflow-hidden">
        <AnimatePresence mode="wait">
          <MQState key={activeType} type={activeType} reduceMotion={shouldReduceMotion} />
        </AnimatePresence>
      </div>
      
    </div>
  );
}

function MQState({ type, reduceMotion }: { type: string, reduceMotion: boolean | null }) {
  const isMQ = type === 'mq';
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-4 w-full h-full font-mono text-xs"
    >
      <div className="flex w-full max-w-2xl items-stretch justify-between relative h-48">
        
        {/* Producer */}
        <div className="w-32 flex flex-col justify-center items-center">
          <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-xl flex flex-col items-center">
            <span className="text-zinc-400 font-bold mb-2">Producer</span>
            <div className="w-6 h-6 bg-blue-500 rounded-sm text-[10px] text-white flex items-center justify-center font-bold">Msg</div>
          </div>
        </div>

        {/* Broker */}
        <div className="flex flex-col justify-center items-center w-64 h-full relative">
          <div className="absolute -top-4 font-bold text-zinc-500">{isMQ ? 'RabbitMQ (RAM)' : 'Kafka (Disk)'}</div>
          
          <div className="w-full h-16 bg-black border-2 border-zinc-700 rounded-lg flex items-center px-2 gap-2 relative overflow-hidden">
            {isMQ ? (
              <AnimatePresence mode="popLayout">
                {step <= 1 && (
                  <motion.div key="msg" initial={{ x: -50 }} animate={{ x: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="w-8 h-8 bg-blue-500 rounded-sm text-[10px] text-white flex items-center justify-center font-bold absolute left-4">
                    Msg
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center text-zinc-600 font-bold">
                    [Queue Empty]
                  </motion.div>
                )}
              </AnimatePresence>
            ) : (
              <div className="w-full h-full flex items-center gap-1">
                <div className="w-8 h-8 bg-zinc-800 rounded-sm text-[10px] text-zinc-600 flex items-center justify-center font-bold border border-zinc-700">M1</div>
                <div className="w-8 h-8 bg-zinc-800 rounded-sm text-[10px] text-zinc-600 flex items-center justify-center font-bold border border-zinc-700">M2</div>
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="w-8 h-8 bg-blue-500 rounded-sm text-[10px] text-white flex items-center justify-center font-bold">
                  Msg
                </motion.div>
                {step >= 1 && (
                  <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: -28, opacity: 1 }} className="absolute bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-[8px] px-1 rounded left-[72px]">
                    Retained on disk (7 days)
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Consumers */}
        <div className="w-48 flex flex-col justify-center items-center gap-4 relative">
          <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-xl flex items-center justify-between w-full shadow-lg h-12">
            <span className="text-zinc-400 font-bold text-[10px]">App 1 (Billing)</span>
            <AnimatePresence>
              {step >= 1 && (
                <motion.div key="read1" initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="w-6 h-6 bg-blue-500/50 border border-blue-400 rounded-sm text-[8px] text-white flex items-center justify-center">Msg</motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-xl flex items-center justify-between w-full shadow-lg h-12 relative">
            <span className="text-zinc-400 font-bold text-[10px]">App 2 (Analytics)</span>
            <AnimatePresence>
              {step === 2 && !isMQ && (
                <motion.div key="read2" initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="w-6 h-6 bg-blue-500/50 border border-blue-400 rounded-sm text-[8px] text-white flex items-center justify-center">Msg</motion.div>
              )}
              {step === 2 && isMQ && (
                <motion.div key="miss" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="absolute -left-6 -top-2 bg-red-950/80 border border-red-500 text-red-400 text-[8px] p-1 rounded font-bold shadow-lg">
                  Missed it!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center max-w-lg h-16">
        <AnimatePresence mode="wait">
          {isMQ ? (
             <motion.div key="mq-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-400 font-bold bg-red-950/20 p-2 rounded border border-red-900">
               In RabbitMQ, once App 1 reads the message, it is popped off the queue and destroyed. App 2 can never read it. (Requires complex fan-out exchanges).
             </motion.div>
          ) : (
            <motion.div key="kafka-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400 font-bold bg-emerald-950/20 p-2 rounded border border-emerald-900">
               In Kafka, the message stays on disk. App 1 reads it (moves its offset). App 2 can read the exact same message later at its own pace.
             </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}
