import { notFound } from "next/navigation";
import { SqlChallengeService } from "@/lib/services/sqlChallengeService";
import SqlChallengeDetail from "@/components/sql-challenges/SqlChallengeDetail";

export async function generateMetadata({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;
  return {
    title: `SQL Challenge Day ${day} | Data Engineering Prep`,
  };
}

export default async function SqlChallengeDetailPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;
  const dayNum = parseInt(day);
  
  if (isNaN(dayNum)) notFound();

  const service = new SqlChallengeService();
  
  try {
    const challenge = await service.getChallengeByDay(dayNum);
    // Determine next and prev available challenges
    // This is simple since we can just fetch all day numbers from repository
    // In a real app, you might have specific queries, but let's just get the full list to find prev/next
    const all = await service.getChallenges(1, 250);
    const dayNumbers = all.data.map(c => c.day).sort((a, b) => a - b);
    const currentIndex = dayNumbers.indexOf(dayNum);
    
    const prevDay = currentIndex > 0 ? dayNumbers[currentIndex - 1] : null;
    const nextDay = currentIndex !== -1 && currentIndex < dayNumbers.length - 1 ? dayNumbers[currentIndex + 1] : null;

    return (
      <main className="min-h-screen bg-zinc-950 font-sans">
        <SqlChallengeDetail 
          challenge={challenge} 
          prevDay={prevDay} 
          nextDay={nextDay} 
        />
      </main>
    );
  } catch (e) {
    notFound();
  }
}
