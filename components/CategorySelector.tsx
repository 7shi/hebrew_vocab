import React, { useMemo } from 'react';
import { Category } from '../types.ts';
import { ChevronDownIcon } from './Icons.tsx';

interface CategorySelectorProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

type MainCategory = 'places' | 'people' | 'verbs' | 'sentences';
type SubCategory = 'all' | 'male' | 'female' | 'both';

export const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onSelectCategory }) => {
  const [main, sub] = useMemo((): [MainCategory, SubCategory] => {
    if (selectedCategory.startsWith('people')) {
      const subCategory = selectedCategory.split('_')[1] as SubCategory;
      return ['people', subCategory];
    }
    if (selectedCategory.startsWith('verbs')) {
      const subCategory = selectedCategory.split('_')[1] as SubCategory;
      return ['verbs', subCategory];
    }
    return [selectedCategory as MainCategory, 'all']; // default sub, not visible
  }, [selectedCategory]);

  const handleMainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMain = event.target.value as MainCategory;
    if (newMain === 'people') {
      // When switching to 'people', default to 'all' and fire the update.
      onSelectCategory(Category.PeopleAll);
    } else if (newMain === 'verbs') {
      onSelectCategory(Category.VerbsBoth);
    } else {
      onSelectCategory(newMain as Category);
    }
  };

  const handleSubChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSub = event.target.value as SubCategory;
    onSelectCategory(`${main}_${newSub}` as Category);
  };
  
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
  
  const subCategoryOptions = main === 'people' ? peopleSubCategories : verbSubCategories;

  return (
    <div className="flex gap-2 w-full">
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

      {(main === 'people' || main === 'verbs') && (
        <div className="relative flex-1">
          <label htmlFor="sub-category-select" className="sr-only">Select a sub category</label>
          <select
            id="sub-category-select"
            value={sub}
            onChange={handleSubChange}
            className="w-full appearance-none bg-slate-800 text-white text-base font-semibold py-3 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 cursor-pointer"
            aria-label={`Select ${main} sub-category`}
          >
              {subCategoryOptions.map(({ id, label }) => (
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
    </div>
  );
};