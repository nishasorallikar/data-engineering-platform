'use client';

import React, { useState } from 'react';
import { Shield, Zap, Box, Server, Database, Code2, ArrowRight } from 'lucide-react';

interface Scenario {
  layer: string;
  scenario: string;
  handling: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
}

interface ScenarioExplorerProps {
  scenarios: Scenario[];
}

export const ScenarioExplorer: React.FC<ScenarioExplorerProps> = ({ scenarios }) => {
  const [filter, setFilter] = useState<'All' | 'Bronze' | 'Silver' | 'Gold'>('All');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const filteredScenarios = scenarios.filter(s => filter === 'All' || s.layer === filter);

  React.useEffect(() => {
    if (selectedScenario && filter !== 'All' && selectedScenario.layer !== filter) {
      setSelectedScenario(null);
    }
  }, [filter, selectedScenario]);

  const getLayerColor = (layer: string) => {
    switch(layer) {
      case 'Bronze': return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
      case 'Silver': return 'text-zinc-300 bg-zinc-400/10 border-zinc-400/30';
      case 'Gold': return 'text-yellow-500 bg-yellow-600/10 border-yellow-600/40';
      default: return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
    }
  };

  const getLayerGlow = (layer: string) => {
    switch(layer) {
      case 'Bronze': return 'shadow-[0_0_15px_rgba(245,158,11,0.2)]';
      case 'Silver': return 'shadow-[0_0_15px_rgba(212,212,216,0.2)]';
      case 'Gold': return 'shadow-[0_0_15px_rgba(234,179,8,0.2)]';
      default: return 'shadow-[0_0_15px_rgba(0,240,255,0.2)]';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] gap-8 h-full bg-[#0a0e18] rounded-xl border border-white/5 p-4 md:p-6 overflow-hidden max-w-full box-border">
      {/* SCENARIO COMMAND LIST */}
      <div className="flex flex-col gap-4 border-b lg:border-b-0 lg:border-r border-white/5 pb-6 lg:pb-0 lg:pr-6 lg:max-h-[800px]">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5 shrink-0">
          <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest whitespace-nowrap">{scenarios.length} SCENARIOS</div>
          <div className="flex flex-wrap gap-1 bg-[#131b2e] p-1 rounded border border-white/5">
            {['All', 'Bronze', 'Silver', 'Gold'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-3 py-1 rounded text-[10px] font-mono transition-colors uppercase ${
                  filter === f 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' 
                    : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-4 overflow-y-auto pr-2 md:pr-4 flex-1 scrollbar-thin scrollbar-thumb-zinc-800 pb-4">
          {filteredScenarios.map((scenario, i) => {
            const scenarioName = scenario.scenario || (scenario as any).title || (scenario as any).name || "Untitled Scenario";
            const isSelected = selectedScenario?.scenario === scenario.scenario;
            return (
              <button
                key={i}
                onClick={() => setSelectedScenario(scenario)}
                className={`w-full text-left px-5 py-4 flex flex-col gap-3 rounded-lg border transition-all duration-300 relative overflow-hidden shrink-0 ${
                  isSelected 
                    ? 'bg-[#131b2e] border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
                    : 'bg-transparent border-white/5 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                )}
                <div className="flex items-center">
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded border ${getLayerColor(scenario.layer)}`}>
                    [{scenario.layer}]
                  </span>
                </div>
                <h4 className={`text-sm font-sans font-medium leading-snug break-words whitespace-normal ${isSelected ? 'text-white' : 'text-zinc-300'} line-clamp-2`}>
                  {scenarioName}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* COMMAND INTERFACE & FLOW */}
      <div className="flex flex-col gap-6 min-w-0 lg:max-h-[800px] lg:overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800 pb-6">
        {selectedScenario ? (
          <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            
            {/* SCENARIO DETAILS PANEL */}
            <div className="bg-[#131b2e] border border-white/5 rounded-xl p-6 md:p-8 flex flex-col relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Shield className="w-48 h-48 text-cyan-500 transform rotate-12" />
              </div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded border ${getLayerColor(selectedScenario.layer)} ${getLayerGlow(selectedScenario.layer)}`}>
                  [{selectedScenario.layer}]
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline-block">SCENARIO DETAIL</span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold font-['Space_Grotesk',sans-serif] text-white leading-relaxed mb-6 break-words relative z-10">
                {selectedScenario.scenario || (selectedScenario as any).title || (selectedScenario as any).name || "Untitled Scenario"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5 relative z-10">
                 <div>
                   <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                     <Box className="w-3 h-3" /> TRIGGER / CONDITION
                   </div>
                   <div className="text-sm text-zinc-400 font-mono italic bg-[#0a0e18] px-4 py-3 rounded border border-white/5">Not documented in source</div>
                 </div>
                 <div>
                   <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                     <Database className="w-3 h-3" /> SOURCE REFERENCE
                   </div>
                   <div className="text-sm text-cyan-400/80 font-mono bg-[#0a0e18] px-4 py-3 rounded border border-white/5">Verified voltgrid-au.json dataset</div>
                 </div>
              </div>
            </div>

            {/* FLOW TOPOLOGY */}
            <div className="bg-[#131b2e] border border-white/5 rounded-xl p-6 md:p-8 flex flex-col relative overflow-hidden shrink-0">
              <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest mb-8">PIPELINE FLOW STATE</div>
              
              <div className="flex flex-col sm:flex-row items-center sm:justify-between w-full relative z-10 sm:px-4 gap-8 sm:gap-2">
                {/* Connection Line Desktop */}
                <div className="hidden sm:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-zinc-800 -translate-y-1/2 z-0" />
                {/* Connection Line Mobile */}
                <div className="block sm:hidden absolute left-1/2 top-[10%] bottom-[10%] w-[1px] bg-zinc-800 -translate-x-1/2 z-0" />

                {/* Nodes */}
                {['SOURCE', 'BRONZE', 'SILVER', 'GOLD', 'SERVING'].map((layerStr) => {
                  const isActive = selectedScenario.layer.toUpperCase() === layerStr;
                  const isPast = ['SOURCE', 'BRONZE', 'SILVER', 'GOLD', 'SERVING'].indexOf(layerStr) <= ['SOURCE', 'BRONZE', 'SILVER', 'GOLD', 'SERVING'].indexOf(selectedScenario.layer.toUpperCase());
                  
                  return (
                    <div key={layerStr} className="relative z-10 flex flex-col sm:items-center gap-3 sm:gap-4 flex-row sm:flex-col w-full sm:w-auto items-center sm:justify-center">
                      <div className={`w-12 h-12 rounded-lg border flex shrink-0 items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? `bg-[#0a0e18] border-cyan-500 shadow-[0_0_15px_rgba(0,240,255,0.3)]` 
                          : isPast 
                            ? 'bg-[#131b2e] border-white/20' 
                            : 'bg-[#0a0e18] border-white/5 opacity-50'
                      }`}>
                        {layerStr === 'SOURCE' && <Zap className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`} />}
                        {layerStr === 'BRONZE' && <Box className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`} />}
                        {layerStr === 'SILVER' && <Server className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`} />}
                        {layerStr === 'GOLD' && <Database className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`} />}
                        {layerStr === 'SERVING' && <ArrowRight className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`} />}
                      </div>
                      <span className={`text-[10px] font-mono uppercase tracking-widest sm:text-center ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`}>
                        {layerStr}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DOCUMENTED HANDLING */}
            <div className="bg-[#131b2e] border border-white/5 rounded-xl p-6 md:p-8 flex flex-col relative overflow-hidden shrink-0">
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Shield className="w-4 h-4" /> DOCUMENTED RESOLUTION LOGIC
              </div>
              
              <div className="flex flex-col gap-6">
                <p className="text-zinc-300 leading-relaxed text-base font-sans break-words">
                  {selectedScenario.handling}
                </p>

                {selectedScenario.codeSnippet && (
                  <div className="bg-[#0a0e18] p-4 rounded-lg border border-white/10 relative group mt-2 shadow-inner overflow-hidden max-w-full">
                    <div className="absolute top-0 right-4 px-2 py-1 bg-[#131b2e] border-x border-b border-white/10 text-[9px] font-mono text-cyan-500 uppercase rounded-b-md flex items-center gap-2">
                      <Code2 className="w-3 h-3" /> {selectedScenario.codeSnippet.language}
                    </div>
                    <pre className="text-[12px] md:text-sm font-mono text-zinc-300 leading-relaxed overflow-x-auto pt-6 pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
                      <code>{selectedScenario.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-[#131b2e]/50 border border-white/5 rounded-xl h-full flex flex-col items-center justify-center text-zinc-500 min-h-[400px]">
            <Shield className="w-12 h-12 mb-6 opacity-20" />
            <div className="font-mono text-xs uppercase tracking-widest text-center px-4">Awaiting Scenario Selection</div>
          </div>
        )}
      </div>
    </div>
  );
};
