import { AnimatedSection } from '@/components/ui/animated-section';
import { Cloud, Box } from 'lucide-react';

interface CoreConceptProps {
  detailedExplanation?: string;
}

export function CoreConcept({ detailedExplanation }: CoreConceptProps) {
  if (!detailedExplanation) return null;

  // Clean up PDF parser line breaks (newlines not preceded by a period, unless it's a bullet)
  const cleanExplanation = detailedExplanation.replace(/([^\.\:\;])\n/g, '$1 ').trim();
  const explanationParagraphs = cleanExplanation.split('\n').map(p => p.trim()).filter(Boolean);

  // Heuristic: If the first paragraph contains a separator early on (like " - " or " — " or ": "), 
  // it's probably a list of peers (like Q5). If not, it's a true summary paragraph (like Q1).
  const isPeerList = explanationParagraphs[0]?.match(/^.{2,30}(\s—\s|\s-\s|:\s)/);
  
  const summary = isPeerList ? null : explanationParagraphs[0];
  const listItems = isPeerList ? explanationParagraphs : explanationParagraphs.slice(1);

  return (
    <div className="space-y-6">
      {/* Core Summary (if it exists) */}
      {summary && (
        <AnimatedSection delay={0.1}>
          <div className="text-lg text-zinc-300 leading-relaxed font-medium bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/80 shadow-inner">
            {summary}
          </div>
        </AnimatedSection>
      )}

      {/* Details / List Items */}
      {listItems.length > 0 && (
        <AnimatedSection delay={0.3}>
          <div className="grid grid-cols-1 gap-3">
            {listItems.map((line, i) => {
              // Check if it's a very short line that's just a comma-separated list of tools
              // (e.g. "S3, ADLS, GCS.")
              if (line.length < 80 && line.split(',').length > 1 && !line.includes('—') && !line.includes('because')) {
                const tools = line.replace('.', '').split(',').map(t => t.trim());
                return (
                  <div key={i} className="flex flex-wrap gap-3 items-center p-3 pl-5 bg-zinc-950/30 rounded-2xl border border-zinc-800/30">
                    <Cloud className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mr-2">Examples:</span>
                    {tools.map((tool, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-sm font-semibold text-zinc-300 shadow-sm flex items-center gap-2">
                        <Box className="w-3.5 h-3.5 text-blue-400" />
                        {tool}
                      </span>
                    ))}
                  </div>
                );
              }

              // Try to bold the term before the dash
              const match = line.match(/^(.+?)(\s—\s|\s-\s|:\s)(.+)$/);
              if (match) {
                return (
                  <div key={i} className="bg-zinc-950/50 border border-zinc-800/50 p-5 rounded-2xl flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-500/50 mt-2 shrink-0" />
                    <div>
                      <span className="text-white font-bold tracking-wide">{match[1]}</span>
                      <span className="text-zinc-500 mx-2">—</span>
                      <span className="text-zinc-400 leading-relaxed">{match[3]}</span>
                    </div>
                  </div>
                );
              }
              // Fallback for normal paragraphs
              return (
                <div key={i} className="bg-zinc-950/50 border border-zinc-800/50 p-5 rounded-2xl text-zinc-400 leading-relaxed">
                  {line}
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
