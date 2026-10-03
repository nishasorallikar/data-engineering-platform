'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Workflow, CheckCircle2, Lock, Activity, ChevronRight, Terminal, User, Cpu, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ProjectDTO } from '@/lib/dto/projectDto';
import { ArchitectureExplorer } from '@/components/projects/architecture/ArchitectureExplorer';
import { ScenarioExplorer } from '@/components/projects/scenarios/ScenarioExplorer';
import { DataModelVisualizer } from '@/components/projects/DataModelVisualizer';
import { PipelineVisualizer } from '@/components/projects/PipelineVisualizer';
import { QualityVisualizer } from '@/components/projects/QualityVisualizer';
import { SecurityVisualizer } from '@/components/projects/SecurityVisualizer';
import { MonitoringVisualizer } from '@/components/projects/MonitoringVisualizer';
import { OverviewVisualizer } from '@/components/projects/OverviewVisualizer';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface ProjectWorkspaceProps {
  project: ProjectDTO;
}

export const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [interviewState, setInterviewState] = useState<'IDLE' | 'ASKING' | 'ANSWERING'>('IDLE');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const navItems = [
    'OVERVIEW',
    'ARCHITECTURE',
    'PIPELINE',
    'SCENARIOS',
    'DATA MODEL',
    'QUALITY',
    'SECURITY',
    'MONITORING',
    'INTERVIEW'
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  const renderListSection = (title: string, items: string[], Icon: any, color: 'cyan' | 'emerald' | 'amber') => {
    const colorClasses = {
      cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,240,255,0.1)]',
      emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
      amber: 'text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.1)]',
    };

    const textGlow = {
      cyan: 'group-hover:text-cyan-400',
      emerald: 'group-hover:text-emerald-400',
      amber: 'group-hover:text-amber-400',
    };

    const borderGlow = {
      cyan: 'hover:border-cyan-500/50 hover:bg-cyan-950/20',
      emerald: 'hover:border-emerald-500/50 hover:bg-emerald-950/20',
      amber: 'hover:border-amber-500/50 hover:bg-amber-950/20',
    };

    return (
      <div className="mb-12">
        <h3 className="text-[12px] font-mono text-zinc-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
          <div className={`p-1.5 rounded border ${colorClasses[color]}`}>
            <Icon className="w-4 h-4" />
          </div>
          {title}
        </h3>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4"
        >
          {items.map((item, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ scale: 1.01, x: 4 }}
              className={`group bg-[#131b2e] border border-white/5 rounded-xl p-5 flex items-start gap-5 cursor-pointer transition-colors duration-300 ${borderGlow[color]}`}
            >
              <div className="mt-1 flex-shrink-0">
                <Terminal className={`w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity ${colorClasses[color].split(' ')[0]}`} />
              </div>
              <p className={`text-zinc-300 text-sm md:text-base font-['Space_Grotesk',sans-serif] leading-relaxed transition-colors duration-300 ${textGlow[color]}`}>
                {item}
              </p>
              <div className="ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 flex-shrink-0">
                <ChevronRight className={`w-5 h-5 ${colorClasses[color].split(' ')[0]}`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  };

  // Prepare interview topics (splitting comma separated if it's one large string)
  const rawTopics = project.interviewTalkingPoints || [];
  const interviewTopics = rawTopics.length === 1 && rawTopics[0].includes(',') 
    ? rawTopics[0].split(',').map(t => t.trim()) 
    : rawTopics;
  
  const currentTopic = interviewTopics[currentQuestionIndex] || "General Architecture";

  return (
    <div className="min-h-screen bg-[#0a0e18] font-sans text-zinc-300">
      <div className="container max-w-6xl pt-12 pb-20 mx-auto px-6">
        
        {/* TOP PROJECT HEADER */}
        <header className="mb-8">
          <nav className="flex items-center text-xs font-medium text-zinc-500 mb-6">
            <Link href="/projects" className="flex items-center hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> PROJECTS
            </Link>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 font-['Space_Grotesk',sans-serif]">
            {project.title}
          </h1>
          <h2 className="text-xl text-zinc-400 mb-6 font-['Space_Grotesk',sans-serif]">
            Azure Data Engineering Architecture
          </h2>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Badge variant="outline" className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400 px-3 py-1 font-mono text-[10px] uppercase">
              [Azure]
            </Badge>
            <Badge variant="outline" className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400 px-3 py-1 font-mono text-[10px] uppercase">
              [Databricks]
            </Badge>
            <Badge variant="outline" className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400 px-3 py-1 font-mono text-[10px] uppercase">
              [Delta Lake]
            </Badge>
            <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 px-3 py-1 font-mono text-[10px] uppercase ml-4">
              SOURCE VERIFIED
            </Badge>
          </div>

          <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
            {project.summary}
          </p>
        </header>

        {/* PROJECT NAVIGATION */}
        <div className="border-b border-white/10 mb-8 overflow-x-auto">
          <div className="flex space-x-8 min-w-max px-1">
            {navItems.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-xs font-mono uppercase tracking-wider transition-colors relative ${
                  activeTab === tab ? 'text-cyan-400' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.span 
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.5)]" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN WORKSPACE */}
        <div className="bg-[#131B2E] border border-white/5 rounded-xl p-8 shadow-2xl min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'OVERVIEW' && (
                <OverviewVisualizer project={project} />
              )}

              {activeTab === 'ARCHITECTURE' && (
                <ArchitectureExplorer />
              )}

              {activeTab === 'SCENARIOS' && (
                <ScenarioExplorer scenarios={project.scenarios} />
              )}

              {activeTab === 'DATA MODEL' && (
                <DataModelVisualizer dimensions={project.dataModel.dimensions} facts={project.dataModel.facts} />
              )}

              {activeTab === 'PIPELINE' && (
                <PipelineVisualizer project={project} />
              )}

              {activeTab === 'QUALITY' && (
                <QualityVisualizer project={project} />
              )}

              {activeTab === 'SECURITY' && (
                <SecurityVisualizer project={project} />
              )}

              {activeTab === 'MONITORING' && (
                <MonitoringVisualizer project={project} />
              )}

              {activeTab === 'INTERVIEW' && (
                <div className="max-w-4xl mx-auto min-h-[400px] flex flex-col">
                  <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest mb-8 border-b border-white/5 pb-4 flex items-center justify-between">
                    <span>Interactive Interview Simulator</span>
                    <span className="text-zinc-500">TOPIC {currentQuestionIndex + 1} OF {interviewTopics.length}</span>
                  </div>

                  {interviewState === 'IDLE' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-[#0a0e18] border border-cyan-500/20 rounded-xl relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
                      <Cpu className="w-16 h-16 text-cyan-500 mb-6 animate-pulse shadow-[0_0_15px_rgba(0,240,255,0.3)] rounded-full" />
                      <h3 className="text-2xl font-bold font-['Space_Grotesk',sans-serif] text-white mb-4">
                        Ready to defend this architecture?
                      </h3>
                      <p className="text-zinc-400 max-w-lg mb-8 font-['Space_Grotesk',sans-serif]">
                        The simulator will ask you tough technical questions based on the exact engineering decisions, pipelines, and scenarios present in the {project.title} architecture.
                      </p>
                      <button 
                        onClick={() => setInterviewState('ASKING')}
                        className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#0a0e18] font-bold px-8 py-3 rounded-lg font-mono tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-105"
                      >
                        <Play className="w-5 h-5" /> Start Interview
                      </button>
                    </motion.div>
                  )}

                  {interviewState === 'ASKING' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex-1 flex flex-col"
                    >
                      <div className="bg-[#0a0e18] border border-cyan-500/30 rounded-xl p-8 mb-6 shadow-[0_0_20px_rgba(0,240,255,0.05)]">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-cyan-500/20 rounded border border-cyan-500/50 mt-1">
                            <Cpu className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div>
                            <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest mb-2">Senior Engineer</div>
                            <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-white leading-relaxed">
                              Can you explain your approach to handling <span className="text-cyan-400 border-b border-cyan-500/50 pb-0.5">{currentTopic}</span> in this pipeline? What were the specific trade-offs?
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <p className="text-xs text-zinc-500 font-mono mb-3 uppercase tracking-widest flex items-center gap-2">
                          <User className="w-3 h-3" /> Your Response Strategy
                        </p>
                        <textarea 
                          placeholder="Draft your technical explanation here... (e.g. 'We chose this pattern because of the latency requirements...')"
                          className="w-full bg-[#1c1f2a] border border-white/10 rounded-xl p-5 text-zinc-300 font-['Space_Grotesk',sans-serif] focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 min-h-[160px] resize-none transition-all"
                        />
                        <div className="flex justify-between items-center mt-4">
                          <button 
                            onClick={() => setInterviewState('IDLE')}
                            className="text-xs text-zinc-500 hover:text-white font-mono uppercase tracking-widest transition-colors"
                          >
                            Cancel
                          </button>
                          <div className="flex gap-3">
                            <button 
                              onClick={() => {
                                setCurrentQuestionIndex((prev) => (prev + 1) % interviewTopics.length);
                                setInterviewState('ASKING');
                              }}
                              className="px-6 py-2.5 rounded-lg border border-white/10 hover:border-white/30 text-zinc-300 font-mono text-xs uppercase tracking-widest transition-all"
                            >
                              Skip
                            </button>
                            <button 
                              onClick={() => {
                                setCurrentQuestionIndex((prev) => (prev + 1) % interviewTopics.length);
                                setInterviewState('ASKING');
                                // Reset textarea here in a real app, omitted for UI demo
                              }}
                              className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0a0e18] font-bold font-mono text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                            >
                              Submit Answer
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
