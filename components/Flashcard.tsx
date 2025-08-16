import React from 'react';
import type { Word } from '../types.ts';

interface FlashcardProps {
  word: Word;
}

export const Flashcard: React.FC<FlashcardProps> = ({ word }) => {
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
