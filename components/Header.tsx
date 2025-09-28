
import React from 'react';
import { WardrobeIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <WardrobeIcon className="w-8 h-8 text-indigo-600" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Virtual Try-On Room
          </h1>
        </div>
        <div className="text-gray-500 font-medium hidden md:block">
          اتاق پرو مجازی
        </div>
      </div>
    </header>
  );
};
