import { Router } from 'express';
import { listTestimonials } from '../services/testimonialsService';

export const testimonialsRouter = Router();

testimonialsRouter.get('/', async (_req, res) => {
  try {
    const data = await listTestimonials();
    res.json(data);
  } catch (err) {
    console.error('Failed to list testimonials', err);
    res.status(500).json({ error: 'internal_error' });
  }
});
