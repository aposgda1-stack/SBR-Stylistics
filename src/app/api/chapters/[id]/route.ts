import { NextResponse } from "next/server";
import { getChapterById } from "@/lib/contentService";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const chapter = getChapterById(id);
  if (!chapter) {
    return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
  }
  return NextResponse.json(chapter);
}
