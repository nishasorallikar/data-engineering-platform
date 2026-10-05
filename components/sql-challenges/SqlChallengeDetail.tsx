"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SqlChallengeDTO } from "@/lib/dto/sqlChallengeDto";
import { normalizeExpectedOutput, normalizeInputTables } from "@/lib/sql/parseSqlTable";
import { SqlDataTable } from "./SqlDataTable";
import { ArrowLeft, ArrowRight, Database, Code2, Copy, CheckCircle2, ChevronRight, Table2, ChevronDown } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { QueryFlow } from "./QueryFlow/QueryFlow";

interface SqlChallengeDetailProps {
  challenge: SqlChallengeDTO;
  prevDay: number | null;
  nextDay: number | null;
}

export default function SqlChallengeDetail({ challenge, prevDay, nextDay }: SqlChallengeDetailProps) {
  const [activeTab, setActiveTab] = useState<"SQL" | "PYSPARK">("SQL");
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedPySpark, setCopiedPySpark] = useState(false);
  const [tablesExpanded, setTablesExpanded] = useState(false);
  const [outputExpanded, setOutputExpanded] = useState(false);
  
  const router = useRouter();

  const parsedInputTables = challenge.inputTables ? normalizeInputTables(challenge.inputTables) : [];
  const parsedExpectedOutput = challenge.expectedOutput ? normalizeExpectedOutput(challenge.expectedOutput) : [];

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

  // If there's no SQL but there is PySpark, default to PySpark
  // (Though SQL is standard)
  if (activeTab === "SQL" && !challenge.sqlSolution && challenge.pySparkSolution) {
    setActiveTab("PYSPARK");
  }

  return (
    <div className="scroll-mt-16 min-h-[calc(100vh-64px)] flex flex-col bg-zinc-950">
      {/* HEADER */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-[64px] z-20">
        <div className="container mx-auto px-6 py-6 max-w-7xl">
          <button 
            onClick={() => {
              if (window.history.length > 2) {
                router.back();
              } else {
                router.push('/sql-challenges');
              }
            }}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-6 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Library
          </button>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
                  DAY {challenge.day?.toString().padStart(2, '0')}
                </span>
                <span className="text-zinc-400 text-sm">{challenge.topicTitle}</span>
                {challenge.problemNumber && (
                  <span className="text-zinc-600 text-sm">#{challenge.problemNumber}</span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">{challenge.title}</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {challenge.difficulty && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
                  <div className={`w-2 h-2 rounded-full ${
                    challenge.difficulty === 'Easy' ? 'bg-emerald-500' :
                    challenge.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <span className="text-xs font-medium text-zinc-300 capitalize">{challenge.difficulty.toLowerCase()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl flex-1 flex flex-col gap-8">
        
        {/* 1. PROBLEM PANEL */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" /> Problem Statement
          </h3>
          <div className="prose prose-invert prose-emerald max-w-none text-zinc-300 whitespace-pre-wrap leading-relaxed text-sm md:text-base font-sans mb-6">
            {challenge.question}
          </div>
          {challenge.explanation && (
            <>
              <h4 className="text-sm font-semibold text-emerald-400 mb-2 mt-4 uppercase tracking-wider">Additional Context & Tables</h4>
              <div className="prose prose-invert prose-emerald max-w-none text-zinc-400 whitespace-pre-wrap leading-relaxed text-sm font-mono bg-zinc-950/50 p-4 rounded-lg border border-zinc-800">
                {challenge.explanation}
              </div>
            </>
          )}
        </div>

        {/* 2. DATA PANEL (Moved Above SQL Workspace) */}
        {/* Only show DATA panel if there's actually structured data parsed */}
        {(parsedInputTables.length > 0 || parsedExpectedOutput.length > 0) && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-2">Data</h3>
            
            <div className="border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-900/30">
              {/* INPUT TABLES */}
              {parsedInputTables.length > 0 && (
                <div className={`${parsedExpectedOutput.length > 0 ? "border-b border-zinc-800/50" : ""}`}>
                  <button 
                    onClick={() => setTablesExpanded(!tablesExpanded)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-zinc-800/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Table2 className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-zinc-200">INPUT TABLES</span>
                      <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-xs font-mono">
                        {parsedInputTables.length} tables
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${tablesExpanded ? "rotate-180" : ""}`} />
                  </button>
                  
                  {tablesExpanded && (
                    <div className="px-6 pb-6 pt-2 space-y-8 bg-zinc-950/20">
                      {parsedInputTables.map((table, i) => (
                        <SqlDataTable key={i} table={table} variant="input" />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* EXPECTED OUTPUT */}
              {parsedExpectedOutput.length > 0 && (
                <div>
                  <button 
                    onClick={() => setOutputExpanded(!outputExpanded)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-zinc-800/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-zinc-200">EXPECTED OUTPUT</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${outputExpanded ? "rotate-180" : ""}`} />
                  </button>
                  
                  {outputExpanded && (
                    <div className="px-6 pb-6 pt-2 bg-zinc-950/20">
                      {parsedExpectedOutput.map((table, i) => (
                        <SqlDataTable key={i} table={table} variant="output" />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. SQL WORKSPACE */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
          {/* Workspace Header / Segmented Control */}
          <div className="flex justify-between items-center border-b border-zinc-800/50 px-4 py-3 bg-zinc-900/80">
            <div className="flex items-center gap-2">
              {challenge.sqlSolution && (
                <button
                  onClick={() => setActiveTab("SQL")}
                  className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
                    activeTab === "SQL" 
                      ? "bg-zinc-800 text-white border border-zinc-700 shadow-sm" 
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  SQL
                </button>
              )}
              {challenge.pySparkSolution && (
                <button
                  onClick={() => setActiveTab("PYSPARK")}
                  className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
                    activeTab === "PYSPARK" 
                      ? "bg-zinc-800 text-white border border-zinc-700 shadow-sm" 
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  PySpark
                </button>
              )}
            </div>
            
            {/* Copy Button */}
            {((activeTab === "SQL" && challenge.sqlSolution) || (activeTab === "PYSPARK" && challenge.pySparkSolution)) && (
              <button 
                onClick={() => handleCopy(
                  activeTab === "SQL" ? challenge.sqlSolution! : challenge.pySparkSolution!, 
                  activeTab === "SQL" ? 'sql' : 'pyspark'
                )}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-800 rounded border border-zinc-800 transition-colors"
              >
                {(activeTab === 'SQL' ? copiedSql : copiedPySpark) ? (
                  <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Copied</>
                ) : (
                  <><Copy className="w-3.5 h-3.5" /> Copy Code</>
                )}
              </button>
            )}
          </div>

          {/* Workspace Body (2 columns on lg, 1 on mobile) */}
          <div className="flex flex-col lg:flex-row h-auto lg:h-[520px]">
            {/* Code Editor */}
            <div className="w-full lg:w-3/5 border-b lg:border-b-0 lg:border-r border-zinc-800/50 bg-[#1e1e1e] overflow-y-auto overflow-x-auto relative h-[400px] lg:h-full custom-scrollbar">
              {activeTab === "SQL" && challenge.sqlSolution && (
                <SyntaxHighlighter
                  language="sql"
                  style={vscDarkPlus}
                  showLineNumbers
                  customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent', fontSize: '0.875rem' }}
                  lineNumberStyle={{ minWidth: '2.5em', paddingRight: '1em', color: '#6b7280', textAlign: 'right' }}
                >
                  {challenge.sqlSolution}
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

            {/* Query Flow */}
            <div className="w-full lg:w-2/5 h-[300px] lg:h-full bg-zinc-950/30">
              {activeTab === "SQL" && challenge.sqlSolution ? (
                <QueryFlow sql={challenge.sqlSolution} />
              ) : (
                <div className="flex items-center justify-center h-full p-6 text-center text-sm font-mono text-zinc-500">
                  {activeTab === "PYSPARK" 
                    ? "Solution Overview logic not implemented for PySpark."
                    : "No logical query flow available."}
                </div>
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
