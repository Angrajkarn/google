import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const getGeminiResponse = async (prompt: string, context?: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const fullPrompt = `
    You are the "Agentic Premier League" Match Companion. 
    You are an expert in Cricket and specifically the current match context.
    Keep your tone enthusiastic, modern, and concise. 
    Use cricket terminology (e.g., "maximum", "wickets", "yorker").
    
    Context: ${context || "A generic IPL match hub."}
    
    User Query: ${prompt}
  `;

  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  return response.text();
};
