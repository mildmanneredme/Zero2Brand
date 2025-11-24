import { ButtonStyle, ColorPalette } from '../data/variations';

export const getButtonDynamicStyles = (style: ButtonStyle, palette: ColorPalette) => {
    const { colors } = palette;
    const baseStyle: React.CSSProperties = {};
    let dynamicClasses = style.classes;

    switch (style.type) {
        case 'solid':
            baseStyle.backgroundColor = colors.primary;
            baseStyle.color = '#ffffff'; // Assuming white text on primary for now
            break;
        case 'outline':
            baseStyle.borderColor = colors.primary;
            baseStyle.color = colors.primary;
            baseStyle.backgroundColor = 'transparent';
            baseStyle.borderWidth = '2px';
            break;
        case 'soft':
            baseStyle.backgroundColor = `${colors.primary}20`; // 20% opacity hex
            baseStyle.color = colors.primary;
            break;
        case 'gradient':
            baseStyle.backgroundImage = `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`;
            baseStyle.color = '#ffffff';
            break;
        case 'glow':
            baseStyle.backgroundColor = colors.primary;
            baseStyle.color = '#ffffff';
            baseStyle.boxShadow = `0 0 15px ${colors.primary}80`; // 50% opacity glow
            break;
        case 'glass':
            baseStyle.backgroundColor = `${colors.primary}20`; // Glass tint
            baseStyle.borderColor = `${colors.primary}40`;
            baseStyle.color = '#ffffff'; // Glass usually on dark/colored bg
            break;
        case 'ghost':
            baseStyle.color = colors.primary;
            baseStyle.backgroundColor = 'transparent';
            break;
        case 'text':
            baseStyle.color = colors.primary;
            baseStyle.backgroundColor = 'transparent';
            baseStyle.textDecorationColor = colors.primary;
            break;
        case '3d':
            baseStyle.backgroundColor = colors.primary;
            baseStyle.color = '#ffffff';
            baseStyle.borderBottomColor = colors.secondary; // Use secondary as shade
            break;
        case 'brutalist':
            baseStyle.backgroundColor = colors.accent;
            baseStyle.color = colors.background === '#000000' || colors.background === '#18181b' ? '#000000' : colors.text;
            baseStyle.borderColor = colors.text;
            baseStyle.boxShadow = `4px 4px 0px 0px ${colors.text}`;
            break;
        case 'anime':
            baseStyle.backgroundColor = colors.primary;
            baseStyle.color = '#ffffff';
            baseStyle.borderColor = colors.secondary;
            break;
        case 'cyberpunk':
            baseStyle.backgroundColor = 'transparent';
            baseStyle.color = colors.accent;
            baseStyle.borderColor = colors.accent;
            baseStyle.boxShadow = `0 0 5px ${colors.accent}`;
            break;
        case 'vinyl':
            baseStyle.background = `conic-gradient(#1a1a1a 0%, #333 10%, #1a1a1a 20%, #333 30%, #1a1a1a 40%, ${colors.primary} 50%, #1a1a1a 60%, #333 70%, #1a1a1a 80%, #333 90%, #1a1a1a 100%)`;
            baseStyle.borderColor = '#111';
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
            break;
        default:
            baseStyle.backgroundColor = colors.primary;
            baseStyle.color = '#ffffff';
    }

    return {
        className: dynamicClasses,
        style: baseStyle
    };
};
