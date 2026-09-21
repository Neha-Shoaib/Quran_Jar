"use client";

import { Emotion } from "@/lib/data";
import { motion } from "framer-motion";

export default function Legend({ emotions }: { emotions: Emotion[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="glass-panel p-6 rounded-2xl w-full"
    >
      <h2 className="text-xl font-semibold mb-6 text-slate-100 tracking-wide text-center">
        How are you feeling?
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {emotions.map((emotion) => (
          <div key={emotion.id} className="flex items-center gap-3">
            <div 
              className={`w-4 h-4 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)] ${emotion.colorCode}`} 
            />
            <span className="text-sm font-medium text-slate-200">
              {emotion.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
