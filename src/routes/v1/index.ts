import express, { Router } from 'express';

import authRoutes from './auth-route.js';
import gradeRoutes from './grade-route.js';
import userRoutes from './user-route.js';

const router: Router = express.Router();

router.use('/auth', authRoutes);
router.use('/grade', gradeRoutes);
router.use('/user', userRoutes)

export { router };