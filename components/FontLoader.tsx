import React, { useEffect } from 'react';
import { FontPair } from '../data/variations';

interface FontLoaderProps {
    font: FontPair;
}

export const FontLoader: React.FC<FontLoaderProps> = ({ font }) => {
    useEffect(() => {
        const loadFont = () => {
            const linkId = 'dynamic-font-loader';
            let link = document.getElementById(linkId) as HTMLLinkElement;

            if (!link) {
                link = document.createElement('link');
                link.id = linkId;
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            }

            // Construct Google Fonts URL for the specific pair
            // We need to handle spaces and ensure we request weights
            const fonts = [font.headerFont, font.bodyFont];
            const uniqueFonts = Array.from(new Set(fonts));

            const fontParams = uniqueFonts.map(f =>
                `family=${f.replace(/\s+/g, '+')}:wght@400;700`
            ).join('&');

            link.href = `https://fonts.googleapis.com/css2?${fontParams}&display=swap`;
        };

        loadFont();
    }, [font]);

    return null; // This component doesn't render anything visible
};
