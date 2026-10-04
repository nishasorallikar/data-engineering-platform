"use client";

import { useState, useMemo } from "react";
import { SqlChallengeDTO } from "@/lib/dto/sqlChallengeDto";
import { Search, Database, Code2, AlertCircle, X } from "lucide-react";
import SqlChallengeCard from "@/components/sql-challenges/SqlChallengeCard";
import { motion, AnimatePresence } from "framer-motion";

interface SqlChallengeLibraryProps {
  initialChallenges: SqlChallengeDTO[];
  totalCount: number;
}

export default function SqlChallengeLibrary({ initialChallenges, totalCount }: SqlChallengeLibraryProps) {
  const [search, setSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState<string>("ALL");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("ALL");
  const [hasSql, setHasSql] = useState<boolean>(false);
  const [hasPySpark, setHasPySpark] = useState<boolean>(false);

  // Extract unique topics from available data
  const topics = useMemo(() => {
    const t = new Set<string>();
    initialChallenges.forEach(c => {
      if (c.topicTitle) t.add(c.topicTitle);
    });
    return ["ALL", ...Array.from(t)];
  }, [initialChallenges]);

  // Extract difficulty options if any exist
  const hasDifficulties = initialChallenges.some(c => c.difficulty);

  const filteredChallenges = useMemo(() => {
    return initialChallenges.filter(c => {
      if (activeTopic !== "ALL" && c.topicTitle !== activeTopic) return false;
      if (hasDifficulties && difficultyFilter !== "ALL" && c.difficulty !== difficultyFilter) return false;
      if (hasSql && !c.sqlSolution) return false;
      if (hasPySpark && !c.pySparkSolution) return false;
      
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          c.title.toLowerCase().includes(q) ||
          c.day.toString() === q ||
          (c.topicTitle && c.topicTitle.toLowerCase().includes(q)) ||
          (c.problemNumber && c.problemNumber.toString() === q)
        );
      }
      
      return true;
    });
  }, [initialChallenges, search, activeTopic, difficultyFilter, hasSql, hasPySpark, hasDifficulties]);

  const clearFilters = () => {
    setSearch("");
    setActiveTopic("ALL");
    setDifficultyFilter("ALL");
    setHasSql(false);
    setHasPySpark(false);
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <div className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-16 z-30">
        <div className="container mx-auto px-6 max-w-7xl pt-12 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-emerald-500 font-mono text-sm tracking-wider uppercase border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 rounded">
                  SQL / Interview Lab
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                SQL Challenge Command Center
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Practice real SQL patterns used in data engineering. High-density, interview-focused workspace.
              </p>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-2 text-sm font-mono border border-zinc-800 bg-zinc-900/50 p-4 rounded-lg">
              <span className="text-zinc-500 uppercase tracking-widest text-xs mb-1">Source Coverage</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-white font-medium">{totalCount} VERIFIED CHALLENGES</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-400 mt-2">
                <span>{topics.length - 1} TOPIC AREAS</span>
                <span className="flex items-center gap-1"><Code2 className="w-3 h-3"/> SQL</span>
                <span className="flex items-center gap-1"><Database className="w-3 h-3"/> PYSPARK</span>
              </div>
            </div>
          </div>

          {/* TOPIC NAVIGATION */}
          <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide snap-x -mx-6 px-6 md:mx-0 md:px-0">
            {topics.map(topic => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all snap-start ${
                  activeTopic === topic 
                    ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* COMMAND BAR */}
        <div className="border-t border-zinc-800 bg-zinc-900/80">
          <div className="container mx-auto px-6 max-w-7xl py-3 flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search challenge, day, topic, or #id..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              {hasDifficulties && (
                <select 
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-md py-2 px-3 focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
                >
                  <option value="ALL">Any Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              )}
              
              <label className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-white transition-colors">
                <input 
                  type="checkbox" 
                  checked={hasSql} 
                  onChange={(e) => setHasSql(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500/20"
                />
                SQL ✓
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-white transition-colors">
                <input 
                  type="checkbox" 
                  checked={hasPySpark} 
                  onChange={(e) => setHasPySpark(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500/20"
                />
                PySpark ✓
              </label>

              {(search || activeTopic !== "ALL" || difficultyFilter !== "ALL" || hasSql || hasPySpark) && (
                <button 
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-zinc-500 hover:text-red-400 transition-colors ml-2"
                >
                  <X className="w-4 h-4" /> Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="container mx-auto px-6 max-w-7xl py-12">
        <div className="mb-6 flex justify-between items-end">
          <h2 className="text-zinc-300 font-medium">
            {activeTopic === "ALL" ? "All Challenges" : activeTopic}
          </h2>
          <span className="text-zinc-500 font-mono text-sm">{filteredChallenges.length} results</span>
        </div>

        {filteredChallenges.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredChallenges.map((challenge, i) => (
                <SqlChallengeCard key={challenge.day} challenge={challenge} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
            <AlertCircle className="w-12 h-12 text-zinc-600 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">NO CHALLENGES MATCHED</h3>
            <p className="text-zinc-400 text-center mb-6 max-w-md">
              Try removing a filter, changing the topic, or searching for a different keyword.
            </p>
            <button 
              onClick={clearFilters}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-6 py-2 rounded-md transition-colors"
            >
              CLEAR FILTERS
            </button>
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-zinc-900 flex justify-center">
          <div className="text-center text-sm font-mono text-zinc-600">
            <p>130 verified challenges loaded.</p>
            <p className="mt-1 text-zinc-700">Additional curriculum ranges (116-150, 166-210) are not currently available in the supplied source files.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
