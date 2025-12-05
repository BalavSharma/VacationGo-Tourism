import { Router } from 'express';
import { listStaff } from '../services/staffService';

export const staffRouter = Router();

staffRouter.get('/', async (_req, res) => {
  try {
    const data = await listStaff();
    res.json(data);
  } catch (err) {
    console.error('Failed to list staff', err);
    res.status(500).json({ error: 'internal_error' });
  }
});
