import { Router } from 'express';
import { bookingsRouter } from './bookings';
import { inquiriesRouter } from './inquiries';
import { staffRouter } from './staff';
import { testimonialsRouter } from './testimonials';

export const router = Router();

router.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

router.use('/bookings', bookingsRouter);
router.use('/inquiries', inquiriesRouter);
router.use('/staff', staffRouter);
router.use('/testimonials', testimonialsRouter);
