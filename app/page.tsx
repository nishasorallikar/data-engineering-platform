import Link from 'next/link';
import dynamic from 'next/dynamic';
import { LazyMotion, domAnimation } from 'framer-motion';
import { HeroSection } from '@/components/homepage/HeroSection';
import { DataJourney } from '@/components/homepage/DataJourney';

const LearningDomains = dynamic(() => import('@/components/homepage/LearningDomains').then(mod => mod.LearningDomains));
const FundamentalFiftySection = dynamic(() => import('@/components/homepage/FundamentalFiftySection').then(mod => mod.FundamentalFiftySection));
const HowLearningWorks = dynamic(() => import('@/components/homepage/HowLearningWorks').then(mod => mod.HowLearningWorks));
const Roadmap = dynamic(() => import('@/components/homepage/Roadmap').then(mod => mod.Roadmap));
const PracticeInterview = dynamic(() => import('@/components/homepage/PracticeInterview').then(mod => mod.PracticeInterview));
const Projects = dynamic(() => import('@/components/homepage/Projects').then(mod => mod.Projects));
const ProgressCTA = dynamic(() => import('@/components/homepage/ProgressCTA').then(mod => mod.ProgressCTA));
const Footer = dynamic(() => import('@/components/homepage/Footer').then(mod => mod.Footer));

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-black text-zinc-50 flex flex-col font-sans selection:bg-blue-500/30">
        


        <main className="flex flex-col w-full">
          <HeroSection />
          <DataJourney />
          <LearningDomains />
          <FundamentalFiftySection />
          <HowLearningWorks />
          <Roadmap />
          <PracticeInterview />
          <Projects />
          <ProgressCTA />
        </main>

        <Footer />
      </div>
    </LazyMotion>
  );
}
