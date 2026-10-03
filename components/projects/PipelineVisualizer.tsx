'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Zap, Box, ArrowRight, Play, Settings } from 'lucide-react';
import { ProjectDTO } from '@/lib/dto/projectDto';

interface PipelineVisualizerProps {
  project: ProjectDTO;
}

export const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({ project }) => {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const getSafeDetails = (data: any[], defaultArray: string[]) => {
    if (!data || !Array.isArray(data) || data.length === 0) return defaultArray;
    return data.map(item => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object') {
        return item.name || item.title || item.scenario || item.description || JSON.stringify(item);
      }
      return String(item);
    });
  };

  const stages = [
    {
      id: 'SOURCE',
      icon: Zap,
      title: 'SOURCE SYSTEMS',
      details: getSafeDetails(project.sourceSystems, ['IoT Telemetry', 'Enterprise APIs']),
      color: 'cyan'
    },
    {
      id: 'INGESTION',
      icon: Play,
      title: 'INGESTION',
      details: getSafeDetails(project.ingestion, ['Event Hubs', 'Data Factory']),
      color: 'emerald'
    },
    {
      id: 'BRONZE',
      icon: Box,
      title: 'BRONZE (RAW)',
      details: ['Append-only', 'No schema enforcement'],
      color: 'amber'
    },
    {
      id: 'SILVER',
      icon: Server,
      title: 'SILVER (CLEANSED)',
      details: getSafeDetails(project.processing, ['Deduplication', 'Watermarking', 'Schema enforcement']),
      color: 'zinc'
    },
    {
      id: 'GOLD',
      icon: Database,
      title: 'GOLD (CURATED)',
      details: ['Star schema', 'Business-level aggregates'],
      color: 'yellow'
    },
    {
      id: 'SERVING',
      icon: ArrowRight,
      title: 'SERVING',
      details: getSafeDetails(project.orchestration, ['Power BI', 'Downstream APIs']),
      color: 'cyan'
    }
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

  return (
    <div className="flex flex-col gap-8">
      {/* HEADER */}
      <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest border-b border-white/5 pb-4">
        Data Pipeline & Transformation Flow
      </div>

      {/* ANIMATED PIPELINE */}
      <div className="bg-[#131b2e] border border-white/5 rounded-xl p-8 lg:p-12 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8 lg:gap-4">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-zinc-800 -translate-y-1/2 z-0" />
          <div className="block lg:hidden absolute left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800 -translate-x-1/2 z-0" />

          {/* Animated Packet */}
          <motion.div 
            className="absolute z-10 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(0,240,255,1)] hidden lg:block"
            animate={{
              left: ['0%', '100%']
            }}
            transition={{
              duration: 4,
              ease: "linear",
              repeat: Infinity
            }}
            style={{ top: 'calc(50% - 6px)' }}
          />

          {stages.map((stage, idx) => (
            <div 
              key={stage.id} 
              className="relative z-20 flex flex-col items-center gap-4 cursor-pointer group"
              onClick={() => setActiveStage(activeStage === idx ? null : idx)}
              onMouseEnter={() => setActiveStage(idx)}
            >
              <div className={`w-16 h-16 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                activeStage === idx 
                  ? getColorClasses(stage.color)
                  : 'bg-[#0a0e18] border-white/10 text-zinc-500 hover:border-white/30 hover:bg-[#131b2e]'
              }`}>
                <stage.icon className={`w-6 h-6 ${activeStage === idx ? '' : 'opacity-50 group-hover:opacity-100'}`} />
              </div>
              <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors ${
                activeStage === idx ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
              }`}>
                {stage.id}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INSPECTOR PANEL */}
      <div className="bg-[#131b2e] border border-white/5 rounded-xl p-8 min-h-[200px]">
        {activeStage !== null ? (
          <motion.div 
            key={stages[activeStage].id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Settings className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-white">
                {stages[activeStage].title}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stages[activeStage].details.map((detail: string, i: number) => (
                <div key={i} className="flex items-start gap-3 bg-[#0a0e18] border border-white/5 p-4 rounded-lg">
                  <ArrowRight className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-zinc-300 font-sans leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500 opacity-50 py-12">
            <Settings className="w-8 h-8 mb-4" />
            <div className="text-xs font-mono uppercase tracking-widest">Select a pipeline stage to view technical details</div>
          </div>
        )}
      </div>
    </div>
  );
};
