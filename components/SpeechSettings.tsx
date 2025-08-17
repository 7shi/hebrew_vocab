import React from 'react';

interface SpeechSettingsProps {
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  onVoiceChange: (voiceName: string) => void;
  rate: number;
  onRateChange: (rate: number) => void;
}

export const SpeechSettings: React.FC<SpeechSettingsProps> = ({
  voices,
  selectedVoice,
  onVoiceChange,
  rate,
  onRateChange,
}) => {
  if (voices.length === 0) {
    return (
      <div className="text-center mb-6 p-4 bg-slate-800/50 rounded-lg text-slate-400 text-sm">
        <p className="font-semibold text-slate-300">No Hebrew (he-IL) voice found.</p>
        <p className="mt-1">Microsoft Edge is recommended. Please try using the speech feature once to load voices.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg">
      {/* Voice Selection */}
      <div className="w-full">
        <label htmlFor="voice-select" className="block text-sm font-medium text-slate-400 mb-1">
          Voice
        </label>
        <select
          id="voice-select"
          value={selectedVoice?.name || ''}
          onChange={(e) => onVoiceChange(e.target.value)}
          className="w-full bg-slate-700 text-slate-200 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 cursor-pointer"
          aria-label="Select speech voice"
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {`${voice.name} (${voice.lang})`}
            </option>
          ))}
        </select>
      </div>

      {/* Speed Control */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="rate-slider" className="text-sm font-medium text-slate-400">
            Speed
          </label>
          <span className="text-sm text-slate-300 font-semibold w-10 text-center">{rate.toFixed(2)}</span>
        </div>
        <input
          id="rate-slider"
          type="range"
          min="0.5"
          max="1.5"
          step="0.05"
          value={rate}
          onChange={(e) => onRateChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};
