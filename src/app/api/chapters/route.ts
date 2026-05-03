import { NextResponse } from "next/server";
import { getAllChapters } from "@/lib/contentService";

export async function GET() {
  const chapters = getAllChapters();
  return NextResponse.json(chapters);
}
