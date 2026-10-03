'use client';

import { Wrench, HardDrive, Zap, Lock } from 'lucide-react';

export function Projects() {
  return (
    <section id="projects" className="w-full py-16 md:py-24 px-6 border-t border-zinc-900 bg-black scroll-mt-24">
      <div className="container mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16 max-w-3xl">
          <div className="inline-flex bg-zinc-900 border border-zinc-700 text-zinc-400 font-bold px-4 py-1.5 rounded-full text-sm mb-6 items-center gap-2 mx-auto w-fit">
            <Lock className="w-4 h-4"/> Coming as you progress through the roadmap
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Learn How Real Systems Are Built</h2>
          <p className="text-zinc-400 text-lg">Apply your fundamental knowledge to comprehensive real-world projects.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          
          <ProjectCard 
            title="End-to-End Data Pipeline" 
            desc="Extract data from REST APIs, transform in Airflow, load to Snowflake." 
            icon={<Wrench />}
          />
          <ProjectCard 
            title="Real-Time Streaming System" 
            desc="Process clickstream data with Kafka and Spark Structured Streaming." 
            icon={<Zap />}
          />
          <ProjectCard 
            title="Lakehouse Architecture" 
            desc="Build an open format data lake using Apache Iceberg and S3." 
            icon={<HardDrive />}
          />
          
        </div>

      </div>
    </section>
  );
}

function ProjectCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl flex flex-col opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-not-allowed">
      <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-500 mb-6">
        {icon}
      </div>
      <h3 className="font-bold text-zinc-300 mb-2">{title}</h3>
      <p className="text-sm text-zinc-500">{desc}</p>
    </div>
  );
}
