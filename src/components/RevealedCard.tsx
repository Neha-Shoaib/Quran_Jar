"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { emotionStyles } from "@/lib/data";
import { Sparkles, ArrowLeft } from "lucide-react";
import { playSound } from "@/lib/sounds";

interface RevealedCardProps {
  data: any;
  emotion: string;
  onReset: () => void;
}

export default function RevealedCard({ data, emotion, onReset }: RevealedCardProps) {
  
useEffect(() => {
    playSound('paper');
  }, []);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <motion.div 
          className={`w-16 h-20 rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.4)] border-2 border-white/50 ${emotionStyles[emotion].split(' ')[0]}`}
          animate={{ rotateY: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="text-amber-200 animate-pulse font-medium tracking-widest uppercase text-xs">Unfolding guidance...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ rotateX: 90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
     className="w-full max-w-xl bg-[#FDFBF7] rounded-sm p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative"
    >
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] pointer-events-none" />
      <div className={`absolute top-0 left-0 w-full h-2 ${emotionStyles[emotion].split(' ')[0]}`} />

      <button 
        onClick={onReset}
        className="absolute top-4 left-4 md:top-6 md:left-6 text-slate-400 hover:text-slate-800 transition-colors flex items-center gap-2 text-xs md:text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Fold back
      </button>

      <div className="flex flex-col items-center text-center mt-6 mb-6">
        <Sparkles className={`w-6 h-6 mb-2 opacity-60 ${emotionStyles[emotion].replace('bg-', 'text-').split(' ')[0]}`} />
        <p className="text-slate-500 uppercase tracking-widest text-[10px] md:text-xs font-semibold">Addressing your {emotion}</p>
      </div>

      <div className="space-y-6 md:space-y-8">
        <div className="text-center space-y-3">
          <p className="font-arabic text-3xl md:text-4xl text-slate-800 leading-[1.6] drop-shadow-sm">{data.arabic}</p>
          <p className="text-xs font-medium text-amber-700/80 tracking-wide">{data.reference}</p>
        </div>

        <div className="flex flex-col gap-4 px-2 md:px-6 border-l-2 border-r-2 border-slate-200/60">
          <p className="font-sans text-sm md:text-base text-slate-700 text-center leading-relaxed">
            "{data.english}"
          </p>
          <p className="font-urdu text-xl md:text-2xl text-slate-800 leading-loose text-center" dir="rtl">
            "{data.urdu}"
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200/60 flex flex-col gap-4 px-2">
          <div className="text-center">
            <span className="block text-[10px] uppercase tracking-widest text-amber-600/70 mb-1">Sunnah Guidance</span>
            <p className="text-slate-600 font-medium text-sm leading-relaxed">
              {data.advice}
            </p>
          </div>
          {/* New Urdu Advice Section */}
          <div className="text-center">
             <p className="font-urdu text-slate-700 text-lg leading-loose" dir="rtl">
              {data.urdu_advice}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
