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
    classes: string;
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
    { name: "Rounded Blue", classes: "bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm px-6 py-2 transition-all", description: "Standard rounded" },
    { name: "Pill Green", classes: "bg-green-600 text-white rounded-full hover:bg-green-700 shadow-md px-8 py-2 transition-all", description: "Fully rounded pill" },
    { name: "Sharp Black", classes: "bg-black text-white rounded-none hover:bg-gray-800 px-6 py-2 transition-all", description: "Square corners" },
    { name: "Outline Indigo", classes: "bg-transparent border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 px-6 py-2 transition-all", description: "Border only" },
    { name: "Soft Purple", classes: "bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 px-6 py-2 transition-all", description: "Pastel background" },
    { name: "Gradient Sunset", classes: "bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 px-6 py-2 transition-all", description: "Linear gradient" },
    { name: "Neumorphic", classes: "bg-gray-200 text-gray-700 rounded-lg shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] px-6 py-2 transition-all active:scale-95", description: "Soft 3D effect" },
    { name: "Glassmorphism", classes: "bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg hover:bg-white/20 px-6 py-2 shadow-lg transition-all", description: "Frosted glass (best on dark)" },
    { name: "Retro Brutalist", classes: "bg-yellow-400 text-black border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-6 py-2 transition-all", description: "Hard shadows" },
    { name: "Minimal Text", classes: "bg-transparent text-current hover:opacity-70 underline underline-offset-4 px-0 py-2 transition-all", description: "Text link style" },
    { name: "Glow Cyan", classes: "bg-cyan-500 text-white rounded-md shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] px-6 py-2 transition-all", description: "Neon glow" },
    { name: "3D Pressable", classes: "bg-red-600 text-white border-b-4 border-red-800 rounded-lg active:border-b-0 active:translate-y-1 px-6 py-2 transition-all", description: "Chunky 3D effect" },
    { name: "Ghost Gray", classes: "bg-gray-500/20 text-current rounded-full hover:bg-gray-500/30 px-6 py-2 transition-all", description: "Semi-transparent" },
    { name: "Elegant Gold", classes: "bg-transparent border border-yellow-600 text-yellow-600 rounded-sm hover:bg-yellow-600 hover:text-white transition-colors duration-300 px-8 py-2", description: "Thin border" },
    { name: "Tech Outline", classes: "bg-transparent border border-cyan-400 text-cyan-400 rounded-none hover:bg-cyan-400/10 font-mono px-6 py-2 transition-all", description: "Monospace tech" },
    { name: "Playful Rotate", classes: "bg-pink-500 text-white rounded-2xl hover:rotate-3 hover:scale-105 transition-transform px-6 py-2 shadow-md", description: "Rotates on hover" },
    { name: "Underline Slide", classes: "relative overflow-hidden bg-slate-800 text-white rounded-lg group px-6 py-2 hover:bg-slate-700 transition-all", description: "Standard dark" },
    { name: "Double Border", classes: "bg-white text-indigo-600 border-4 border-double border-indigo-600 rounded-lg hover:bg-indigo-50 px-6 py-2 transition-all", description: "Double line" },
    { name: "Circle Icon", classes: "bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-blue-600 shadow-lg hover:scale-110 transition-all", description: "Icon only (circle)" },
    { name: "Floating Fab", classes: "bg-indigo-600 text-white rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all px-6 py-3", description: "Floating action" }
];
