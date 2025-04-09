// src/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import config from './config';
import geminiRoutes from './routes/geminiRoutes';

// Initialize express app
const app = express();

// Security middleware
app.use(helmet());

// CORS setup
app.use(cors({
  origin: config.corsOrigin,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-api-key']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
app.use('/api/gemini', geminiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', environment: config.nodeEnv });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', status: 404 });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`⚡️ Server running on port ${PORT} in ${config.nodeEnv} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});