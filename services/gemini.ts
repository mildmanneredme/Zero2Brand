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

  try {
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
  } catch (error: any) {
    // Check for 429 or Resource Exhausted errors
    if (error.message?.includes('429') || error.message?.includes('RESOURCE_EXHAUSTED') || error.status === 429) {
      throw new Error("QUOTA_EXCEEDED");
    }
    throw error;
  }
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

export const generateSiteContent = async (mission: string): Promise<{ headline: string, subheadline: string, cta: string, features: string[] }> => {
  const ai = await getAIClient();

  const prompt = `
    You are a copywriter for a landing page.
    Mission: "${mission}"
    
    Generate a catchy Headline, a persuasive Subheadline, a Call to Action (CTA) button text, and 3 short feature titles.
    Return ONLY valid JSON in this format:
    {
      "headline": "...",
      "subheadline": "...",
      "cta": "...",
      "features": ["...", "...", "..."]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash-001',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.response.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("No content generated");

    return JSON.parse(text);
  } catch (e) {
    console.error("Gemini Content Gen Error:", e);
    // Fallback content
    return {
      headline: "Build Your Dream",
      subheadline: "The perfect solution for your business needs.",
      cta: "Get Started",
      features: ["Fast Performance", "Secure", "Easy to Use"]
    };
  }
};

export const generateLogoVariations = async (mission: string, palette: any, count: number = 4): Promise<string[]> => {
  const ai = await getAIClient();
  const logos: string[] = [];

  const styles = ['minimal and modern', 'bold and geometric', 'abstract and artistic', 'clean and professional'];

  try {
    for (let i = 0; i < Math.min(count, styles.length); i++) {
      const prompt = `Create a simple, iconic logo for a company with this mission: "${mission}". 
      Style: ${styles[i]}. 
      Use colors: ${palette.colors.primary}, ${palette.colors.secondary}. 
      The logo should be clean, scalable, and work well at small sizes.
      No text, just the icon/symbol.`;

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: {
            parts: [{ text: prompt }]
          },
          config: {
            imageConfig: {
              imageSize: '1K',
              aspectRatio: '1:1'
            }
          }
        });

        if (response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data) {
          const base64 = response.candidates[0].content.parts[0].inlineData.data;
          logos.push(`data:image/png;base64,${base64}`);
        }
      } catch (err) {
        console.warn(`Failed to generate logo variation ${i + 1}:`, err);
      }
    }
  } catch (error) {
    console.error('Logo generation error:', error);
  }

  return logos;
};