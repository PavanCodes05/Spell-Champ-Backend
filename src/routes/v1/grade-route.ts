import express, { Router } from "express";
import { GradeController } from '../../controllers/index.js';

const router: Router = express.Router();

router.post('/create-exercise', GradeController.createExerciseController);
router.post('/create-grade', GradeController.createGradeController);
router.get('/:grade/exercises', GradeController.getExercisesController);
router.get('/:grade/quizzes', GradeController.getQuizzesController);
router.post('/upgrade/grade',GradeController.gradeupdateController);
export default router;