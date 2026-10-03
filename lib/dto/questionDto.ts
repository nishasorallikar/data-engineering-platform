export interface QuestionDto {
  id: string;
  slug: string;
  questionNumber?: number;
  question: string;
  section: string;
  detailedExplanation?: string;
  interviewerAngle?: string;
  source: string;
  contentOrigin: string;
  difficulty?: string;
  type?: string;
}

export function toQuestionDto(doc: any): QuestionDto {
  return {
    id: doc.id,
    slug: doc.slug,
    questionNumber: doc.questionNumber,
    question: doc.question,
    section: doc.section,
    detailedExplanation: doc.detailedExplanation,
    interviewerAngle: doc.interviewerAngle,
    source: doc.source,
    contentOrigin: doc.contentOrigin,
    difficulty: doc.difficulty,
    type: doc.type,
  };
}
