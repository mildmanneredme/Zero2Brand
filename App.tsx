import React, { useState, useEffect } from 'react';
import { generateBrandConcepts } from './services/gemini';
import { BrandConcept, ImageSize } from './types';
import { ConceptCard } from './components/ConceptCard';
import { LogoGenerator } from './components/LogoGenerator';
import { BrandDashboard } from './components/BrandDashboard';
import { ChatWidget } from './components/ChatWidget';

enum AppState {
  Input,
  GeneratingConcepts,
  SelectConcept,
  GenerateAssets,
  Dashboard
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.Input);
  const [mission, setMission] = useState('');
  const [concepts, setConcepts] = useState<BrandConcept[]>([]);
  const [selectedConcept, setSelectedConcept] = useState<BrandConcept | null>(null);
  
  // Assets
  const [primaryLogo, setPrimaryLogo] = useState<string | undefined>(undefined);
  const [primaryLogoSize, setPrimaryLogoSize] = useState<ImageSize | undefined>(undefined);
  const [secondaryMark, setSecondaryMark] = useState<string | undefined>(undefined);

  const [hasApiKey, setHasApiKey] = useState(false);

  // Check API key availability on mount (though we use process.env usually, 
  // we check the window object for the specific key selection requirement of Veo/High-end image models logic)
  useEffect(() => {
    const checkKey = async () => {
      // In this specific playground environment, process.env.API_KEY is injected if available.
      // However, for high-end models, we might need to trigger the selector if not present.
      if (process.env.API_KEY) {
        setHasApiKey(true);
      } else if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      }
    };
    checkKey();
  }, []);

  const handleApiKeySelect = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // As per instructions, assume success immediately after triggering openSelectKey.
      // Do not check return value as it is void.
      setHasApiKey(true); 
    }
  };

  const handleGenerateConcepts = async () => {
    if (!mission.trim()) return;
    setState(AppState.GeneratingConcepts);
    try {
      const results = await generateBrandConcepts(mission);
      setConcepts(results);
      setState(AppState.SelectConcept);
    } catch (e) {
      console.error(e);
      alert("Failed to generate concepts. Please ensure you have a valid API Key.");
      setState(AppState.Input);
    }
  };

  const handleSelectConcept = (concept: BrandConcept) => {
    setSelectedConcept(concept);
    setState(AppState.GenerateAssets);
  };

  const handleAssetsComplete = () => {
    setState(AppState.Dashboard);
  };

  const handleReset = () => {
    setState(AppState.Input);
    setMission('');
    setConcepts([]);
    setSelectedConcept(null);
    setPrimaryLogo(undefined);
    setSecondaryMark(undefined);
  };

  if (!hasApiKey && !process.env.API_KEY) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-3xl font-bold text-white">Zero2Brand</h1>
          <p className="text-slate-400">To generate high-quality assets using Gemini's advanced models (Image 3 Pro & Veo), please select a paid API Key.</p>
          <button 
            onClick={handleApiKeySelect}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors"
          >
            Select API Key
          </button>
          <div className="text-xs text-slate-500">
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-indigo-400">Billing Documentation</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold text-white">Zero2Brand</span>
          </div>
          {state !== AppState.Input && (
             <div className="flex gap-2">
                 {[AppState.SelectConcept, AppState.GenerateAssets, AppState.Dashboard].includes(state) && 
                    <div className="text-xs font-mono text-slate-500 px-2 py-1 bg-slate-800 rounded">gemini-3-pro</div>
                 }
             </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Step 1: Input */}
        {state === AppState.Input && (
          <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in pt-12">
            <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">
              Craft your brand identity <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                in seconds.
              </span>
            </h1>
            <p className="text-xl text-slate-400">
              Describe your company mission, values, and vibe. We'll generate a complete Brand Bible with logos, colors, and typography.
            </p>
            
            <div className="bg-slate-800 p-2 rounded-2xl shadow-xl border border-slate-700">
              <textarea
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                placeholder="e.g., A sustainable coffee roastery based in Seattle that focuses on ethical sourcing and cozy, minimalist aesthetics..."
                className="w-full h-32 bg-slate-900 border-none rounded-xl p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 resize-none"
              />
              <div className="flex justify-end p-2">
                <button
                  onClick={handleGenerateConcepts}
                  disabled={!mission.trim()}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                   Generate Concepts
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 1.5: Loading Concepts */}
        {state === AppState.GeneratingConcepts && (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
            <div className="relative w-24 h-24">
               <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">Dreaming up ideas...</h2>
                <p className="text-slate-400">Gemini 3 Pro is analyzing your mission.</p>
            </div>
          </div>
        )}

        {/* Step 2: Select Concept */}
        {state === AppState.SelectConcept && (
          <div className="space-y-8 animate-fade-in">
             <div className="text-center">
               <h2 className="text-3xl font-bold text-white mb-2">Choose a Direction</h2>
               <p className="text-slate-400">Select the vibe that best matches your vision.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {concepts?.map((concept) => (
                 <ConceptCard 
                   key={concept.id} 
                   concept={concept} 
                   onSelect={handleSelectConcept}
                   isSelected={false}
                 />
               ))}
             </div>
          </div>
        )}

        {/* Step 3: Generate Assets */}
        {state === AppState.GenerateAssets && selectedConcept && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
             <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-white mb-2">Bring it to life</h2>
               <p className="text-slate-400">Generate your visual assets using high-definition AI models.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Primary Logo Gen */}
                <div className="space-y-4">
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 mb-4">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-2">Prompt Strategy</p>
                    <p className="text-sm text-slate-300 italic">{selectedConcept.logoPrompt}</p>
                  </div>
                  <LogoGenerator 
                    type="Primary Logo" 
                    prompt={selectedConcept.logoPrompt} 
                    onImageGenerated={(url, size) => {
                      setPrimaryLogo(url);
                      setPrimaryLogoSize(size);
                    }}
                  />
                </div>

                {/* Secondary Mark Gen */}
                <div className="space-y-4">
                   <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 mb-4">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-2">Prompt Strategy</p>
                    <p className="text-sm text-slate-300 italic">{selectedConcept.secondaryMarkPrompt}</p>
                  </div>
                  <LogoGenerator 
                    type="Secondary Mark" 
                    prompt={selectedConcept.secondaryMarkPrompt} 
                    onImageGenerated={(url) => setSecondaryMark(url)}
                  />
                </div>
             </div>

             <div className="flex justify-center pt-8">
               <button
                 onClick={handleAssetsComplete}
                 disabled={!primaryLogo}
                 className="px-8 py-3 bg-white text-slate-900 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed font-bold rounded-lg transition-colors shadow-lg shadow-white/10"
               >
                 {primaryLogo ? "Finalize Brand Bible" : "Generate Primary Logo to Continue"}
               </button>
             </div>
          </div>
        )}

        {/* Step 4: Dashboard */}
        {state === AppState.Dashboard && selectedConcept && (
          <BrandDashboard 
            concept={selectedConcept}
            logoUrl={primaryLogo}
            logoSize={primaryLogoSize}
            secondaryUrl={secondaryMark}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Floating Chat Bot - Always available if we have concept context or just generally */}
      <ChatWidget 
        context={selectedConcept ? JSON.stringify(selectedConcept) : mission || "No brand defined yet."} 
      />
    </div>
  );
};

export default App;