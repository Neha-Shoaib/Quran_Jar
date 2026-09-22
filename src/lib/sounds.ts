export const playSound = (type: 'glass' | 'draw' | 'paper') => {
  if (typeof window === 'undefined') return;
  
  // Using direct paths to the public folder
  const soundPaths = {
    glass: '/sounds/glass.mp3',   // Soft glass clink/pop for the lid
    draw: '/sounds/draw.mp3',     // Magical swoosh or chime for selecting a chit
    paper: '/sounds/paper.mp3'    // Crisp paper unfolding sound for the card
  };

  const audio = new Audio(soundPaths[type]);
  audio.volume = type === 'paper' ? 0.3 : 0.5; // Keep it subtle and ambient
  
  audio.play().catch((err) => {
    console.log("Audio requires user interaction first:", err);
  });
  if (type === 'paper') {
    setTimeout(() => {
      let fadeOut = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume -= 0.05;
        } else {
          clearInterval(fadeOut);
          audio.pause();
          audio.currentTime = 0;
        }
      }, 50);
    }, 1500); 
  }
};
