import { ButtonStyle, ColorPalette } from '../data/variations';

export const getButtonDynamicStyles = (
    buttonStyle: ButtonStyle,
    palette: ColorPalette,
    variant: 'primary' | 'secondary' | 'hero' = 'primary'
): { className: string, style: any } => {
    const { colors } = palette;
    const baseStyle: any = {};
    let className = buttonStyle.classes;

    // Helper to adjust opacity/lightness for secondary variants
    const getSecondaryColor = (color: string) => color; // Simplified for now, could use color utils

    switch (buttonStyle.type) {
        case 'solid':
            if (variant === 'primary' || variant === 'hero') {
                baseStyle.backgroundColor = colors.primary;
                baseStyle.color = '#ffffff';
            } else {
                baseStyle.backgroundColor = 'transparent';
                baseStyle.border = `2px solid ${colors.primary}`;
                baseStyle.color = colors.text; // Use text color for better readability on secondary
            }
            break;
        case 'outline':
            baseStyle.backgroundColor = 'transparent';
            baseStyle.borderColor = colors.primary;
            baseStyle.color = colors.primary;
            if (variant === 'hero') {
                baseStyle.borderWidth = '3px';
                baseStyle.fontWeight = 'bold';
            }
            break;
        case 'soft':
            if (variant === 'primary' || variant === 'hero') {
                baseStyle.backgroundColor = colors.secondary; // Using secondary/lighter color for soft bg
                baseStyle.color = colors.text;
                baseStyle.opacity = 0.9;
            } else {
                baseStyle.backgroundColor = `${colors.secondary}40`; // More transparent for secondary
                baseStyle.color = colors.text;
            }
            break;
        case 'gradient':
            if (variant === 'primary' || variant === 'hero') {
                baseStyle.backgroundImage = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
                baseStyle.color = '#ffffff';
            } else {
                baseStyle.backgroundImage = 'none';
                baseStyle.border = `2px solid ${colors.primary}`;
                baseStyle.color = colors.text;
                // Text gradient clip could be cool here but complex
            }
            break;
        case 'glow':
            baseStyle.backgroundColor = colors.primary;
            baseStyle.color = '#ffffff';
            baseStyle.boxShadow = `0 0 15px ${colors.primary}`;
            if (variant === 'secondary') {
                baseStyle.backgroundColor = 'transparent';
                baseStyle.border = `1px solid ${colors.primary}`;
                baseStyle.boxShadow = `0 0 5px ${colors.primary}`; // Keep glow but smaller
                baseStyle.color = colors.primary;
            }
            break;
        case 'glass':
            baseStyle.backgroundColor = `${colors.primary}40`; // 25% opacity
            baseStyle.borderColor = `${colors.primary}80`;
            baseStyle.color = '#ffffff';
            if (variant === 'secondary') {
                baseStyle.backgroundColor = `${colors.secondary}20`;
                baseStyle.borderColor = `${colors.secondary}60`;
                baseStyle.color = colors.text;
            }
            break;
        case 'ghost':
            baseStyle.backgroundColor = 'transparent';
            baseStyle.color = colors.primary;
            if (variant === 'hero') {
                baseStyle.fontSize = '1.1em';
            }
            break;
        case 'text':
            baseStyle.color = colors.primary;
            break;
        case '3d':
            baseStyle.backgroundColor = colors.primary;
            baseStyle.color = '#ffffff';
            baseStyle.borderBottomColor = colors.secondary; // Darker shade ideally
            if (variant === 'secondary') {
                baseStyle.backgroundColor = 'transparent';
                baseStyle.border = `2px solid ${colors.primary}`;
                baseStyle.borderBottom = `4px solid ${colors.primary}`; // Keep 3D effect
                baseStyle.color = colors.text;
            }
            break;
        case 'brutalist':
            baseStyle.backgroundColor = colors.accent;
            baseStyle.color = colors.background === '#000000' || colors.background === '#18181b' ? '#000000' : colors.text;
            baseStyle.borderColor = colors.text;
            baseStyle.boxShadow = `4px 4px 0px 0px ${colors.text}`;
            if (variant === 'secondary') {
                baseStyle.backgroundColor = 'transparent';
                baseStyle.border = `2px solid ${colors.text}`;
                baseStyle.boxShadow = `2px 2px 0px 0px ${colors.text}`; // Keep shadow but smaller
                baseStyle.color = colors.text;
            }
            break;
        case 'anime':
            baseStyle.backgroundColor = colors.primary;
            baseStyle.color = '#ffffff';
            baseStyle.borderColor = colors.secondary;
            if (variant === 'secondary') {
                baseStyle.backgroundColor = 'transparent';
                baseStyle.border = `2px solid ${colors.primary}`;
                baseStyle.borderLeft = `4px solid ${colors.primary}`; // Keep anime accents
                baseStyle.borderRight = `4px solid ${colors.primary}`;
                baseStyle.color = colors.text;
                // Skew is handled by className, so it persists
            }
            break;
        case 'cyberpunk':
            baseStyle.backgroundColor = 'transparent';
            baseStyle.color = colors.accent;
            baseStyle.borderColor = colors.accent;
            baseStyle.boxShadow = `0 0 5px ${colors.accent}`;
            if (variant === 'primary') {
                baseStyle.backgroundColor = `${colors.accent}20`;
            }
            if (variant === 'secondary') {
                baseStyle.borderStyle = 'dashed'; // Glitchy feel
                baseStyle.boxShadow = 'none';
                baseStyle.color = colors.text;
            }
            break;
        case 'pixel':
            baseStyle.backgroundColor = colors.primary;
            baseStyle.color = '#ffffff';
            baseStyle.boxShadow = `
        inset 2px 2px 0px 0px #ffffff40,
        inset -2px -2px 0px 0px #00000040,
        2px 2px 0px 0px #000000,
        4px 4px 0px 0px ${colors.secondary}
      `;
            if (variant === 'secondary') {
                baseStyle.backgroundColor = 'transparent';
                baseStyle.color = colors.text;
                baseStyle.boxShadow = `
                    2px 2px 0px 0px ${colors.text},
                    inset 2px 2px 0px 0px ${colors.text}
                 `; // Pixelated border effect
            }
            break;
        case 'spotlight':
            // Dark button with top glow
            baseStyle.backgroundColor = '#0f172a'; // Dark slate
            baseStyle.color = '#ffffff';
            baseStyle.border = `1px solid ${colors.primary}40`;
            baseStyle.boxShadow = `inset 0 10px 20px -10px ${colors.primary}`;

            if (variant === 'secondary') {
                baseStyle.backgroundColor = 'transparent';
                baseStyle.boxShadow = `inset 0 4px 10px -5px ${colors.primary}`; // Subtle inner glow
                baseStyle.border = `1px solid ${colors.primary}60`;
                baseStyle.color = colors.text;
            }
            break;
        default:
            baseStyle.backgroundColor = colors.primary;
            baseStyle.color = '#ffffff';
    }

    // Hero adjustments (generic)
    if (variant === 'hero') {
        className += ' text-lg px-10 py-4'; // Make it bigger
    }

    return { className, style: baseStyle };
};
