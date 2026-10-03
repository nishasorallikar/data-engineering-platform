import { LucideIcon } from 'lucide-react';

export type ArchitectureType = 'etl' | 'elt';

export interface StageConfig {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  details: string;
}
