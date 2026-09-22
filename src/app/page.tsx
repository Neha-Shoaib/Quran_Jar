"use client";

import { useState } from "react";
import Legend from "@/components/Legend";
import QuranJar from "@/components/QuranJar";
import RevealedCard from "@/components/RevealedCard";

export default function Home() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verseData, setVerseData] = useState<any>(null);

  const handleEmotionSelect = async (emotion: string) => {
    setSelectedEmotion(emotion);
    setIsLoading(true);
    setVerseData(null);

    try {
      const response = await fetch("/api/draw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emotion }),
      });
      const data = await response.json();
      setVerseData(data);
    } catch (error) {
      console.error("Error fetching verse:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
      <div className="glass-panel w-full max-w-5xl p-8 rounded-3xl flex flex-col items-center gap-8 border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl">
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Digital Quran Jar</h1>
          <p className="text-slate-300 max-w-xl mx-auto">
            Select how you are feeling right now to draw a verse of comfort and guidance.
          </p>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-12 items-center justify-center mt-4">
          <div className="w-full md:w-1/3">
            <Legend onSelect={handleEmotionSelect} />
          </div>
          <div className="w-full md:w-1/3 flex justify-center min-h-[400px]">
            <QuranJar activeEmotion={selectedEmotion} isLoading={isLoading} />
          </div>
        </div>

        {verseData && (
          <div className="w-full max-w-3xl mt-8">
            <RevealedCard data={verseData} emotion={selectedEmotion!} />
          </div>
        )}

      </div>
    </main>
  );
}
