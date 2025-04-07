import express, { Router } from "express";
import { GradeController } from '../../controllers/index.js';
import { AuthMiddleware } from "../../middlewares/index.js";

const router: Router = express.Router();

// For Admin Dashboard
router.post('/add-exercise', GradeController.createExerciseController);
router.post('/add-quiz', GradeController.createQuizController);

// For Mobile App
router.get('/:grade/exercises', GradeController.getExercisesController);
router.get('/:grade/quizzes', GradeController.getQuizzesController);
router.put('/update-grade', AuthMiddleware.authMiddleware, GradeController.gradeupdateController);

export default router;