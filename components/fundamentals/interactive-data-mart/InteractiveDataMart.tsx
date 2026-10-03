'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Users, LineChart, Briefcase, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

type MartType = 'sales' | 'finance' | 'marketing' | null;

export function InteractiveDataMart() {
  const [activeMart, setActiveMart] = useState<MartType>(null);

  const marts = [
    {
      id: 'sales' as MartType,
      title: 'Sales Mart',
      icon: LineChart,
      color: 'blue',
      description: 'Optimized for the Sales Team. Contains daily revenue, quota attainment, and CRM pipeline data.',
      tables: ['fact_sales', 'dim_region', 'dim_rep'],
      bg: 'bg-blue-950/20 border-blue-900/50',
      text: 'text-blue-400'
    },
    {
      id: 'finance' as MartType,
      title: 'Finance Mart',
      icon: Briefcase,
      color: 'emerald',
      description: 'Highly secure data for the Finance Team. Contains ledger entries, payroll, and tax reporting.',
      tables: ['fact_ledger', 'dim_account', 'dim_cost_center'],
      bg: 'bg-emerald-950/20 border-emerald-900/50',
      text: 'text-emerald-400'
    },
    {
      id: 'marketing' as MartType,
      title: 'Marketing Mart',
      icon: Users,
      color: 'purple',
      description: 'Used by Marketing to track ad spend, campaign performance, and user engagement metrics.',
      tables: ['fact_campaigns', 'dim_channel', 'dim_audience'],
      bg: 'bg-purple-950/20 border-purple-900/50',
      text: 'text-purple-400'
    }
  ];

  const activeData = marts.find(m => m.id === activeMart);

  return (
    <div className="w-full py-8 flex flex-col items-center">
      
      {/* Enterprise Data Warehouse */}
      <div className="w-full max-w-2xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative z-10 text-center mb-8">
        <div className="flex flex-col items-center justify-center gap-3">
          <Database className="w-12 h-12 text-zinc-400" />
          <h3 className="text-xl font-black text-white">Enterprise Data Warehouse (EDW)</h3>
          <p className="text-sm text-zinc-400 max-w-md">
            The central repository containing hundreds of tables across the entire organization. Difficult for a single business user to navigate.
          </p>
        </div>
      </div>

      {/* Branching Lines & Animation */}
      <div className="relative w-full max-w-4xl flex justify-center mb-8">
        <div className="absolute top-0 w-3/4 h-[2px] bg-zinc-800">
          <motion.div 
            className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            animate={{ left: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          />
        </div>
        <div className="flex w-3/4 justify-between relative">
          <div className="w-[2px] h-10 bg-zinc-800" />
          <div className="w-[2px] h-10 bg-zinc-800" />
          <div className="w-[2px] h-10 bg-zinc-800" />
        </div>
      </div>

      {/* Data Marts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {marts.map(mart => {
          const isActive = activeMart === mart.id;
          const Icon = mart.icon;

          return (
            <motion.button
              key={mart.id}
              onClick={() => setActiveMart(isActive ? null : mart.id)}
              className={`relative flex flex-col items-center p-6 rounded-3xl border transition-all duration-500 text-center ${
                isActive 
                  ? `${mart.bg} shadow-lg scale-105 z-20 ring-2 ring-${mart.color}-500/50` 
                  : 'bg-zinc-950/50 border-zinc-900 hover:bg-zinc-900/50'
              } ${activeMart && !isActive ? 'opacity-40 grayscale-[50%]' : ''}`}
              whileHover={{ y: isActive ? 0 : -5 }}
            >
              <div className={`p-4 rounded-2xl mb-4 ${isActive ? 'bg-zinc-900' : 'bg-zinc-900/50 border border-zinc-800'}`}>
                <Icon className={`w-8 h-8 ${isActive ? mart.text : 'text-zinc-500'}`} />
              </div>
              <h4 className={`font-bold text-lg mb-2 ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                {mart.title}
              </h4>
              <p className="text-xs text-zinc-500 font-medium">
                Subset optimized for {mart.title.split(' ')[0]}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Detail Panel */}
      <div className="w-full max-w-5xl mt-12 min-h-[200px]">
        <AnimatePresence mode="wait">
          {activeData ? (
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`w-full ${activeData.bg} border rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center shadow-2xl`}
            >
              <div className="flex-1">
                <h3 className={`text-2xl font-black mb-3 ${activeData.text}`}>{activeData.title} Details</h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  {activeData.description}
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                    <Zap className={`w-4 h-4 ${activeData.text}`} />
                    Fast Query Performance
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                    <ShieldCheck className={`w-4 h-4 ${activeData.text}`} />
                    Role-Based Access
                  </div>
                </div>
              </div>
              
              <div className="flex-1 w-full bg-black/50 border border-white/5 rounded-2xl p-5 shadow-inner">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3 block">Relevant Tables</span>
                <div className="space-y-2 font-mono text-sm">
                  {activeData.tables.map(t => (
                    <div key={t} className="flex items-center gap-3 text-zinc-300 bg-zinc-900/50 p-2 rounded-lg border border-zinc-800">
                      <Database className="w-4 h-4 text-zinc-500" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex items-center justify-center border border-dashed border-zinc-800 rounded-3xl p-12 text-zinc-500 bg-zinc-950/30"
            >
              <p>Select a Data Mart above to view its structure.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
