import express from 'express';
import { env } from './config/env';
import { router as apiRouter } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    env: env.NODE_ENV,
    uptime: process.uptime()
  });
});

app.use('/api', apiRouter);

const port = env.PORT;

app.listen(port, () => {
  // Simple startup log; replace with structured logging later if needed.
  console.log(`API server listening on port ${port}`);
});
