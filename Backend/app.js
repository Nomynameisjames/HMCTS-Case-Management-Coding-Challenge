import path from 'path';
import url from 'url';
import express from 'express';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import { errorHandler, pagenotFound } from './middleware/errorHandler.js';

// Initialize Express app
const app = express();

// Get __dirname equivalent in ES modules
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if the environment is production
const isProd = process.env.NODE_ENV === 'production';

// Serve frontend
if (isProd) {
  // Production: serve built React app
  app.use(express.static(path.join(__dirname, '../Frontend/dist')));

  // React Router fallback (non-API routes)
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Frontend/dist/index.html'));
  });
} 
// Use request logging middleware
app.use(logger('dev'));

// Parse incoming JSON requests
app.use(express.json());

// Use the task routes under /api/tasks
app.use('/api/tasks', indexRouter);

// Handle 404 errors for unmatched routes
app.use(pagenotFound);

// Centralized error handling middleware
app.use(errorHandler);  
  
export default app;