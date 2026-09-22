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
    if (data) {
      playSound('paper');
    }
  }, [data]);
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-6">
        <motion.div 
          className={`w-20 h-24 rounded-lg shadow-[0_0_40px_rgba(255,255,255,0.4)] border-2 border-white/50 ${emotionStyles[emotion].split(' ')[0]}`}
          animate={{ rotateY: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="text-amber-200 animate-pulse font-medium tracking-widest uppercase text-sm">Unfolding guidance...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ rotateX: 90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
      className="w-full max-w-2xl bg-[#FDFBF7] rounded-sm p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden"
    >
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] pointer-events-none" />
      
      {/* Emotional Color Ribbon */}
      <div className={`absolute top-0 left-0 w-full h-3 ${emotionStyles[emotion].split(' ')[0]}`} />

      <button 
        onClick={onReset}
        className="absolute top-8 left-8 text-slate-400 hover:text-slate-800 transition-colors flex items-center gap-2 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Fold back
      </button>

      <div className="flex flex-col items-center text-center mt-8 mb-10">
        <Sparkles className={`w-8 h-8 mb-4 opacity-50 ${emotionStyles[emotion].replace('bg-', 'text-').split(' ')[0]}`} />
        <p className="text-slate-500 uppercase tracking-widest text-xs font-semibold">Addressing your {emotion}</p>
      </div>

      <div className="space-y-10">
        <div className="text-center space-y-4">
          <p className="font-arabic text-4xl md:text-5xl text-slate-800 leading-[1.8] drop-shadow-sm">{data.arabic}</p>
          <p className="text-sm font-medium text-amber-700/80 tracking-wide">{data.reference}</p>
        </div>

        <div className="flex flex-col gap-6 px-4 md:px-8 border-l-2 border-r-2 border-slate-200">
          <p className="font-sans text-lg text-slate-700 text-center leading-relaxed">
            "{data.english}"
          </p>
          <p className="font-urdu text-2xl text-slate-700 leading-loose text-center" dir="rtl">
            "{data.urdu}"
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200/60 text-center px-4">
          <p className="text-slate-600 font-medium text-lg leading-relaxed">
            <span className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Sunnah Guidance</span>
            {data.advice}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
