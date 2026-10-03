'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AnimatedSection } from '@/components/ui/animated-section';
import { QuestionDto } from '@/lib/dto/questionDto';

import Link from 'next/link';
import { InteractionRegistry } from './InteractionRegistry';
import { ThinkFirst } from './ThinkFirst';
import { CoreConcept } from './CoreConcept';
import { InterviewerAngle } from './InterviewerAngle';
import { SourceSection } from './SourceSection';

interface Props {
  q: QuestionDto;
}

export function FundamentalQuestionPage({ q }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 pb-24 pt-12 md:pt-16">
      
      {/* Back Button */}
      <Link href="/questions" className="text-zinc-500 hover:text-white transition-colors mb-2 inline-flex items-center gap-2 text-sm font-mono">
        &larr; Back to Curriculum
      </Link>

      {/* Header */}
      <AnimatedSection>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="font-mono text-xs uppercase bg-zinc-900 border-zinc-800 text-zinc-400">
              {q.section}
            </Badge>
            <Badge variant="outline" className="font-mono text-xs uppercase bg-zinc-900 border-zinc-800 text-zinc-400">
              {q.difficulty}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">{q.question}</h1>
        </div>
      </AnimatedSection>

      {/* Think First Gamification */}
      {!revealed && (
        <ThinkFirst questionId={q.id} onReveal={() => setRevealed(true)} />
      )}

      {/* Revealed Content */}
      {revealed && (
        <div className="space-y-12">
          
          <CoreConcept detailedExplanation={q.detailedExplanation} />

          {/* Render the specific interaction based on the question */}
          <AnimatedSection delay={0.2}>
            <InteractionRegistry q={q} />
          </AnimatedSection>

          <InterviewerAngle interviewerAngle={q.interviewerAngle} />

          <Separator className="bg-zinc-800" />

          <SourceSection questionId={q.id} contentOrigin={q.contentOrigin} />
        </div>
      )}
    </div>
  );
}
