// src/controllers/geminiController.ts
import { Request, Response } from 'express';
import geminiService from '../services/geminiService';
import { GeminiRequest } from '../types';
import { handleError } from '../utils/errorHandler';

export const generateResponse = async (req: Request, res: Response): Promise<void> => {
  try {
    const geminiRequest: GeminiRequest = req.body;
    
    // Validate request
    if (!geminiRequest.prompt) {
      res.status(400).json({ error: 'Prompt is required', status: 400 });
      return;
    }
    
    // Generate response from Gemini
    const response = await geminiService.generateResponse(geminiRequest);
    
    res.status(200).json(response);
  } catch (error) {
    handleError(res, error);
  }
};