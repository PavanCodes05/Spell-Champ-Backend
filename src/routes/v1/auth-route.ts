import express, { Router } from 'express';
import { authController } from '../../controllers/index.js'

const router:Router = express.Router();

router.post('/signup', authController.emailSignup);
router.post('/login', authController.emailLogin);


export default router;