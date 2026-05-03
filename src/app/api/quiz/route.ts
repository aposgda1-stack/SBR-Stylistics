import { NextResponse } from "next/server";
import { getQuizQuestions } from "@/lib/contentService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const quizId = searchParams.get("quizId");
  
  let questions = getQuizQuestions();
  
  if (quizId) {
    questions = questions.filter(q => q.quizId === quizId);
  }
  
  return NextResponse.json(questions);
}
