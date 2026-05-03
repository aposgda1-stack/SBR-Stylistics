import { NextResponse } from "next/server";
import { getGlossaryTerms } from "@/lib/contentService";

export async function GET() {
  const terms = getGlossaryTerms();
  return NextResponse.json(terms);
}
