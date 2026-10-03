'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, useInView } from 'framer-motion';
import { CloudDownload, DatabaseZap, GitBranch, LineChart, Database } from 'lucide-react';
import { PipelineStageConfig } from './types';
import { PipelineNode } from './PipelineNode';
import { PipelineConnector } from './PipelineConnector';
import { PipelineDetail } from './PipelineDetail';
import { ReliabilityLayer } from './ReliabilityLayer';

const STAGES: PipelineStageConfig[] = [
  {
    id: 'sources',
    title: 'Sources',
    description: 'Where data originates',
    icon: DatabaseZap,
    details: 'Sources are the systems of origin. They can be transactional databases (OLTP), external APIs, SaaS applications, or continuous event streams (e.g. clickstreams, IoT). Data engineering begins by identifying and extracting data from these sources.'
  },
  {
    id: 'ingestion',
    title: 'Ingestion',
    description: 'APIs, DBs, Streams',
    icon: CloudDownload,
    details: 'Ingestion is the process of pulling data from APIs, databases, files, and event streams into the data platform. It is the first step where data enters the ecosystem.'
  },
  {
    id: 'storage',
    title: 'Storage',
    description: 'Lakes, Warehouses',
    icon: Database,
    details: 'Storage involves choosing the right store and file layout for the access pattern, typically using Data Lakes for raw data and Data Warehouses for structured analytics.'
  },
  {
    id: 'transformation',
    title: 'Transformation',
    description: 'Clean, Conform',
    icon: GitBranch,
    details: 'Transformation is where raw data is cleaned, conformed, modeled, and aggregated into usable tables. This stage applies business logic to make data valuable.'
  },
  {
    id: 'serving',
    title: 'Serving',
    description: 'Marts, Features',
    icon: LineChart,
    details: 'Serving exposes data marts, feature tables, and APIs to BI tools, ML models, and downstream applications so analysts and scientists can consume it.'
  }
];

export function InteractivePipeline() {
  const [activeStageId, setActiveStageId] = useState<string | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  // Always-On Auto-Rotation Logic
  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveStageId(current => {
        if (!current) return STAGES[0].id;
        const currentIndex = STAGES.findIndex(s => s.id === current);
        const nextIndex = (currentIndex + 1) % STAGES.length;
        return STAGES[nextIndex].id;
      });
    }, 4000); // 4-second cycle

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const handleManualSelect = (id: string | null) => {
    setUserInteracted(true);
    setActiveStageId(id);
  };

  const activeStage = STAGES.find(s => s.id === activeStageId);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      <ReliabilityLayer delay={0.8}>
        {/* The Pipeline layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-5xl">
          {STAGES.map((stage, idx) => (
            <div key={stage.id} className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
              
              <PipelineNode
                stage={stage}
                isSelected={activeStageId === stage.id}
                isSubdued={activeStageId !== null && activeStageId !== stage.id}
                onClick={() => handleManualSelect(activeStageId === stage.id ? null : stage.id)}
                delay={idx * 0.15}
              />

              {idx < STAGES.length - 1 && (
                <PipelineConnector
                  isActive={
                    (activeStageId === stage.id) || 
                    (activeStageId === STAGES[idx + 1].id)
                  }
                  delay={(idx * 0.15) + 0.1}
                />
              )}
            </div>
          ))}
        </div>
      </ReliabilityLayer>

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
    </div>
  );
}
