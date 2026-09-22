export const playSound = (type: 'glass' | 'draw' | 'paper') => {
  if (typeof window === 'undefined') return;
  
  // Using direct paths to the public folder
  const soundPaths = {
    glass: '/sounds/glass.mp3',   // Soft glass clink/pop for the lid
    draw: '/sounds/draw.mp3',     // Magical swoosh or chime for selecting a chit
    paper: '/sounds/paper.mp3'    // Crisp paper unfolding sound for the card
  };

  const audio = new Audio(soundPaths[type]);
  audio.volume = 0.4; // Keep it subtle and ambient
  
  audio.play().catch((err) => {
    console.log("Audio requires user interaction first:", err);
  });
};
