import { Router } from 'express';
import authRouter from './auth.js';
import readingsRouter from './readings.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/readings', readingsRouter);

export default router;