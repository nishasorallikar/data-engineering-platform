import { AnimatedSection } from '@/components/ui/animated-section';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface InterviewerAngleProps {
  interviewerAngle?: string;
}

export function InterviewerAngle({ interviewerAngle }: InterviewerAngleProps) {
  if (!interviewerAngle) return null;

  // Clean up PDF parsing artifacts (like trailing bullet points and page leaks)
  // We use the bullet character to strip everything after it.
  const cleanText = interviewerAngle.split('\n•')[0].trim();

  return (
    <AnimatedSection delay={0.4}>
      <Card className="bg-blue-950/20 border-blue-900/40 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
        <CardHeader>
          <CardTitle className="text-sm font-mono uppercase tracking-widest text-blue-400">
            Interviewer&apos;s Angle
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-100/90 leading-relaxed font-medium">
          <div>{cleanText}</div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
