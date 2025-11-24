import React, { useState } from 'react';
import { ImageSize } from '../types';
import { generateBrandImage } from '../services/gemini';

interface LogoGeneratorProps {
  prompt: string;
  type: 'Primary Logo' | 'Secondary Mark';
  onImageGenerated: (url: string, size: ImageSize) => void;
}

export const LogoGenerator: React.FC<LogoGeneratorProps> = ({ prompt, type, onImageGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ImageSize>(ImageSize.Size1K);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = await generateBrandImage(prompt, selectedSize);
      setGeneratedUrl(url);
      onImageGenerated(url, selectedSize);
    } catch (e) {
      setError("Failed to generate image. Please try again. Ensure you have a valid API Key selected.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-2">Generate {type}</h3>
      <p className="text-slate-400 text-sm mb-4">Using model: <span className="font-mono text-xs text-emerald-400">gemini-3-pro-image-preview</span></p>
      
      <div className="mb-6 space-y-2">
        <label className="text-sm text-slate-300 block">Select Resolution</label>
        <div className="flex gap-2">
          {Object.values(ImageSize).map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                selectedSize === size 
                  ? 'bg-indigo-600 text-white border border-indigo-500' 
                  : 'bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {!generatedUrl && !loading && (
        <button
          onClick={handleGenerate}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg transition-all"
        >
          Generate {type}
        </button>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="text-slate-400 animate-pulse text-sm">Designing pixel perfect assets...</p>
        </div>
      )}

      {generatedUrl && (
        <div className="space-y-4">
          <div className="relative aspect-square w-full bg-black/20 rounded-lg overflow-hidden border border-slate-600 group">
             <img src={generatedUrl} alt="Generated Asset" className="w-full h-full object-contain" />
             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a href={generatedUrl} download={`${type.replace(' ','_')}.png`} className="text-white bg-slate-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-700">
                  Download
                </a>
             </div>
          </div>
          <button
            onClick={handleGenerate}
            className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-colors"
          >
            Regenerate
          </button>
        </div>
      )}
      
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg mt-4">
          {error}
        </div>
      )}
    </div>
  );
};
