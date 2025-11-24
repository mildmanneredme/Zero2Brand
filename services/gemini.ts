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

import { getMatchingConcepts } from "../data/presets";

export const generateBrandConcepts = async (mission: string): Promise<BrandConcept[]> => {
  // Simulate network delay for better UX
  await new Promise(resolve => setTimeout(resolve, 1500));
  return getMatchingConcepts(mission);
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

export const getChatResponse = async (history: { role: string, parts: { text: string }[] }[], message: string, context: string) => {
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