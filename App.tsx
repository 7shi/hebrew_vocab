
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { CategorySelector } from './components/CategorySelector.tsx';
import { Flashcard } from './components/Flashcard.tsx';
import { Controls } from './components/Controls.tsx';
import { PLACES, PEOPLE, VERBS, MEN, WOMEN } from './constants.ts';
import { speak } from './services/speechService.ts';
import { Category, VerbType } from './types.ts';
import type { Word, Person, Place } from './types.ts';

export const App: React.FC = () => {
  const [category, setCategory] = useState<Category>(Category.Places);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sentenceHistory, setSentenceHistory] = useState<Word[]>([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [speakOnNavigate, setSpeakOnNavigate] = useState(false);

  const wordLists: Record<Exclude<Category, Category.Sentences>, Word[]> = useMemo(() => ({
    [Category.Places]: PLACES,
    [Category.Men]: MEN,
    [Category.Women]: WOMEN,
    [Category.Verbs]: VERBS.map(verb => ({
      hebrew: `${verb.male} / ${verb.female}`,
      transliteration: `${verb.transliteration_male} / ${verb.transliteration_female}`,
      meaning: verb.meaning
    }))
  }), []);

  const generateRandomSentence = useCallback((): Word => {
    const verb = VERBS[Math.floor(Math.random() * VERBS.length)];
    const subject = PEOPLE[Math.floor(Math.random() * PEOPLE.length)];
    
    const correctVerbForm = subject.gender === 'female' ? verb.female : verb.male;
    const correctVerbTransliteration = subject.gender === 'female' ? verb.transliteration_female : verb.transliteration_male;

    let hebrewSentence = '';
    let englishSentence = '';
    let transliterationSentence = '';

    switch (verb.type) {
      case VerbType.Intransitive: {
        hebrewSentence = `${subject.hebrew} ${correctVerbForm}`;
        transliterationSentence = `${subject.transliteration} ${correctVerbTransliteration}`;
        englishSentence = `${subject.meaning} ${verb.meaning}.`;
        break;
      }
      case VerbType.Transitive: {
        let object: Person;
        do {
          object = PEOPLE[Math.floor(Math.random() * PEOPLE.length)];
        } while (subject.hebrew === object.hebrew);

        hebrewSentence = `${subject.hebrew} ${correctVerbForm} אֶת ${object.hebrew}`;
        transliterationSentence = `${subject.transliteration} ${correctVerbTransliteration} et ${object.transliteration}`;
        englishSentence = `${subject.meaning} ${verb.meaning} ${object.meaning}.`;
        break;
      }
      case VerbType.Existence: {
        const place = PLACES[Math.floor(Math.random() * PLACES.length)];
        hebrewSentence = `${subject.hebrew} ${correctVerbForm} ${place.be}`;
        transliterationSentence = `${subject.transliteration} ${correctVerbTransliteration} ${place.transliteration_be}`;
        englishSentence = `${subject.meaning} ${verb.meaning} ${place.meaning}.`;
        break;
      }
      case VerbType.Movement: {
        const place = PLACES[Math.floor(Math.random() * PLACES.length)];
        hebrewSentence = `${subject.hebrew} ${correctVerbForm} ${place.le}`;
        transliterationSentence = `${subject.transliteration} ${correctVerbTransliteration} ${place.transliteration_le}`;
        englishSentence = `${subject.meaning} ${verb.meaning} ${place.meaning}.`;
        break;
      }
    }
    
    return {
      hebrew: hebrewSentence,
      transliteration: transliterationSentence,
      meaning: englishSentence,
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
    if (!currentWord) return;

    if (category === Category.Verbs) {
      // For verbs, speak both male and female forms with a pause
      const verbToSpeak = `${VERBS[currentIndex].male}. ${VERBS[currentIndex].female}`;
      speak(verbToSpeak);
    } else {
      speak(currentWord.hebrew);
    }
  }, [currentWord, category, currentIndex]);

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
      handleSpeak();
      setSpeakOnNavigate(false); // Reset the flag
    }
  }, [currentWord, speakOnNavigate, handleSpeak]);


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
