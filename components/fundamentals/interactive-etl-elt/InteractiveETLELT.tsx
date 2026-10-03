'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Cloud, DownloadCloud, GitBranch, UploadCloud, Database } from 'lucide-react';
import { ArchitectureType, StageConfig } from './types';
import { ETLELTToggle } from './ETLELTToggle';
import { PipelineStage } from './PipelineStage';
import { PipelineConnector } from './PipelineConnector';
import { PipelineDetail } from './PipelineDetail';

const STAGE_DICTIONARY: Record<string, StageConfig> = {
  source: {
    id: 'source',
    title: 'Source',
    description: 'Apps, APIs, Logs',
    icon: Cloud,
    details: 'Where data originates. This includes transactional databases, SaaS applications, external APIs, and event logs.'
  },
  extract: {
    id: 'extract',
    title: 'Extract',
    description: 'Pull from source',
    icon: DownloadCloud,
    details: 'The process of connecting to source systems and pulling data out. This can happen in batches, via CDC (Change Data Capture), or in real-time streams.'
  },
  transform: {
    id: 'transform',
    title: 'Transform',
    description: 'Clean & conform',
    icon: GitBranch,
    details: 'Applying business logic, cleaning, modeling, and aggregating the data. In ETL, this happens on a separate compute layer before loading. In ELT, this happens using SQL/dbt inside the warehouse.'
  },
  load: {
    id: 'load',
    title: 'Load',
    description: 'Write to target',
    icon: UploadCloud,
    details: 'Writing the data into the final storage destination. In ELT, raw data is loaded directly. In ETL, only the cleaned and transformed data is loaded.'
  },
  target: {
    id: 'target',
    title: 'Target',
    description: 'Lake / Warehouse',
    icon: Database,
    details: 'The final destination for the data, typically a Data Warehouse or Data Lake where it is served to BI tools and ML models.'
  }
};

const ARCHITECTURES = {
  etl: ['source', 'extract', 'transform', 'load', 'target'],
  elt: ['source', 'extract', 'load', 'target', 'transform']
};

export function InteractiveETLELT() {
  const [activeMode, setActiveMode] = useState<ArchitectureType>('etl');
  const [activeStageId, setActiveStageId] = useState<string | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  // Always-On Auto-Rotation Logic
  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveMode(current => current === 'etl' ? 'elt' : 'etl');
    }, 4000); // 4-second cycle

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const handleModeChange = (mode: ArchitectureType) => {
    setUserInteracted(true);
    setActiveMode(mode);
  };

  const currentOrder = ARCHITECTURES[activeMode];
  const activeStage = activeStageId ? STAGE_DICTIONARY[activeStageId] : null;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center space-y-12">
      
      {/* Toggle */}
      <ETLELTToggle activeMode={activeMode} onChange={handleModeChange} />

      {/* Main Architecture Visual */}
      <div className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
        <div className="absolute top-4 left-6">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
            Architecture Flow
          </span>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-center w-full mt-6">
          {currentOrder.map((stageId, idx) => {
            const stage = STAGE_DICTIONARY[stageId];
            return (
              <div key={stage.id} className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
                <PipelineStage
                  stage={stage}
                  isActive={activeStageId === stage.id}
                  onClick={() => setActiveStageId(activeStageId === stage.id ? null : stage.id)}
                />

                {idx < currentOrder.length - 1 && (
                  <PipelineConnector
                    isActive={
                      (activeStageId === stage.id) || 
                      (activeStageId === currentOrder[idx + 1])
                    }
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Detail Panel */}
      <AnimatePresence mode="wait">
        {activeStage && (
          <div className="w-full">
            <PipelineDetail 
              key={activeStage.id} 
              stage={activeStage} 
              onClose={() => setActiveStageId(null)} 
            />
          </div>
        )}
      </AnimatePresence>

      {/* Comparison View */}
      <motion.div 
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className={`p-6 rounded-2xl border transition-colors duration-500 ${activeMode === 'etl' ? 'bg-blue-950/20 border-blue-900/50' : 'bg-zinc-900/50 border-zinc-800'}`}>
          <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
            ETL <span className="text-sm font-normal text-zinc-500">(Extract → Transform → Load)</span>
          </h3>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li className="flex gap-2"><span className="text-blue-500">•</span> Transform before load (schema fixed up front).</li>
            <li className="flex gap-2"><span className="text-blue-500">•</span> Requires heavier compute infrastructure before the warehouse.</li>
            <li className="flex gap-2"><span className="text-blue-500">•</span> Fits when target is rigid/expensive or data must be masked (PII) before it lands.</li>
          </ul>
        </div>
        
        <div className={`p-6 rounded-2xl border transition-colors duration-500 ${activeMode === 'elt' ? 'bg-blue-950/20 border-blue-900/50' : 'bg-zinc-900/50 border-zinc-800'}`}>
          <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
            ELT <span className="text-sm font-normal text-zinc-500">(Extract → Load → Transform)</span>
          </h3>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li className="flex gap-2"><span className="text-blue-500">•</span> Transform inside the warehouse using SQL/dbt.</li>
            <li className="flex gap-2"><span className="text-blue-500">•</span> Fits modern cloud warehouses where storage is cheap and compute is elastic.</li>
            <li className="flex gap-2"><span className="text-blue-500">•</span> Raw data is kept, allowing re-derivation of models without re-extracting from source.</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
