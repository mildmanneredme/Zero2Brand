import { ColorPalette } from '../data/variations';

// Helper to get relative luminance
// https://www.w3.org/TR/WCAG20/#relativeluminancedef
const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16); // Convert hex to int
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const [lr, lg, lb] = [r, g, b].map(c => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
};

export const isDark = (hex: string): boolean => {
    return getLuminance(hex) < 0.5;
};

export const getThemeColors = (palette: ColorPalette, mode: 'dark' | 'light') => {
    const { colors } = palette;
    const bgIsDark = isDark(colors.background);

    // If mode matches palette natural state, return as is
    if ((mode === 'dark' && bgIsDark) || (mode === 'light' && !bgIsDark)) {
        return colors;
    }

    // Otherwise, swap background and text to force the mode
    // We also might need to adjust primary/secondary if they don't have contrast,
    // but for now, swapping bg/text is the 80/20 solution.
    return {
        ...colors,
        background: colors.text,
        text: colors.background
    };
};
