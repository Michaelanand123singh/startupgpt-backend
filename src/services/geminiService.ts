// src/services/geminiService.ts
import axios from 'axios';
import config from '../config';
import { GeminiRequest, GeminiResponse, StartupModuleType } from '../types';

// Base URL for Gemini API
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export class GeminiService {
  private getSystemPromptForModule(moduleType: StartupModuleType): string {
    const basePrompt = "You are Startup GPT, an AI assistant specialized in helping entrepreneurs build and grow startups.";
    
    const moduleSpecificPrompts = {
      [StartupModuleType.IDEA_VALIDATION]: 
        "Focus on helping the user validate their startup idea. Ask critical questions about problem, solution, market size, competitors, and potential challenges.",
      
      [StartupModuleType.BUSINESS_PLAN]: 
        "Guide the user in creating a comprehensive business plan. Cover executive summary, company description, market analysis, organization, products/services, marketing, financials, and funding.",
      
      [StartupModuleType.MVP_PLANNING]: 
        "Help the user plan their Minimum Viable Product. Focus on essential features, development approach, timeline, resources needed, and testing strategies.",
      
      [StartupModuleType.MARKET_RESEARCH]: 
        "Assist with market research. Cover target market identification, industry trends, competitive analysis, and customer needs assessment.",
      
      [StartupModuleType.TECH_STACK]: 
        "Provide technical guidance on choosing appropriate technologies for the user's startup. Consider factors like scalability, development speed, cost, and maintenance.",
      
      [StartupModuleType.GENERAL]: 
        "Provide general startup advice covering a wide range of topics from ideation to growth."
    };
    
    return `${basePrompt} ${moduleSpecificPrompts[moduleType] || moduleSpecificPrompts[StartupModuleType.GENERAL]}`;
  }

  async generateResponse(request: GeminiRequest): Promise<GeminiResponse> {
    try {
      const { prompt, moduleType = StartupModuleType.GENERAL, context = '' } = request;
      
      const systemPrompt = this.getSystemPromptForModule(moduleType);
      
      // Construct the request payload for Gemini API
      const payload = {
        contents: [
          {
            parts: [
              { text: systemPrompt },
              { text: context ? `Previous context: ${context}\n\nUser query: ${prompt}` : prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      };

      // Make request to Gemini API
      const response = await axios.post(
        `${GEMINI_API_URL}?key=${config.geminiApiKey}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Extract the response text
      const responseText = response.data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I couldn\'t generate a response.';
      
      return { text: responseText };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error?.message || error.message;
        console.error('Gemini API error:', errorMessage);
        throw new Error(`Failed to get response from Gemini API: ${errorMessage}`);
      }
      throw error;
    }
  }
}

export default new GeminiService();