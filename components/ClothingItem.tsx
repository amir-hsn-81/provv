
import React from 'react';
import type { ClothingItemType } from '../types';

interface ClothingItemProps {
  item: ClothingItemType;
  isSelected: boolean;
  onSelect: (item: ClothingItemType) => void;
}

export const ClothingItem: React.FC<ClothingItemProps> = ({ item, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(item)}
      className={`relative group p-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        isSelected ? 'border-indigo-500 shadow-md' : 'border-gray-200 hover:border-indigo-400'
      }`}
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-80">
        <img
          src={item.src}
          alt={item.name}
          className="h-full w-full object-contain object-center"
        />
      </div>
       <p className="mt-2 text-xs text-center font-medium text-gray-700 truncate">{item.name}</p>
    </button>
  );
};
