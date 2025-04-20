import path from 'path';
import url from 'url';
import express from 'express';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import { errorHandler, pagenotFound } from './middleware/errorHandler.js';

const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Frontend/dist')));
  
    // fallback for all non-api routes (good for React Router)
    app.get(/^\/(?!api).*/, (req, res) => {
      console.log('⚡️ Fallback triggered for:', req.url);
      res.sendFile(path.resolve(__dirname, "Frontend", 'dist', 'index.html'));
    });
  }
app.use(logger('dev'));
app.use(express.json());
app.use('/api/tasks', indexRouter);
app.use(pagenotFound);
app.use(errorHandler);  
  
export default app;

