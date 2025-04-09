// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';

// Simple API key verification middleware
// In a production environment, you'd want more robust authentication
export const apiKeyAuth = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'];
  
  // For development purposes, skip auth in dev mode
  // In production, you'd validate against stored API keys
  if (process.env.NODE_ENV === 'development') {
    return next();
  }
  
  if (!apiKey || typeof apiKey !== 'string') {
    res.status(401).json({ error: 'API key is required', status: 401 });
    return;
  }
  
  // Add proper validation logic here for production
  
  next();
};

// Rate limiting could be implemented as another middleware