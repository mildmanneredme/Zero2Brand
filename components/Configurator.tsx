import React, { useState } from 'react';
import { FONTS, PALETTES, BUTTON_STYLES } from '../data/variations';
import { getButtonDynamicStyles } from '../utils/styleHelpers';

interface ConfiguratorProps {
    selectedFontIndex: number;
    selectedPaletteIndex: number;
    selectedButtonIndex: number;
    onFontChange: (index: number) => void;
    onPaletteChange: (index: number) => void;
    onButtonChange: (index: number) => void;
    onComplete: () => void;
    mode: 'dark' | 'light';
    onModeChange: (mode: 'dark' | 'light') => void;
}

export const Configurator: React.FC<ConfiguratorProps> = ({
    selectedFontIndex,
    selectedPaletteIndex,
    selectedButtonIndex,
    onFontChange,
    onPaletteChange,
    onButtonChange,
    onComplete,
    mode,
    onModeChange
}) => {
    const [activeTab, setActiveTab] = useState<'fonts' | 'colors' | 'buttons'>('fonts');
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (isCollapsed) {
        return (
            <button
                onClick={() => setIsCollapsed(false)}
                className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-500 transition-all z-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
        );
    }

    return (
        <div className="fixed bottom-8 right-8 w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[80vh] z-50 animate-fade-in">
            {/* Header */}
            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>🎨</span> Brand Builder
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onModeChange(mode === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
                        title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}
                    >
                        {mode === 'dark' ? '☀️' : '🌙'}
                    </button>
                    <button
                        onClick={() => setIsCollapsed(true)}
                        className="text-slate-400 hover:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-700">
                {(['fonts', 'colors', 'buttons'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${activeTab === tab
                            ? 'text-indigo-400 border-b-2 border-indigo-400 bg-slate-800/50'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {activeTab === 'fonts' && FONTS.map((font, index) => (
                    <button
                        key={index}
                        onClick={() => onFontChange(index)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${selectedFontIndex === index
                            ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500'
                            : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                            }`}
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-white font-medium">{font.name}</span>
                            {selectedFontIndex === index && <span className="text-indigo-400 text-xs">Active</span>}
                        </div>
                        <div className="text-sm text-slate-300 mb-2" style={{ fontFamily: font.headerFont }}>
                            Header: {font.headerFont}
                        </div>
                        <div className="text-xs text-slate-500" style={{ fontFamily: font.bodyFont }}>
                            Body: {font.bodyFont}
                        </div>
                    </button>
                ))}

                {activeTab === 'colors' && PALETTES.map((palette, index) => (
                    <button
                        key={index}
                        onClick={() => onPaletteChange(index)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${selectedPaletteIndex === index
                            ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500'
                            : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                            }`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-white font-medium">{palette.name}</span>
                            {selectedPaletteIndex === index && <span className="text-indigo-400 text-xs">Active</span>}
                        </div>
                        <div className="flex gap-2">
                            {Object.values(palette.colors).map((color, i) => (
                                <div
                                    key={i}
                                    className="w-6 h-6 rounded-full ring-1 ring-white/10"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </button>
                ))}

                {activeTab === 'buttons' && BUTTON_STYLES.map((style, index) => {
                    const { className: btnClass, style: btnStyle } = getButtonDynamicStyles(style, PALETTES[selectedPaletteIndex]);

                    return (
                        <button
                            key={index}
                            onClick={() => onButtonChange(index)}
                            className={`w-full text-left p-4 rounded-lg border transition-all ${selectedButtonIndex === index
                                ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500'
                                : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                                }`}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-white font-medium">{style.name}</span>
                                {selectedButtonIndex === index && <span className="text-indigo-400 text-xs">Active</span>}
                            </div>
                            <div className="flex justify-center bg-slate-900/50 p-4 rounded border border-slate-700/50">
                                <div className={btnClass} style={btnStyle}>
                                    Button Preview
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700 bg-slate-900">
                <button
                    onClick={onComplete}
                    className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg transition-all"
                >
                    Finalize & Generate Assets
                </button>
            </div>
        </div>
    );
};
