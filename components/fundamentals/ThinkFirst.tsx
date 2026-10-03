import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection } from '@/components/ui/animated-section';

interface ThinkFirstProps {
  questionId: string;
  onReveal: () => void;
}

export function ThinkFirst({ questionId, onReveal }: ThinkFirstProps) {
  // Derive Think First prompt based on question ID
  const getThinkFirstContent = () => {
    switch (questionId) {
      case 'fundamental-q1':
        return (
          <div className="space-y-4">
            <p className="font-semibold text-zinc-300">Think about:</p>
            <ul className="text-zinc-500 max-w-md mx-auto space-y-2 text-sm text-left list-disc list-inside">
              <li>Where does data come from?</li>
              <li>Where does it need to go?</li>
              <li>What happens in the middle?</li>
            </ul>
          </div>
        );
      case 'fundamental-q2':
        return (
          <div className="space-y-4">
            <p className="font-semibold text-zinc-300">Think about:</p>
            <ul className="text-zinc-500 max-w-md mx-auto space-y-2 text-sm text-left list-disc list-inside">
              <li>Where does transformation happen?</li>
              <li>Before loading? Or after loading?</li>
              <li>What changes between ETL and ELT?</li>
            </ul>
          </div>
        );
      case 'fundamental-q3':
        return (
          <div className="space-y-4">
            <p className="font-semibold text-zinc-300">Think about:</p>
            <ul className="text-zinc-500 max-w-md mx-auto space-y-2 text-sm text-left list-disc list-inside">
              <li>What does OLTP stand for?</li>
              <li>What does OLAP stand for?</li>
              <li>How does their row vs columnar structure affect performance?</li>
            </ul>
          </div>
        );
      case 'fundamental-q4':
        return (
          <div className="space-y-4">
            <p className="font-semibold text-zinc-300">Think about:</p>
            <ul className="text-zinc-500 max-w-md mx-auto space-y-2 text-sm text-left list-disc list-inside">
              <li>Why was the Data Lake invented?</li>
              <li>What problems did it cause?</li>
              <li>How does a Lakehouse combine the best of both?</li>
            </ul>
          </div>
        );
      default:
        return (
          <p className="text-zinc-500 max-w-md">
            Take a moment to construct your own answer before revealing the explanation.
          </p>
        );
    }
  };

  return (
    <AnimatedSection delay={0.1}>
      <Card className="bg-zinc-900/50 border-zinc-800 shadow-xl">
        <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-6">
          <h2 className="text-xl font-bold text-zinc-200 tracking-wide uppercase">Think First</h2>
          {getThinkFirstContent()}
          <Button 
            onClick={onReveal} 
            size="lg" 
            className="mt-4 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-all hover:scale-105"
          >
            Reveal Answer
          </Button>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
