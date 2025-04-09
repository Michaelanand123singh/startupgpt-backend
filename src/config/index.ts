// src/config/index.ts
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  geminiApiKey: process.env.GEMINI_API_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};

// Validate required environment variables
const requiredEnvVars = ['GEMINI_API_KEY'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: Environment variable ${envVar} is required`);
    process.exit(1);
  }
}

export default config;