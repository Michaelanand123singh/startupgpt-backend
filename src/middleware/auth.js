"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyAuth = void 0;
// Simple API key verification middleware
// In a production environment, you'd want more robust authentication
const apiKeyAuth = (req, res, next) => {
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
exports.apiKeyAuth = apiKeyAuth;
// Rate limiting could be implemented as another middleware
