import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- Type Definitions (from types.ts) ---

interface Word {
  hebrew: string;
  transliteration: string;
  meaning: string;
}

interface Person extends Word {
  gender: 'male' | 'female';
}

interface Verb {
  male: string;
  female: string;
  meaning: string;
}

enum Category {
  Places = 'places',
  People = 'people',
  Sentences = 'sentences',
}

// --- Constants (from constants.ts) ---

const PLACES: Word[] = [
  { hebrew: 'יְרוּשָׁלַיִם', transliteration: 'Yerushalayim', meaning: 'Jerusalem' },
  { hebrew: 'תֵּל אָבִיב', transliteration: 'Tel Aviv', meaning: 'Tel Aviv' },
  { hebrew: 'חֵיפָה', transliteration: 'Haifa', meaning: 'Haifa' },
  { hebrew: 'יָם כִּנֶּרֶת', transliteration: 'Yam Kinneret', meaning: 'Sea of Galilee' },
  { hebrew: 'נְהַר הַיַּרְדֵּן', transliteration: 'Nahar HaYarden', meaning: 'Jordan River' },
  { hebrew: 'הַר סִינַי', transliteration: 'Har Sinai', meaning: 'Mount Sinai' },
  { hebrew: 'נָצְרַת', transliteration: 'Natzrat', meaning: 'Nazareth' },
  { hebrew: 'בֵּית לֶחֶם', transliteration: 'Beit Lechem', meaning: 'Bethlehem' },
  { hebrew: 'יַם הַמֶּלַח', transliteration: 'Yam HaMelach', meaning: 'The Dead Sea' },
  { hebrew: 'אֵילַת', transliteration: 'Eilat', meaning: 'Eilat' }
];

const PEOPLE: Person[] = [
  { hebrew: 'אַבְרָהָם', transliteration: 'Avraham', meaning: 'Abraham', gender: 'male' },
  { hebrew: 'שָׂרָה', transliteration: 'Sarah', meaning: 'Sarah', gender: 'female' },
  { hebrew: 'מֹשֶׁה', transliteration: 'Moshe', meaning: 'Moses', gender: 'male' },
  { hebrew: 'דָּוִד', transliteration: 'David', meaning: 'David', gender: 'male' },
  { hebrew: 'שְׁלֹמֹה', transliteration: 'Shlomo', meaning: 'Solomon', gender: 'male' },
  { hebrew: 'רָחֵל', transliteration: 'Rachel', meaning: 'Rachel', gender: 'female' },
  { hebrew: 'יִצְחָק', transliteration: 'Yitzhak', meaning: 'Isaac', gender: 'male' },
  { hebrew: 'יַעֲקֹב', transliteration: 'Yaakov', meaning: 'Jacob', gender: 'male' },
  { hebrew: 'רִבְקָה', transliteration: 'Rivka', meaning: 'Rebecca', gender: 'female' },
  { hebrew: 'לֵאָה', transliteration: 'Leah', meaning: 'Leah', gender: 'female' }
];

const VERBS: Verb[] = [
    { male: "אָהַב", female: "אָהֲבָה", meaning: "愛した" },
    { male: "פָּקַד", female: "פָּקְדָה", meaning: "訪れた" },
    { male: "רָאָה", female: "רָאֲתָה", meaning: "見た" },
    { male: "יָדַע", female: "יָדְעָה", meaning: "知っていた" }
];


// --- Speech Service (from services/speechService.ts) ---

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

const speak = (text: string) => {
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


// --- Icon Components ---

const ChevronLeftIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const SpeakerIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
);


// --- UI Components ---

interface CategorySelectorProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onSelectCategory }) => {
  const categories = [
    { id: Category.Places, label: 'Place Names' },
    { id: Category.People, label: 'Personal Names' },
    { id: Category.Sentences, label: 'Sentences' },
  ];

  return (
    <div className="flex justify-center bg-slate-800 rounded-lg p-1.5 shadow-inner">
      {categories.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onSelectCategory(id)}
          className={`w-full py-2.5 px-3 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 ${
            selectedCategory === id
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};


interface FlashcardProps {
  word: Word;
}

const Flashcard: React.FC<FlashcardProps> = ({ word }) => {
  const isSentence = word.hebrew.includes(' ');
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-8 text-center h-64 flex flex-col justify-center items-center ring-1 ring-white/10 animate-fade-in">
      <p lang="he" dir="rtl" className={`font-hebrew font-bold text-white mb-4 ${isSentence ? 'text-5xl leading-tight' : 'text-7xl'}`}>
        {word.hebrew}
      </p>
      {word.transliteration && (
          <p className="text-2xl text-indigo-400 font-medium tracking-wide">
            {word.transliteration}
          </p>
      )}
      <p className="text-lg text-slate-400 mt-2">
        ({word.meaning})
      </p>
    </div>
  );
};


interface ControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onSpeak: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onPrev, onNext, onSpeak }) => {
  return (
    <div className="grid grid-cols-3 gap-4 items-center">
      <button
        onClick={onPrev}
        aria-label="Previous word"
        className="flex items-center justify-center p-4 bg-slate-700 rounded-lg shadow-md hover:bg-slate-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500"
      >
        <ChevronLeftIcon />
      </button>

      <button
        onClick={onSpeak}
        aria-label="Speak word"
        className="flex items-center justify-center p-5 bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-500 transition-all duration-200 scale-100 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-400"
      >
        <SpeakerIcon />
      </button>
      
      <button
        onClick={onNext}
        aria-label="Next word"
        className="flex items-center justify-center p-4 bg-slate-700 rounded-lg shadow-md hover:bg-slate-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};


// --- Main App Component ---

const App: React.FC = () => {
  const [category, setCategory] = useState<Category>(Category.Places);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sentenceHistory, setSentenceHistory] = useState<Word[]>([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [speakOnNavigate, setSpeakOnNavigate] = useState(false);

  const wordLists = useMemo(() => ({
    [Category.Places]: PLACES,
    [Category.People]: PEOPLE,
  }), []);

  const generateRandomSentence = useCallback((): Word => {
    const subjects = PEOPLE;
    const objects: Word[] = [...PEOPLE, ...PLACES];
    
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const verb = VERBS[Math.floor(Math.random() * VERBS.length)];
    let object: Word;
    
    do {
      object = objects[Math.floor(Math.random() * objects.length)];
    } while (subject.hebrew === object.hebrew);
    
    const correctVerbForm = subject.gender === 'female' ? verb.female : verb.male;

    const hebrewSentence = `${subject.hebrew} ${correctVerbForm} אֶת ${object.hebrew}`;
    const japaneseSentence = `${subject.meaning}は${object.meaning}を${verb.meaning}。`;
    
    return {
      hebrew: hebrewSentence,
      transliteration: '',
      meaning: japaneseSentence,
    };
  }, []);

  useEffect(() => {
    // Initialize sentence history when switching to the sentences category for the first time
    if (category === Category.Sentences && sentenceHistory.length === 0) {
      setSentenceHistory([generateRandomSentence()]);
      setCurrentSentenceIndex(0);
    }
  }, [category, sentenceHistory.length, generateRandomSentence]);
  
  const currentWord = useMemo(() => {
    if (category === Category.Sentences) {
        return sentenceHistory[currentSentenceIndex];
    }
    return wordLists[category][currentIndex];
  }, [category, currentIndex, wordLists, sentenceHistory, currentSentenceIndex]);

  const handleSelectCategory = useCallback((newCategory: Category) => {
    setCategory(newCategory);
    if (newCategory !== Category.Sentences) {
      setCurrentIndex(0);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (category === Category.Sentences) {
      const nextIndex = currentSentenceIndex + 1;
      // If the next sentence doesn't exist in our history, generate and add it.
      if (nextIndex >= sentenceHistory.length) {
        setSentenceHistory(prev => [...prev, generateRandomSentence()]);
      }
      setCurrentSentenceIndex(nextIndex);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % wordLists[category].length);
    }
  }, [category, wordLists, generateRandomSentence, currentSentenceIndex, sentenceHistory.length]);

  const handlePrev = useCallback(() => {
    if (category === Category.Sentences) {
      setCurrentSentenceIndex((prevIndex) => Math.max(0, prevIndex - 1));
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + wordLists[category].length) % wordLists[category].length);
    }
  }, [category, wordLists]);

  const handleSpeak = useCallback(() => {
    if (currentWord) {
      speak(currentWord.hebrew);
    }
  }, [currentWord]);

  // Effect for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault();
        handleSpeak();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        setSpeakOnNavigate(true);
        handleNext();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handlePrev, handleSpeak]);

  // Effect to speak automatically on navigation
  useEffect(() => {
    if (speakOnNavigate && currentWord) {
      speak(currentWord.hebrew);
      setSpeakOnNavigate(false); // Reset the flag
    }
  }, [currentWord, speakOnNavigate]);


  if (!currentWord) return null;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-100">Hebrew Vocabulary</h1>
          <p className="text-indigo-400 mt-1">Proper Nouns, Verbs & Sentences</p>
        </header>

        <main className="flex flex-col gap-8">
          <CategorySelector
            selectedCategory={category}
            onSelectCategory={handleSelectCategory}
          />
          
          <Flashcard word={currentWord} key={currentWord.hebrew} />

          <Controls
            onPrev={handlePrev}
            onNext={handleNext}
            onSpeak={handleSpeak}
          />
        </main>
        
        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>Created for learning and practice. Audio by Web Speech API.</p>
        </footer>
      </div>
    </div>
  );
};


// --- React DOM Rendering ---

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);