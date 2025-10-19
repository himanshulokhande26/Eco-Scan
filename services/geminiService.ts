
import { GoogleGenAI, Type } from "@google/genai";
import type { WasteClassification } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    objectName: {
      type: Type.STRING,
      description: "The name of the identified waste item (e.g., 'plastic bottle', 'apple core')."
    },
    classification: {
      type: Type.STRING,
      description: "The waste category: 'Recyclable', 'Compostable', or 'Non-Recyclable'."
    },
    disposalSuggestion: {
      type: Type.STRING,
      description: "Clear, concise instructions on how to properly dispose of the item."
    },
    ecoTip: {
      type: Type.STRING,
      description: "A short, actionable eco-friendly tip related to the item or waste in general."
    }
  },
  required: ['objectName', 'classification', 'disposalSuggestion', 'ecoTip'],
};


export const analyzeWasteImage = async (base64Image: string, mimeType: string): Promise<WasteClassification> => {
  const prompt = `Analyze the object in this image. Identify the object, determine if it is recyclable, compostable, or non-recyclable trash. Provide a brief, actionable disposal suggestion and a short, related eco-friendly tip. Respond ONLY with the specified JSON format.`;
  
  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType,
    },
  };

  const textPart = {
    text: prompt
  };
  
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    // Validate the classification field to match our expected types
    const validClassifications = ['Recyclable', 'Compostable', 'Non-Recyclable'];
    if (!validClassifications.includes(result.classification)) {
        // Attempt to find a close match or default
        const lowerCaseClassification = result.classification.toLowerCase();
        if (lowerCaseClassification.includes('recyclable')) {
            result.classification = 'Recyclable';
        } else if (lowerCaseClassification.includes('compostable')) {
            result.classification = 'Compostable';
        } else {
            result.classification = 'Non-Recyclable';
        }
    }
    
    return result as WasteClassification;
  } catch (error) {
    console.error("Error analyzing image with Gemini API:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
};
