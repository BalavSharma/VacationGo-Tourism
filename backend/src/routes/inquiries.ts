import { Router } from 'express';
import { z } from 'zod';
import { createInquiry } from '../services/inquiriesService';

const inquirySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().optional(),
  destinationSlug: z.string().optional()
});

export const inquiriesRouter = Router();

inquiriesRouter.post('/', async (req, res) => {
  const parsed = inquirySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'invalid_request', details: parsed.error.flatten() });
  }

  try {
    const record = await createInquiry(parsed.data);
    return res.status(201).json({ id: record.id });
  } catch (err) {
    console.error('Failed to create inquiry', err);
    return res.status(500).json({ error: 'internal_error' });
  }
});
