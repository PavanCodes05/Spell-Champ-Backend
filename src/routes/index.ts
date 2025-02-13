import express, { Express, Router } from 'express';

import { router as v1Routes } from './v1/index.js';

const router: Router = express.Router();

router.use('/v1', v1Routes);

export default router;