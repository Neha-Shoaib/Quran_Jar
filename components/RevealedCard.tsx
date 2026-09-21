"use client";

import { motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { Emotion, Verse } from "@/lib/data";

interface RevealedCardProps {
  emotion: Emotion;
  verse: Verse | null;
  isLoading: boolean;
  onClose: () => void;
}

export default function RevealedCard({ emotion, verse, isLoading, onClose }: RevealedCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        layoutId="drawn-chit"
        initial={{ y: 100, scale: 0.8, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 100, scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className="relative w-full max-w-xl bg-slate-900/95 border border-white/20 shadow-2xl rounded-2xl p-8 my-8 md:p-10 text-center flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className={`absolute top-0 left-0 right-0 h-3 rounded-t-2xl ${emotion.colorCode} shadow-[0_0_20px_var(--emotion-color)]`} 
          style={{ '--emotion-color': emotion.hex } as React.CSSProperties}
        />

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex justify-center mb-6">
          <span 
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{ backgroundColor: `${emotion.hex}20`, color: emotion.hex }}
          >
            {emotion.name}
          </span>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 opacity-60" style={{ color: emotion.hex }} />
            </motion.div>
            <p className="text-slate-400 animate-pulse text-sm">Seeking guidance for your heart...</p>
          </div>
        ) : verse ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-6"
          >
            <p className="text-3xl md:text-4xl font-arabic font-bold text-slate-100 leading-relaxed pt-4">
              {verse.arabic}
            </p>
            
            <div className="w-16 h-px bg-white/20 mx-auto my-6" />

            <div className="space-y-4">
              <p className="text-lg md:text-xl text-slate-300 font-light italic">
                "{verse.englishTranslation}"
              </p>
              
              <p className="text-xl md:text-2xl text-slate-200 font-urdu leading-loose" dir="rtl">
                {verse.urduTranslation}
              </p>
            </div>
            
            <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider pt-2">
              Surah {verse.surah} | Ayat {verse.ayatNumber}
            </p>

            <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10 text-slate-200">
              <h3 className="text-xs font-semibold uppercase text-slate-400 mb-3 tracking-widest">Reflection & Action</h3>
              <p className="text-sm leading-relaxed">
                {verse.advice}
              </p>
            </div>
          </motion.div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
