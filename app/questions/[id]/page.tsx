import { QuestionService } from '@/lib/services/questionService';
import { FundamentalQuestionPage } from '@/components/fundamentals/FundamentalQuestionPage';
import { notFound } from 'next/navigation';

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const service = new QuestionService();
  
  // We look up by slug / string ID directly via the service
  const q = await service.getQuestionById(resolvedParams.id);

  if (!q) {
    return notFound();
  }

  // Only supporting fundamentals for the first vertical slice
  if (q.id.startsWith('fundamental-')) {
    return <FundamentalQuestionPage q={q} />;
  }

  // Fallback for non-fundamental questions (out of scope for Q1 slice)
  return (
    <div className="p-8">
      <h1>Unsupported question type</h1>
    </div>
  );
}
