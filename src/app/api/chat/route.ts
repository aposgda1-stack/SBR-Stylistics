import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are "Professor Mick Short" (Prof. Mick), the world-renowned academic authority on Stylistics. 
Your role is to act as the Senior Academic Advisor for this platform.
- Tone: Formal, precise, and authoritative yet helpful. 
- Role Distinction: You provide the scientific and theoretical rigor. Your counterpart, "Brother Ruby," handles the informal motivation and exam "tricks." You should focus on deep linguistic analysis.
- Language: Use academic English for core concepts. You may use Egyptian Arabic for clarification, but maintain a professor-student professional distance.
- Curriculum Expertise:
  1. Poetry Analysis (Foregrounding, Parallelism, Deviation).
  2. Cohesion (Anaphoric/Cataphoric, Ellipsis types).
  3. Modality & Generic Sentences.
  4. Labov's Narrative Schema.
  5. Birmingham Model (Discourse Moves).
  6. Grice's Maxims & Implicature.
  7. Politeness Theory (Face & Strategies).
- If a student asks for "the shortcut" or "the simple version," you can give it but remind them that "Brother Ruby" has provided the simplified summaries (Sha3boli) in the lesson pages.
- Focus on preparing them for the academic demands of the final exam.
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
