import React from 'react';
import { Category } from '../types.ts';
import { ChevronDownIcon } from './Icons.tsx';

interface CategorySelectorProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onSelectCategory }) => {
  const categories = [
    { id: Category.Places, label: 'Place Names' },
    { id: Category.Men, label: 'Personal Names (male)' },
    { id: Category.Women, label: 'Personal Names (female)' },
    { id: Category.Verbs, label: 'Verbs' },
    { id: Category.Sentences, label: 'Sentences' },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectCategory(event.target.value as Category);
  };

  return (
    <div className="relative w-full">
      <label htmlFor="category-select" className="sr-only">Select a category</label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={handleChange}
        className="w-full appearance-none bg-slate-800 text-white text-base font-semibold py-3 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 cursor-pointer"
        aria-label="Select vocabulary category"
      >
        {categories.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
        <ChevronDownIcon />
      </div>
    </div>
  );
};
