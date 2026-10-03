'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { voltgridNodes, voltgridConnections, ArchitectureNode } from './architectureConfig';
import { ArchNode } from './ArchNode';
import { Play, Pause, Maximize, RotateCcw } from 'lucide-react';

export const ArchitectureExplorer: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number, y: number }>>({});
  const prefersReducedMotion = useReducedMotion();

  const layers = ['source', 'ingestion', 'bronze', 'silver', 'gold', 'serving'] as const;

  const updatePositions = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const positions: Record<string, { x: number, y: number }> = {};
    
    voltgridNodes.forEach(node => {
      const el = document.getElementById(`node-${node.id}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        positions[node.id] = {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2
        };
      }
    });
    setNodePositions(positions);
  };

  useEffect(() => {
    setTimeout(updatePositions, 100);
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  const focusTarget = hoveredNode || activeNode;
  const isNodeDimmed = (id: string) => {
    if (!focusTarget) return false;
    if (id === focusTarget) return false;
    
    const isConnected = voltgridConnections.some(
      c => (c.from === focusTarget && c.to === id) || (c.to === focusTarget && c.from === id)
    );
    return !isConnected;
  };

  const isConnectionDimmed = (from: string, to: string) => {
    if (!focusTarget) return false;
    return from !== focusTarget && to !== focusTarget;
  };

  const activeNodeData = focusTarget ? voltgridNodes.find(n => n.id === focusTarget) : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-lg font-bold font-['Space_Grotesk',sans-serif] text-white">Interactive Architecture Explorer</h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#131b2e] border border-white/5 hover:border-cyan-500/50 rounded text-[10px] font-mono text-zinc-300 transition-colors uppercase tracking-widest"
          >
            {isPlaying ? <Pause className="w-3 h-3 text-cyan-400" /> : <Play className="w-3 h-3 text-cyan-400" />}
            {isPlaying ? 'Pause Flow' : 'Auto Flow'}
          </button>
          <button 
            onClick={() => setActiveNode(null)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#131b2e] border border-white/5 hover:border-cyan-500/50 rounded text-[10px] font-mono text-zinc-300 transition-colors uppercase tracking-widest"
          >
            <RotateCcw className="w-3 h-3 text-cyan-400" /> Reset
          </button>
        </div>
      </div>

      {/* Main visualizer area */}
      <div 
        ref={containerRef}
        className="relative w-full bg-[#0a0e18] border border-white/5 rounded-xl overflow-x-auto overflow-y-hidden min-h-[500px] flex flex-col lg:flex-row p-8 gap-8 scrollbar-thin scrollbar-thumb-zinc-800"
      >
        {/* Connection SVG Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {voltgridConnections.map((conn, i) => {
            const start = nodePositions[conn.from];
            const end = nodePositions[conn.to];
            if (!start || !end) return null;

            const isFocused = focusTarget ? (conn.from === focusTarget || conn.to === focusTarget) : false;
            const dimmed = focusTarget ? !isFocused : false;
            
            const strokeColor = isFocused ? 'rgba(0, 240, 255, 0.6)' : dimmed ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.08)';
            const strokeWidth = isFocused ? 2 : 1;

            const midX = (start.x + end.x) / 2;
            const pathData = `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;

            return (
              <g key={i}>
                <motion.path
                  d={pathData}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1, stroke: strokeColor }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  style={{ filter: isFocused ? 'drop-shadow(0px 0px 6px rgba(0, 240, 255, 0.5))' : 'none' }}
                />
                {!prefersReducedMotion && isPlaying && !dimmed && (
                  <circle r={isFocused ? "3" : "2"} fill={isFocused ? "#00f0ff" : "rgba(0,240,255,0.5)"} className="opacity-90 shadow-[0_0_10px_#00f0ff]">
                    <animateMotion
                      dur={isFocused ? `${1 + (i % 1.5)}s` : `${2 + (i % 2)}s`}
                      repeatCount="indefinite"
                      path={pathData}
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes Layer */}
        <div className="relative z-10 flex flex-col lg:flex-row w-max lg:w-full justify-center items-center gap-10 lg:gap-8 flex-1 pb-4">
          {layers.map(layer => (
            <div key={layer} className="flex flex-col gap-4 w-full lg:w-auto items-center">
              <div className="text-[10px] font-mono tracking-widest text-cyan-500/70 uppercase mb-2">
                {layer}
              </div>
              <div className="flex flex-row flex-wrap justify-center lg:flex-col gap-6">
                {voltgridNodes.filter(n => n.layer === layer).map(node => (
                  <ArchNode
                    key={node.id}
                    node={node}
                    isActive={activeNode === node.id}
                    isDimmed={isNodeDimmed(node.id)}
                    onHover={setHoveredNode}
                    onClick={setActiveNode}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Panel */}
      <div className="min-h-[140px] bg-[#131b2e] border border-white/5 rounded-xl p-8 transition-all duration-300 relative overflow-hidden shadow-2xl">
        {activeNodeData ? (
          <motion.div 
            key={activeNodeData.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            <div className="flex items-start justify-between mb-4 pb-4 border-b border-white/5">
              <div>
                <h4 className="text-xl font-bold text-white mb-2 font-['Space_Grotesk',sans-serif]">{activeNodeData.label}</h4>
                <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">LAYER: {activeNodeData.layer}</div>
              </div>
              {activeNodeData.technology && (
                <div className="px-3 py-1.5 bg-[#0a0e18] border border-cyan-500/20 text-cyan-400 text-[10px] uppercase font-mono rounded tracking-widest">
                  {activeNodeData.technology}
                </div>
              )}
            </div>
            <p className="text-zinc-300 text-sm font-['Space_Grotesk',sans-serif] leading-relaxed max-w-4xl">{activeNodeData.description}</p>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 min-h-[100px]">
            <div className="w-2 h-2 rounded-full bg-cyan-500 mb-4 animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
            <p className="text-xs font-mono uppercase tracking-widest">Select a node to inspect its architectural function</p>
          </div>
        )}
      </div>
    </div>
  );
};
