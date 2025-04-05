import express, { Router } from "express";
import { GradeController } from '../../controllers/index.js';

const router: Router = express.Router();

// For Admin Dashboard
router.post('/create-exercise', GradeController.createExerciseController);
router.post('/create-grade', GradeController.createGradeController);

// For Mobile App
router.get('/:grade/exercises', GradeController.getExercisesController);
router.get('/:grade/quizzes', GradeController.getQuizzesController);
router.put('/update-grade',GradeController.gradeupdateController);

export default router;