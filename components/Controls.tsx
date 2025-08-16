import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, SpeakerIcon } from './Icons.tsx';

interface ControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onSpeak: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ onPrev, onNext, onSpeak }) => {
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
