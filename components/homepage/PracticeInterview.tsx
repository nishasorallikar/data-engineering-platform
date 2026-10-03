'use client';

import { m } from 'framer-motion';
import { Terminal, Users, PlayCircle, Code2, LayoutDashboard, Settings } from 'lucide-react';

export function PracticeInterview() {
  return (
    <section id="practice" className="w-full py-16 md:py-24 px-6 bg-zinc-950 border-t border-zinc-900 scroll-mt-24">
      <div className="container mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Turn Understanding Into <br/>Interview Confidence</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          
          {/* Practice Panel */}
          <m.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-black border border-zinc-800 p-8 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Code2 className="w-48 h-48" />
            </div>
            
            <div className="bg-blue-900/30 text-blue-400 text-xs font-bold px-3 py-1 rounded w-fit mb-6">PRACTICE</div>
            <h3 className="text-3xl font-bold mb-8">Test Your Knowledge</h3>
            
            <div className="flex flex-col gap-4 relative z-10">
              <ListItem icon={<Terminal />} title="SQL Problems" desc="Write queries to solve complex data scenarios." />
              <ListItem icon={<LayoutDashboard />} title="Architecture Challenges" desc="Map out optimal data flows." />
              <ListItem icon={<Settings />} title="Scenario-Based Problems" desc="Fix broken pipelines and handle late data." />
            </div>
          </m.div>

          {/* Interview Panel */}
          <m.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 border border-zinc-700 p-8 rounded-3xl relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Users className="w-48 h-48" />
            </div>
            
            <div className="bg-emerald-900/30 text-emerald-400 text-xs font-bold px-3 py-1 rounded w-fit mb-6">INTERVIEW</div>
            <h3 className="text-3xl font-bold mb-8 text-white">Perform Under Pressure</h3>
            
            <div className="flex flex-col gap-4 relative z-10">
              <ListItem icon={<PlayCircle />} title="Explain the Concept" desc="Learn how to verbally break down complex systems." />
              <ListItem icon={<Users />} title="Design the System" desc="Whiteboard large-scale pipelines." />
              <ListItem icon={<Code2 />} title="Discuss Trade-offs" desc="Batch vs Stream? Star vs Snowflake? Why?" />
            </div>
          </m.div>

        </div>

      </div>
    </section>
  );
}

function ListItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-800/50 transition-colors">
      <div className="text-zinc-400 mt-1">{icon}</div>
      <div>
        <h4 className="font-bold text-zinc-200">{title}</h4>
        <p className="text-zinc-500 text-sm mt-1">{desc}</p>
      </div>
    </div>
  );
}
