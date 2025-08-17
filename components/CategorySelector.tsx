import React, { useMemo } from 'react';
import { Category } from '../types.ts';
import { VERBS } from '../constants.ts';
import { ChevronDownIcon } from './Icons.tsx';

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

type MainCategory = 'places' | 'people' | 'verbs' | 'sentences';
type PeopleSub = 'all' | 'male' | 'female';
type VerbSub = 'both' | 'male' | 'female';
type SentenceVerbSub = 'all' | string;
type SentenceGenderSub = 'both' | 'masculine' | 'feminine';


export const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onSelectCategory }) => {
  const [main, peopleSub, verbSub, sentenceVerbSub, sentenceGenderSub] = useMemo(() => {
    const parts = selectedCategory.split('_');
    const mainCat = parts[0] as MainCategory;
    
    if (mainCat === 'people') {
      return [mainCat, parts[1] as PeopleSub, 'both' as VerbSub, 'all' as SentenceVerbSub, 'both' as SentenceGenderSub];
    }
    if (mainCat === 'verbs') {
      return [mainCat, 'all' as PeopleSub, parts[1] as VerbSub, 'all' as SentenceVerbSub, 'both' as SentenceGenderSub];
    }
    if (mainCat === 'sentences') {
        return [mainCat, 'all' as PeopleSub, 'both' as VerbSub, parts[1] as SentenceVerbSub, parts[2] as SentenceGenderSub];
    }
    return [mainCat, 'all' as PeopleSub, 'both' as VerbSub, 'all' as SentenceVerbSub, 'both' as SentenceGenderSub];
  }, [selectedCategory]);

  const handleMainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMain = event.target.value as MainCategory;
    if (newMain === 'people') {
      onSelectCategory(Category.PeopleAll);
    } else if (newMain === 'verbs') {
      onSelectCategory(Category.VerbsBoth);
    } else if (newMain === 'sentences') {
      onSelectCategory(Category.SentencesAllBoth);
    } else {
      onSelectCategory(newMain as Category);
    }
  };

  const handlePeopleSubChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSub = event.target.value;
    onSelectCategory(`people_${newSub}`);
  };

  const handleVerbSubChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSub = event.target.value;
    onSelectCategory(`verbs_${newSub}`);
  };

  const handleSentenceVerbChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newVerbSub = event.target.value;
    onSelectCategory(`sentences_${newVerbSub}_${sentenceGenderSub}`);
  }

  const handleSentenceGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGenderSub = event.target.value;
    onSelectCategory(`sentences_${sentenceVerbSub}_${newGenderSub}`);
  }
  
  const mainCategories = [
    { id: 'places', label: 'Place Names' },
    { id: 'people', label: 'Personal Names' },
    { id: 'verbs', label: 'Verbs' },
    { id: 'sentences', label: 'Sentences' },
  ];

  const peopleSubCategories = [
    { id: 'all', label: 'All' },
    { id: 'male', label: 'Male' },
    { id: 'female', label: 'Female' },
  ];
  
  const verbSubCategories = [
    { id: 'both', label: 'Both' },
    { id: 'male', label: 'Masculine' },
    { id: 'female', label: 'Feminine' },
  ];

  const sentenceVerbSubCategories = [
    { id: 'all', label: 'All Verbs' },
    ...VERBS.map(verb => ({ id: verb.meaning, label: verb.meaning.charAt(0).toUpperCase() + verb.meaning.slice(1) }))
  ];

  const sentenceGenderSubCategories = [
    { id: 'both', label: 'Both' },
    { id: 'masculine', label: 'Masculine' },
    { id: 'feminine', label: 'Feminine' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <div className="relative flex-1">
        <label htmlFor="main-category-select" className="sr-only">Select a main category</label>
        <select
          id="main-category-select"
          value={main}
          onChange={handleMainChange}
          className="w-full appearance-none bg-slate-800 text-white text-base font-semibold py-3 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 cursor-pointer"
          aria-label="Select main vocabulary category"
        >
          {mainCategories.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
          <ChevronDownIcon />
        </div>
      </div>

      {main === 'people' && (
        <div className="relative flex-1">
          <label htmlFor="people-sub-select" className="sr-only">Select a sub category</label>
          <select
            id="people-sub-select"
            value={peopleSub}
            onChange={handlePeopleSubChange}
            className="w-full appearance-none bg-slate-800 text-white text-base font-semibold py-3 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 cursor-pointer"
            aria-label="Select people sub-category"
          >
              {peopleSubCategories.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
            <ChevronDownIcon />
          </div>
        </div>
      )}

      {main === 'verbs' && (
        <div className="relative flex-1">
          <label htmlFor="verb-sub-select" className="sr-only">Select a sub category</label>
          <select
            id="verb-sub-select"
            value={verbSub}
            onChange={handleVerbSubChange}
            className="w-full appearance-none bg-slate-800 text-white text-base font-semibold py-3 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 cursor-pointer"
            aria-label="Select verb sub-category"
          >
              {verbSubCategories.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
            <ChevronDownIcon />
          </div>
        </div>
      )}

      {main === 'sentences' && (
        <>
        <div className="relative flex-1">
            <label htmlFor="sentence-verb-select" className="sr-only">Select verb</label>
            <select
              id="sentence-verb-select"
              value={sentenceVerbSub}
              onChange={handleSentenceVerbChange}
              className="w-full appearance-none bg-slate-800 text-white text-base font-semibold py-3 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 cursor-pointer"
              aria-label="Select verb for sentence"
            >
                {sentenceVerbSubCategories.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <ChevronDownIcon />
            </div>
          </div>
          <div className="relative flex-1">
            <label htmlFor="sentence-gender-select" className="sr-only">Select gender</label>
            <select
              id="sentence-gender-select"
              value={sentenceGenderSub}
              onChange={handleSentenceGenderChange}
              className="w-full appearance-none bg-slate-800 text-white text-base font-semibold py-3 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 cursor-pointer"
              aria-label="Select gender for sentence"
            >
                {sentenceGenderSubCategories.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <ChevronDownIcon />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
