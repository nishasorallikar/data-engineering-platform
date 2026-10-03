'use client';

import { m } from 'framer-motion';
import { Eye, BrainCircuit, MousePointer2, Code2 } from 'lucide-react';

export function HowLearningWorks() {
  return (
    <section className="w-full py-16 md:py-24 px-6 bg-zinc-950">
      <div className="container mx-auto flex flex-col items-center">
        
        <div className="text-center mb-24 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Don&apos;t Just Read. <br/><span className="text-zinc-500">Watch the Concept Work.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-5xl relative">
          
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-zinc-800 z-0" />

          <StepCard 
            num="01" 
            title="WATCH" 
            desc="Concept starts moving automatically upon loading." 
            icon={<Eye className="w-6 h-6"/>}
            delay={0}
          />
          <StepCard 
            num="02" 
            title="UNDERSTAND" 
            desc="See exactly how components interact and behave." 
            icon={<BrainCircuit className="w-6 h-6"/>}
            delay={0.2}
          />
          <StepCard 
            num="03" 
            title="INTERACT" 
            desc="Explore deeper states, hover for tooltips, and click to control." 
            icon={<MousePointer2 className="w-6 h-6"/>}
            delay={0.4}
          />
          <StepCard 
            num="04" 
            title="PRACTICE" 
            desc="Apply your visual understanding to interview problems." 
            icon={<Code2 className="w-6 h-6"/>}
            delay={0.6}
          />
          
        </div>

      </div>
    </section>
  );
}

function StepCard({ num, title, desc, icon, delay }: { num: string, title: string, desc: string, icon: React.ReactNode, delay: number }) {
  return (
    <m.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex flex-col items-center text-center relative z-10"
    >
      <div className="w-24 h-24 rounded-full bg-black border-4 border-zinc-900 flex items-center justify-center mb-6 shadow-xl relative group">
        <div className="absolute inset-0 rounded-full border-2 border-blue-500/0 group-hover:border-blue-500/50 transition-colors" />
        <div className="text-zinc-400 group-hover:text-blue-400 transition-colors group-hover:scale-110 duration-300">
          {icon}
        </div>
      </div>
      <div className="font-mono text-sm font-bold text-zinc-500 mb-2">{num}</div>
      <h3 className="text-xl font-bold text-zinc-200 mb-3">{title}</h3>
      <p className="text-sm text-zinc-400">{desc}</p>
    </m.div>
  );
}
