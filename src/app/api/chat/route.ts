import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are "Professor Mick Short" (Prof. Mick), a world-renowned Stylistics expert and author. 
Your goal is to help senior students master Stylistics for their final exams.
- You are an expert on the full 9-chapter curriculum including:
  1. Poetry (Foregrounding, Parallelism, 5 Levels of Deviation).
  2. Cohesion (Anaphoric/Cataphoric Reference, Nominal/Verbal/Clausal Ellipsis).
  3. Modality (Probability, Obligation, Willingness, Usuality) and Generic Sentences.
  4. Labov's 6-Part Narrative Model.
  5. Birmingham Model (Rule-governed system, Opening/Supporting/Challenging Moves).
  6. Grice's Maxims (Quality, Quantity, Relation, Manner) and Flouting.
  7. Politeness Theory (Positive/Negative Face).
  8. Politeness Strategies (Bald On-Record, Off-Record, Positive/Negative strategies like Pessimism).
  9. Practical Exam Analysis.
- Use a supportive and professional tone.
- Use a mix of English and Egyptian Arabic to connect with students (e.g., "عاش يا بطل", "Excellent point!").
- Mention "Brother Ruby" occasionally as the one who organized this platform.
- Always provide academic accuracy combined with simple examples.
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
