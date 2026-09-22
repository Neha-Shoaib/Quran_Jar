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
  
  // Generate 40 random chits to fill the jar
  const jarContents = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    emotion: emotions[i % emotions.length],
    color: emotionColors[emotions[i % emotions.length]],
    left: `${Math.random() * 80 + 10}%`,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 2,
  }));

  const isOpen = jarState === "open";

  return (
    <div className="relative w-72 h-[400px] flex flex-col items-center justify-end mt-12 cursor-pointer group">
      
      {/* The Glow Behind the Jar */}
      <div className={`absolute bottom-0 w-64 h-64 bg-amber-500/20 blur-[80px] rounded-full transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-40'}`} />

      {/* The Lid (Cork) */}
      <motion.div
        className="absolute z-20 w-32 h-14 bg-gradient-to-r from-yellow-900 via-amber-800 to-yellow-900 rounded-lg shadow-2xl border-b border-amber-950 flex items-center justify-center cursor-pointer"
        initial={{ top: "0%", rotate: 0 }}
        animate={isOpen ? { top: "-30%", rotate: -25, x: -100, opacity: 0 } : { top: "4%", rotate: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 1 }}
        onClick={(e) => {
          e.stopPropagation();
          if (!isOpen) {
            playSound('glass');
            setJarState("open");
          }
        }}
      >
        <div className="w-full h-2 bg-black/20 absolute bottom-0 rounded-b-lg" />
        <div className="w-24 h-4 bg-yellow-950/40 rounded-full absolute -top-2" />
      </motion.div>

      {/* Jar Neck */}
      <div className="absolute top-[8%] z-10 w-28 h-8 bg-white/20 backdrop-blur-md border-x-4 border-white/40 rounded-t-lg" />

      {/* Glass Body */}
      <div 
        className="relative z-10 w-full h-[85%] bg-gradient-to-b from-white/10 via-white/5 to-white/10 backdrop-blur-md border-[3px] border-white/30 rounded-[60px] rounded-t-[30px] shadow-[inset_0_0_50px_rgba(255,255,255,0.2),_0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        onClick={() => { if (!isOpen) setJarState("open") }}
      >
        {/* Glass reflection highlight */}
        <div className="absolute top-4 left-4 w-12 h-64 bg-white/10 rounded-full blur-md transform -rotate-12" />

        {/* The Chits Inside */}
        <div className="absolute bottom-4 left-0 w-full h-3/4 p-6 relative">
          {jarContents.map((chit) => (
            <motion.div
              key={chit.id}
              className={`absolute w-12 h-14 rounded-md shadow-lg border border-white/20 flex items-center justify-center transform transition-transform ${isOpen ? 'hover:scale-125 hover:z-50 cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]' : 'cursor-default'}`}
              style={{ backgroundColor: chit.color, left: chit.left }}
              animate={{ 
                y: isOpen ? [0, -10, 0] : [0, -5, 0],
                rotate: isOpen ? [-5, 5, -5] : [-2, 2, -2],
                bottom: `${(chit.id % 5) * 15}%` 
              }}
              transition={{
                duration: chit.duration,
                delay: chit.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (isOpen){
                  playSound('draw');
                  onDraw(chit.emotion);
                }
              }}
            >
              {/* Fold lines to make it look like folded paper */}
              <div className="w-full h-[1px] bg-black/10 absolute top-1/2" />
              <div className="w-[1px] h-full bg-black/10 absolute left-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
