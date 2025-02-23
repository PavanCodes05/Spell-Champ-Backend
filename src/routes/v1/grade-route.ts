import express, { Router } from "express";
import { GradeController } from '../../controllers/index.js';

const router: Router = express.Router();

router.post('/create-exercise', GradeController.createExerciseController);
router.post('/create-grade', GradeController.createGradeController);

export default router;