import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { emotion } = await req.json();

    const prompt = `You are a compassionate Islamic counselor. A user is feeling "${emotion}". 
    Provide ONE relevant verse from the Quran that brings comfort or guidance for this specific emotion.
    Respond ONLY with a raw JSON object (no markdown, no backticks) in this exact format:
    {
      "arabic": "Arabic text of the verse",
      "english": "English translation",
      "urdu": "Urdu translation",
      "reference": "Surah Name:Verse Number",
      "advice": "One short, comforting sentence of practical advice based on the verse."
    }`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "openai/gpt-oss-120b",
      temperature: 0.5,
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
