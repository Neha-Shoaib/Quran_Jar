"use client";

import { motion } from "framer-motion";
import { emotionColors } from "@/lib/data";

export default function QuranJar({ activeEmotion, isLoading }: { activeEmotion: string | null, isLoading: boolean }) {
  const chits = Object.keys(emotionColors);

  return (
    <div className="relative w-64 h-80 flex items-end justify-center">
      {/* The Jar Body */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-[40px] rounded-t-xl shadow-[0_0_50px_rgba(255,255,255,0.1)] overflow-hidden flex items-end justify-center pb-4">
        
        {/* The Chits Inside */}
        <div className="relative w-full h-3/4 flex flex-wrap justify-center content-end gap-2 p-4">
          {chits.map((emotion, i) => (
            <motion.div
              key={emotion}
              className="w-10 h-10 rounded-md shadow-lg"
              style={{ backgroundColor: emotionColors[emotion] }}
              animate={
                isLoading && activeEmotion === emotion 
                  ? { y: [-10, -100, -10], rotate: [0, 180, 360], scale: [1, 1.2, 1] }
                  : { y: [0, -5, 0], rotate: [-5, 5, -5] }
              }
              transition={{
                duration: isLoading && activeEmotion === emotion ? 2 : 3 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Jar Lid */}
      <div className="absolute -top-4 w-40 h-8 bg-slate-800 border-2 border-slate-600 rounded-lg shadow-xl" />
      <div className="absolute -top-6 w-32 h-3 bg-slate-700 rounded-t-md" />
    </div>
  );
}
