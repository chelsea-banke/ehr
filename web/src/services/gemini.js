import { GoogleGenerativeAI } from "@google/generative-ai";

export const getAiModel = ()=>{
    const genAi = new GoogleGenerativeAI(import.meta.env.VITE_AI_KEY)
    const model = genAi.getGenerativeModel({model: "gemini-pro"})
    return model
}