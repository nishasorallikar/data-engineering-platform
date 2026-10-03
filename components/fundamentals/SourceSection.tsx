import { AnimatedSection } from '@/components/ui/animated-section';
import Link from 'next/link';

interface SourceSectionProps {
  questionId: string;
  contentOrigin: string;
}

export function SourceSection({ questionId, contentOrigin }: SourceSectionProps) {
  
  // Quick hack for pagination - eventually derive from question dataset list
  const qNum = parseInt(questionId.split('-q')[1] || '0', 10);
  
  const hasPrev = qNum > 1;
  const prevId = `fundamental-q${qNum - 1}`;
  
  // Currently bounded to q2, update logic when more questions are supported
  const hasNext = qNum < 50;
  const nextId = `fundamental-q${qNum + 1}`;

  return (
    <AnimatedSection delay={0.5} className="flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 font-mono gap-4 pt-4">
      <div className="flex items-center gap-2">
        <span className="opacity-50">Source:</span>
        <span className="text-zinc-400">{contentOrigin}</span>
      </div>
      <div className="flex gap-6">
        {hasPrev ? (
          <Link href={`/questions/${prevId}`} className="hover:text-zinc-300 transition-colors">
            &larr; Previous (Q{qNum - 1})
          </Link>
        ) : (
          <span className="opacity-30 cursor-not-allowed">&larr; Previous</span>
        )}
        
        {hasNext ? (
          <Link href={`/questions/${nextId}`} className="hover:text-zinc-300 transition-colors text-blue-400 hover:text-blue-300">
            Next (Q{qNum + 1}) &rarr;
          </Link>
        ) : (
          <span className="opacity-30 cursor-not-allowed">Next &rarr;</span>
        )}
      </div>
    </AnimatedSection>
  );
}
