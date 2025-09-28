
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UserPanel } from './components/UserPanel';
import { ClothingPanel } from './components/ClothingPanel';
import { tryOnClothing } from './services/geminiService';
import type { ClothingItemType } from './types';

const App: React.FC = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedClothing, setSelectedClothing] = useState<ClothingItemType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserImage(reader.result as string);
      setGeneratedImage(null); // Reset generated image when a new user image is uploaded
      setError(null);
    };
    reader.onerror = () => {
      setError("Failed to read the image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleTryOn = useCallback(async () => {
    if (!userImage || !selectedClothing) {
      setError("Please upload your photo and select a clothing item first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await tryOnClothing(userImage, selectedClothing.src);
      if(result) {
        setGeneratedImage(result);
      } else {
        setError("The AI model could not generate an image. Please try again.");
      }
    } catch (e) {
      console.error(e);
      setError("An error occurred while generating the image. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  }, [userImage, selectedClothing]);

  const handleClear = () => {
      setUserImage(null);
      setGeneratedImage(null);
      setSelectedClothing(null);
      setError(null);
      setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <UserPanel
            userImage={userImage}
            generatedImage={generatedImage}
            isLoading={isLoading}
            onImageUpload={handleImageUpload}
            error={error}
            onClear={handleClear}
          />
        </div>
        <div>
          <ClothingPanel
            selectedClothing={selectedClothing}
            onSelectClothing={setSelectedClothing}
            onTryOn={handleTryOn}
            isTryOnDisabled={!userImage || !selectedClothing || isLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
