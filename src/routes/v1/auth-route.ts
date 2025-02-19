import express, { Router } from 'express';
import { AuthController } from '../../controllers/index.js'

const router:Router = express.Router();

router.post('/signup', AuthController.emailSignup);
router.post('/login', AuthController.emailLogin);

export default router;