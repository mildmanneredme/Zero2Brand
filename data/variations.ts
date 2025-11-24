export interface FontPair {
    name: string;
    headerFont: string;
    bodyFont: string;
    description: string;
}

export interface ColorPalette {
    name: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
    };
}

export interface ButtonStyle {
    name: string;
    type: 'solid' | 'outline' | 'soft' | 'gradient' | 'glow' | 'glass' | 'ghost' | 'text' | '3d' | 'brutalist' | 'anime' | 'cyberpunk' | 'vinyl' | 'pixel';
    classes: string; // Structural classes only (padding, rounded, etc.)
    description: string;
}

// ... (FONTS and PALETTES remain unchanged)

export const BUTTON_STYLES: ButtonStyle[] = [
    { name: "Rounded Standard", type: "solid", classes: "rounded-lg px-6 py-2 transition-all shadow-sm hover:shadow-md", description: "Standard rounded" },
    { name: "Pill Shape", type: "solid", classes: "rounded-full px-8 py-2 transition-all shadow-md hover:shadow-lg", description: "Fully rounded pill" },
    { name: "Sharp Corners", type: "solid", classes: "rounded-none px-6 py-2 transition-all hover:opacity-90", description: "Square corners" },
    { name: "Outline Rounded", type: "outline", classes: "bg-transparent border-2 rounded-lg px-6 py-2 transition-all hover:bg-opacity-10", description: "Border only" },
    { name: "Soft Pill", type: "soft", classes: "rounded-full px-6 py-2 transition-all hover:bg-opacity-80", description: "Pastel background" },
    { name: "Gradient Flow", type: "gradient", classes: "text-white rounded-lg px-6 py-2 transition-all hover:opacity-90 shadow-md", description: "Linear gradient" },
    { name: "Neumorphic", type: "solid", classes: "text-gray-700 rounded-lg shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] px-6 py-2 transition-all active:scale-95", description: "Soft 3D effect" }, // Neumorphic is tricky to color dynamically, keeping gray for now or needs complex logic
    { name: "Glassmorphism", type: "glass", classes: "backdrop-blur-md border border-white/20 text-white rounded-lg px-6 py-2 shadow-lg transition-all hover:bg-white/20", description: "Frosted glass" },
    { name: "Retro Brutalist", type: "brutalist", classes: "border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-6 py-2 transition-all", description: "Hard shadows" },
    { name: "Minimal Text", type: "text", classes: "bg-transparent underline underline-offset-4 px-0 py-2 transition-all hover:opacity-70", description: "Text link style" },
    { name: "Neon Glow", type: "glow", classes: "text-white rounded-md px-6 py-2 transition-all", description: "Neon glow" },
    { name: "3D Pressable", type: "3d", classes: "text-white border-b-4 rounded-lg active:border-b-0 active:translate-y-1 px-6 py-2 transition-all", description: "Chunky 3D effect" },
    { name: "Ghost", type: "ghost", classes: "bg-transparent rounded-full px-6 py-2 transition-all hover:bg-opacity-10", description: "Semi-transparent" },
    { name: "Anime Speed", type: "anime", classes: "text-white -skew-x-12 border-l-4 border-r-4 px-8 py-2 hover:skew-x-0 hover:scale-110 transition-all duration-300 uppercase font-black tracking-wider", description: "High energy skew" },
    { name: "Cyberpunk Glitch", type: "cyberpunk", classes: "text-white rounded-none border border-current px-6 py-2 font-mono uppercase tracking-widest hover:shadow-[0_0_10px_currentColor] transition-all relative overflow-hidden group", description: "Tech glitch effect" },
    { name: "Vinyl Record", type: "vinyl", classes: "text-transparent rounded-full w-12 h-12 flex items-center justify-center hover:animate-spin transition-all shadow-xl border-4 border-gray-900 relative overflow-hidden", description: "Spinning record" },
    { name: "Retro Pixel", type: "pixel", classes: "text-white px-6 py-2 font-mono text-xs uppercase tracking-widest hover:translate-y-1 transition-none", description: "8-bit arcade style" },
    { name: "Neobrutalism", type: "brutalist", classes: "border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] px-6 py-3 font-bold transition-all bg-white text-black", description: "Trendy bold style" },
    { name: "Circle Icon", type: "solid", classes: "text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-all", description: "Icon only (circle)" },
    { name: "Floating Fab", type: "solid", classes: "text-white rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all px-6 py-3", description: "Floating action" }
];
