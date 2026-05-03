import { NextResponse } from "next/server";
import { getExamQuestions } from "@/lib/contentService";

export async function GET() {
  const questions = getExamQuestions();
  return NextResponse.json(questions);
}
