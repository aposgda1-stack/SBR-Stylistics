import { NextResponse } from "next/server";
import { getQuizQuestions } from "@/lib/contentService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const quizId = searchParams.get("quizId");
  
  let questions = getQuizQuestions();
  
  if (quizId && quizId !== "general_quiz") {
    questions = questions.filter(q => q.quizId === quizId);
  } else if (quizId === "general_quiz" || !quizId) {
    // Shuffle and pick 10 questions for a general practice
    questions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
  }
  
  return NextResponse.json(questions);
}
