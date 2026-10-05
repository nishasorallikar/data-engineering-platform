import React from "react";
import { SqlTable } from "@/lib/sql/types";

export function SqlDataTable({ table, variant = "input" }: { table: SqlTable, variant?: "input" | "output" }) {
  if (table.sourceFormat === "raw" || !table.columns || table.columns.length === 0) {
    return (
      <div className="mb-8 last:mb-0">
        {table.name && (
          <h5 className="text-xs font-mono font-bold text-zinc-500 tracking-wider mb-2 uppercase">
            {table.name}
          </h5>
        )}
        <div className="bg-[#1e1e1e] rounded-lg border border-zinc-800 p-4 overflow-x-auto">
          <div className="text-[10px] text-zinc-500 font-mono mb-3 uppercase tracking-widest border-b border-zinc-800/50 pb-2">
            Source Format (Unstructured)
          </div>
          <pre className="text-sm font-mono text-zinc-300 m-0 whitespace-pre-wrap word-break">
            {table.rawSource || "No data available."}
          </pre>
        </div>
      </div>
    );
  }

  const isOutput = variant === "output";
  const headerAccent = isOutput ? "text-emerald-400" : "text-blue-400";

  return (
    <div className="mb-8 last:mb-0">
      {table.name && (
        <h5 className="text-xs font-mono font-bold text-zinc-400 tracking-wider mb-2 uppercase flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${isOutput ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
          {table.name}
        </h5>
      )}
      <div className="bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-zinc-900 border-b border-zinc-800">
              <tr>
                {table.columns.map((col, idx) => (
                  <th 
                    key={idx} 
                    className={`px-4 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider ${headerAccent}`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {table.rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-zinc-900/30 transition-colors">
                  {/* Handle cases where row might have fewer or more cells than columns */}
                  {Array.from({ length: Math.max(table.columns.length, row.length) }).map((_, colIdx) => {
                    const cellValue = row[colIdx];
                    const isNull = cellValue === "NULL" || cellValue === "null";
                    const isEmpty = cellValue === undefined || cellValue === "";
                    
                    return (
                      <td 
                        key={colIdx} 
                        className="px-4 py-2 text-sm font-mono text-zinc-300 whitespace-nowrap"
                      >
                        {isNull ? (
                          <span className="text-zinc-600 italic">NULL</span>
                        ) : isEmpty ? (
                          <span className="text-zinc-600 italic">{" "}</span>
                        ) : (
                          cellValue
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
