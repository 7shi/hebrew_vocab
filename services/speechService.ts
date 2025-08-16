let hebrewVoice: SpeechSynthesisVoice | null = null;

const loadHebrewVoice = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }
  
  if (hebrewVoice) return;

  const voices = window.speechSynthesis.getVoices();
  hebrewVoice = voices.find(voice => voice.lang === 'he-IL' || voice.lang.startsWith('he-')) || null;
};

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = loadHebrewVoice;
  // Initial load attempt
  loadHebrewVoice();
}

export const speak = (text: string) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.error("Web Speech API is not supported in this browser.");
    alert("Sorry, your browser does not support text-to-speech functionality.");
    return;
  }

  // Ensure voices are loaded, useful for browsers that don't fire onvoiceschanged promptly
  loadHebrewVoice();

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'he-IL';
  
  if (hebrewVoice) {
    utterance.voice = hebrewVoice;
  } else {
    console.warn("Hebrew (he-IL) voice not found. Using browser default.");
  }
  
  utterance.rate = 0.85;
  utterance.pitch = 1;
  
  window.speechSynthesis.speak(utterance);
};
