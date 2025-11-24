import { ColorPalette } from '../data/variations';

export const generateFallbackLogos = (palette: ColorPalette): string[] => {
    const { primary, secondary, accent } = palette.colors;

    // Circle Logo
    const circleLogo = `data:image/svg+xml,${encodeURIComponent(`
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="${primary}"/>
            <circle cx="50" cy="50" r="25" fill="${secondary}"/>
        </svg>
    `)}`;

    // Square Logo
    const squareLogo = `data:image/svg+xml,${encodeURIComponent(`
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" fill="${primary}" rx="8"/>
            <rect x="25" y="25" width="50" height="50" fill="${accent}" rx="4"/>
        </svg>
    `)}`;

    // Triangle Logo
    const triangleLogo = `data:image/svg+xml,${encodeURIComponent(`
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,10 90,90 10,90" fill="${primary}"/>
            <polygon points="50,30 70,70 30,70" fill="${secondary}"/>
        </svg>
    `)}`;

    // Hexagon Logo
    const hexagonLogo = `data:image/svg+xml,${encodeURIComponent(`
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" fill="${primary}"/>
            <polygon points="50,25 70,37.5 70,62.5 50,75 30,62.5 30,37.5" fill="${accent}"/>
        </svg>
    `)}`;

    // Abstract Logo
    const abstractLogo = `data:image/svg+xml,${encodeURIComponent(`
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="25" fill="${primary}"/>
            <circle cx="65" cy="65" r="25" fill="${secondary}"/>
            <circle cx="50" cy="50" r="15" fill="${accent}"/>
        </svg>
    `)}`;

    return [circleLogo, squareLogo, triangleLogo, hexagonLogo, abstractLogo];
};
