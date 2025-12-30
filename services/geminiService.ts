
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

class GeminiService {
  private ai: GoogleGenAI;
  private chatInstance: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  public getChat() {
    if (!this.chatInstance) {
      this.chatInstance = this.ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    }
    return this.chatInstance;
  }

  public async sendMessage(message: string): Promise<string> {
    try {
      const chat = this.getChat();
      const response: GenerateContentResponse = await chat.sendMessage({ message });
      return response.text || "ببخشید، متوجه نشدم. دوباره بگو پسرم/دخترم.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "اوه! مثل اینکه اینترنت کلاس ما یکم ضعیف شده. دوباره تلاش کن عزیزم.";
    }
  }

  public resetChat() {
    this.chatInstance = null;
  }
}

export const geminiService = new GeminiService();
