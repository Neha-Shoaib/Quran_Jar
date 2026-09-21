"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { emotionsData, Emotion, Verse } from "@/lib/data";
import Legend from "@/components/Legend";
import QuranJar from "@/components/QuranJar";
import RevealedCard from "@/components/RevealedCard";

export default function Home() {
  const [activeGlow, setActiveGlow] = useState<string>("transparent");
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDrawChit = async (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    setActiveGlow(emotion.hex);
    setIsLoading(true);
    setSelectedVerse(null); // Clear previous verse

    try {
      const response = await fetch('/api/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emotion: emotion.name }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const data: Verse = await response.json();
      setSelectedVerse(data);
    } catch (error) {
      console.error("Failed to fetch verse:", error);
      // Fallback verse in case the API hits a limit or fails
      setSelectedVerse({
        surah: "Ash-Sharh",
        ayatNumber: "94:5",
        arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
        englishTranslation: "For indeed, with hardship [will be] ease.",
        urduTranslation: "پس بے شک ہر مشکل کے ساتھ آسانی ہے۔",
        advice: "Take a deep breath. Even in this moment, ease is traveling alongside you."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setSelectedEmotion(null);
    setSelectedVerse(null);
    setActiveGlow("transparent");
    setIsLoading(false);
  };

  return (
    <motion.main
      className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center p-6 gap-12 transition-colors duration-1000 ease-in-out"
      animate={{
        backgroundColor: activeGlow !== "transparent" ? `${activeGlow}15` : "transparent"
      }}
    >
      <motion.div
        className="fixed inset-0 pointer-events-none blur-[120px] opacity-30 z-0 transition-colors duration-1000"
        animate={{ backgroundColor: activeGlow }}
      />

      <div className="z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-12 md:gap-24">
        <div className="relative w-full max-w-sm flex items-center justify-center">
          <QuranJar 
            emotions={emotionsData} 
            onDraw={handleDrawChit} 
            isCardOpen={!!selectedEmotion}
          />
        </div>

        <div className="w-full max-w-sm">
          <Legend emotions={emotionsData} />
        </div>
      </div>

      <AnimatePresence>
        {selectedEmotion && (
          <RevealedCard
            emotion={selectedEmotion}
            verse={selectedVerse}
            isLoading={isLoading}
            onClose={handleDismiss}
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
}
