'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Radio, AlertTriangle, Workflow, BellRing } from 'lucide-react';
import { ProjectDTO } from '@/lib/dto/projectDto';

interface MonitoringVisualizerProps {
  project: ProjectDTO;
}

export const MonitoringVisualizer: React.FC<MonitoringVisualizerProps> = ({ project }) => {
  const [activeSignal, setActiveSignal] = useState<number | null>(null);

  const monitoringNodes = [
    {
      id: 'TELEMETRY',
      icon: Radio,
      title: 'Telemetry Emitted',
      color: 'cyan'
    },
    {
      id: 'MONITORING',
      icon: Activity,
      title: 'Metrics Aggregation',
      color: 'emerald'
    },
    {
      id: 'ALERT',
      icon: AlertTriangle,
      title: 'Alert Evaluation',
      color: 'amber'
    },
    {
      id: 'ACTION',
      icon: BellRing,
      title: 'Operator Action',
      color: 'yellow'
    }
  ];

  const monitoringDetails = project.monitoring || [
    'Databricks cluster utilization',
    'Data Factory pipeline failures',
    'Event Hubs ingress latency'
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest border-b border-white/5 pb-4 flex items-center gap-2">
        <Activity className="w-4 h-4" /> Observability Topology
      </div>

      <div className="bg-[#131b2e] border border-white/5 rounded-xl p-8 lg:p-12 relative overflow-hidden">
        {/* Animated Background Pulse */}
        <motion.div 
          className="absolute inset-0 bg-cyan-500/5"
          animate={{ opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 relative z-10 px-4">
          
          <div className="hidden md:block absolute top-1/2 left-[5%] right-[5%] h-[1px] bg-zinc-800 -translate-y-1/2 z-0" />
          
          {/* Animated Telemetry Signal */}
          <motion.div 
            className="absolute z-10 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,240,255,1)] hidden md:block"
            animate={{ left: ['5%', '95%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.5, ease: "linear", repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
            style={{ top: 'calc(50% - 4px)' }}
          />

          <div className="relative z-20 flex flex-col items-center gap-2 shrink-0">
            <div className="w-16 h-16 rounded-xl border border-white/10 bg-[#0a0e18] flex items-center justify-center">
              <Workflow className="w-6 h-6 text-zinc-500" />
            </div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">PIPELINE</div>
          </div>

          {monitoringNodes.map((node, idx) => (
            <div 
              key={node.id}
              onClick={() => setActiveSignal(activeSignal === idx ? null : idx)}
              className="relative z-20 flex flex-col items-center gap-3 cursor-pointer group shrink-0"
            >
              <div className={`w-12 h-12 rounded-full border bg-[#0a0e18] flex items-center justify-center transition-all duration-300 ${
                activeSignal === idx 
                  ? 'border-cyan-500 shadow-[0_0_15px_rgba(0,240,255,0.3)] text-cyan-400'
                  : 'border-white/10 text-zinc-400 group-hover:border-cyan-500/50 group-hover:text-cyan-300'
              }`}>
                <node.icon className="w-5 h-5" />
              </div>
              <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors ${
                activeSignal === idx ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-zinc-300'
              }`}>
                {node.id}
              </div>
            </div>
          ))}

        </div>
      </div>

      <div className="bg-[#131b2e] border border-white/5 rounded-xl p-8 min-h-[200px]">
        {activeSignal !== null ? (
          <motion.div 
            key={activeSignal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
              <Activity className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-white">
                {monitoringNodes[activeSignal].title}
              </h3>
            </div>
            
            <div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">DOCUMENTED SIGNALS / ALERTS</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {monitoringDetails.map((detail, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#0a0e18] border border-white/5 p-4 rounded-lg shadow-inner">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${i % 2 === 0 ? 'bg-amber-400 shadow-[0_0_5px_rgba(245,158,11,0.5)]' : 'bg-emerald-400 shadow-[0_0_5px_rgba(16,185,129,0.5)]'}`} />
                    <span className="text-sm text-zinc-300 font-mono tracking-tight">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500 opacity-50 py-12">
            <Activity className="w-8 h-8 mb-4" />
            <div className="text-xs font-mono uppercase tracking-widest">Select a monitoring stage to view configured alerts</div>
          </div>
        )}
      </div>
    </div>
  );
};
