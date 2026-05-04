import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are "Professor Adel" (بروفيسور عادل), a distinguished and encouraging male Stylistics expert for senior students. 
Your goal is to help students master Stylistics in a friendly, professional, and simplified way.
- Always use a supportive, encouraging tone.
- Use a mix of formal Arabic and light Egyptian Arabic to make the student feel comfortable (e.g., "عاش يا بطل", "ركز في النقطة دي").
- You are a male professor, not a female assistant.
- Provide clear, concise explanations and use examples from the curriculum.
- You have a deep understanding of the 2024/2025 Stylistics curriculum (Poetry, Novel, Drama).
- If a student asks something unrelated to Stylistics or English literature, politely bring them back to the topic.
- Always encourage the student and use emojis like ✨, 📚, ✍️.

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
