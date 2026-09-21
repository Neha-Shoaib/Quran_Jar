"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Emotion } from "@/lib/data";

interface QuranJarProps {
  emotions: Emotion[];
  onDraw: (emotion: Emotion) => void;
  isCardOpen: boolean;
}

export default function QuranJar({ emotions, onDraw, isCardOpen }: QuranJarProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate 40 random chits based on our emotions for visual bulk
  const generateChits = () => {
    let chits = [];
    for (let i = 0; i < 40; i++) {
      const emotion = emotions[i % emotions.length];
      chits.push({
        id: `chit-${i}`,
        emotion,
        rotation: Math.random() * 360,
        x: Math.random() * 160 - 80, // Spread inside jar width
        y: Math.random() * 140 - 70, // Spread inside jar height
      });
    }
    // Shuffle
    return chits.sort(() => Math.random() - 0.5);
  };

  const [visualChits] = useState(generateChits());

  return (
    <div 
      className="relative flex flex-col items-center justify-center cursor-pointer group"
      onMouseEnter={() => !isCardOpen && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The Cork / Lid */}
      <motion.div 
        className="w-32 h-8 bg-amber-900/80 rounded-t-xl rounded-b-md z-20 shadow-lg border-t border-amber-700/50 backdrop-blur-sm"
        animate={{ 
          y: isHovered ? -20 : 0,
          rotateZ: isHovered ? -5 : 0 
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Lid Knob */}
        <div className="w-12 h-4 bg-amber-950/80 rounded-t-lg mx-auto -mt-4" />
      </motion.div>

      {/* The Glass Jar Body */}
      <div className="relative w-64 h-72 glass-panel rounded-b-[3rem] rounded-t-2xl -mt-2 z-10 overflow-hidden flex items-center justify-center p-4">
        {/* Jar highlights to simulate glass */}
        <div className="absolute inset-y-0 left-4 w-4 bg-white/10 rounded-full blur-sm" />
        <div className="absolute inset-x-0 bottom-4 h-4 bg-white/10 rounded-full blur-sm" />

        {/* The Chits Inside */}
        <div className="relative w-full h-full flex items-center justify-center pt-8">
          {visualChits.map((chit, index) => (
            <motion.div
              key={chit.id}
              onClick={() => {
                setIsHovered(false);
                onDraw(chit.emotion);
              }}
              animate={{
                x: chit.x + (isHovered ? (Math.random() * 10 - 5) : 0),
                y: chit.y + (isHovered ? (Math.random() * 10 - 5) : 0),
                rotate: chit.rotation + (isHovered ? (Math.random() * 20 - 10) : 0),
                scale: isHovered ? 1.05 : 1
              }}
              whileHover={{ scale: 1.2, zIndex: 50 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className={`absolute w-12 h-6 rounded-md shadow-md cursor-pointer ${chit.emotion.colorCode} border border-white/30`}
              style={{ zIndex: index }}
            />
          ))}
        </div>
      </div>
      
      {/* Magical Glow underneath the jar */}
      <div className="w-48 h-8 bg-black/40 blur-xl mt-4 rounded-full" />
    </div>
  );
}
