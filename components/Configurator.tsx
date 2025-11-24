import React, { useState } from 'react';
import { FONTS, PALETTES, BUTTON_STYLES, BUTTON_ANIMATIONS } from '../data/variations';
import { getButtonDynamicStyles } from '../utils/styleHelpers';
import { getThemeColors } from '../utils/colorUtils';

interface ConfiguratorProps {
    selectedFontIndex: number;
    selectedPaletteIndex: number;
    selectedButtonIndex: number;
    selectedAnimationIndex: number;
    onFontSelect: (index: number) => void;
    onPaletteSelect: (index: number) => void;
    onButtonSelect: (index: number) => void;
    onAnimationSelect: (index: number) => void;
    mode: 'dark' | 'light';
    onModeChange: (mode: 'dark' | 'light') => void;
}

export const Configurator: React.FC<ConfiguratorProps> = ({
    selectedFontIndex,
    selectedPaletteIndex,
    selectedButtonIndex,
    selectedAnimationIndex,
    onFontSelect,
    onPaletteSelect,
    onButtonSelect,
    onAnimationSelect,
    mode,
    onModeChange
}) => {
    const [activeTab, setActiveTab] = useState<'fonts' | 'colors' | 'buttons' | 'animations'>('fonts');
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-xl z-50 hover:scale-110 transition-transform"
            >
                🎨
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-96 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 z-50 flex flex-col max-h-[80vh] overflow-hidden transition-all animate-in slide-in-from-bottom-10 fade-in duration-300">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center bg-white/50">
                <h3 className="font-bold text-gray-800">Style Configurator</h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => onModeChange(mode === 'light' ? 'dark' : 'light')}
                        className="p-2 rounded-lg hover:bg-black/5 transition-colors"
                        title="Toggle Dark/Light Mode"
                    >
                        {mode === 'light' ? '🌙' : '☀️'}
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg hover:bg-black/5 transition-colors text-gray-500"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex p-2 gap-1 bg-gray-50/50">
                {(['fonts', 'colors', 'buttons', 'animations'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${activeTab === tab
                            ? 'bg-white shadow-sm text-black'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-black/5'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {activeTab === 'fonts' && FONTS.map((font, i) => (
                    <button
                        key={i}
                        onClick={() => onFontSelect(i)}
                        className={`w-full text-left p-3 rounded-xl transition-all border-2 ${selectedFontIndex === i ? 'border-black bg-gray-50' : 'border-transparent hover:bg-gray-50'
                            }`}
                    >
                        <div className="text-lg font-semibold text-gray-900" style={{ fontFamily: font.headerFont }}>{font.name}</div>
                        <div className="text-sm text-gray-500" style={{ fontFamily: font.bodyFont }}>
                            {font.description}
                        </div>
                    </button>
                ))}

                {activeTab === 'colors' && PALETTES.map((palette, i) => (
                    <button
                        key={i}
                        onClick={() => onPaletteSelect(i)}
                        className={`w-full text-left p-3 rounded-xl transition-all border-2 flex items-center gap-4 ${selectedPaletteIndex === i ? 'border-black bg-gray-50' : 'border-transparent hover:bg-gray-50'
                            }`}
                    >
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full border-2 border-white" style={{ backgroundColor: palette.colors.primary }}></div>
                            <div className="w-8 h-8 rounded-full border-2 border-white" style={{ backgroundColor: palette.colors.secondary }}></div>
                            <div className="w-8 h-8 rounded-full border-2 border-white" style={{ backgroundColor: palette.colors.accent }}></div>
                        </div>
                        <div>
                            <div className="font-medium text-gray-900">{palette.name}</div>
                            <div className="text-xs text-gray-500">Primary • Secondary • Accent</div>
                        </div>
                    </button>
                ))}

                {activeTab === 'buttons' && BUTTON_STYLES.map((style, i) => {
                    // Preview using the currently selected palette and mode
                    const palette = PALETTES[selectedPaletteIndex];
                    const colors = getThemeColors(palette, mode);
                    const themePalette = { ...palette, colors };
                    const { className, style: btnStyle } = getButtonDynamicStyles(style, themePalette);

                    return (
                        <button
                            key={i}
                            onClick={() => onButtonSelect(i)}
                            className={`w-full text-left p-4 rounded-xl transition-all border-2 group ${selectedButtonIndex === i ? 'border-black bg-gray-50' : 'border-transparent hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-gray-900">{style.name}</span>
                            </div>
                            <div className="flex justify-center py-4 bg-gray-100/50 rounded-lg overflow-hidden">
                                <div className={className} style={{ ...btnStyle, transform: 'scale(0.8)' }}>
                                    Button
                                </div>
                            </div>
                        </button>
                    );
                })}

                {activeTab === 'animations' && BUTTON_ANIMATIONS.map((anim, i) => (
                    <button
                        key={i}
                        onClick={() => onAnimationSelect(i)}
                        className={`w-full text-left p-3 rounded-xl transition-all border-2 ${selectedAnimationIndex === i ? 'border-black bg-gray-50' : 'border-transparent hover:bg-gray-50'
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900">{anim.name}</span>
                            <div className={`px-4 py-2 bg-black text-white rounded-lg text-xs ${anim.class}`}>
                                Hover Me
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
