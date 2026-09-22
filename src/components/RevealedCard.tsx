"use client";

import { motion } from "framer-motion";
import { emotionStyles } from "@/lib/data";
import { BookOpen } from "lucide-react";

export default function RevealedCard({ data, emotion }: { data: any, emotion: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel w-full rounded-2xl p-8 relative overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-2 h-full ${emotionStyles[emotion].split(' ')[0]}`} />
      
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="text-white/70 w-6 h-6" />
        <h3 className="text-xl font-medium text-white">Your Verse of {emotion}</h3>
      </div>

      <div className="space-y-6">
        <div className="text-right">
          <p className="font-arabic text-3xl md:text-4xl text-amber-200 leading-relaxed">{data.arabic}</p>
          <p className="text-sm text-slate-400 mt-2">{data.reference}</p>
        </div>

        <div className="bg-white/5 rounded-xl p-6 space-y-4">
          <p className="font-sans text-lg text-slate-100">{data.english}</p>
          <p className="font-urdu text-xl text-slate-200 leading-loose text-right" dir="rtl">{data.urdu}</p>
        </div>

        <div className="border-t border-white/10 pt-4">
          <p className="text-slate-300 text-sm md:text-base leading-relaxed italic">
            "{data.advice}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}
