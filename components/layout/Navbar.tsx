import Link from 'next/link';
import { Hexagon } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-black border-b border-zinc-800">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-black group-hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-shadow">
            <Hexagon className="w-5 h-5 fill-black stroke-black" />
          </div>
          <span className="tracking-tight">DataEngPlatform</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="/#learn" className="hover:text-white transition-colors">Learn</Link>
          <Link href="/#fundamentals" className="hover:text-white transition-colors">Fundamentals</Link>
          <Link href="/#roadmap" className="hover:text-white transition-colors">Roadmap</Link>
          <Link href="/sql-challenges" className="hover:text-white transition-colors">SQL Challenges</Link>
          <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/questions" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-full transition-colors">
            Start Learning
          </Link>
        </div>
      </div>
    </nav>
  );
}
