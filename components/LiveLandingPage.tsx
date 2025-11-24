import React from 'react';
import { FontPair, ColorPalette, ButtonStyle, ButtonAnimation } from '../data/variations';
import { getButtonDynamicStyles } from '../utils/styleHelpers';
import { getThemeColors } from '../utils/colorUtils';

interface LiveLandingPageProps {
    font: FontPair;
    palette: ColorPalette;
    buttonStyle: ButtonStyle;
    buttonAnimation: ButtonAnimation;
    mission: string;
    mode: 'dark' | 'light';
    content: { headline: string, subheadline: string, cta: string, features: string[] } | null;
}

export const LiveLandingPage: React.FC<LiveLandingPageProps> = ({ font, palette, buttonStyle, buttonAnimation, mission, mode, content }) => {
    const colors = getThemeColors(palette, mode);
    const themePalette = { ...palette, colors };

    // Get styles for different variants
    const { className: btnClassPrimary, style: btnStylePrimary } = getButtonDynamicStyles(buttonStyle, themePalette, 'primary');
    const { className: btnClassSecondary, style: btnStyleSecondary } = getButtonDynamicStyles(buttonStyle, themePalette, 'secondary');
    const { className: btnClassHero, style: btnStyleHero } = getButtonDynamicStyles(buttonStyle, themePalette, 'hero');

    // Common button classes for sizing and animation
    const commonBtnClasses = `min-w-[160px] text-center justify-center ${buttonAnimation.class}`;
    const heroBtnClasses = `${btnClassHero} ${commonBtnClasses}`;
    const secondaryBtnClasses = `${btnClassSecondary} ${commonBtnClasses}`;
    const primaryBtnClasses = `${btnClassPrimary} ${commonBtnClasses}`;

    const headline = content?.headline || "Build your dream with us.";
    const subheadline = content?.subheadline || mission || "The perfect solution for your business needs.";
    const ctaText = content?.cta || "Get Started";
    const features = content?.features || ["Fast Performance", "Secure Platform", "24/7 Support"];

    return (
        <div
            className="min-h-screen w-full transition-colors duration-500 flex flex-col"
            style={{
                backgroundColor: colors.background,
                color: colors.text,
                fontFamily: font.bodyFont
            }}
        >
            {/* Navbar */}
            <nav className="flex justify-between items-center px-12 py-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: colors.primary }}></div>
                    <span className="font-bold text-xl tracking-tight" style={{ fontFamily: font.headerFont }}>BrandName</span>
                </div>
                <div className="flex gap-8 text-sm font-medium opacity-80">
                    <a href="#" className="hover:opacity-100 transition-opacity">Features</a>
                    <a href="#" className="hover:opacity-100 transition-opacity">Pricing</a>
                    <a href="#" className="hover:opacity-100 transition-opacity">About</a>
                    <button
                        className={btnClassSecondary}
                        style={{ ...btnStyleSecondary, padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}
                    >
                        Login
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col justify-center px-12 lg:px-24 relative overflow-hidden py-20">
                <div className="max-w-3xl z-10">
                    <h1
                        className="text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                        style={{ fontFamily: font.headerFont }}
                    >
                        {headline}
                    </h1>
                    <p className="text-xl opacity-80 mb-10 max-w-xl leading-relaxed">
                        {subheadline}
                    </p>
                    <div className="flex gap-4 items-center flex-wrap">
                        <button
                            className={heroBtnClasses}
                            style={btnStyleHero}
                        >
                            {ctaText}
                        </button>
                        <button
                            className={secondaryBtnClasses}
                            style={btnStyleSecondary}
                        >
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Abstract Visual / Features */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 mr-12 rounded-3xl opacity-20 flex flex-col gap-4 p-8 justify-center"
                    style={{ backgroundColor: colors.primary }}>
                    {features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.accent }}></div>
                            <span className="font-bold text-lg" style={{ fontFamily: font.headerFont }}>{feat}</span>
                        </div>
                    ))}
                </div>
            </main>

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
                    <button className={primaryBtnClasses} style={btnStylePrimary}>
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
