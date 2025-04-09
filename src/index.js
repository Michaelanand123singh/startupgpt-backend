"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = __importDefault(require("./config"));
const geminiRoutes_1 = __importDefault(require("./routes/geminiRoutes"));
// Initialize express app
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
// CORS setup
app.use((0, cors_1.default)({
    origin: config_1.default.corsOrigin,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'x-api-key']
}));
// Body parser middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
// Routes
app.use('/api/gemini', geminiRoutes_1.default);
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', environment: config_1.default.nodeEnv });
});
// Handle 404
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found', status: 404 });
});
// Start server
const PORT = config_1.default.port;
app.listen(PORT, () => {
    console.log(`⚡️ Server running on port ${PORT} in ${config_1.default.nodeEnv} mode`);
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});
