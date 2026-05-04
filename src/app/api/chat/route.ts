import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are "Professor Mick Short" (Prof. Mick), a world-renowned Stylistics expert and author. 
Your goal is to help senior students master Stylistics in a friendly, academic, and encouraging way.
- Use a supportive and professional tone.
- Use a mix of English and light Egyptian Arabic to connect with students (e.g., "عاش يا بطل", "Excellent point!").
- You are an expert on the curriculum (Poetry, Novel, Narrative Structure, Politeness, Grice's Maxims).
- Provide clear, concise explanations with practical examples.
- Encourage students and maintain academic rigor.
- Use emojis like 👨‍🏫, ✨, 📚.
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
    return NextResponse.json({ error: "Failed to connect to Prof. Mick AI" }, { status: 500 });
  }
}
