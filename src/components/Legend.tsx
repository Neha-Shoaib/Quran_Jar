"use client";

import { emotionStyles } from "@/lib/data";

export default function Legend() {
  const emotions = Object.keys(emotionStyles);

  return (
    <div className="w-full flex flex-col gap-5 bg-white/5 p-6 rounded-3xl border border-white/10 shadow-inner">
      <h2 className="text-xl font-medium text-white mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        Color Guide
      </h2>
      <div className="flex flex-col gap-3">
        {emotions.map((emotion) => (
          <div key={emotion} className="flex items-center gap-4 group">
            <div className={`w-8 h-8 rounded-lg shadow-md border border-white/20 transform transition-transform group-hover:scale-110 ${emotionStyles[emotion].split(' ')[0]}`} />
            <span className="text-slate-200 font-medium tracking-wide">{emotion}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
