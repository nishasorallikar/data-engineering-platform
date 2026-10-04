"use client";

import { useState } from "react";
import Link from "next/link";
import { SqlChallengeDTO } from "@/lib/dto/sqlChallengeDto";
import { ArrowLeft, ArrowRight, Database, Code2, Copy, CheckCircle2, ChevronRight, Table2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SqlChallengeDetailProps {
  challenge: SqlChallengeDTO;
  prevDay: number | null;
  nextDay: number | null;
}

export default function SqlChallengeDetail({ challenge, prevDay, nextDay }: SqlChallengeDetailProps) {
  const [activeTab, setActiveTab] = useState<"PROBLEM" | "TABLES" | "OUTPUT" | "SQL" | "PYSPARK">("PROBLEM");
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedPySpark, setCopiedPySpark] = useState(false);

  const availableTabs = [
    { id: "PROBLEM", label: "Problem", icon: <Database className="w-4 h-4" /> },
    ...(challenge.inputTables && challenge.inputTables.length > 0 ? [{ id: "TABLES", label: "Tables", icon: <Table2 className="w-4 h-4" /> }] : []),
    ...(challenge.expectedOutput ? [{ id: "OUTPUT", label: "Output", icon: <ChevronRight className="w-4 h-4" /> }] : []),
    ...(challenge.sqlSolution ? [{ id: "SQL", label: "SQL", icon: <Code2 className="w-4 h-4" /> }] : []),
    ...(challenge.pySparkSolution ? [{ id: "PYSPARK", label: "PySpark", icon: <Database className="w-4 h-4 text-orange-400" /> }] : [])
  ] as const;

  const handleCopy = (text: string, type: 'sql' | 'pyspark') => {
    navigator.clipboard.writeText(text);
    if (type === 'sql') {
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    } else {
      setCopiedPySpark(true);
      setTimeout(() => setCopiedPySpark(false), 2000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-zinc-950">
      {/* HEADER */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-[64px] z-20">
        <div className="container mx-auto px-6 py-6 max-w-7xl">
          <Link 
            href="/sql-challenges" 
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-6 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            SQL CHALLENGES
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-400/20">
                  DAY {challenge.day.toString().padStart(2, '0')}
                </span>
                {challenge.difficulty && (
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${
                    challenge.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                    challenge.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {challenge.difficulty}
                  </span>
                )}
                {challenge.topicTitle && (
                  <span className="text-sm text-zinc-400 font-medium">
                    {challenge.topicTitle}
                  </span>
                )}
                {challenge.problemNumber && (
                  <span className="text-sm font-mono text-zinc-500">
                    #{challenge.problemNumber}
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
                {challenge.title}
              </h1>
            </div>
            
            {/* Action Area (e.g. solve button placeholder for Phase 4) */}
            <div className="flex gap-3">
              {challenge.dataEngineeringUseCases && challenge.dataEngineeringUseCases.length > 0 && (
                <div className="flex flex-wrap gap-2 max-w-[300px] justify-end">
                  {challenge.dataEngineeringUseCases.map((useCase: string, i: number) => (
                    <span key={i} className="text-[10px] uppercase font-bold bg-zinc-900 text-zinc-400 px-2 py-1 rounded border border-zinc-800">
                      {useCase}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT PANEL: Problem & Data */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
            <div className="flex items-center bg-zinc-900 border-b border-zinc-800 px-2 overflow-x-auto scrollbar-hide">
              {availableTabs.filter(t => ['PROBLEM', 'TABLES', 'OUTPUT'].includes(t.id)).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id 
                      ? "border-emerald-500 text-emerald-400" 
                      : "border-transparent text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[600px] custom-scrollbar">
              {(activeTab === "PROBLEM" || (!['PROBLEM', 'TABLES', 'OUTPUT'].includes(activeTab))) && (
                <div className="prose prose-invert prose-emerald max-w-none">
                  <h3 className="text-lg font-semibold text-white mb-4">Problem Statement</h3>
                  <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed text-sm md:text-base font-sans">
                    {challenge.question}
                  </div>
                </div>
              )}

              {activeTab === "TABLES" && challenge.inputTables && (
                <div className="space-y-8">
                  {challenge.inputTables.map((table, i) => (
                    <div key={i}>
                      <h4 className="text-emerald-400 font-mono text-sm font-bold mb-3 flex items-center gap-2">
                        <Table2 className="w-4 h-4" /> {table.name}
                      </h4>
                      <div className="bg-[#1e1e1e] rounded-lg border border-zinc-800 p-4 overflow-x-auto">
                        <pre className="text-sm font-mono text-zinc-300 m-0">
                          {table.rawContent}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "OUTPUT" && challenge.expectedOutput && (
                <div>
                  <h4 className="text-emerald-400 font-mono text-sm font-bold mb-3 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" /> EXPECTED OUTPUT
                  </h4>
                  <div className="bg-[#1e1e1e] rounded-lg border border-zinc-800 p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-zinc-300 m-0">
                      {typeof challenge.expectedOutput === 'string' 
                        ? challenge.expectedOutput 
                        : JSON.stringify(challenge.expectedOutput, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Solutions */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full">
            <div className="flex justify-between items-center bg-zinc-900 border-b border-zinc-800 px-2 overflow-x-auto scrollbar-hide">
              <div className="flex">
                {availableTabs.filter(t => ['SQL', 'PYSPARK'].includes(t.id)).map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id 
                        ? (tab.id === 'SQL' ? "border-blue-500 text-blue-400" : "border-orange-500 text-orange-400")
                        : "border-transparent text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {tab.icon} {tab.label} Solution
                  </button>
                ))}
              </div>
              
              {/* Copy Button */}
              {((activeTab === "SQL" && challenge.sqlSolution) || (activeTab === "PYSPARK" && challenge.pySparkSolution)) && (
                <button 
                  onClick={() => handleCopy(
                    activeTab === "SQL" ? challenge.sqlSolution! : challenge.pySparkSolution!, 
                    activeTab === "SQL" ? 'sql' : 'pyspark'
                  )}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded transition-colors mr-2 my-auto"
                >
                  {(activeTab === 'SQL' ? copiedSql : copiedPySpark) ? (
                    <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Copied</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> Copy Code</>
                  )}
                </button>
              )}
            </div>
            
            <div className="flex-1 bg-[#1e1e1e] overflow-y-auto max-h-[600px] custom-scrollbar relative">
              {/* Default to SQL if active tab is not SQL/PySpark but they exist, otherwise show active tab */}
              {((['PROBLEM', 'TABLES', 'OUTPUT'].includes(activeTab) && challenge.sqlSolution) || activeTab === "SQL") && (
                <SyntaxHighlighter
                  language="sql"
                  style={vscDarkPlus}
                  showLineNumbers
                  customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent', fontSize: '0.875rem' }}
                  lineNumberStyle={{ minWidth: '2.5em', paddingRight: '1em', color: '#6b7280', textAlign: 'right' }}
                >
                  {challenge.sqlSolution || '-- No SQL solution available'}
                </SyntaxHighlighter>
              )}

              {activeTab === "PYSPARK" && challenge.pySparkSolution && (
                <SyntaxHighlighter
                  language="python"
                  style={vscDarkPlus}
                  showLineNumbers
                  customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent', fontSize: '0.875rem' }}
                  lineNumberStyle={{ minWidth: '2.5em', paddingRight: '1em', color: '#6b7280', textAlign: 'right' }}
                >
                  {challenge.pySparkSolution}
                </SyntaxHighlighter>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER NAVIGATION */}
      <div className="border-t border-zinc-800 bg-zinc-950 mt-auto">
        <div className="container mx-auto px-6 py-6 max-w-7xl flex justify-between items-center">
          {prevDay ? (
            <Link 
              href={`/sql-challenges/${prevDay}`}
              className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors font-medium text-sm group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              DAY {prevDay.toString().padStart(2, '0')}
            </Link>
          ) : (
            <div /> // Empty div to push next button to the right
          )}
          
          {nextDay && (
            <Link 
              href={`/sql-challenges/${nextDay}`}
              className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors font-medium text-sm group"
            >
              DAY {nextDay.toString().padStart(2, '0')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
