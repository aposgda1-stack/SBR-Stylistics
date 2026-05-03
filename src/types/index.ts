export interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  status: "completed" | "in-progress" | "locked";
  progress?: number;
  completedAgo?: string;
  estimatedHours?: number;
  lessons: Lesson[];
  examId?: string;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  content: LessonContent[];
  nextLesson?: string;
  prevLesson?: string;
  quizId?: string;
  rubyTip?: string;
}

export interface LessonContent {
  type: "definition" | "text" | "quote" | "analysis" | "image-text" | "theoretical";
  heading?: string;
  body?: string;
  quote?: string;
  attribution?: string;
  arabicExplanation?: string;
  steps?: { label: string; body: string; arabicExplanation?: string }[];
  imageAlt?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  type?: "theoretical" | "applied";
  quizId?: string;
}

export interface ExamQuestion {
  id: string;
  question: string;
  passage?: string;
  options: string[];
  correctIndex: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  arabic: string;
  pronunciation?: string;
  partOfSpeech?: string;
  examples?: { text: string; source: string; note?: string }[];
  scholarNote?: string;
  chapterRef?: string;
  etymology?: string;
  function?: string;
}
