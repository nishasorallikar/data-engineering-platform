'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Table2, FileJson, FileQuestion, ArrowRight, Database, FolderTree, Cloud } from 'lucide-react';

type DataType = 'structured' | 'semi-structured' | 'unstructured';

const SHAPE_DATA: Record<DataType, any> = {
  'structured': {
    id: 'structured',
    title: 'Structured Data',
    icon: Table2,
    storageIcon: Database,
    color: 'blue',
    description: 'Highly organized data that fits neatly into rows and columns with a strict schema.',
    technologies: 'PostgreSQL, Snowflake, MySQL',
    visualParams: {
      type: 'table'
    }
  },
  'semi-structured': {
    id: 'semi-structured',
    title: 'Semi-Structured Data',
    icon: FileJson,
    storageIcon: FolderTree,
    color: 'yellow',
    description: 'Data with organizational properties (like tags or keys) but no rigid relational schema.',
    technologies: 'MongoDB, Elasticsearch, JSON',
    visualParams: {
      type: 'json'
    }
  },
  'unstructured': {
    id: 'unstructured',
    title: 'Unstructured Data',
    icon: FileQuestion,
    storageIcon: Cloud,
    color: 'emerald',
    description: 'Raw data with no predefined format. Makes up ~80% of all enterprise data.',
    technologies: 'Amazon S3, Azure Data Lake',
    visualParams: {
      type: 'raw'
    }
  }
};

const ORDER: DataType[] = ['structured', 'semi-structured', 'unstructured'];

export function InteractiveDataShape() {
  const [activeType, setActiveType] = useState<DataType>('structured');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  // Always-On Auto-Rotation
  useEffect(() => {
    if (userInteracted || !isInView) return;
    const interval = setInterval(() => {
      setActiveType(current => {
        const idx = ORDER.indexOf(current);
        return ORDER[(idx + 1) % ORDER.length];
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const handleSelect = (t: DataType) => {
    setUserInteracted(true);
    setActiveType(t);
  };

  const activeData = SHAPE_DATA[activeType];

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center gap-10 py-6">
      
      {/* Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {ORDER.map((type) => {
          const data = SHAPE_DATA[type];
          const isActive = activeType === type;
          const Icon = data.icon;
          
          return (
            <button
              key={type}
              onClick={() => handleSelect(type)}
              className={`relative flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500 text-left ${
                isActive 
                  ? 'bg-zinc-900 border-zinc-700 shadow-lg scale-[1.02]' 
                  : 'bg-zinc-950/50 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/50 grayscale-[50%]'
              }`}
            >
              <div className={`p-3 rounded-xl ${
                isActive ? 'bg-zinc-800 text-white' : 'bg-zinc-950 text-zinc-500'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                  {data.title}
                </h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* Visualizer Stage */}
      <div className="w-full bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 md:p-12 min-h-[400px] flex flex-col md:flex-row items-center justify-center gap-12 relative overflow-hidden">
        
        {/* Abstract Ambient Background */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeType}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${
              activeType === 'structured' ? 'from-blue-500 to-transparent' :
              activeType === 'semi-structured' ? 'from-yellow-500 to-transparent' :
              'from-emerald-500 to-transparent'
            }`}
          />
        </AnimatePresence>

        {/* Central Visualization */}
        <div className="flex-1 w-full flex justify-center items-center z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-full max-w-sm"
            >
              {activeData.visualParams.type === 'table' && <StructuredVisual />}
              {activeData.visualParams.type === 'json' && <SemiStructuredVisual />}
              {activeData.visualParams.type === 'raw' && <UnstructuredVisual />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Explanation Card */}
        <div className="flex-1 w-full max-w-md z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${activeType}`}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <activeData.storageIcon className="w-5 h-5 text-zinc-400" />
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  Typical Storage
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{activeData.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {activeData.description}
              </p>
              
              <div className="pt-4 border-t border-zinc-800">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                  Common Technologies
                </span>
                <span className="text-sm font-semibold text-zinc-300">
                  {activeData.technologies}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

function StructuredVisual() {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-2xl relative group">
      {/* Scanning laser effect */}
      <motion.div 
        className="absolute left-0 right-0 h-[2px] bg-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.8)] z-10"
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <div className="bg-zinc-800 px-4 py-2 flex items-center justify-between border-b border-zinc-700">
        <span className="text-xs font-mono text-zinc-400">users_table</span>
        <Table2 className="w-4 h-4 text-zinc-500" />
      </div>
      <div className="p-4 grid grid-cols-3 gap-2 text-xs font-mono">
        <div className="text-zinc-500 font-bold border-b border-zinc-700 pb-2">id</div>
        <div className="text-zinc-500 font-bold border-b border-zinc-700 pb-2">name</div>
        <div className="text-zinc-500 font-bold border-b border-zinc-700 pb-2">age</div>
        
        <div className="text-blue-400">1</div>
        <div className="text-zinc-300">Alice</div>
        <div className="text-yellow-400">28</div>
        
        <div className="text-blue-400">2</div>
        <div className="text-zinc-300">Bob</div>
        <div className="text-yellow-400">34</div>
      </div>
    </div>
  );
}

function SemiStructuredVisual() {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-2xl p-4 font-mono text-xs leading-relaxed relative">
      <motion.div 
        className="absolute left-0 w-[3px] bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.8)] z-10"
        initial={{ top: '10%', height: '10%' }}
        animate={{ top: ['10%', '80%', '10%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="text-zinc-400">{"{"}</div>
      <div className="pl-4">
        <span className="text-yellow-400">"id"</span><span className="text-zinc-400">: </span><span className="text-blue-400">1</span><span className="text-zinc-400">,</span>
      </div>
      <div className="pl-4">
        <span className="text-yellow-400">"name"</span><span className="text-zinc-400">: </span><span className="text-emerald-400">"Alice"</span><span className="text-zinc-400">,</span>
      </div>
      <div className="pl-4">
        <span className="text-yellow-400">"metadata"</span><span className="text-zinc-400">: {"{"}</span>
      </div>
      <div className="pl-8">
        <span className="text-yellow-400">"login_count"</span><span className="text-zinc-400">: </span><span className="text-blue-400">42</span>
      </div>
      <div className="pl-4 text-zinc-400">{"}"}</div>
      <div className="text-zinc-400">{"}"}</div>
    </div>
  );
}

function UnstructuredVisual() {
  return (
    <div className="relative w-full aspect-video bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center gap-4 p-4 flex-wrap">
       <motion.div 
         className="absolute inset-0 bg-emerald-500/5 z-0"
         animate={{ opacity: [0, 1, 0] }}
         transition={{ duration: 2, repeat: Infinity }}
       />
       <motion.div 
         className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700 relative z-10"
         animate={{ rotate: [-5, -10, -5], y: [0, -5, 0] }}
         transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
       >
         <ImageIcon className="w-8 h-8 text-zinc-500" />
       </motion.div>
       <motion.div 
         className="w-16 h-20 bg-zinc-800 rounded-lg flex flex-col gap-1 p-2 border border-zinc-700 relative z-10"
         animate={{ rotate: [3, 8, 3], y: [0, 5, 0] }}
         transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
       >
         <div className="w-full h-1 bg-zinc-700 rounded" />
         <div className="w-3/4 h-1 bg-zinc-700 rounded" />
         <div className="w-full h-1 bg-zinc-700 rounded" />
         <div className="w-1/2 h-1 bg-zinc-700 rounded" />
       </motion.div>
       <motion.div 
         className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 relative z-10"
         animate={{ scale: [1, 1.1, 1] }}
         transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
       >
         <PlayIcon className="w-5 h-5 text-zinc-500 ml-1" />
       </motion.div>
    </div>
  );
}

function ImageIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
  );
}

function PlayIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
  );
}
