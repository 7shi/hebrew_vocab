
export const speak = (
  text: string,
  voice: SpeechSynthesisVoice | null,
  rate: number,
) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.error("Web Speech API is not supported in this browser.");
    alert("Sorry, your browser does not support text-to-speech functionality.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language for better pronunciation, even if a specific voice isn't found
  utterance.lang = 'he-IL';
  
  if (voice) {
    utterance.voice = voice;
  } else {
    console.warn("Speech synthesis voice not selected. Using browser default.");
  }
  
  utterance.rate = rate;
  utterance.pitch = 1;
  
  window.speechSynthesis.speak(utterance);
};
