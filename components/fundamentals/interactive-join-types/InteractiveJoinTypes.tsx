'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Table2, ArrowRight } from 'lucide-react';

type JoinType = 'inner' | 'left' | 'right' | 'full' | 'cross';

const JOIN_TYPES: { id: JoinType; label: string; desc: string; sql: string }[] = [
  { id: 'inner', label: 'INNER JOIN', desc: 'Returns records that have matching values in both tables.', sql: 'SELECT *\nFROM LeftTable A\nINNER JOIN RightTable B\n  ON A.id = B.u_id;' },
  { id: 'left', label: 'LEFT JOIN', desc: 'Returns all records from the left table, and matched from the right.', sql: 'SELECT *\nFROM LeftTable A\nLEFT JOIN RightTable B\n  ON A.id = B.u_id;' },
  { id: 'right', label: 'RIGHT JOIN', desc: 'Returns all records from the right table, and matched from the left.', sql: 'SELECT *\nFROM LeftTable A\nRIGHT JOIN RightTable B\n  ON A.id = B.u_id;' },
  { id: 'full', label: 'FULL JOIN', desc: 'Returns all records when there is a match in either table.', sql: 'SELECT *\nFROM LeftTable A\nFULL OUTER JOIN RightTable B\n  ON A.id = B.u_id;' },
  { id: 'cross', label: 'CROSS JOIN', desc: 'Returns the Cartesian product of the two tables.', sql: 'SELECT *\nFROM LeftTable A\nCROSS JOIN RightTable B;' }
];

export function InteractiveJoinTypes() {
  const [activeJoin, setActiveJoin] = useState<JoinType>('inner');
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  // Always-On Auto-Rotation Logic
  useEffect(() => {
    if (userInteracted || !isInView) return;
    
    const interval = setInterval(() => {
      setActiveJoin(current => {
        const currentIndex = JOIN_TYPES.findIndex(j => j.id === current);
        return JOIN_TYPES[(currentIndex + 1) % JOIN_TYPES.length].id;
      });
    }, 5000); // 5-second cycle for each join

    return () => clearInterval(interval);
  }, [userInteracted, isInView]);

  const handleSelect = (id: JoinType) => {
    setUserInteracted(true);
    setActiveJoin(id);
  };

  const activeData = JOIN_TYPES.find(j => j.id === activeJoin);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 space-y-8">
      
      {/* Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl">
        {JOIN_TYPES.map(join => (
          <button
            key={join.id}
            onClick={() => handleSelect(join.id)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 relative ${
              activeJoin === join.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {activeJoin === join.id && (
              <motion.div
                layoutId="active-join-bg"
                className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            {join.label}
          </button>
        ))}
      </div>

      <div className="text-sm font-mono text-blue-400 h-8">{activeData?.desc}</div>

      {/* SQL Codeblock */}
      <div className="w-full max-w-2xl bg-[#1E1E1E] rounded-xl overflow-hidden border border-zinc-700 shadow-xl relative">
        <div className="flex items-center px-4 py-2 bg-[#2D2D2D] border-b border-zinc-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="ml-4 text-xs font-mono text-zinc-400">query.sql</span>
        </div>
        <div className="p-4 font-mono text-sm leading-relaxed overflow-x-auto text-[#D4D4D4]">
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeJoin}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <code>
                {activeData?.sql.split('\n').map((line, i) => {
                  // Basic syntax highlighting heuristic
                  const highlighted = line
                    .replace(/(SELECT|FROM|INNER JOIN|LEFT JOIN|RIGHT JOIN|FULL OUTER JOIN|CROSS JOIN|ON)/g, '<span class="text-[#569CD6] font-bold">$1</span>')
                    .replace(/(LeftTable|RightTable)/g, '<span class="text-[#4EC9B0]">$1</span>')
                    .replace(/(A\.id|B\.u_id)/g, '<span class="text-[#9CDCFE]">$1</span>');
                  return <div key={i} dangerouslySetInnerHTML={{ __html: highlighted }} />;
                })}
              </code>
            </motion.pre>
          </AnimatePresence>
        </div>
      </div>

      {/* Visualizer */}
      <div className="w-full max-w-4xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative flex flex-col gap-8 min-h-[400px]">
        
        {/* Venn Diagram Top Row */}
        <div className="w-full flex justify-center py-4">
          <VennDiagram type={activeJoin} />
        </div>

        {/* Tables Row */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8">
          {/* LEFT TABLE (Users) */}
          <div className="flex flex-col gap-2 w-full md:w-1/3">
            <span className="text-xs font-mono text-zinc-500 font-bold uppercase flex items-center gap-2">
              <Table2 className="w-4 h-4" /> Left Table (Users)
            </span>
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden font-mono text-xs">
              <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400">
                <div className="w-8">ID</div>
                <div className="flex-1">Name</div>
              </div>
              <TableRow id={1} label="Alice" color="blue" />
              <TableRow id={2} label="Bob" color="blue" />
              <TableRow id={3} label="Charlie" color="blue" />
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center shrink-0 w-16">
            <motion.div
              key={activeJoin}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 bg-blue-900/30 border border-blue-500/50 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              <ArrowRight className="w-6 h-6 text-blue-400" />
            </motion.div>
          </div>

          {/* RIGHT TABLE (Orders) */}
          <div className="flex flex-col gap-2 w-full md:w-1/3">
            <span className="text-xs font-mono text-zinc-500 font-bold uppercase flex items-center gap-2">
              <Table2 className="w-4 h-4" /> Right Table (Orders)
            </span>
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden font-mono text-xs">
              <div className="flex bg-zinc-800 p-2 font-bold text-zinc-400">
                <div className="w-8">U_ID</div>
                <div className="flex-1">Item</div>
              </div>
              <TableRow id={1} label="Laptop" color="emerald" />
              <TableRow id={2} label="Phone" color="emerald" />
              <TableRow id={4} label="Tablet" color="emerald" />
            </div>
          </div>
        </div>

      </div>

      {/* OUTPUT TABLE */}
      <div className="w-full max-w-2xl mt-4">
        <div className="flex flex-col gap-2">
           <span className="text-xs font-mono text-zinc-500 font-bold uppercase flex items-center gap-2 justify-center">
            Output Result
          </span>
          <div className="bg-zinc-950 border border-blue-900/50 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)] font-mono text-xs relative min-h-[160px]">
            <div className="flex bg-blue-950/40 p-2 font-bold text-blue-300 border-b border-blue-900/50">
              <div className="w-1/4">L.ID</div>
              <div className="w-1/4">Name</div>
              <div className="w-1/4">R.U_ID</div>
              <div className="w-1/4">Item</div>
            </div>
            
            <div className="relative overflow-hidden min-h-[120px]">
              <AnimatePresence mode="wait">
                <JoinResult key={activeJoin} type={activeJoin} reduceMotion={shouldReduceMotion} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

function TableRow({ id, label, color }: { id: number, label: string, color: 'blue' | 'emerald' }) {
  const textColor = color === 'blue' ? 'text-blue-400' : 'text-emerald-400';
  return (
    <div className="flex p-2 border-t border-zinc-800 hover:bg-zinc-800/50 transition-colors">
      <div className={`w-8 font-bold ${textColor}`}>{id}</div>
      <div className="flex-1 text-zinc-300">{label}</div>
    </div>
  );
}

function JoinResult({ type, reduceMotion }: { type: JoinType, reduceMotion: boolean | null }) {
  const rows = getJoinRows(type);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 w-full flex flex-col"
    >
      {rows.map((row, i) => (
        <motion.div
          key={i}
          initial={{ x: reduceMotion ? 0 : -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : i * 0.15, duration: 0.3 }}
          className="flex p-2 border-b border-zinc-900/50 bg-zinc-900/30 items-center"
        >
          <div className={`w-1/4 font-bold ${row.lId ? 'text-blue-400' : 'text-zinc-600'}`}>{row.lId || 'NULL'}</div>
          <div className={`w-1/4 ${row.name ? 'text-zinc-300' : 'text-zinc-600'}`}>{row.name || 'NULL'}</div>
          <div className={`w-1/4 font-bold ${row.rId ? 'text-emerald-400' : 'text-zinc-600'}`}>{row.rId || 'NULL'}</div>
          <div className={`w-1/4 ${row.item ? 'text-zinc-300' : 'text-zinc-600'}`}>{row.item || 'NULL'}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function getJoinRows(type: JoinType) {
  // Left: (1, Alice), (2, Bob), (3, Charlie)
  // Right: (1, Laptop), (2, Phone), (4, Tablet)
  
  switch(type) {
    case 'inner':
      return [
        { lId: 1, name: 'Alice', rId: 1, item: 'Laptop' },
        { lId: 2, name: 'Bob', rId: 2, item: 'Phone' },
      ];
    case 'left':
      return [
        { lId: 1, name: 'Alice', rId: 1, item: 'Laptop' },
        { lId: 2, name: 'Bob', rId: 2, item: 'Phone' },
        { lId: 3, name: 'Charlie', rId: null, item: null },
      ];
    case 'right':
      return [
        { lId: 1, name: 'Alice', rId: 1, item: 'Laptop' },
        { lId: 2, name: 'Bob', rId: 2, item: 'Phone' },
        { lId: null, name: null, rId: 4, item: 'Tablet' },
      ];
    case 'full':
      return [
        { lId: 1, name: 'Alice', rId: 1, item: 'Laptop' },
        { lId: 2, name: 'Bob', rId: 2, item: 'Phone' },
        { lId: 3, name: 'Charlie', rId: null, item: null },
        { lId: null, name: null, rId: 4, item: 'Tablet' },
      ];
    case 'cross':
      return [
        { lId: 1, name: 'Alice', rId: 1, item: 'Laptop' },
        { lId: 1, name: 'Alice', rId: 2, item: 'Phone' },
        { lId: 1, name: 'Alice', rId: 4, item: 'Tablet' },
        { lId: 2, name: 'Bob', rId: 1, item: 'Laptop' },
        // (truncated for visual brevity but theoretically 9 rows)
      ];
  }
}

function VennDiagram({ type }: { type: JoinType }) {
  // Determine which sections of the Venn diagram are highlighted
  const leftActive = ['left', 'full', 'cross'].includes(type);
  const rightActive = ['right', 'full', 'cross'].includes(type);
  const centerActive = ['inner', 'left', 'right', 'full', 'cross'].includes(type);

  // Define colors based on activity
  const leftColor = leftActive ? 'bg-blue-500/40 border-blue-400 z-10 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-transparent border-zinc-700 z-0';
  const rightColor = rightActive ? 'bg-emerald-500/40 border-emerald-400 z-10 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-transparent border-zinc-700 z-0';
  const centerColor = centerActive ? (type === 'cross' ? 'bg-purple-500/60' : 'bg-white/30') : 'bg-transparent';

  return (
    <div className="relative w-48 h-32 flex items-center justify-center">
      {type === 'cross' ? (
        <div className="flex items-center gap-4">
          <motion.div
            layoutId="venn-left"
            className="w-20 h-20 rounded-full border-2 bg-blue-500/40 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center text-xs font-bold text-white"
          >
            A
          </motion.div>
          <div className="text-xl font-bold text-zinc-500">×</div>
          <motion.div
            layoutId="venn-right"
            className="w-20 h-20 rounded-full border-2 bg-emerald-500/40 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center text-xs font-bold text-white"
          >
            B
          </motion.div>
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            layoutId="venn-left"
            className={`absolute left-4 w-24 h-24 rounded-full border-2 transition-all duration-500 flex items-center justify-center mix-blend-screen ${leftColor}`}
          >
            <span className="absolute left-4 text-xs font-bold text-white/70">A</span>
          </motion.div>
          <motion.div
            layoutId="venn-right"
            className={`absolute right-4 w-24 h-24 rounded-full border-2 transition-all duration-500 flex items-center justify-center mix-blend-screen ${rightColor}`}
          >
            <span className="absolute right-4 text-xs font-bold text-white/70">B</span>
          </motion.div>

          {/* Center Intersection Highlight Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className={`w-12 h-16 rounded-[100%] transition-colors duration-500 ${centerColor}`} style={{ backdropFilter: centerActive ? 'brightness(1.5)' : 'none' }}></div>
          </div>
        </div>
      )}
    </div>
  );
}
