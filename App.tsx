
import React, { useState, useEffect } from 'react';
import { BrandConcept, ImageSize } from './types';
import { LogoGenerator } from './components/LogoGenerator';
import { BrandDashboard } from './components/BrandDashboard';
import { ChatWidget } from './components/ChatWidget';
import { StyleGuide } from './components/StyleGuide';
import { LiveLandingPage } from './components/LiveLandingPage';
import { Configurator } from './components/Configurator';
import { FontLoader } from './components/FontLoader';
import { FONTS, PALETTES, BUTTON_STYLES, BUTTON_ANIMATIONS } from './data/variations';
import { generateBrandConcepts, generateBrandImage, generateSiteContent } from './services/gemini';

enum AppState {
  Input,
  LiveBuilder,
  GenerateAssets,
  Dashboard,
  Preview
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.Input);
  const [mission, setMission] = useState('');

  // Live Builder State
  const [selectedFontIndex, setSelectedFontIndex] = useState(0);
  const [selectedPaletteIndex, setSelectedPaletteIndex] = useState(0);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const [selectedAnimationIndex, setSelectedAnimationIndex] = useState(1); // Default to Scale Up
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('light');
  const [siteContent, setSiteContent] = useState<{ headline: string, subheadline: string, cta: string, features: string[] } | null>(null);

  // Derived Concept (constructed from live builder state)
  const [finalConcept, setFinalConcept] = useState<BrandConcept | null>(null);

  // Assets
  const [primaryLogo, setPrimaryLogo] = useState<string | undefined>(undefined);
  const [primaryLogoSize, setPrimaryLogoSize] = useState<ImageSize | undefined>(undefined);
  const [secondaryMark, setSecondaryMark] = useState<string | undefined>(undefined);

  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
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
      setHasApiKey(true);
    }
  };

  const handleStartBuilder = async () => {
    if (!mission.trim()) return;

    // Randomize initial state for variety
    setSelectedFontIndex(Math.floor(Math.random() * FONTS.length));
    setSelectedPaletteIndex(Math.floor(Math.random() * PALETTES.length));
    setSelectedButtonIndex(Math.floor(Math.random() * BUTTON_STYLES.length));

    // Show loading state
    setState(AppState.GeneratingConcepts);

    try {
      // Generate content
      const content = await generateSiteContent(mission);
      setSiteContent(content);

      // Once content is ready, switch to builder
      setState(AppState.LiveBuilder);
    } catch (e) {
      console.error("Failed to generate content", e);
      // Fallback to builder even if generation fails (will use default text)
      setState(AppState.LiveBuilder);
    }
  };

  const handleBuilderComplete = () => {
    // Construct the final concept object from the selected variations
    const font = FONTS[selectedFontIndex];
    const palette = PALETTES[selectedPaletteIndex];
    const button = BUTTON_STYLES[selectedButtonIndex];

    const concept: BrandConcept = {
      id: `custom - ${Date.now()} `,
      name: `${palette.name} ${font.name} `,
      description: `A custom brand identity built for: "${mission}"`,
      colors: [
        { hex: palette.colors.primary, name: "Primary", usage: "Main Brand Color" },
        { hex: palette.colors.secondary, name: "Secondary", usage: "Supporting Color" },
        { hex: palette.colors.accent, name: "Accent", usage: "Highlights" },
        { hex: palette.colors.background, name: "Background", usage: "Page Background" },
        { hex: palette.colors.text, name: "Text", usage: "Body Text" }
      ],
      typography: {
        headerFont: font.headerFont,
        bodyFont: font.bodyFont,
        reasoning: font.description
      },
      buttonStyle: {
        tailwindClasses: button.classes,
        description: button.description,
        borderRadius: "custom",
        shadow: "custom"
      },
      logoPrompt: `A minimal, modern logo for a brand with mission: "${mission}".Primary color: ${palette.colors.primary}.Style: ${font.name}. Vector graphics, white background.`,
      secondaryMarkPrompt: `A simple icon symbol for a brand with mission: "${mission}".Color: ${palette.colors.accent}.Style: Flat, minimal.`,
      vibeCoderPrompt: `Reskin the app using ${font.headerFont} for headers and ${font.bodyFont} for body.Primary color is ${palette.colors.primary}. Buttons should be ${button.description}.`
    };

    setFinalConcept(concept);
    setState(AppState.GenerateAssets);
  };

  const handleAssetsComplete = () => {
    setState(AppState.Dashboard);
  };

  const handleReset = () => {
    setState(AppState.Input);
    setMission('');
    setFinalConcept(null);
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

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => setState(AppState.Preview)}
              className="text-sm text-slate-500 hover:text-indigo-400 transition-colors"
            >
              View Style Guide Preview
            </button>
          </div>

          <div className="text-xs text-slate-500">
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-indigo-400">Billing Documentation</a>
          </div>
        </div>
      </div>
    );
  }

  if (state === AppState.Preview) {
    return <StyleGuide onBack={() => setState(AppState.Input)} />;
  }

  // Live Builder Mode (Full Screen Overlay)
  if (state === AppState.LiveBuilder) {
    return (
      <div className="relative">
        <>
          <FontLoader font={FONTS[selectedFontIndex]} />
          <LiveLandingPage
            font={FONTS[selectedFontIndex]}
            palette={PALETTES[selectedPaletteIndex]}
            buttonStyle={BUTTON_STYLES[selectedButtonIndex]}
            buttonAnimation={BUTTON_ANIMATIONS[selectedAnimationIndex]}
            mission={mission}
            mode={themeMode}
            content={siteContent}
          />
        </>
        <Configurator
          selectedFontIndex={selectedFontIndex}
          selectedPaletteIndex={selectedPaletteIndex}
          selectedButtonIndex={selectedButtonIndex}
          selectedAnimationIndex={selectedAnimationIndex}
          onFontSelect={setSelectedFontIndex}
          onPaletteSelect={setSelectedPaletteIndex}
          onButtonSelect={setSelectedButtonIndex}
          onAnimationSelect={setSelectedAnimationIndex}
          mode={themeMode}
          onModeChange={setThemeMode}
        />
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
              <button
                onClick={() => setState(AppState.Preview)}
                className="text-xs font-medium text-slate-400 hover:text-white px-2 py-1"
              >
                Style Guide
              </button>
              {[AppState.GenerateAssets, AppState.Dashboard].includes(state) &&
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
              <div className="flex justify-between items-center p-2">
                <button
                  onClick={() => setState(AppState.Preview)}
                  className="text-sm text-slate-500 hover:text-indigo-400 transition-colors"
                >
                  View Style Guide
                </button>
                <button
                  onClick={handleStartBuilder}
                  disabled={!mission.trim()}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  Start Builder
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Generate Assets (Reused) */}
        {state === AppState.GenerateAssets && finalConcept && (
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
                  <p className="text-sm text-slate-300 italic">{finalConcept.logoPrompt}</p>
                </div>
                <LogoGenerator
                  type="Primary Logo"
                  prompt={finalConcept.logoPrompt}
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
                  <p className="text-sm text-slate-300 italic">{finalConcept.secondaryMarkPrompt}</p>
                </div>
                <LogoGenerator
                  type="Secondary Mark"
                  prompt={finalConcept.secondaryMarkPrompt}
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
        {state === AppState.Dashboard && finalConcept && (
          <BrandDashboard
            concept={finalConcept}
            logoUrl={primaryLogo}
            logoSize={primaryLogoSize}
            secondaryUrl={secondaryMark}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Floating Chat Bot */}
      <ChatWidget
        context={finalConcept ? JSON.stringify(finalConcept) : mission || "No brand defined yet."}
      />
    </div>
  );
};

export default App;