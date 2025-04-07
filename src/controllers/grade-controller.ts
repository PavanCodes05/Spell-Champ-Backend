import { Request, Response } from 'express';
import { GradeServices, UserServices } from '../services/index.js';
import { ErrorResponse, SuccessResponse } from '../utils/index.js';
import { StatusCodes } from 'http-status-codes';
import { AuthRequest } from '../middlewares/index.js';

const createExerciseController = async(req: Request, res: Response): Promise<void> => {
    try {
        const { grade, exercises } = req.body;

        const gradeInfo = await GradeServices.createGradeService(parseInt(grade));
        const exercisesInfo = await GradeServices.createExerciseService(gradeInfo, exercises);

        SuccessResponse.data = exercisesInfo!;
        res.status(StatusCodes.CREATED).json(SuccessResponse);
        return;
    } catch (error) {
        ErrorResponse.error = error!;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
        return;
    };
};

const createQuizController = async(req: Request, res: Response): Promise<void> => {
    try {
        const { grade, quizzes } = req.body;

        const gradeInfo = await GradeServices.createGradeService(parseInt(grade));
        const quizzesInfo = await GradeServices.createQuizService(gradeInfo, quizzes);
        
        SuccessResponse.data = quizzesInfo!;
        res.status(StatusCodes.CREATED).json(SuccessResponse);
        return;
    } catch (error) {
        ErrorResponse.error = error!;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
        return;
    };
}

const getExercisesController = async(req: Request, res: Response ): Promise<void> => {
    try {
        const { grade } = req.params;
        const exercises = await GradeServices.getExercisesService(parseInt(grade));

        SuccessResponse.data = exercises;
        res.status(StatusCodes.OK).json(SuccessResponse);
        return;
    } catch (error) {
        ErrorResponse.error = error!;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
        return;  
    };
};

const getQuizzesController = async(req: Request, res: Response): Promise<void> => {
    try {
        const { grade } = req.params;
        const quizzes = await GradeServices.getQuizzesService(parseInt(grade));

        SuccessResponse.data = quizzes;
        res.status(StatusCodes.OK).json(SuccessResponse);
        return;
    } catch (error) {
        ErrorResponse.error = error!;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
        return;      
    };
};
const gradeupdateController = async(req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { grade } = req.body;
        const userId = req.user?.userId;

        const docRef = await UserServices.getDocByUID(userId!);
        const docId = docRef?.docId;

        const gradeinfo = await GradeServices.updategradeService(docId , grade);

        SuccessResponse.data = gradeinfo!;
        res.status(200).json(SuccessResponse);
        return;
    } catch (error) {
        ErrorResponse.error = error!;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
        return;      
    };
};

const GradeController = { createExerciseController, getExercisesController, getQuizzesController ,gradeupdateController, createQuizController };

export default GradeController;