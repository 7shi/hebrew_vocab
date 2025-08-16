import React from 'react';
import { Category } from '../types.ts';

interface CategorySelectorProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onSelectCategory }) => {
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
