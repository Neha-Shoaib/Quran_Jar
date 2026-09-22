"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Legend from "@/components/Legend";
import QuranJar from "@/components/QuranJar";
import RevealedCard from "@/components/RevealedCard";

export type JarState = "closed" | "open" | "reading";

export default function Home() {
  const [jarState, setJarState] = useState<JarState>("closed");
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [verseData, setVerseData] = useState<any>(null);

  const handleChitSelect = async (emotion: string) => {
    setJarState("reading");
    setSelectedEmotion(emotion);
    setVerseData(null); // Reset while loading

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
      setJarState("open"); // Revert if failed
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative z-10 overflow-hidden">
      
      {/* Floating magical particles in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
            initial={{ 
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
              opacity: Math.random() * 0.5 + 0.1 
            }}
            animate={{ 
              y: [null, Math.random() * -200],
              opacity: [null, 0.8, 0] 
            }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div className="glass-panel w-full max-w-6xl p-8 rounded-[40px] flex flex-col items-center gap-8 border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl relative z-10">
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-white tracking-tight drop-shadow-md">
            Digital Quran Jar
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto h-6">
            {jarState === "closed" && "Tap the jar to open it."}
            {jarState === "open" && "Match your emotion to a color, and draw a chit."}
            {jarState === "reading" && !verseData && "Drawing guidance..."}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row w-full gap-12 items-center justify-center mt-4">
          
          <AnimatePresence mode="wait">
            {jarState !== "reading" && (
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50, width: 0, overflow: 'hidden' }}
                className="w-full lg:w-1/4"
              >
                <Legend />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full lg:w-1/2 flex justify-center min-h-[500px] relative">
            <AnimatePresence mode="wait">
              {jarState !== "reading" ? (
                <motion.div
                  key="jar"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
                  className="w-full flex justify-center"
                >
                  <QuranJar 
                    jarState={jarState} 
                    setJarState={setJarState} 
                    onDraw={handleChitSelect} 
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="card"
                  initial={{ scale: 0.5, y: 100, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  className="w-full flex justify-center"
                >
                  <RevealedCard 
                    data={verseData} 
                    emotion={selectedEmotion!} 
                    onReset={() => setJarState("open")} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
