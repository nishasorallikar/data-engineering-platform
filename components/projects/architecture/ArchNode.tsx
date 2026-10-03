import React from 'react';
import { motion } from 'framer-motion';
import { ArchitectureNode } from './architectureConfig';
import { Database, Server, Cloud, Cpu, Activity, LayoutTemplate, Zap, Box } from 'lucide-react';

interface NodeProps {
  node: ArchitectureNode;
  isActive?: boolean;
  isDimmed?: boolean;
  onHover?: (id: string | null) => void;
  onClick?: (id: string) => void;
}

export const ArchNode: React.FC<NodeProps> = ({ node, isActive, isDimmed, onHover, onClick }) => {
  const Icon = React.useMemo(() => {
    switch (node.layer) {
      case 'source': return Activity;
      case 'ingestion': return Zap;
      case 'bronze': return Box;
      case 'silver': return Server;
      case 'gold': return Database;
      case 'serving': return LayoutTemplate;
      default: return Cpu;
    }
  }, [node.layer]);

  const layerColors = {
    source: 'border-orange-500/30 text-orange-400 bg-orange-500/5 hover:border-orange-500/80',
    ingestion: 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5 hover:border-yellow-500/80',
    bronze: 'border-amber-700/40 text-amber-500 bg-amber-700/5 hover:border-amber-600/80',
    silver: 'border-zinc-400/40 text-zinc-300 bg-zinc-400/5 hover:border-zinc-300/80',
    gold: 'border-yellow-600/40 text-yellow-500 bg-yellow-600/5 hover:border-yellow-500/80',
    serving: 'border-blue-500/30 text-blue-400 bg-blue-500/5 hover:border-blue-500/80'
  };

  const activeGlow = isActive ? 'ring-1 ring-cyan-500 shadow-[0_0_15px_rgba(0,240,255,0.2)] bg-[#131b2e]' : 'bg-[#0a0e18]';
  const opacity = isDimmed ? 'opacity-30 grayscale' : 'opacity-100';

  return (
    <motion.div
      id={`node-${node.id}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => onHover && onHover(node.id)}
      onMouseLeave={() => onHover && onHover(null)}
      onClick={() => onClick && onClick(node.id)}
      className={`relative z-10 flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all duration-300 w-36 min-h-[80px] text-center ${layerColors[node.layer]} ${activeGlow} ${opacity}`}
    >
      <Icon className="w-5 h-5 mb-2 opacity-90" />
      <span className="text-[11px] font-mono leading-tight tracking-tight">{node.label}</span>
      {isActive && (
        <motion.div
          layoutId="activeNodeIndicator"
          className="absolute -inset-1 rounded-xl border border-cyan-500/30 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
};
