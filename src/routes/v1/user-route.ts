import express, { Router } from "express";

import { AuthMiddleware } from '../../middlewares/index.js';
import { UserController } from '../../controllers/index.js'

const router:Router = express.Router();

router.get('/profile', AuthMiddleware.authMiddleware, UserController.getUserProfile)

export default router;