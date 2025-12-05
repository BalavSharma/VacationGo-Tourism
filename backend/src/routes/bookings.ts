import { Router } from 'express';
import { z } from 'zod';
import { createBooking } from '../services/bookingsService';

const bookingSchema = z.object({
  name: z.string().min(1),
  contact: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  destinationSlug: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  guests: z.number().int().positive().optional(),
  message: z.string().optional()
});

export const bookingsRouter = Router();

bookingsRouter.post('/', async (req, res) => {
  const parseResult = bookingSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ error: 'invalid_request', details: parseResult.error.flatten() });
  }

  try {
    const booking = await createBooking(parseResult.data);
    return res.status(201).json({ id: booking.id });
  } catch (err: any) {
    if (err instanceof Error && err.message === 'destination_not_found') {
      return res.status(400).json({ error: 'destination_not_found' });
    }
    console.error('Failed to create booking', err);
    return res.status(500).json({ error: 'internal_error' });
  }
});
