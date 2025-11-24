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

export const FONTS: FontPair[] = [
    { name: "Modern Grotesque", headerFont: "Inter", bodyFont: "Inter", description: "Clean, neutral, and highly legible. The standard for modern SaaS." },
    { name: "Elegant Serif", headerFont: "Playfair Display", bodyFont: "Lato", description: "High-contrast serif headers for a luxurious feel." },
    { name: "Tech Mono", headerFont: "Space Grotesk", bodyFont: "DM Sans", description: "Geometric and technical, perfect for dev tools." },
    { name: "Friendly Round", headerFont: "Quicksand", bodyFont: "Nunito", description: "Soft, rounded corners for an approachable vibe." },
    { name: "Bold Editorial", headerFont: "Oswald", bodyFont: "Lora", description: "Strong, tall headers paired with a classic serif." },
    { name: "Startup Pop", headerFont: "Chivo", bodyFont: "Public Sans", description: "Trendy, characterful sans-serifs popular in 2025." },
    { name: "Minimalist Swiss", headerFont: "IBM Plex Sans", bodyFont: "IBM Plex Sans", description: "Objective, rational, and grid-friendly." },
    { name: "Retro Warmth", headerFont: "Fraunces", bodyFont: "Mulish", description: "Soft serif with a 70s throwback feel." },
    { name: "Industrial", headerFont: "Teko", bodyFont: "Rajdhani", description: "Squared-off and mechanical." },
    { name: "Humanist", headerFont: "Work Sans", bodyFont: "Open Sans", description: "Organic strokes for a natural reading experience." },
    { name: "Geometric Sharp", headerFont: "Syne", bodyFont: "Manrope", description: "Unique art-house geometric headers." },
    { name: "Handwritten", headerFont: "Permanent Marker", bodyFont: "Kalam", description: "Casual, personal, and unpolished." },
    { name: "Luxury Script", headerFont: "Cinzel", bodyFont: "Fauna One", description: "Classical proportions for high-end brands." },
    { name: "Digital Native", headerFont: "Outfit", bodyFont: "Plus Jakarta Sans", description: "Optimized for screens, modern and friendly." },
    { name: "Wide Stance", headerFont: "Archivo Black", bodyFont: "Archivo", description: "Heavy, wide headers for maximum impact." },
    { name: "Narrow Focus", headerFont: "Antonio", bodyFont: "Pathway Gothic One", description: "Tall and condensed for tight spaces." },
    { name: "Slab Strong", headerFont: "Roboto Slab", bodyFont: "Roboto", description: "Sturdy and reliable." },
    { name: "Fashion Forward", headerFont: "Bodoni Moda", bodyFont: "Jost", description: "High fashion contrast." },
    { name: "Code & Create", headerFont: "Fira Code", bodyFont: "Fira Sans", description: "Developer-centric aesthetic." },
    { name: "Soft & Bouncy", headerFont: "Fredoka One", bodyFont: "Varela Round", description: "Playful and energetic." }
];

export const PALETTES: ColorPalette[] = [
    { name: "Midnight Blue", colors: { primary: "#1e3a8a", secondary: "#3b82f6", accent: "#f59e0b", background: "#0f172a", text: "#f8fafc" } },
    { name: "Forest Calm", colors: { primary: "#14532d", secondary: "#4ade80", accent: "#fcd34d", background: "#f0fdf4", text: "#14532d" } },
    { name: "Sunset Warmth", colors: { primary: "#c2410c", secondary: "#fb923c", accent: "#fde047", background: "#fff7ed", text: "#431407" } },
    { name: "Electric Violet", colors: { primary: "#7c3aed", secondary: "#a78bfa", accent: "#2dd4bf", background: "#0f172a", text: "#f8fafc" } }, // More vibrant
    { name: "Slate Minimal", colors: { primary: "#334155", secondary: "#94a3b8", accent: "#38bdf8", background: "#ffffff", text: "#0f172a" } },
    { name: "Ocean Breeze", colors: { primary: "#0e7490", secondary: "#22d3ee", accent: "#a5f3fc", background: "#ecfeff", text: "#164e63" } },
    { name: "Cherry Pop", colors: { primary: "#be123c", secondary: "#fb7185", accent: "#fecdd3", background: "#fff1f2", text: "#881337" } },
    { name: "Coffee Roast", colors: { primary: "#451a03", secondary: "#92400e", accent: "#d97706", background: "#fffbeb", text: "#451a03" } },
    { name: "Cyber Neon", colors: { primary: "#2563eb", secondary: "#f472b6", accent: "#34d399", background: "#000000", text: "#ffffff" } },
    { name: "Pastel Soft", colors: { primary: "#f9a8d4", secondary: "#fdba74", accent: "#86efac", background: "#fff", text: "#374151" } },
    { name: "Corporate Blue", colors: { primary: "#0369a1", secondary: "#0ea5e9", accent: "#7dd3fc", background: "#f0f9ff", text: "#0c4a6e" } },
    { name: "Earthy Clay", colors: { primary: "#9a3412", secondary: "#ea580c", accent: "#fdba74", background: "#ffedd5", text: "#431407" } },
    { name: "Royal Gold", colors: { primary: "#4c1d95", secondary: "#7c3aed", accent: "#fbbf24", background: "#1e1b4b", text: "#f3e8ff" } },
    { name: "Mint Fresh", colors: { primary: "#047857", secondary: "#34d399", accent: "#6ee7b7", background: "#ecfdf5", text: "#064e3b" } },
    { name: "Dark Mode", colors: { primary: "#3b82f6", secondary: "#64748b", accent: "#f43f5e", background: "#18181b", text: "#e4e4e7" } },
    { name: "Berry Smoothie", colors: { primary: "#831843", secondary: "#db2777", accent: "#fbcfe8", background: "#fdf2f8", text: "#500724" } },
    { name: "Lemon Lime", colors: { primary: "#65a30d", secondary: "#84cc16", accent: "#bef264", background: "#f7fee7", text: "#365314" } },
    { name: "Stormy Sky", colors: { primary: "#374151", secondary: "#6b7280", accent: "#9ca3af", background: "#f3f4f6", text: "#111827" } },
    { name: "Candy Crush", colors: { primary: "#db2777", secondary: "#9333ea", accent: "#f472b6", background: "#fff0f5", text: "#4a044e" } },
    { name: "Monochrome", colors: { primary: "#000000", secondary: "#525252", accent: "#d4d4d4", background: "#ffffff", text: "#000000" } }
];

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
    { name: "Retro Pixel", type: "pixel", classes: "text-white px-6 py-2 font-mono text-xs uppercase tracking-widest hover:translate-y-1 transition-none", description: "8-bit arcade style" },
    { name: "Neobrutalism", type: "brutalist", classes: "border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] px-6 py-3 font-bold transition-all bg-white text-black", description: "Trendy bold style" },
    { name: "Spotlight", type: "spotlight", classes: "rounded-full px-8 py-3 transition-all relative overflow-hidden group", description: "Dark with top glow" }
];
