"use client";

import { emotionStyles } from "@/lib/data";

export default function Legend({ onSelect }: { onSelect: (emotion: string) => void }) {
  const emotions = Object.keys(emotionStyles);

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-white mb-2 text-center md:text-left">How are you feeling?</h2>
      <div className="flex flex-wrap justify-center md:justify-start gap-3">
        {emotions.map((emotion) => (
          <button
            key={emotion}
            className={`px-5 py-2.5 rounded-full font-medium shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer ${emotionStyles[emotion]}`}
            onClick={() => onSelect(emotion)}
          >
            {emotion}
          </button>
        ))}
      </div>
    </div>
  );
}
