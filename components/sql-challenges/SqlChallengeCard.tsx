"use client";

import Link from "next/link";
import { SqlChallengeDTO } from "@/lib/dto/sqlChallengeDto";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Database } from "lucide-react";

export default function SqlChallengeCard({ challenge, index }: { challenge: SqlChallengeDTO, index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.2) }}
    >
      <Link 
        href={`/sql-challenges/${challenge.day}`}
        className="block h-full group outline-none"
      >
        <div className="relative h-full flex flex-col bg-zinc-950 border border-zinc-800 rounded-lg p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-500/40 group-hover:shadow-[0_4px_20px_rgba(16,185,129,0.05)] group-focus-visible:ring-2 group-focus-visible:ring-emerald-500 overflow-hidden">
          
          {/* Subtle animated accent line on hover */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out opacity-0 group-hover:opacity-100" />
          
          <div className="flex justify-between items-start mb-3">
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
              DAY {challenge.day.toString().padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              {challenge.difficulty && (
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                  challenge.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                  challenge.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-red-500/10 text-red-500'
                }`}>
                  {challenge.difficulty}
                </span>
              )}
            </div>
          </div>

          <h3 className="text-lg font-semibold text-zinc-100 mb-1 group-hover:text-emerald-400 transition-colors line-clamp-2">
            {challenge.title}
          </h3>
          
          <div className="text-xs text-zinc-500 font-mono mb-6 line-clamp-1 flex items-center gap-2">
            {challenge.topicTitle || 'General SQL'}
            {challenge.problemNumber && (
              <span className="bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded text-[10px]">
                #{challenge.problemNumber}
              </span>
            )}
          </div>
          
          <div className="mt-auto pt-4 border-t border-zinc-800/50 flex items-center justify-between">
            <div className="flex gap-2">
              <span className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${challenge.sqlSolution ? 'bg-blue-500/10 text-blue-400' : 'bg-zinc-900 text-zinc-600'}`}>
                <Code2 className="w-3 h-3" /> SQL {challenge.sqlSolution && '✓'}
              </span>
              <span className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${challenge.pySparkSolution ? 'bg-orange-500/10 text-orange-400' : 'bg-zinc-900 text-zinc-600'}`}>
                <Database className="w-3 h-3" /> PYSPARK {challenge.pySparkSolution && '✓'}
              </span>
            </div>
            
            <div className="text-zinc-600 group-hover:text-emerald-400 transition-colors transform group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
