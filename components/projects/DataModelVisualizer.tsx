'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Key, Box, LayoutGrid, List } from 'lucide-react';

interface Column {
  name: string;
  type: string;
  isPrimary?: boolean;
  isForeign?: boolean;
}

interface Dimension {
  name: string;
  grain: string;
  scd: string;
  columns?: Column[];
}

interface Fact {
  name: string;
  grain: string;
  columns?: Column[];
}

interface DataModelVisualizerProps {
  dimensions: Dimension[];
  facts: Fact[];
}

export const DataModelVisualizer: React.FC<DataModelVisualizerProps> = ({ dimensions, facts }) => {
  const [viewMode, setViewMode] = useState<'TOPOLOGY' | 'TABLE'>('TOPOLOGY');
  const [selectedEntity, setSelectedEntity] = useState<Fact | Dimension | null>(null);

  const getRelatedDimensions = (fact: Fact) => {
    if (!fact.columns) return dimensions;
    const foreignKeys = fact.columns.filter(c => c.isForeign).map(c => c.name);
    return dimensions.filter(dim => {
      if (!dim.columns) return false;
      const primaryKey = dim.columns.find(c => c.isPrimary);
      return primaryKey && foreignKeys.includes(primaryKey.name);
    });
  };

  const getRelatedFacts = (dim: Dimension) => {
    if (!dim.columns) return [];
    const primaryKey = dim.columns.find(c => c.isPrimary);
    if (!primaryKey) return [];
    return facts.filter(fact => {
      if (!fact.columns) return false;
      return fact.columns.some(c => c.isForeign && c.name === primaryKey.name);
    });
  };

  const renderColumns = (columns?: Column[]) => {
    if (!columns) return null;
    return (
      <div className="mt-4 pt-4 border-t border-white/5 space-y-2.5">
        {columns.map(col => (
          <div key={col.name} className="flex items-center justify-between text-[10px] font-mono">
            <div className="flex items-center gap-2">
              {col.isPrimary && <Key className="w-3 h-3 text-emerald-400" />}
              {col.isForeign && <Key className="w-3 h-3 text-cyan-400" />}
              {!col.isPrimary && !col.isForeign && <div className="w-3 h-3" />}
              <span className={col.isPrimary ? 'text-emerald-400 font-bold' : col.isForeign ? 'text-cyan-400' : 'text-zinc-400'}>
                {col.name}
              </span>
            </div>
            <span className="text-zinc-600 uppercase tracking-widest">{col.type}</span>
          </div>
        ))}
      </div>
    );
  };

  // Helper to determine position of dimensions around the central fact
  const getDimensionPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // Start from top
    const radius = 220; // Distance from center
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  return (
    <div className="bg-[#0a0e18] border border-white/5 rounded-xl p-8 relative overflow-hidden min-h-[600px] flex flex-col">
      
      {/* HEADER & TOGGLE */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-white/5 gap-4 relative z-20">
        <div className="text-[10px] font-mono text-violet-400 tracking-widest uppercase flex items-center gap-2">
          <LayoutGrid className="w-4 h-4" /> SCHEMA TOPOLOGY
        </div>
        
        <div className="flex bg-[#131b2e] p-1 rounded-lg border border-white/5">
          <button
            onClick={() => { setViewMode('TOPOLOGY'); setSelectedEntity(null); }}
            className={`px-4 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest transition-colors flex items-center gap-2 ${
              viewMode === 'TOPOLOGY' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
            }`}
          >
            <LayoutGrid className="w-3 h-3" /> TOPOLOGY
          </button>
          <button
            onClick={() => { setViewMode('TABLE'); setSelectedEntity(null); }}
            className={`px-4 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest transition-colors flex items-center gap-2 ${
              viewMode === 'TABLE' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
            }`}
          >
            <List className="w-3 h-3" /> TABLE VIEW
          </button>
        </div>
      </div>

      <div className="flex-1 relative flex">
        <AnimatePresence mode="wait">
          
          {/* TOPOLOGY VIEW */}
          {viewMode === 'TOPOLOGY' && (
            <motion.div 
              key="topology"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full min-h-[500px] flex flex-col lg:flex-row gap-8 relative z-10"
            >
              {/* LEFT/CENTER: The actual topology drawing */}
              <div className={`relative flex items-center justify-center min-h-[500px] transition-all duration-500 ${selectedEntity ? 'w-full lg:w-1/2' : 'w-full'}`}>
                {facts.length > 0 && (
                  <>
                    {/* SVG Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                      {getRelatedDimensions(facts[0]).map((dim, i) => {
                        const pos = getDimensionPosition(i, getRelatedDimensions(facts[0]).length);
                        // Dim lines if a specific entity is selected and it's not part of the relationship
                        const isRelated = !selectedEntity || selectedEntity.name === facts[0].name || selectedEntity.name === dim.name;
                        
                        return (
                          <motion.line
                            key={`line-${dim.name}`}
                            x1="50%"
                            y1="50%"
                            x2={`calc(50% + ${pos.x}px)`}
                            y2={`calc(50% + ${pos.y}px)`}
                            stroke={isRelated ? "rgba(139, 92, 246, 0.4)" : "rgba(255,255,255,0.05)"}
                            strokeWidth={isRelated ? "2" : "1"}
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                          />
                        );
                      })}
                    </svg>
                    
                    {/* Central Fact Node */}
                    <motion.div
                      onClick={() => setSelectedEntity(selectedEntity?.name === facts[0].name ? null : facts[0])}
                      whileHover={{ scale: 1.05 }}
                      className={`absolute z-20 cursor-pointer bg-[#131b2e] border-2 rounded-xl p-4 flex flex-col items-center justify-center w-40 h-24 transition-all duration-300 ${
                        selectedEntity?.name === facts[0].name 
                          ? 'border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-110' 
                          : selectedEntity && selectedEntity.name !== facts[0].name
                            ? 'border-white/10 opacity-40 scale-95'
                            : 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                      }`}
                    >
                      <Database className={`w-6 h-6 mb-2 ${selectedEntity?.name === facts[0].name ? 'text-emerald-300' : 'text-emerald-400'}`} />
                      <span className="text-sm font-bold text-white text-center leading-tight">{facts[0].name}</span>
                      <span className="text-[9px] font-mono text-emerald-500/80 uppercase mt-1">FACT</span>
                    </motion.div>

                    {/* Dimension Nodes */}
                    {getRelatedDimensions(facts[0]).map((dim, i) => {
                      const pos = getDimensionPosition(i, getRelatedDimensions(facts[0]).length);
                      const isSelected = selectedEntity?.name === dim.name;
                      const isDimmed = selectedEntity && !isSelected && selectedEntity.name !== facts[0].name;

                      return (
                        <motion.div
                          key={dim.name}
                          onClick={() => setSelectedEntity(isSelected ? null : dim)}
                          whileHover={{ scale: 1.05 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className={`absolute z-20 cursor-pointer bg-[#0a0e18] border rounded-lg p-3 flex flex-col items-center justify-center w-36 h-20 transition-all duration-300 ${
                            isSelected 
                              ? 'border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)] scale-110 bg-[#131b2e]' 
                              : isDimmed 
                                ? 'border-white/5 opacity-30 scale-95' 
                                : 'border-cyan-500/50 shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                          }`}
                          style={{
                            left: `calc(50% + ${pos.x}px - 72px)`,
                            top: `calc(50% + ${pos.y}px - 40px)`
                          }}
                        >
                          <Key className={`w-5 h-5 mb-1 ${isSelected ? 'text-cyan-300' : 'text-cyan-400'}`} />
                          <span className={`text-xs font-medium text-center leading-tight ${isSelected ? 'text-white' : 'text-zinc-200'}`}>{dim.name}</span>
                          <span className="text-[9px] font-mono text-cyan-500/80 uppercase mt-1">DIMENSION</span>
                        </motion.div>
                      );
                    })}

                    {/* Pulsing data packets on lines */}
                    {getRelatedDimensions(facts[0]).map((dim, i) => {
                      const pos = getDimensionPosition(i, getRelatedDimensions(facts[0]).length);
                      const isRelated = !selectedEntity || selectedEntity.name === facts[0].name || selectedEntity.name === dim.name;
                      
                      if (!isRelated) return null;

                      return (
                        <motion.div
                          key={`pulse-${dim.name}`}
                          className="absolute z-10 w-1.5 h-1.5 bg-violet-400 rounded-full shadow-[0_0_10px_rgba(139,92,246,1)] pointer-events-none"
                          animate={{
                            x: ['0px', `${pos.x}px`],
                            y: ['0px', `${pos.y}px`],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2 + Math.random(),
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2
                          }}
                          style={{
                            left: 'calc(50% - 3px)',
                            top: 'calc(50% - 3px)'
                          }}
                        />
                      );
                    })}
                  </>
                )}
              </div>

              {/* RIGHT: Inspector (only if selected in TOPOLOGY mode) */}
              {selectedEntity && (
                <div className="w-full lg:w-1/2 flex flex-col mt-8 lg:mt-0">
                  <div className="w-full bg-[#131b2e] border border-white/5 rounded-xl p-8 relative overflow-hidden flex-1 flex flex-col shadow-2xl animate-in slide-in-from-right-8">
                    {renderInspector(selectedEntity)}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TABLE VIEW */}
          {viewMode === 'TABLE' && (
            <motion.div 
              key="table-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full h-full flex flex-col lg:flex-row gap-8"
            >
              {/* ENTITY LIST (Left side) */}
              <div className="w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto pr-4 max-h-[600px] scrollbar-thin scrollbar-thumb-zinc-800">
                
                <div>
                  <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest mb-3 flex items-center justify-between">
                    <span>FACT TABLES</span>
                    <span className="text-zinc-500 px-2 py-0.5 bg-white/5 rounded">{facts.length}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {facts.map(fact => (
                      <button
                        key={fact.name}
                        onClick={() => setSelectedEntity(selectedEntity?.name === fact.name ? null : fact)}
                        className={`text-left p-4 rounded-lg border transition-all ${
                          selectedEntity?.name === fact.name 
                            ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)] text-white' 
                            : 'bg-[#131b2e] border-white/5 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        <div className="font-bold mb-1">{fact.name}</div>
                        <div className="text-[10px] font-mono uppercase opacity-70">GRAIN: {fact.grain}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest mb-3 flex items-center justify-between">
                    <span>DIMENSION TABLES</span>
                    <span className="text-zinc-500 px-2 py-0.5 bg-white/5 rounded">{dimensions.length}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {dimensions.map(dim => (
                      <button
                        key={dim.name}
                        onClick={() => setSelectedEntity(selectedEntity?.name === dim.name ? null : dim)}
                        className={`text-left p-4 rounded-lg border transition-all ${
                          selectedEntity?.name === dim.name 
                            ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.1)] text-white' 
                            : 'bg-[#131b2e] border-white/5 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        <div className="font-bold mb-1">{dim.name}</div>
                        <div className="text-[10px] font-mono uppercase opacity-70">SCD: {dim.scd}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* INSPECTOR (Right side) */}
              <div className="w-full lg:w-2/3 bg-[#131b2e] border border-white/5 rounded-xl p-8 relative overflow-hidden shrink-0">
                {selectedEntity ? (
                  renderInspector(selectedEntity)
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500 opacity-50 min-h-[400px]">
                    <Database className="w-12 h-12 mb-4" />
                    <div className="text-xs font-mono uppercase tracking-widest">Select a table to view schema details</div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  function renderInspector(entity: Fact | Dimension) {
    return (
      <div className="flex flex-col h-full animate-in fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-['Space_Grotesk',sans-serif] text-white">
            {entity.name}
          </h2>
          <span className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded border ${
            'scd' in entity ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          }`}>
            {'scd' in entity ? 'DIMENSION' : 'FACT'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#0a0e18] p-4 rounded-lg border border-white/5">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">GRAIN</div>
            <div className="text-sm text-zinc-300 font-mono">{entity.grain}</div>
          </div>
          {'scd' in entity && (
            <div className="bg-[#0a0e18] p-4 rounded-lg border border-white/5">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">SCD TYPE</div>
              <div className="text-sm text-zinc-300 font-mono">{(entity as Dimension).scd}</div>
            </div>
          )}
        </div>

        <div className="bg-[#0a0e18] p-4 rounded-lg border border-white/5 mb-6">
          <div className="text-[10px] font-mono text-violet-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <LayoutGrid className="w-3 h-3" /> VERIFIED RELATIONSHIPS
          </div>
          <div className="text-sm text-zinc-300 font-mono">
            {'scd' in entity 
               ? getRelatedFacts(entity as Dimension).length > 0 
                 ? `Connects to Fact(s): ${getRelatedFacts(entity as Dimension).map(f => f.name).join(', ')}`
                 : 'No documented foreign-key relationships.'
               : getRelatedDimensions(entity as Fact).length > 0
                 ? `Connects to Dimension(s): ${getRelatedDimensions(entity as Fact).map(d => d.name).join(', ')}`
                 : 'No documented foreign-key relationships.'
            }
          </div>
        </div>

        {entity.columns && entity.columns.length > 0 ? (
          <>
            <div className="text-[10px] font-mono text-violet-400 uppercase tracking-widest mb-3">DOCUMENTED SCHEMA COLUMNS</div>
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800 bg-[#0a0e18] rounded-lg border border-white/5 p-4 min-h-[150px]">
              <div className="flex flex-col gap-2">
                {entity.columns.map(col => (
                  <div key={col.name} className="flex items-center justify-between p-3 rounded bg-[#131b2e] border border-white/5">
                    <div className="flex items-center gap-3">
                      {col.isPrimary ? <Key className="w-4 h-4 text-emerald-400 shrink-0" /> : col.isForeign ? <Key className="w-4 h-4 text-cyan-400 shrink-0" /> : <div className="w-4 h-4 shrink-0" />}
                      <span className={`text-sm font-mono ${col.isPrimary ? 'text-emerald-400 font-bold' : col.isForeign ? 'text-cyan-400' : 'text-zinc-300'}`}>
                        {col.name}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono uppercase">{col.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="mt-auto pt-6 flex items-center justify-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0a0e18] border border-white/5 rounded-full text-xs text-zinc-500 font-mono">
              <Box className="w-3 h-3" /> No explicit column schema documented in source
            </div>
          </div>
        )}
      </div>
    );
  }
};
