import { Router } from 'express';
import { bookingsRouter } from './bookings';
import { inquiriesRouter } from './inquiries';

export const router = Router();

router.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

router.use('/bookings', bookingsRouter);
router.use('/inquiries', inquiriesRouter);
