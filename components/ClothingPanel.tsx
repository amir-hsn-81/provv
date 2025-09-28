
import React, { useState } from 'react';
import { CLOTHING_ITEMS } from '../constants';
import type { ClothingItemType } from '../types';
import { ClothingCategory } from '../types';
import { ClothingItem } from './ClothingItem';
import { MagicWandIcon } from './icons';

interface ClothingPanelProps {
  selectedClothing: ClothingItemType | null;
  onSelectClothing: (item: ClothingItemType) => void;
  onTryOn: () => void;
  isTryOnDisabled: boolean;
}

const TABS = [ClothingCategory.TOPS, ClothingCategory.BOTTOMS];

export const ClothingPanel: React.FC<ClothingPanelProps> = ({ selectedClothing, onSelectClothing, onTryOn, isTryOnDisabled }) => {
  const [activeTab, setActiveTab] = useState<ClothingCategory>(ClothingCategory.TOPS);

  const filteredItems = CLOTHING_ITEMS.filter(item => item.type === activeTab);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">Choose an Item</h2>
      
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-grow overflow-y-auto pr-2 -mr-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredItems.map(item => (
            <ClothingItem
              key={item.id}
              item={item}
              isSelected={selectedClothing?.id === item.id}
              onSelect={onSelectClothing}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={onTryOn}
          disabled={isTryOnDisabled}
          className="w-full flex items-center justify-center gap-x-2 rounded-md bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
        >
          <MagicWandIcon className="h-5 w-5" />
          Try On
        </button>
      </div>
    </div>
  );
};
