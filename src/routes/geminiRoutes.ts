// src/routes/geminiRoutes.ts
import { Router } from 'express';
import * as geminiController from '../controllers/geminiController';
import { apiKeyAuth } from '../middleware/auth';

const router = Router();

// Apply auth middleware to all routes in this router
router.use(apiKeyAuth);

// Route for generating responses
router.post('/generate', geminiController.generateResponse);

export default router;