'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Activity, MousePointerClick, Layers, Database } from 'lucide-react';

export function FundamentalFiftySection() {
  return (
    <section id="fundamentals" className="w-full py-16 md:py-24 px-6 border-t border-zinc-900 bg-black relative overflow-hidden scroll-mt-24">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16 max-w-3xl z-10">
          <div className="inline-flex bg-emerald-950/50 border border-emerald-900/50 text-emerald-400 font-bold px-4 py-1.5 rounded-full text-sm mb-6 items-center gap-2 mx-auto w-fit">
            <Activity className="w-4 h-4"/> Protected Learning Module
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">The Fundamental 50</h2>
          <p className="text-zinc-400 text-lg md:text-xl">
            The core Data Engineering questions you should be able to explain, design, and discuss in an interview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-24 z-10">
          <StatBox num="50" label="Questions" />
          <StatBox num="7" label="Domains" />
          <StatBox num="100%" label="Interactive" />
          <StatBox num="∞" label="Interview Prep" />
        </div>

        {/* Visual Flow Representation */}
        <div className="w-full max-w-5xl flex flex-col items-center z-10 relative">
          
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-0 font-mono text-xs">
            <FlowStep label="FOUNDATIONS" active />
            <FlowConnector />
            <FlowStep label="SQL" active />
            <FlowConnector />
            <FlowStep label="DATA MODELING" active />
            <FlowConnector />
            <FlowStep label="PIPELINES" active />
            <FlowConnector />
            <FlowStep label="SPARK" active />
            <FlowConnector />
            <FlowStep label="STREAMING" active />
            <FlowConnector />
            <FlowStep label="SYSTEMS" active />
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            
            {/* Previews */}
            <PreviewCard 
              icon={<Layers className="w-6 h-6 text-blue-400"/>}
              title="Interactive Architecture"
              desc="Watch systems move instead of reading static text."
            />
            <PreviewCard 
              icon={<MousePointerClick className="w-6 h-6 text-purple-400"/>}
              title="SQL Visualization"
              desc="See query logic, JOINs, and Window Functions execute row by row."
            />
            <PreviewCard 
              icon={<Database className="w-6 h-6 text-emerald-400"/>}
              title="Data Modeling"
              desc="Build schemas visually and trace relationships."
            />
            <PreviewCard 
              icon={<Activity className="w-6 h-6 text-orange-400"/>}
              title="Distributed Systems"
              desc="Understand cluster behavior through physical motion."
            />

          </div>

          <Link href="/questions" className="mt-16 bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-zinc-200 transition-colors flex items-center gap-2">
            Start the Fundamental 50 <ArrowRight className="w-4 h-4"/>
          </Link>

        </div>

      </div>
    </section>
  );
}

function StatBox({ num, label }: { num: string, label: string }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
      <div className="text-4xl font-bold text-white mb-2">{num}</div>
      <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{label}</div>
    </div>
  );
}

function FlowStep({ label, active }: { label: string, active: boolean }) {
  return (
    <div className={`px-4 py-2 rounded-lg font-bold transition-colors ${active ? 'bg-zinc-900 border border-zinc-700 text-zinc-300' : 'text-zinc-600'}`}>
      {label}
    </div>
  );
}

function FlowConnector() {
  return (
    <div className="hidden md:flex flex-1 h-0.5 bg-zinc-800 mx-2 relative overflow-hidden">
      <m.div 
        animate={{ x: ['-100%', '200%'] }} 
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} 
        className="absolute top-0 bottom-0 w-8 bg-blue-500/50"
      />
    </div>
  );
}

function PreviewCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-zinc-950/50 border border-zinc-800/50 p-6 rounded-2xl flex flex-col group hover:border-zinc-700 transition-colors">
      <div className="mb-4 bg-zinc-900 p-3 rounded-xl w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-bold text-zinc-200 mb-2">{title}</h3>
      <p className="text-sm text-zinc-400">{desc}</p>
    </div>
  );
}

// Ensure Database is imported at top if missing. I'll just add it to lucide-react imports above.
