import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { emotion } = await req.json();

    const prompt = `You are a compassionate, authentic Islamic counselor. A user is feeling "${emotion}". 
    Provide ONE strictly authentic verse from the Quran that brings comfort or guidance for this specific emotion.
    The advice provided MUST be grounded in the authentic Sunnah of Prophet Muhammad (PBUH) or established Islamic wisdom.
    
    Respond ONLY with a raw JSON object (no markdown, no backticks) in this exact format:
    {
      "arabic": "Exact Arabic text of the Quranic verse with proper diacritics (Tashkeel)",
      "english": "Accurate English translation",
      "urdu": "Accurate Urdu translation",
      "reference": "Surah Name, Verse Number",
      "advice": "One short, highly comforting sentence of practical advice based on the Sunnah."
    }`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "openai/gpt-oss-120b",
      temperature: 0.3, // Lowered for higher factual accuracy
    });

    const responseContent = completion.choices[0]?.message?.content || "{}";
    const parsedData = JSON.parse(responseContent);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to draw a verse. Please try again." },
      { status: 500 }
    );
  }
}
