
import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const dataUrlToBlob = async (dataUrl: string): Promise<{ data: string; mimeType: string; }> => {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = (reader.result as string).split(',')[1];
            resolve({ data: base64data, mimeType: blob.type });
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};


export const tryOnClothing = async (userImageSrc: string, clothingImageSrc: string): Promise<string | null> => {
    try {
        const userImagePart = await dataUrlToBlob(userImageSrc);
        const clothingImagePart = await dataUrlToBlob(clothingImageSrc);

        const prompt = `
        You are an expert fashion stylist and photo editor. 
        Your task is to realistically place the provided clothing item onto the person in the user's photo.
        The clothing should fit the person's body shape, maintain correct perspective and lighting, and blend seamlessly with the original image.
        Do not change the person, their pose, or the background. Only add the clothing item.
        The output must be only the final image.
        `;
        
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: userImagePart.data,
                            mimeType: userImagePart.mimeType,
                        },
                    },
                    {
                        inlineData: {
                            data: clothingImagePart.data,
                            mimeType: clothingImagePart.mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const mimeType = part.inlineData.mimeType;
                return `data:${mimeType};base64,${base64ImageBytes}`;
            }
        }

        return null;

    } catch (error) {
        console.error("Error in Gemini API call:", error);
        throw error;
    }
};
