// src/types/index.ts
export interface GeminiRequest {
    prompt: string;
    moduleType?: StartupModuleType;
    context?: string;
  }
  
  export interface GeminiResponse {
    text: string;
    error?: string;
  }
  
  export enum StartupModuleType {
    IDEA_VALIDATION = 'idea_validation',
    BUSINESS_PLAN = 'business_plan',
    MVP_PLANNING = 'mvp_planning',
    MARKET_RESEARCH = 'market_research',
    TECH_STACK = 'tech_stack',
    GENERAL = 'general'
  }
  
  export interface ErrorResponse {
    error: string;
    status: number;
  }