'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Database, DownloadCloud, FileCode2, LineChart, ShieldCheck } from 'lucide-react';

const pipelineStages = [
  { id: 'ingestion', label: 'Ingestion', icon: DownloadCloud, desc: 'APIs, DBs, Streams' },
  { id: 'storage', label: 'Storage', icon: Database, desc: 'Lakes, Warehouses' },
  { id: 'transformation', label: 'Transformation', icon: FileCode2, desc: 'Clean, Conform' },
  { id: 'serving', label: 'Serving', icon: LineChart, desc: 'Marts, Features' },
  { id: 'reliability', label: 'Reliability', icon: ShieldCheck, desc: 'Orchestration, Quality' },
];

export function Q1Interactive() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-mono tracking-wider text-zinc-500 uppercase">
        The Data Engineering Pipeline
      </h3>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-4"
      >
        {pipelineStages.map((stage, idx) => (
          <motion.div key={stage.id} variants={itemVariants} className="relative">
            {idx < pipelineStages.length - 1 && (
              <div className="absolute left-6 top-10 bottom-[-16px] w-0.5 bg-zinc-800 z-0" />
            )}
            <Card className="relative z-10 bg-zinc-900 border-zinc-800 shadow-sm overflow-hidden group hover:border-zinc-700 transition-colors">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-blue-900/50 group-hover:bg-blue-950/20 transition-colors">
                  <stage.icon className="h-4 w-4 text-zinc-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-200">{stage.label}</h4>
                  <p className="text-sm text-zinc-400">{stage.desc}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
