'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { Database, Server, HardDrive } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="w-full min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-32 px-6 relative overflow-hidden bg-[#0A0A0B]">
      
      {/* Floating 3D/Glassmorphic Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-[1400px] mx-auto">
        <FloatingIcon tech="postgresql/postgresql-original" color="from-blue-500 to-cyan-400" top="20%" left="15%" delay={0} size={80} />
        <FloatingIcon tech="apache/apache-original" color="from-yellow-400 to-amber-500" top="15%" right="20%" delay={1} size={90} />
        <FloatingIcon tech="python/python-original" color="from-emerald-400 to-green-500" top="65%" left="20%" delay={2} size={100} />
        <FloatingIcon tech="docker/docker-original" color="from-purple-500 to-pink-500" top="70%" right="15%" delay={1.5} size={85} />
        <FloatingIcon tech="amazonwebservices/amazonwebservices-original-wordmark" color="from-rose-400 to-red-500" top="40%" right="5%" delay={0.5} size={70} />
        <FloatingIcon tech="mysql/mysql-original" color="from-indigo-400 to-blue-600" top="45%" left="5%" delay={2.5} size={75} />
      </div>

      <div className="container mx-auto flex flex-col items-center z-10 text-center max-w-4xl relative mt-16">
        
        {/* Bold Headline */}
        <m.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
        >
          Master Data Engineering.
        </m.h1>
        
        {/* Subtitle */}
        <m.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mb-10 font-medium"
        >
          Interactive scenarios, realistic system architecture rounds, and Spark optimization challenges calibrated by Staff Engineers.
        </m.p>
        
        {/* Action Bar (Code Snippet + Button) */}
        <m.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-6 w-full"
        >
          
          {/* Tech Stack Pills (Like AIMO's framework icons) */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A1A1C] border border-[#2A2A2C] flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer">
              <Database className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#1A1A1C] border border-[#2A2A2C] flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer">
              <Server className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#1A1A1C] border border-[#2A2A2C] flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer">
              <HardDrive className="w-5 h-5" />
            </div>
          </div>

          {/* Code Snippet Box */}
          <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-2xl bg-[#121214] border border-[#2A2A2C] max-w-md w-full shadow-lg">
            <span className="font-mono text-sm text-zinc-300">
              <span className="text-zinc-500 mr-2">$</span>
              SELECT * FROM fundamentals
            </span>
            <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Copy
            </button>
          </div>

          {/* Primary CTA Button */}
          <Link 
            href="/questions" 
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-base hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Start Learning
          </Link>

        </m.div>

      </div>
    </section>
  );
}

function FloatingIcon({ tech, color, top, left, right, bottom, delay, size }: any) {
  return (
    <m.div
      initial={{ y: 0 }}
      animate={{ y: [-15, 15, -15] }}
      transition={{ 
        duration: 6, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: delay
      }}
      className="absolute hidden md:flex items-center justify-center rounded-[2rem] shadow-2xl backdrop-blur-xl border border-white/10"
      style={{ 
        top, left, right, bottom,
        width: size, height: size,
        background: 'rgba(20, 20, 22, 0.4)'
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 rounded-[2rem] blur-xl`}></div>
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 rounded-[2rem]`}></div>
      <div className="relative z-10 w-1/2 h-1/2 flex items-center justify-center">
        <img 
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech}.svg`} 
          alt={tech.split('/')[0]} 
          className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
        />
      </div>
      
      {/* Inner glass reflection */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none"></div>
    </m.div>
  );
}
