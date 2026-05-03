import chaptersData from "@/data/chapters.json";
import quizData from "@/data/quiz-questions.json";
import examData from "@/data/exam-questions.json";
import glossaryData from "@/data/glossary.json";
import type { Chapter, QuizQuestion, ExamQuestion, GlossaryTerm, Lesson } from "@/types";

const chapters = chaptersData as Chapter[];
const quizQuestions = quizData as QuizQuestion[];
const examQuestions = examData as ExamQuestion[];
const glossaryTerms = glossaryData as GlossaryTerm[];

export function getAllChapters(): Chapter[] {
  return chapters;
}

export function getChapterById(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}

export function getLessonById(
  chapterId: string,
  lessonId: string
): Lesson | undefined {
  const chapter = getChapterById(chapterId);
  return chapter?.lessons.find((l) => l.id === lessonId);
}

export function getQuizQuestions(): QuizQuestion[] {
  return quizQuestions;
}

export function getQuizQuestion(id: string): QuizQuestion | undefined {
  return quizQuestions.find((q) => q.id === id);
}

export function getExamQuestions(): ExamQuestion[] {
  return examQuestions;
}

export function getGlossaryTerms(): GlossaryTerm[] {
  return glossaryTerms;
}

export function getGlossaryTerm(id: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.id === id);
}

export function getCourseStats() {
  const total = chapters.length;
  const completed = chapters.filter((c) => c.status === "completed").length;
  const inProgress = chapters.filter((c) => c.status === "in-progress").length;
  const progressPct = Math.round(
    ((completed + inProgress * 0.85) / total) * 100
  );
  return { total, completed, inProgress, progressPct };
}
