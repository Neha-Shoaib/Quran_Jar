export type Verse = {
  surah: string;
  ayatNumber: string;
  arabic: string;
  englishTranslation: string;
  urduTranslation: string;
  advice: string;
};

export type Emotion = {
  id: string;
  name: string;
  colorCode: string;
  hex: string;
};

// We stripped the hardcoded verses out. AI handles it now.
export const emotionsData: Emotion[] = [
  { id: "happiness", name: "Happiness", colorCode: "bg-jarHappiness", hex: "#FCD34D" },
  { id: "grief", name: "Grief", colorCode: "bg-jarGrief", hex: "#312E81" },
  { id: "sorrow", name: "Sorrow", colorCode: "bg-jarSorrow", hex: "#64748B" },
  { id: "pain", name: "Pain", colorCode: "bg-jarPain", hex: "#9F1239" },
  { id: "disappointment", name: "Disappointment", colorCode: "bg-jarDisappointment", hex: "#94A3B8" },
  { id: "sadness", name: "Sadness", colorCode: "bg-jarSadness", hex: "#0F766E" },
  { id: "anxious", name: "Anxious", colorCode: "bg-jarAnxious", hex: "#86EFAC" },
  { id: "anger", name: "Anger", colorCode: "bg-jarAnger", hex: "#EA580C" },
  { id: "hope", name: "Hope", colorCode: "bg-jarHope", hex: "#10B981" },
  { id: "gratitude", name: "Gratitude", colorCode: "bg-jarGratitude", hex: "#C084FC" }
];
