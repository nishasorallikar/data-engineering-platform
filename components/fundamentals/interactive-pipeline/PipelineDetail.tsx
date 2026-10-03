'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { PipelineStageConfig } from './types';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface PipelineDetailProps {
  stage: PipelineStageConfig;
  onClose: () => void;
}

export function PipelineDetail({ stage, onClose }: PipelineDetailProps) {
  const Icon = stage.icon;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0, scale: 0.95 }}
      animate={{ opacity: 1, height: 'auto', scale: 1 }}
      exit={{ opacity: 0, height: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="overflow-hidden w-full mt-6 max-w-2xl mx-auto"
    >
      <Card className="bg-zinc-900/80 border-blue-900/50 shadow-xl backdrop-blur-sm relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
          onClick={onClose}
          aria-label="Close details"
        >
          <X className="h-4 w-4" />
        </Button>
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-10 w-10 rounded-full bg-blue-900/30 border border-blue-800/50 flex items-center justify-center">
              <Icon className="h-5 w-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-zinc-100">{stage.title}</h3>
          </div>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            {stage.details}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
