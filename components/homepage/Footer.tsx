import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-zinc-900 bg-black text-zinc-500 font-mono text-sm">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        
        <div className="flex flex-col gap-4">
          <div className="font-bold text-zinc-300 mb-2 font-sans text-base">Product</div>
          <Link href="#learn" className="hover:text-white transition-colors">Learn</Link>
          <Link href="#fundamentals" className="hover:text-white transition-colors">Fundamentals</Link>
          <Link href="#roadmap" className="hover:text-white transition-colors">Roadmap</Link>
          <Link href="#practice" className="hover:text-white transition-colors">Practice</Link>
          <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
        </div>

        <div className="flex flex-col gap-4">
          <div className="font-bold text-zinc-300 mb-2 font-sans text-base">Resources</div>
          <a href="#" className="hover:text-white transition-colors">Blog</a>
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
          <a href="#" className="hover:text-white transition-colors">System Design</a>
          <a href="#" className="hover:text-white transition-colors">Interview Guide</a>
        </div>

        <div className="flex flex-col gap-4">
          <div className="font-bold text-zinc-300 mb-2 font-sans text-base">Company</div>
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>

        <div className="flex flex-col gap-4">
          <div className="font-bold text-zinc-300 mb-2 font-sans text-base">Connect</div>
          <a href="#" className="hover:text-white transition-colors">Twitter / X</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>

      </div>
      
      <div className="container mx-auto pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} DataEngPlatform. All rights reserved.</div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          Systems operational
        </div>
      </div>
    </footer>
  );
}
