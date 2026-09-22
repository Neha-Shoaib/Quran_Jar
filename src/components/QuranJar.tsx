"use client";

import { motion } from "framer-motion";
import { emotionColors } from "@/lib/data";
import type { JarState } from "@/app/page";
import { playSound } from "@/lib/sounds";

interface QuranJarProps {
  jarState: JarState;
  setJarState: (state: JarState) => void;
  onDraw: (emotion: string) => void;
}

export default function QuranJar({ jarState, setJarState, onDraw }: QuranJarProps) {
  const emotions = Object.keys(emotionColors);
  const totalChits = 150;
  
const jarContents = Array.from({ length: totalChits }).map((_, i) => {
    const emotionIndex = (i * 7) % emotions.length; 
    
    const row = Math.floor(i / 10); // 15 rows (0 to 14)
    const col = i % 10; // 10 columns (0 to 9)

    const leftPos = (col / 9) * 70 + 10 + (Math.random() * 4 - 2);
    
    const bottomPos = (row / 14) * 73 + 2 + (Math.random() * 3);

    return {
      id: i,
      emotion: emotions[emotionIndex],
      color: emotionColors[emotions[emotionIndex]],
      left: `${leftPos}%`,
      bottom: `${bottomPos}%`,
      delay: Math.random() * 4,
      duration: Math.random() * 4 + 6, // بہت سلو موومنٹ
      initialRotate: Math.random() * 360,
    };
  });
  const isOpen = jarState === "open";

  return (
    // Scaled down dimensions for laptop screens (w-56, h-[320px])
    <div className="relative w-56 h-[320px] md:w-64 md:h-[350px] flex flex-col items-center justify-end mt-8 cursor-pointer group">
      
      <div className={`absolute bottom-0 w-64 h-64 bg-amber-500/20 blur-[80px] rounded-full transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-40'}`} />

      {/* Highly detailed Cork Lid */}
      <motion.div
        className="absolute z-30 w-28 h-12 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-amber-800 rounded-lg shadow-2xl border-b-[3px] border-amber-950 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
        initial={{ top: "0%", rotate: 0 }}
        animate={isOpen ? { top: "-30%", rotate: -25, x: -100, opacity: 0 } : { top: "3%", rotate: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 1 }}
        onClick={(e) => {
          e.stopPropagation();
          if (!isOpen) {
            playSound('glass');
            setJarState("open");
          }
        }}
      >
        {/* Cork texture rings */}
        <div className="w-full h-1 bg-black/20 absolute top-2" />
        <div className="w-full h-1 bg-black/20 absolute top-6" />
        <div className="w-full h-3 bg-black/40 absolute bottom-0" />
      </motion.div>

      {/* Elegant Gold Rim and Jar Neck */}
      <div className="absolute top-[9%] z-20 w-24 h-6 bg-white/20 backdrop-blur-md border-x-4 border-white/40 rounded-t-lg shadow-[0_-2px_10px_rgba(251,191,36,0.5)] border-t-[3px] border-t-amber-300" />

      {/* Thick Glass Body */}
      <div 
        className="relative z-10 w-full h-[85%] bg-gradient-to-b from-white/10 via-white/5 to-blue-300/10 backdrop-blur-md border-[4px] border-white/40 rounded-[50px] rounded-t-[25px] shadow-[inset_0_0_40px_rgba(255,255,255,0.3),_0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        onClick={() => { 
          if (!isOpen) {
            playSound('glass');
            setJarState("open");
          } 
        }}
      >
        {/* Primary Glass Reflection */}
        <div className="absolute top-2 left-2 w-10 h-[90%] bg-gradient-to-b from-white/30 to-transparent rounded-full blur-[2px] transform -rotate-6 pointer-events-none" />
        {/* Secondary Edge Reflection */}
        <div className="absolute top-10 right-2 w-3 h-1/2 bg-white/20 rounded-full blur-[1px] pointer-events-none" />

        <div className="absolute bottom-4 left-0 w-full h-[80%] p-5 relative">
          {jarContents.map((chit) => (
            <motion.div
              key={chit.id}
              className={`absolute w-10 h-12 rounded-sm shadow-md border border-white/30 flex items-center justify-center transform transition-all ${isOpen ? 'hover:scale-125 hover:z-50 cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]' : 'cursor-default'}`}
              style={{ backgroundColor: chit.color, left: chit.left }}
              animate={{ 
                y: isOpen ? [0, -15, 0] : [0, -5, 0],
                rotate: isOpen ? [-10, 10, -10] : [-3, 3, -3],
                bottom: `${(chit.id % 5) * 18}%` 
              }}
              transition={{
                duration: chit.duration,
                delay: chit.delay,
                repeat: Infinity,
                ease: "easeInOut" // Smooth floating
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (isOpen) {
                  onDraw(chit.emotion);
                }
              }}
            >
              <div className="w-full h-[1px] bg-black/15 absolute top-1/2" />
              <div className="w-[1px] h-full bg-black/15 absolute left-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
