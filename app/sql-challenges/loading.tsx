import { Search, AlertCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-black">
      {/* HERO SECTION SKELETON */}
      <div className="border-b border-zinc-800 bg-zinc-950/50 pt-28 pb-6 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div className="max-w-2xl w-full">
              <div className="w-40 h-7 bg-zinc-900 rounded mb-4 animate-pulse"></div>
              <div className="w-3/4 h-12 bg-zinc-900 rounded mb-4 animate-pulse"></div>
              <div className="w-2/3 h-6 bg-zinc-900 rounded animate-pulse"></div>
            </div>
            
            <div className="w-64 h-24 bg-zinc-900/50 rounded-lg border border-zinc-800 animate-pulse"></div>
          </div>

          {/* TOPIC NAVIGATION SKELETON */}
          <div className="flex gap-2 overflow-hidden mb-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="w-24 h-9 bg-zinc-900 rounded-full animate-pulse flex-shrink-0"></div>
            ))}
          </div>
        </div>

        {/* COMMAND BAR SKELETON */}
        <div className="border-t border-zinc-800 bg-zinc-900/80 -mx-6 px-6 py-3">
          <div className="container mx-auto max-w-7xl flex gap-4">
            <div className="flex-1 max-w-md h-10 bg-zinc-900 rounded-md animate-pulse"></div>
            <div className="w-32 h-10 bg-zinc-900 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* GRID SKELETON */}
      <div className="container mx-auto px-6 max-w-7xl py-12">
        <div className="mb-8 flex justify-between items-end">
          <div className="w-40 h-8 bg-zinc-900 rounded animate-pulse"></div>
          <div className="w-32 h-8 bg-zinc-900 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="border border-zinc-800 bg-zinc-900/30 rounded-lg p-5 h-[280px] flex flex-col animate-pulse"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-6 bg-zinc-800 rounded"></div>
                <div className="w-12 h-6 bg-zinc-800 rounded"></div>
              </div>
              <div className="w-full h-6 bg-zinc-800 rounded mb-3"></div>
              <div className="w-2/3 h-6 bg-zinc-800 rounded mb-4"></div>
              
              <div className="mt-auto space-y-2">
                <div className="w-full h-1 bg-zinc-800 rounded"></div>
                <div className="w-3/4 h-1 bg-zinc-800 rounded"></div>
              </div>
              
              <div className="flex gap-2 mt-6 border-t border-zinc-800 pt-4">
                <div className="w-16 h-6 bg-zinc-800 rounded"></div>
                <div className="w-16 h-6 bg-zinc-800 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
