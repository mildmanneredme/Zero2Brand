import React from 'react';
import { BrandConcept, ImageSize } from '../types';

interface BrandDashboardProps {
  concept: BrandConcept;
  logoUrl?: string;
  logoSize?: ImageSize;
  secondaryUrl?: string;
  onReset: () => void;
}

export const BrandDashboard: React.FC<BrandDashboardProps> = ({ concept, logoUrl, logoSize, secondaryUrl, onReset }) => {
  
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(concept.vibeCoderPrompt);
    alert("Vibe Coder prompt copied to clipboard!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-700 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">{concept.name}</h1>
          <p className="text-slate-400 text-lg">Brand Identity Guide</p>
        </div>
        <div className="flex gap-4">
             <button onClick={handleCopyPrompt} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                Copy Vibe Coder Prompt
             </button>
             <button onClick={onReset} className="px-6 py-2 border border-slate-600 hover:bg-slate-800 text-slate-300 rounded-lg font-medium transition-colors">
                Start Over
             </button>
        </div>
      </div>

      {/* Rationale */}
      <section className="prose prose-invert max-w-none">
        <p className="text-xl leading-relaxed text-slate-300">{concept.description}</p>
      </section>

      {/* Main Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Logos */}
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-6">Brand Assets</h2>
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                    <div className="aspect-square bg-white/5 rounded-xl border border-slate-700 flex items-center justify-center p-4">
                        {logoUrl ? (
                            <img src={logoUrl} alt="Primary Logo" className="max-w-full max-h-full object-contain" />
                        ) : (
                            <span className="text-slate-600 text-sm">Not Generated</span>
                        )}
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500">
                        <span>Primary Logo</span>
                        <span>{logoSize || '-'}</span>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="aspect-square bg-white/5 rounded-xl border border-slate-700 flex items-center justify-center p-4">
                        {secondaryUrl ? (
                            <img src={secondaryUrl} alt="Secondary Mark" className="max-w-full max-h-full object-contain" />
                        ) : (
                            <span className="text-slate-600 text-sm">Not Generated</span>
                        )}
                    </div>
                    <div className="text-xs text-slate-500">Secondary Mark</div>
                </div>
            </div>
        </div>

        {/* Colors */}
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-6">Color Palette</h2>
            <div className="space-y-4">
                {concept.colors?.map((color, idx) => (
                    <div key={idx} className="flex items-center gap-4 group">
                        <div 
                            className="w-16 h-16 rounded-xl shadow-lg ring-1 ring-white/10" 
                            style={{backgroundColor: color.hex}}
                        />
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-white font-medium">{color.name}</span>
                                <span className="font-mono text-slate-400 text-sm">{color.hex}</span>
                            </div>
                            <p className="text-sm text-slate-500">{color.usage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Typography & UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
             <h2 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-6">Typography</h2>
             <div className="space-y-8">
                <div>
                    <p className="text-xs text-slate-500 mb-2">Header Font</p>
                    <p className="text-4xl text-white font-bold mb-2">{concept.typography?.headerFont || 'Header Font'}</p>
                    <p className="text-sm text-slate-400">The quick brown fox jumps over the lazy dog.</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500 mb-2">Body Font</p>
                    <p className="text-2xl text-white mb-2">{concept.typography?.bodyFont || 'Body Font'}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        The quick brown fox jumps over the lazy dog. This font is selected to provide excellent readability at small sizes while maintaining character that complements the primary header font.
                    </p>
                </div>
             </div>
        </div>

        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
             <h2 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-6">UI Components</h2>
             <div className="space-y-8">
                <div>
                    <p className="text-xs text-slate-500 mb-4">Primary Button</p>
                    <div className="p-8 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center">
                        <button className={`${concept.buttonStyle?.tailwindClasses || 'bg-blue-600 text-white px-4 py-2 rounded'} transition-all`}>
                            Click Me
                        </button>
                    </div>
                    <div className="mt-4 p-4 bg-slate-900 rounded-lg font-mono text-xs text-slate-400 overflow-x-auto">
                        {concept.buttonStyle?.tailwindClasses || 'N/A'}
                    </div>
                </div>
             </div>
        </div>
      </div>
      
      {/* Vibe Coder Instructions Section */}
      <div className="bg-gradient-to-r from-slate-800 to-indigo-900/30 rounded-2xl p-8 border border-indigo-500/30">
        <h2 className="text-xl text-white font-bold mb-4">Implementation Guide</h2>
        <p className="text-slate-300 mb-4">Use the prompts below with your AI coding assistant to implement this style.</p>
        <div className="bg-black/40 p-4 rounded-lg border border-white/10">
            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono">{concept.vibeCoderPrompt}</pre>
        </div>
      </div>

    </div>
  );
};