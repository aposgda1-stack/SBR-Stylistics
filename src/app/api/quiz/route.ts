import { NextResponse } from "next/server";
import { getQuizQuestions } from "@/lib/contentService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const quizId = searchParams.get("quizId");
  const chapterId = searchParams.get("chapterId");
  
  let questions = getQuizQuestions();
  
  if (quizId) {
    questions = questions.filter(q => q.quizId === quizId);
  } else if (chapterId) {
    questions = questions.filter(q => q.chapterId === chapterId);
  } else {
    // Shuffle and pick 20 questions for a general practice
    questions = questions.sort(() => 0.5 - Math.random()).slice(0, 20);
  }
  
  return NextResponse.json(questions);
}
