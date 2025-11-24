import { BrandConcept } from '../types';

export const BRAND_PRESETS: Omit<BrandConcept, 'id' | 'description' | 'logoPrompt' | 'secondaryMarkPrompt' | 'vibeCoderPrompt'>[] = [
  {
    name: "Modern Minimalist",
    colors: [
      { hex: "#1a1a1a", name: "Charcoal", usage: "Primary Background" },
      { hex: "#ffffff", name: "White", usage: "Secondary Background" },
      { hex: "#3b82f6", name: "Royal Blue", usage: "Accent" },
      { hex: "#9ca3af", name: "Cool Gray", usage: "Text" },
      { hex: "#f3f4f6", name: "Light Gray", usage: "Surface" }
    ],
    typography: {
      headerFont: "Inter",
      bodyFont: "Roboto",
      reasoning: "Clean, sans-serif fonts for a modern, uncluttered look."
    },
    buttonStyle: {
      tailwindClasses: "bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 shadow-sm",
      description: "Flat, rounded buttons with subtle shadows.",
      borderRadius: "0.5rem",
      shadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
    }
  },
  {
    name: "Eco Organic",
    colors: [
      { hex: "#2f5233", name: "Forest Green", usage: "Primary" },
      { hex: "#f0e6d2", name: "Cream", usage: "Background" },
      { hex: "#b1d8b7", name: "Sage", usage: "Accent" },
      { hex: "#4a3b2a", name: "Earth Brown", usage: "Text" },
      { hex: "#76a079", name: "Leaf Green", usage: "Secondary" }
    ],
    typography: {
      headerFont: "Merriweather",
      bodyFont: "Open Sans",
      reasoning: "Serif headers for warmth, paired with readable sans-serif body."
    },
    buttonStyle: {
      tailwindClasses: "bg-[#2f5233] text-[#f0e6d2] px-6 py-2 rounded-full hover:bg-[#244028] shadow-md",
      description: "Organic, pill-shaped buttons with earthy tones.",
      borderRadius: "9999px",
      shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    }
  },
  {
    name: "Tech Forward",
    colors: [
      { hex: "#0f172a", name: "Slate 900", usage: "Background" },
      { hex: "#6366f1", name: "Indigo", usage: "Primary" },
      { hex: "#ec4899", name: "Pink", usage: "Accent" },
      { hex: "#f8fafc", name: "Slate 50", usage: "Text" },
      { hex: "#1e293b", name: "Slate 800", usage: "Surface" }
    ],
    typography: {
      headerFont: "Space Grotesk",
      bodyFont: "Inter",
      reasoning: "Geometric sans-serifs for a futuristic, high-tech feel."
    },
    buttonStyle: {
      tailwindClasses: "bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 shadow-lg shadow-indigo-500/50",
      description: "Neon-glow buttons with sharp corners.",
      borderRadius: "0.375rem",
      shadow: "0 10px 15px -3px rgba(99, 102, 241, 0.5)"
    }
  },
  {
    name: "Playful Pop",
    colors: [
      { hex: "#fbbf24", name: "Amber", usage: "Primary" },
      { hex: "#fffbeb", name: "Warm White", usage: "Background" },
      { hex: "#f472b6", name: "Pink", usage: "Accent" },
      { hex: "#1f2937", name: "Gray 800", usage: "Text" },
      { hex: "#60a5fa", name: "Blue", usage: "Secondary" }
    ],
    typography: {
      headerFont: "Fredoka One",
      bodyFont: "Quicksand",
      reasoning: "Rounded, friendly fonts for a cheerful and approachable vibe."
    },
    buttonStyle: {
      tailwindClasses: "bg-amber-400 text-gray-900 px-6 py-2 rounded-xl hover:bg-amber-300 border-b-4 border-amber-600 active:border-b-0 active:translate-y-1",
      description: "Chunky, tactile buttons with a 3D effect.",
      borderRadius: "0.75rem",
      shadow: "none"
    }
  },
  {
    name: "Luxury Elegant",
    colors: [
      { hex: "#000000", name: "Black", usage: "Background" },
      { hex: "#d4af37", name: "Gold", usage: "Primary" },
      { hex: "#ffffff", name: "White", usage: "Text" },
      { hex: "#333333", name: "Dark Gray", usage: "Surface" },
      { hex: "#c0c0c0", name: "Silver", usage: "Accent" }
    ],
    typography: {
      headerFont: "Playfair Display",
      bodyFont: "Lato",
      reasoning: "High-contrast serif headers for sophistication and luxury."
    },
    buttonStyle: {
      tailwindClasses: "bg-transparent border border-[#d4af37] text-[#d4af37] px-8 py-2 rounded-none hover:bg-[#d4af37] hover:text-black transition-colors duration-300",
      description: "Minimalist outline buttons with gold accents.",
      borderRadius: "0",
      shadow: "none"
    }
  }
];

export const getMatchingConcepts = (mission: string): BrandConcept[] => {
  // In a real implementation, we could use simple keyword matching or a tiny local embedding model.
  // For now, we'll return a random selection of 3 presets to simulate variety.
  // We'll use the mission string length as a seed to make it deterministic for the same input.
  
  const shuffled = [...BRAND_PRESETS].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  return selected.map((preset, index) => ({
    ...preset,
    id: `concept-${index}-${Date.now()}`,
    description: `A ${preset.name.toLowerCase()} approach tailored to: "${mission.substring(0, 20)}..."`,
    logoPrompt: `A ${preset.name.toLowerCase()} logo for a brand with mission: "${mission}". Minimalist, vector style, white background.`,
    secondaryMarkPrompt: `A simple icon or symbol for a brand with mission: "${mission}". ${preset.name.toLowerCase()} style, flat design.`,
    vibeCoderPrompt: `Reskin the application with a ${preset.name} theme. Use ${preset.colors[0].hex} as the primary color and ${preset.typography.headerFont} for headings.`
  }));
};
