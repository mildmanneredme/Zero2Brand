import React from 'react';
import { FontPair, ColorPalette, ButtonStyle } from '../data/variations';
import { getButtonDynamicStyles } from '../utils/styleHelpers';
import { getThemedIcons } from '../utils/iconUtils';

interface BrandAssetKitProps {
    font: FontPair;
    palette: ColorPalette;
    buttonStyle: ButtonStyle;
    logoUrl?: string;
    mission: string;
    onBack: () => void;
}

export const BrandAssetKit: React.FC<BrandAssetKitProps> = ({ font, palette, buttonStyle, logoUrl, mission, onBack }) => {
    const icons = getThemedIcons(palette.colors.primary);
    const { className: btnClassPrimary, style: btnStylePrimary } = getButtonDynamicStyles(buttonStyle, palette, 'primary');
    const { className: btnClassSecondary, style: btnStyleSecondary } = getButtonDynamicStyles(buttonStyle, palette, 'secondary');

    return (
        <div className="min-h-screen bg-gray-50 p-8 md:p-12">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-black text-white p-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Brand Asset Kit</h1>
                        <p className="opacity-80 max-w-xl">{mission}</p>
                    </div>
                    <button
                        onClick={onBack}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        Back to Builder
                    </button>
                </div>

                <div className="p-8 md:p-12 space-y-16">
                    {/* Logo Section */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8 pb-2 border-b">Logos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <h3 className="font-medium text-gray-500">Primary Logo</h3>
                                <div className="p-8 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center aspect-square">
                                    {logoUrl && <img src={logoUrl} alt="Primary Logo" className="w-32 h-32 object-contain" />}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-medium text-gray-500">Grayscale</h3>
                                <div className="p-8 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center aspect-square">
                                    {logoUrl && <img src={logoUrl} alt="Grayscale Logo" className="w-32 h-32 object-contain grayscale" />}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-medium text-gray-500">Favicon (32px)</h3>
                                <div className="p-8 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center aspect-square">
                                    {logoUrl && <img src={logoUrl} alt="Favicon" className="w-8 h-8 object-contain" />}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Typography Section */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8 pb-2 border-b">Typography</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="font-medium text-gray-500 mb-4">Header Font: {font.name.split(' + ')[0]}</h3>
                                <div style={{ fontFamily: font.headerFont }} className="space-y-4">
                                    <div className="text-4xl font-bold">Aa Bb Cc Dd Ee</div>
                                    <div className="text-6xl font-bold">The quick brown fox jumps over the lazy dog.</div>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-500 mb-4">Body Font: {font.name.split(' + ')[1]}</h3>
                                <div style={{ fontFamily: font.bodyFont }} className="space-y-4">
                                    <div className="text-2xl">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj</div>
                                    <p className="text-lg leading-relaxed">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Color Palette Section */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8 pb-2 border-b">Color Palette</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            {Object.entries(palette.colors).map(([name, hex]) => (
                                <div key={name} className="space-y-2">
                                    <div
                                        className="h-24 rounded-xl shadow-sm border border-gray-100"
                                        style={{ backgroundColor: hex }}
                                    ></div>
                                    <div>
                                        <div className="font-medium capitalize">{name}</div>
                                        <div className="text-sm text-gray-500 font-mono">{hex}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* UI Components Section */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8 pb-2 border-b">UI Components</h2>
                        <div className="flex flex-wrap gap-8 items-center">
                            <div className="space-y-2 text-center">
                                <div className="text-sm text-gray-500 mb-2">Primary Button</div>
                                <button className={`${btnClassPrimary} px-8 py-3 min-w-[160px]`} style={btnStylePrimary}>
                                    Get Started
                                </button>
                            </div>
                            <div className="space-y-2 text-center">
                                <div className="text-sm text-gray-500 mb-2">Secondary Button</div>
                                <button className={`${btnClassSecondary} px-8 py-3 min-w-[160px]`} style={btnStyleSecondary}>
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Icon Set Section */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8 pb-2 border-b">Icon Set</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                            {Object.entries(icons).map(([name, src]) => (
                                <div key={name} className="flex flex-col items-center p-6 bg-gray-50 rounded-xl border border-gray-100">
                                    <img src={src} alt={name} className="w-8 h-8 mb-4" />
                                    <span className="text-sm font-medium capitalize text-gray-600">{name}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
