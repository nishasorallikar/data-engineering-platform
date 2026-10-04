import { SqlChallengeService } from "@/lib/services/sqlChallengeService";
import SqlChallengeLibrary from "@/components/sql-challenges/SqlChallengeLibrary";

export const metadata = {
  title: "SQL Challenge Command Center | Data Engineering Prep",
  description: "Practice 130 verified real-world SQL patterns used in data engineering.",
};

export default async function SqlChallengesPage() {
  const service = new SqlChallengeService();
  // Fetch a limit high enough to get all 130 challenges
  const { data: challenges, total } = await service.getChallenges(1, 200);

  return (
    <main className="min-h-screen bg-zinc-950 font-sans">
      <SqlChallengeLibrary initialChallenges={challenges} totalCount={total} />
    </main>
  );
}
