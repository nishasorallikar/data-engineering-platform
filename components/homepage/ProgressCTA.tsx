'use client';

import Link from 'next/link';
import { Target, ArrowRight } from 'lucide-react';

export function ProgressCTA() {
  return (
    <section className="w-full py-16 md:py-24 px-6 border-t border-zinc-900 bg-zinc-950 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container mx-auto flex flex-col items-center relative z-10">
        
        {/* Progress Tracker Teaser */}
        <div className="w-full max-w-xl bg-black border border-zinc-800 rounded-3xl p-8 mb-16 shadow-2xl flex flex-col items-center text-center gap-6">
          <div className="flex items-center justify-center w-16 h-16 bg-zinc-900 rounded-full mb-2">
            <Target className="w-8 h-8 text-zinc-500" />
          </div>
          <h3 className="text-xl font-bold text-zinc-200">Track Your Learning</h3>
          <p className="text-zinc-500">
            Sign in to track your mastery of Data Engineering concepts, save your interactive states, and prepare for interviews.
          </p>
          <Link href="/questions" className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-6 py-3 rounded-full transition-colors text-sm mt-4">
            Start Learning Now
          </Link>
        </div>

        <div className="text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Stop Memorizing Data Engineering. <br/><span className="text-blue-500">Start Understanding It.</span></h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Learn the systems, practice the problems, and build the mental models needed for real interviews.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/questions/fundamental-q1" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full transition-colors flex items-center gap-2 text-lg w-full sm:w-auto justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              Start Learning <ArrowRight className="w-5 h-5"/>
            </Link>
            <Link href="#fundamentals" className="bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-white font-bold px-8 py-4 rounded-full transition-colors w-full sm:w-auto text-center">
              Explore Fundamental 50
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}


