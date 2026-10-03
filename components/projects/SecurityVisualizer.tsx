'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Key, ShieldCheck, Database, Network } from 'lucide-react';
import { ProjectDTO } from '@/lib/dto/projectDto';

interface SecurityVisualizerProps {
  project: ProjectDTO;
}

export const SecurityVisualizer: React.FC<SecurityVisualizerProps> = ({ project }) => {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const securityLayers = [
    {
      id: 'IDENTITY',
      icon: User,
      title: 'Identity Provider',
      description: 'Entra ID / Azure AD Authentication'
    },
    {
      id: 'RBAC',
      icon: Key,
      title: 'Access Control',
      description: 'Role-Based Access Control (RBAC)'
    },
    {
      id: 'NETWORK',
      icon: Network,
      title: 'Network Security',
      description: 'Private Endpoints & VNet Integration'
    },
    {
      id: 'DATA',
      icon: Database,
      title: 'Data Protection',
      description: 'Encryption at rest and in transit'
    },
    {
      id: 'AUDIT',
      icon: ShieldCheck,
      title: 'Audit & Governance',
      description: 'Centralized diagnostic logging'
    }
  ];

  // Try to map documented security controls if they exist, otherwise use placeholders matching the concepts.
  const getDocumentedDetails = (layerId: string) => {
    const defaultSec = project.security || [];
    switch(layerId) {
      case 'IDENTITY': return defaultSec.find(s => s.toLowerCase().includes('identity') || s.toLowerCase().includes('ad')) || 'Managed Identity for Azure resources';
      case 'RBAC': return defaultSec.find(s => s.toLowerCase().includes('rbac') || s.toLowerCase().includes('role')) || 'Granular permissions via Azure RBAC';
      case 'NETWORK': return defaultSec.find(s => s.toLowerCase().includes('network') || s.toLowerCase().includes('vnet') || s.toLowerCase().includes('endpoint')) || 'Isolated VNet deployment';
      case 'DATA': return defaultSec.find(s => s.toLowerCase().includes('encrypt') || s.toLowerCase().includes('mask')) || 'TDE and CMK encryption';
      case 'AUDIT': return defaultSec.find(s => s.toLowerCase().includes('audit') || s.toLowerCase().includes('log')) || 'Azure Monitor diagnostic logs';
      default: return 'Not documented in source';
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-[10px] font-mono text-amber-500 uppercase tracking-widest border-b border-white/5 pb-4 flex items-center gap-2">
        <Lock className="w-4 h-4" /> Architecture Security Map
      </div>

      <div className="bg-[#131b2e] border border-white/5 rounded-xl p-8 lg:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Animated Access Signal */}
        <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-white/5 -translate-y-1/2 z-0 hidden md:block" />
        <div className="absolute left-1/2 top-[10%] bottom-[10%] w-[1px] bg-white/5 -translate-x-1/2 z-0 block md:hidden" />
        
        <motion.div 
          className="absolute z-10 w-4 h-4 bg-amber-400 rounded-sm shadow-[0_0_20px_rgba(245,158,11,1)] hidden md:block"
          animate={{ left: ['10%', '90%'] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          style={{ top: 'calc(50% - 8px)' }}
        />

        {securityLayers.map((layer, idx) => {
          const isActive = activeLayer === idx;
          return (
            <div 
              key={layer.id}
              onClick={() => setActiveLayer(activeLayer === idx ? null : idx)}
              className="relative z-20 flex flex-col items-center gap-3 cursor-pointer group"
            >
              <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-[#0a0e18] ${
                isActive 
                  ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] text-amber-400' 
                  : 'border-white/10 text-zinc-500 group-hover:border-amber-500/50 group-hover:text-amber-300'
              }`}>
                <layer.icon className="w-6 h-6" />
              </div>
              <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors ${
                isActive ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'
              }`}>
                {layer.id}
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeLayer !== null && (
          <motion.div 
            key={activeLayer}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-[#131b2e] border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.05)] rounded-xl p-8"
          >
            <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
              <Lock className="w-5 h-5 text-amber-400" />
              <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-white">
                {securityLayers[activeLayer].title}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">SECURITY CONCEPT</div>
                <div className="text-sm text-zinc-300 font-sans leading-relaxed">
                  {securityLayers[activeLayer].description}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">DOCUMENTED CONTROL</div>
                <div className="text-sm text-amber-400 font-mono bg-[#0a0e18] p-4 rounded-lg border border-white/5">
                  {getDocumentedDetails(securityLayers[activeLayer].id)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
