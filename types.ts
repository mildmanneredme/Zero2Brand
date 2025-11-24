export enum ImageSize {
  Size1K = '1K',
  Size2K = '2K',
  Size4K = '4K',
}

export interface ColorItem {
  hex: string;
  name: string;
  usage: string;
}

export interface Typography {
  headerFont: string;
  bodyFont: string;
  reasoning: string;
}

export interface ButtonStyle {
  tailwindClasses: string;
  description: string;
  borderRadius: string;
  shadow: string;
}

export interface BrandConcept {
  id: string;
  name: string;
  description: string;
  colors: ColorItem[];
  typography: Typography;
  buttonStyle: ButtonStyle;
  logoPrompt: string;
  secondaryMarkPrompt: string;
  vibeCoderPrompt: string;
}

export interface GeneratedAsset {
  type: 'logo' | 'secondary';
  imageUrl: string;
  prompt: string;
  size: ImageSize;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
