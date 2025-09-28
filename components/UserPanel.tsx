
import React, { useRef } from 'react';
import { Spinner } from './Spinner';
import { UploadIcon, UserIcon, RefreshIcon } from './icons';

interface UserPanelProps {
  userImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
  onImageUpload: (file: File) => void;
  onClear: () => void;
}

export const UserPanel: React.FC<UserPanelProps> = ({ userImage, generatedImage, isLoading, error, onImageUpload, onClear }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const displayImage = generatedImage || userImage;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center h-full w-full min-h-[400px] md:min-h-[600px] lg:min-h-[700px]">
      {displayImage ? (
        <div className="relative w-full h-full group">
          <img src={displayImage} alt="User" className="w-full h-full object-contain rounded-lg" />
          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded-lg transition-opacity duration-300">
              <Spinner />
              <p className="text-white mt-4 text-lg font-semibold animate-pulse">AI is working its magic...</p>
            </div>
          )}
           <button
                onClick={onClear}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Clear image"
            >
                <RefreshIcon className="w-6 h-6" />
            </button>
        </div>
      ) : (
        <div className="text-center">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/jpeg"
            />
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 mb-4">
                 <UserIcon className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Upload Your Photo</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by uploading a full-body picture.</p>
            <div className="mt-6">
                <button
                    type="button"
                    onClick={handleUploadClick}
                    className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                >
                    <UploadIcon className="-ml-0.5 h-5 w-5" />
                    Upload Image
                </button>
            </div>
        </div>
      )}
       {error && <p className="mt-4 text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
    </div>
  );
};
