import { QuestionService } from '@/lib/services/questionService';
import Link from 'next/link';

export default async function QuestionsIndexPage() {
  const service = new QuestionService();
  const questions = await service.getAllQuestions();

  // Group by section
  const grouped = questions.reduce((acc, q) => {
    let section = q.section || 'General';
    // Remove "Section X: " prefix if exists
    section = section.replace(/^Section\s+\d+\s*:\s*/i, '');
    
    if (!acc[section]) acc[section] = [];
    acc[section].push(q);
    return acc;
  }, {} as Record<string, typeof questions>);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-blue-500/30">
      
      <div className="max-w-5xl mx-auto mb-16 relative">
        <Link href="/" className="text-zinc-500 hover:text-white transition-colors mb-8 inline-block text-sm font-mono">&larr; Back to Home</Link>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">The Fundamental 50</h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          Select a concept below to enter the interactive learning environment. Watch it work, interact with the state, and master the fundamentals.
        </p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-16 pb-32">
        {Object.entries(grouped).map(([section, qs], sectionIdx) => (
          <div key={section} className="flex flex-col relative">
            
            <div className="sticky top-0 bg-black/90 backdrop-blur-md py-4 z-10 border-b border-zinc-900 mb-6 flex items-baseline gap-4">
               <span className="text-blue-500 font-mono text-sm font-bold">Module 0{sectionIdx + 1}</span>
               <h2 className="text-2xl font-bold text-white">{section}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {qs.map((q) => (
                <Link key={q.id} href={`/questions/${q.id}`} className="bg-zinc-950 border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900 p-6 rounded-2xl transition-all duration-300 group flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 font-bold font-mono text-sm group-hover:bg-blue-900/20 group-hover:text-blue-400 group-hover:border-blue-900/50 transition-colors">
                    {q.questionNumber || '-'}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-300 group-hover:text-white transition-colors leading-relaxed">{q.question}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
