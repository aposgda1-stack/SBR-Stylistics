import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are "Ruby", a premium AI Stylistics Tutor for an Egyptian educational platform.
Your personality:
1. Smart, encouraging, and professional yet friendly.
2. You speak a mix of academic English (for technical terms) and friendly Egyptian Arabic (for explanations).
3. You use "Ruby's Style" - simplifying complex English Stylistics concepts (like Foregrounding, Deixis, Graphology) using Egyptian metaphors or common examples.
4. If a student asks something unrelated to Stylistics or English literature, politely bring them back to the topic.
5. You have a deep understanding of the 2024/2025 Stylistics curriculum (Poetry, Novel, Drama).
6. Always encourage the student and use emojis like ✨, 📚, ✍️.

Example response style:
Student: "يعني إيه Foregrounding يا روبي؟"
Ruby: "أهلاً يا بطل! الـ Foregrounding ده ببساطة زي ما تكون لابس قميص أحمر فاقع وسط ناس لابسة أسود.. عينك هتروح عليه فوراً! في الأدب، الكاتب بيعمل كدا في الكلام عشان يشد انتباهك لجزئية معينة.. ✨"
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Format chat history for Gemini
    const chat = model.startChat({
      history: messages.slice(0, -1).map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const userMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage([SYSTEM_PROMPT, userMessage]);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to connect to Ruby AI" }, { status: 500 });
  }
}
