'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Play, Box, Server, Database, ArrowRight } from 'lucide-react';
import { ProjectDTO } from '@/lib/dto/projectDto';

interface OverviewVisualizerProps {
  project: ProjectDTO;
}

export const OverviewVisualizer: React.FC<OverviewVisualizerProps> = ({ project }) => {
  const stages = [
    { id: 'SOURCE', icon: Zap, color: 'cyan' },
    { id: 'INGESTION', icon: Play, color: 'emerald' },
    { id: 'BRONZE', icon: Box, color: 'amber' },
    { id: 'SILVER', icon: Server, color: 'zinc' },
    { id: 'GOLD', icon: Database, color: 'yellow' },
    { id: 'SERVING', icon: ArrowRight, color: 'cyan' }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'cyan': return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,240,255,0.2)]';
      case 'emerald': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
      case 'amber': return 'text-amber-500 border-amber-500/30 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]';
      case 'yellow': return 'text-yellow-500 border-yellow-600/30 bg-yellow-600/10 shadow-[0_0_15px_rgba(234,179,8,0.2)]';
      default: return 'text-zinc-300 border-zinc-400/30 bg-zinc-400/10 shadow-[0_0_15px_rgba(212,212,216,0.2)]';
    }
  };

  const getSourceCount = () => project.sourceSystems?.length || 0;
  const getScenarioCount = () => project.scenarios?.length || 0;
  const getTechCount = () => project.technologies?.length || 0;

  return (
    <div className="flex flex-col gap-8 h-full min-h-[500px]">
      <div className="bg-[#131b2e] border border-white/5 rounded-xl p-8 lg:p-12 relative overflow-hidden flex flex-col items-center justify-center h-full min-h-[500px]">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

        <div className="flex flex-col items-center mb-16 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk',sans-serif] text-white mb-4 tracking-tight">
            {project.title.toUpperCase()}
          </h1>
          <div className="text-[10px] md:text-xs font-mono text-cyan-500 uppercase tracking-widest bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/30">
            Live Azure Data Engineering Architecture
          </div>
        </div>

        {/* Animated Architecture Strip */}
        <div className="w-full max-w-5xl relative z-10 mb-20 px-4 md:px-12">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-zinc-800 -translate-y-1/2 z-0" />
          
          {/* Animated Data Packets */}
          <motion.div 
            className="absolute z-10 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(0,240,255,1)] hidden lg:block"
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            style={{ top: 'calc(50% - 4px)' }}
          />
          <motion.div 
            className="absolute z-10 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,1)] hidden lg:block"
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity, delay: 2 }}
            style={{ top: 'calc(50% - 4px)' }}
          />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 relative z-20">
            {stages.map((stage, idx) => (
              <div key={stage.id} className="flex flex-col items-center gap-4">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${getColorClasses(stage.color)}`}>
                  <stage.icon className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest bg-[#0a0e18] px-2 py-1 rounded border border-white/5">
                  {stage.id}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Telemetry Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl relative z-10 border-t border-white/5 pt-12">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-3xl font-bold font-['Space_Grotesk',sans-serif] text-white">{getSourceCount()}</span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">SOURCES</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-3xl font-bold font-['Space_Grotesk',sans-serif] text-white">6</span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">LAYERS</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-3xl font-bold font-['Space_Grotesk',sans-serif] text-white">{getScenarioCount()}</span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">SCENARIOS</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-3xl font-bold font-['Space_Grotesk',sans-serif] text-white">{getTechCount()}</span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">TECHNOLOGIES</span>
          </div>
        </div>
      </div>
    </div>
  );
};
