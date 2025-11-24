import React from 'react';
import { BRAND_PRESETS } from '../data/presets';

interface StyleGuideProps {
    onBack: () => void;
}

export const StyleGuide: React.FC<StyleGuideProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 p-8 animate-fade-in">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Style Guide Preview</h1>
                        <p className="text-slate-400">Previewing {BRAND_PRESETS.length} pre-built brand variations.</p>
                    </div>
                    <button
                        onClick={onBack}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
                    >
                        ← Back to App
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {BRAND_PRESETS.map((preset, index) => (
                        <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 space-y-8 hover:border-slate-600 transition-colors">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">{preset.name}</h2>
                                    <p className="text-sm text-slate-400">{preset.typography.reasoning}</p>
                                </div>
                                <span className="text-xs font-mono bg-slate-900 px-2 py-1 rounded text-slate-500">
                                    Preset #{index + 1}
                                </span>
                            </div>

                            {/* Colors */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Color Palette</h3>
                                <div className="flex flex-wrap gap-4">
                                    {preset.colors.map((color, i) => (
                                        <div key={i} className="space-y-2">
                                            <div
                                                className="w-16 h-16 rounded-lg shadow-lg ring-1 ring-white/10"
                                                style={{ backgroundColor: color.hex }}
                                            />
                                            <div className="text-xs">
                                                <p className="font-mono text-white">{color.hex}</p>
                                                <p className="text-slate-500">{color.usage}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Typography */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Typography</h3>
                                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 space-y-4">
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Header Font: {preset.typography.headerFont}</p>
                                        <h4
                                            className="text-3xl text-white"
                                            style={{ fontFamily: preset.typography.headerFont }}
                                        >
                                            The Quick Brown Fox
                                        </h4>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Body Font: {preset.typography.bodyFont}</p>
                                        <p
                                            className="text-lg text-slate-300"
                                            style={{ fontFamily: preset.typography.bodyFont }}
                                        >
                                            Jumps over the lazy dog. A visual exploration of {preset.name.toLowerCase()} design principles.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Button Style */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Component Style</h3>
                                <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700/50 flex items-center justify-center gap-4">
                                    <button className={preset.buttonStyle.tailwindClasses}>
                                        Primary Action
                                    </button>
                                    <button className={`${preset.buttonStyle.tailwindClasses} opacity-75`}>
                                        Hover State
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 italic">
                                    {preset.buttonStyle.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
