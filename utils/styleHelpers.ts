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
        case 'pill': // Assuming 'pill' maps to solid logic if not explicitly handled
            if (variant === 'primary' || variant === 'hero') {
                baseStyle.backgroundColor = colors.primary;
                baseStyle.color = '#ffffff';
            } else {
                baseStyle.backgroundColor = 'transparent';
                baseStyle.border = `2px solid ${colors.primary}`;
                baseStyle.color = colors.primary;
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
                baseStyle.backgroundColor = 'transparent';
                baseStyle.color = colors.secondary;
            }
            break;
        case 'gradient':
            if (variant === 'primary' || variant === 'hero') {
                baseStyle.backgroundImage = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
                baseStyle.color = '#ffffff';
            } else {
                baseStyle.backgroundImage = 'none';
                baseStyle.border = `2px solid ${colors.primary}`;
                baseStyle.color = colors.primary;
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
                baseStyle.boxShadow = `0 0 5px ${colors.primary}`;
            }
            break;
        case 'glass':
            baseStyle.backgroundColor = `${colors.primary}40`; // 25% opacity
            baseStyle.borderColor = `${colors.primary}80`;
            baseStyle.color = '#ffffff';
            if (variant === 'secondary') {
                baseStyle.backgroundColor = `${colors.secondary}20`;
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
                baseStyle.backgroundColor = colors.secondary;
                baseStyle.borderBottomColor = colors.primary;
            }
            break;
        case 'brutalist':
            baseStyle.backgroundColor = colors.accent;
            baseStyle.color = colors.background === '#000000' || colors.background === '#18181b' ? '#000000' : colors.text;
            baseStyle.borderColor = colors.text;
            baseStyle.boxShadow = `4px 4px 0px 0px ${colors.text}`;
            if (variant === 'secondary') {
                baseStyle.backgroundColor = 'transparent';
            }
            break;
        case 'anime':
            baseStyle.backgroundColor = colors.primary;
            baseStyle.color = '#ffffff';
            baseStyle.borderColor = colors.secondary;
            if (variant === 'secondary') {
                baseStyle.backgroundColor = '#fff';
                baseStyle.color = colors.primary;
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
                baseStyle.backgroundColor = colors.secondary;
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
                baseStyle.boxShadow = 'none';
                baseStyle.border = `1px solid ${colors.primary}`;
                baseStyle.color = colors.primary;
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
