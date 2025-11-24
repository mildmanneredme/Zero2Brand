import React from 'react';
import { FontPair, ColorPalette, ButtonStyle } from '../data/variations';

interface LiveLandingPageProps {
    font: FontPair;
    palette: ColorPalette;
    buttonStyle: ButtonStyle;
    mission: string;
}

export const LiveLandingPage: React.FC<LiveLandingPageProps> = ({ font, palette, buttonStyle, mission }) => {
    const { colors } = palette;

    return (
        <div
            className="min-h-screen transition-colors duration-500"
            style={{
                backgroundColor: colors.background,
                color: colors.text,
                fontFamily: font.bodyFont
            }}
        >
            {/* Navbar */}
            <nav className="border-b transition-colors duration-500" style={{ borderColor: `${colors.text}20` }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-8 h-8 rounded-lg"
                            style={{ backgroundColor: colors.primary }}
                        ></div>
                        <span
                            className="text-xl font-bold"
                            style={{ fontFamily: font.headerFont }}
                        >
                            BrandName
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#" className="hover:opacity-70 transition-opacity">Features</a>
                        <a href="#" className="hover:opacity-70 transition-opacity">Pricing</a>
                        <a href="#" className="hover:opacity-70 transition-opacity">About</a>
                        <button className={buttonStyle.classes}>
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h1
                            className="text-5xl lg:text-7xl font-bold leading-tight"
                            style={{ fontFamily: font.headerFont }}
                        >
                            Build your <span style={{ color: colors.primary }}>dream</span> with us.
                        </h1>
                        <p className="text-xl opacity-80 max-w-lg">
                            {mission || "We help companies scale their vision with cutting-edge tools and design systems that work for everyone."}
                        </p>
                        <div className="flex gap-4">
                            <button className={buttonStyle.classes}>
                                Start Free Trial
                            </button>
                            <button
                                className="px-6 py-2 rounded-lg border transition-colors hover:bg-black/5"
                                style={{ borderColor: colors.text, color: colors.text }}
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div
                        className="aspect-square rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden"
                        style={{ backgroundColor: colors.secondary }}
                    >
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="text-9xl opacity-50 select-none" style={{ color: colors.background }}>
                            🚀
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-24" style={{ backgroundColor: `${colors.primary}10` }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2
                            className="text-4xl font-bold mb-4"
                            style={{ fontFamily: font.headerFont }}
                        >
                            Why choose us?
                        </h2>
                        <p className="opacity-70 max-w-2xl mx-auto">
                            Everything you need to succeed in one powerful platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="p-8 rounded-xl shadow-lg transition-transform hover:-translate-y-1"
                                style={{ backgroundColor: colors.background }}
                            >
                                <div
                                    className="w-12 h-12 rounded-lg mb-6 flex items-center justify-center text-2xl"
                                    style={{ backgroundColor: `${colors.accent}40`, color: colors.primary }}
                                >
                                    {i === 1 ? '⚡️' : i === 2 ? '🛡️' : '📈'}
                                </div>
                                <h3
                                    className="text-xl font-bold mb-3"
                                    style={{ fontFamily: font.headerFont }}
                                >
                                    Feature {i}
                                </h3>
                                <p className="opacity-70">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
                    <h2
                        className="text-4xl lg:text-5xl font-bold"
                        style={{ fontFamily: font.headerFont }}
                    >
                        Ready to get started?
                    </h2>
                    <p className="text-xl opacity-80">
                        Join thousands of satisfied customers today.
                    </p>
                    <button className={buttonStyle.classes}>
                        Create Account Now
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t py-12" style={{ borderColor: `${colors.text}20` }}>
                <div className="max-w-7xl mx-auto px-4 text-center opacity-50 text-sm">
                    © 2024 BrandName. All rights reserved.
                </div>
            </footer>
        </div>
    );
};
