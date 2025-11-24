import { GoogleGenAI, Type } from "@google/genai";
import { BrandConcept, ImageSize } from "../types";

// Helper to ensure API key is present or handle selection
const getAIClient = async (): Promise<GoogleGenAI> => {
  // Check if we need to prompt for a key (specific to Veo/High-end image models logic, 
  // but good practice for this app since we use pro-image-preview)
  if (window.aistudio && !await window.aistudio.hasSelectedApiKey()) {
     // This flow is usually triggered by a UI button, but if we are here, we need a key.
     // In a real app, we'd block UI. For now, we assume the UI handles the trigger, 
     // or we use the env key if available.
  }
  
  // Use the injected process.env.API_KEY
  // Note: In the specific runtime environment described, process.env.API_KEY 
  // is automatically populated after the user selects a key via window.aistudio.
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateBrandConcepts = async (mission: string): Promise<BrandConcept[]> => {
  const ai = await getAIClient();
  
  const prompt = `
    You are a world-class brand identity designer. 
    Analyze the following company mission and generate 3 distinct brand design directions (concepts).
    
    Company Mission: "${mission}"
    
    For each concept, provide:
    1. A creative Name for the design direction (e.g., "Modern Minimalist", "Tech Playful").
    2. A rationale/description (keep concise, approx 50 words).
    3. A 5-color palette with hex codes and usage (e.g., Primary, Accent, Background).
    4. Google Font pairings for Headers and Body.
    5. A Tailwind CSS class string for a primary button (include bg color, text color, padding, roundedness, hover state).
    6. A highly detailed image generation prompt for a primary logo.
    7. A detailed image generation prompt for a secondary brand mark (icon).
    8. A "Vibe Coder Prompt": A specific paragraph of instructions that a developer could copy-paste into an AI coding assistant to reskin an entire app to match this brand identity.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      maxOutputTokens: 20000, // Increased limit to prevent truncation of large JSON responses
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            colors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  hex: { type: Type.STRING },
                  name: { type: Type.STRING },
                  usage: { type: Type.STRING },
                }
              }
            },
            typography: {
              type: Type.OBJECT,
              properties: {
                headerFont: { type: Type.STRING },
                bodyFont: { type: Type.STRING },
                reasoning: { type: Type.STRING },
              }
            },
            buttonStyle: {
              type: Type.OBJECT,
              properties: {
                tailwindClasses: { type: Type.STRING },
                description: { type: Type.STRING },
                borderRadius: { type: Type.STRING },
                shadow: { type: Type.STRING },
              }
            },
            logoPrompt: { type: Type.STRING },
            secondaryMarkPrompt: { type: Type.STRING },
            vibeCoderPrompt: { type: Type.STRING },
          }
        }
      }
    }
  });

  if (response.text) {
    try {
      const parsed = JSON.parse(response.text);
      
      // Robust check to ensure we return an array
      if (Array.isArray(parsed)) {
        return parsed as BrandConcept[];
      }
      
      // If the model wrapped the response in an object (e.g. { concepts: [...] }), try to find the array
      if (typeof parsed === 'object' && parsed !== null) {
         const values = Object.values(parsed);
         const foundArray = values.find(val => Array.isArray(val));
         if (foundArray) {
           return foundArray as BrandConcept[];
         }
      }
      
      console.warn("Parsed JSON was not an array:", parsed);
      return []; 
      
    } catch (e) {
      console.error("Failed to parse JSON concepts", e);
      // Attempt to salvage if it's a truncation issue? 
      // For now, throwing a clear error is safer than returning partial garbage.
      throw new Error("Failed to parse generated concepts. The response might have been truncated.");
    }
  }
  throw new Error("No response from AI.");
};

export const generateBrandImage = async (prompt: string, size: ImageSize): Promise<string> => {
  const ai = await getAIClient();
  
  // Using gemini-3-pro-image-preview as requested for high quality
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        imageSize: size, // 1K, 2K, or 4K
        aspectRatio: '1:1'
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image generated.");
};

export const getChatResponse = async (history: {role: string, parts: {text: string}[]}[], message: string, context: string) => {
  const ai = await getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    history: history,
    config: {
        systemInstruction: `You are a Brand Identity Consultant. The user is currently building a brand with the following context: ${context}. Answer questions about design, usage, color theory, or how to implement the style. Be helpful, concise, and professional.`
    }
  });

  const result = await chat.sendMessage({ message });
  return result.text;
};