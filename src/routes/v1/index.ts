import express, { Router } from 'express';

import authRoutes from './auth-route.js';

const router: Router = express.Router();

router.use('/auth', authRoutes);

export { router };