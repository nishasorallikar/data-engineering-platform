"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("SQL Challenge Index Error:", error);
  }, [error]);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center p-6 bg-black">
      <div className="max-w-md w-full border border-red-500/30 bg-red-500/5 rounded-xl p-8 text-center shadow-[0_0_30px_rgba(239,68,68,0.1)]">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
          CHALLENGE INDEX UNAVAILABLE
        </h1>
        
        <p className="text-zinc-400 mb-8 leading-relaxed text-sm">
          A critical error occurred while attempting to load the SQL challenge index. The data engineering platform services might be temporarily offline or experiencing a parsing error.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium px-6 py-2.5 rounded-md transition-colors border border-zinc-800"
          >
            <RotateCcw className="w-4 h-4" />
            RETRY CONNECTION
          </button>
          
          <Link 
            href="/"
            className="flex items-center justify-center bg-white hover:bg-zinc-200 text-black font-medium px-6 py-2.5 rounded-md transition-colors"
          >
            RETURN HOME
          </Link>
        </div>
        
        {error.message && (
          <div className="mt-8 pt-6 border-t border-red-500/10 text-left">
            <span className="text-[10px] uppercase tracking-wider text-red-500/70 font-mono mb-2 block">
              System Diagnostics
            </span>
            <code className="text-xs text-red-400 font-mono bg-black/50 p-3 rounded block overflow-x-auto whitespace-nowrap">
              {error.message}
            </code>
          </div>
        )}
      </div>
    </div>
  );
}
