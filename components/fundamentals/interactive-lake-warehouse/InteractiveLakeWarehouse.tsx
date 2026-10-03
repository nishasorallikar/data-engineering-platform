'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Database, HardDrive, Layers, FileJson, Image as ImageIcon, Table2, ArrowRight, LineChart, FileCode2, Code2 } from 'lucide-react';
import { ArchitectureConfig } from './types';

export function InteractiveLakeWarehouse() {
  return (
    <div className="w-full flex flex-col space-y-16 py-8">
      {/* 1. Data Warehouse */}
      <ArchitectureVisual 
        title="Data Warehouse"
        theme="blue"
        description="Structured data only. ETL required before loading. Fast BI, rigid schema."
        inputs={[<Table2 key="t1" className="w-5 h-5 text-blue-400" />]}
        rejectedInputs={[<FileJson key="j1" className="w-5 h-5" />, <ImageIcon key="i1" className="w-5 h-5" />]}
        storageIcon={<Database className="w-12 h-12 text-blue-400" />}
        storageName="Relational Storage"
        outputs={[<LineChart key="l1" className="w-6 h-6 text-blue-400" />]}
        outputName="Business Intelligence"
      />

      {/* 2. Data Lake */}
      <ArchitectureVisual 
        title="Data Lake"
        theme="emerald"
        description="All data types dumped raw. Cheap, but hard to query directly for BI."
        inputs={[
          <Table2 key="t2" className="w-5 h-5 text-blue-400" />,
          <FileJson key="j2" className="w-5 h-5 text-yellow-400" />,
          <ImageIcon key="i2" className="w-5 h-5 text-purple-400" />
        ]}
        rejectedInputs={[]}
        storageIcon={<HardDrive className="w-12 h-12 text-emerald-400" />}
        storageName="Object Storage (S3)"
        outputs={[<Code2 key="c1" className="w-6 h-6 text-emerald-400" />]}
        outputName="Data Scientists (Python/Spark)"
      />

      {/* 3. Data Lakehouse */}
      <ArchitectureVisual 
        title="Data Lakehouse"
        theme="purple"
        description="All data types + ACID transaction layer. Best of both worlds."
        inputs={[
          <Table2 key="t3" className="w-5 h-5 text-blue-400" />,
          <FileJson key="j3" className="w-5 h-5 text-yellow-400" />,
          <ImageIcon key="i3" className="w-5 h-5 text-purple-400" />
        ]}
        rejectedInputs={[]}
        storageIcon={<HardDrive className="w-12 h-12 text-purple-400" />}
        storageName="Object Storage (S3)"
        acidLayer={true}
        outputs={[
          <LineChart key="l2" className="w-6 h-6 text-purple-400" />,
          <Code2 key="c2" className="w-6 h-6 text-purple-400" />
        ]}
        outputName="BI & Data Scientists"
      />
    </div>
  );
}

interface ArchitectureVisualProps {
  title: string;
  theme: 'blue' | 'emerald' | 'purple';
  description: string;
  inputs: React.ReactNode[];
  rejectedInputs: React.ReactNode[];
  storageIcon: React.ReactNode;
  storageName: string;
  acidLayer?: boolean;
  outputs: React.ReactNode[];
  outputName: string;
}

function ArchitectureVisual({ 
  title, theme, description, inputs, rejectedInputs, storageIcon, storageName, acidLayer, outputs, outputName 
}: ArchitectureVisualProps) {
  const shouldReduceMotion = useReducedMotion();

  const colors = {
    blue: { bg: 'bg-blue-950/20 border-blue-900/50', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-[0_0_30px_rgba(59,130,246,0.15)]' },
    emerald: { bg: 'bg-emerald-950/20 border-emerald-900/50', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]' },
    purple: { bg: 'bg-purple-950/20 border-purple-900/50', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-[0_0_30px_rgba(168,85,247,0.15)]' },
  }[theme];

  return (
    <div className={`w-full rounded-3xl p-6 md:p-10 border bg-zinc-950/50 backdrop-blur-md relative ${colors.glow}`}>
      
      <div className="mb-8">
        <h3 className="text-2xl font-black text-white">{title}</h3>
        <p className="text-sm font-semibold text-zinc-400 mt-1">{description}</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 w-full max-w-4xl mx-auto">
        
        {/* INPUTS */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2">Ingestion</span>
          <div className="flex gap-2 p-4 bg-zinc-900/80 border border-white/5 rounded-2xl shadow-inner relative">
            {/* Accepted Inputs Animating Out */}
            {inputs.map((icon, i) => (
              <div key={i} className="relative w-10 h-10 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center">
                {icon}
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ x: 0, opacity: 1 }}
                    animate={{ x: [0, 80, 150], opacity: [1, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.4, ease: "linear" }}
                  >
                    {icon}
                  </motion.div>
                )}
              </div>
            ))}

            {/* Rejected Inputs (e.g. JSON/Image for Warehouse) */}
            {rejectedInputs.map((icon, i) => (
              <div key={`rej-${i}`} className="relative w-10 h-10 bg-zinc-950 border border-red-900/50 rounded-xl flex items-center justify-center opacity-50 grayscale">
                {icon}
                {/* Rejection bounce animation */}
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none text-red-500"
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: [0, 20, 0], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                  >
                    <XCircleIcon className="w-5 h-5" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FLOW CONNECTOR */}
        <ArrowRight className="hidden md:block w-6 h-6 text-zinc-700 shrink-0" />

        {/* STORAGE CORE */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2">Storage</span>
          <div className={`relative p-6 rounded-3xl border flex flex-col items-center justify-center gap-4 ${colors.bg} ${colors.border}`}>
            {storageIcon}
            <span className={`text-sm font-bold ${colors.text}`}>{storageName}</span>

            {/* Optional ACID / Delta Layer */}
            {acidLayer && (
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-indigo-900/80 border border-indigo-500/50 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.3)] whitespace-nowrap z-10 flex items-center gap-2">
                <Layers className="w-3 h-3 text-indigo-300" />
                <span className="text-[10px] font-mono font-bold text-indigo-200 uppercase tracking-wider">ACID Open Table Format</span>
              </div>
            )}
          </div>
        </div>

        {/* FLOW CONNECTOR */}
        <ArrowRight className="hidden md:block w-6 h-6 text-zinc-700 shrink-0" />

        {/* OUTPUTS */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2">Consumers</span>
          <div className="flex flex-col items-center gap-3 p-4 bg-zinc-900/80 border border-white/5 rounded-2xl shadow-inner relative">
            <div className="flex gap-2">
              {outputs.map((icon, i) => (
                <div key={i} className="w-10 h-10 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center shadow-md">
                  {icon}
                </div>
              ))}
            </div>
            <span className="text-xs font-semibold text-zinc-400 text-center max-w-[120px]">{outputName}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

function XCircleIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
    </svg>
  )
}
