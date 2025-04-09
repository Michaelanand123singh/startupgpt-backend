"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
// src/services/geminiService.ts
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const types_1 = require("../types");
// Base URL for Gemini API
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
class GeminiService {
    getSystemPromptForModule(moduleType) {
        const basePrompt = "You are Startup GPT, an AI assistant specialized in helping entrepreneurs build and grow startups.";
        const moduleSpecificPrompts = {
            [types_1.StartupModuleType.IDEA_VALIDATION]: "Focus on helping the user validate their startup idea. Ask critical questions about problem, solution, market size, competitors, and potential challenges.",
            [types_1.StartupModuleType.BUSINESS_PLAN]: "Guide the user in creating a comprehensive business plan. Cover executive summary, company description, market analysis, organization, products/services, marketing, financials, and funding.",
            [types_1.StartupModuleType.MVP_PLANNING]: "Help the user plan their Minimum Viable Product. Focus on essential features, development approach, timeline, resources needed, and testing strategies.",
            [types_1.StartupModuleType.MARKET_RESEARCH]: "Assist with market research. Cover target market identification, industry trends, competitive analysis, and customer needs assessment.",
            [types_1.StartupModuleType.TECH_STACK]: "Provide technical guidance on choosing appropriate technologies for the user's startup. Consider factors like scalability, development speed, cost, and maintenance.",
            [types_1.StartupModuleType.GENERAL]: "Provide general startup advice covering a wide range of topics from ideation to growth."
        };
        return `${basePrompt} ${moduleSpecificPrompts[moduleType] || moduleSpecificPrompts[types_1.StartupModuleType.GENERAL]}`;
    }
    generateResponse(request) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            try {
                const { prompt, moduleType = types_1.StartupModuleType.GENERAL, context = '' } = request;
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
                const response = yield axios_1.default.post(`${GEMINI_API_URL}?key=${config_1.default.geminiApiKey}`, payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // Extract the response text
                const responseText = ((_c = (_b = (_a = response.data.candidates[0]) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.parts[0]) === null || _c === void 0 ? void 0 : _c.text) || 'Sorry, I couldn\'t generate a response.';
                return { text: responseText };
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    const errorMessage = ((_f = (_e = (_d = error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.message) || error.message;
                    console.error('Gemini API error:', errorMessage);
                    throw new Error(`Failed to get response from Gemini API: ${errorMessage}`);
                }
                throw error;
            }
        });
    }
}
exports.GeminiService = GeminiService;
exports.default = new GeminiService();
