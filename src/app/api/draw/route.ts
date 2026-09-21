import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Initialize Groq client securely on the server
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { emotion } = await req.json();

    if (!emotion) {
      return NextResponse.json({ error: 'Emotion is required' }, { status: 400 });
    }

    const prompt = `You are an Islamic scholar and an empathetic counselor. 
    A user is feeling the emotion of "${emotion}". 
    Find a highly relevant verse from the Quran that offers comfort, perspective, or guidance for this specific feeling.
    
    You MUST respond with a raw JSON object and nothing else. No markdown, no intro text.
    Use this exact JSON structure:
    {
      "surah": "Name of the Surah (e.g., Al-Baqarah)",
      "ayatNumber": "Number of the Ayat (e.g., 2:286)",
      "arabic": "The Arabic text of the Ayat",
      "englishTranslation": "The authentic English translation",
      "urduTranslation": "The authentic Urdu translation",
      "advice": "A gentle, 2-sentence actionable advice connecting the verse to their current feeling of ${emotion}."
    }`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'openai/gpt-oss-120b',
      response_format: { type: 'json_object' }, // Forces reliable JSON output
      temperature: 0.7, // Adds slight variation so repeated emotions get different verses
    });

    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error("No content generated");
    }

    const verseData = JSON.parse(responseContent);
    return NextResponse.json(verseData);

  } catch (error) {
    console.error('Error fetching verse:', error);
    return NextResponse.json(
      { error: 'Failed to seek guidance. Please try again.' },
      { status: 500 }
    );
  }
}
