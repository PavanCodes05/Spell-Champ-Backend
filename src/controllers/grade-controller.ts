import { Request, Response } from 'express';
import { GradeServices, UserServices } from '../services/index.js';
import { ErrorResponse, SuccessResponse } from '../utils/index.js';
import { StatusCodes } from 'http-status-codes';


const createGradeController = async(req: Request, res: Response): Promise<void> => {
    try {
        const { grade } = req.body;
        const gradeInfo = await GradeServices.createGradeService(grade, req.body);

        SuccessResponse.data = gradeInfo!;
        res.status(StatusCodes.CREATED).json(SuccessResponse);
        return;
    } catch (error) {
        ErrorResponse.error = error!;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
        return;
    };
};

const createExerciseController = async(req: Request, res: Response): Promise<void> => {
    try {
        const { grade } = req.body;
        const gradeInfo = await GradeServices.createExerciseService(grade);

        SuccessResponse.data = gradeInfo!;
        res.status(StatusCodes.CREATED).json(SuccessResponse);
        return;
    } catch (error) {
        ErrorResponse.error = error!;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
        return;
    };
};

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
const gradeupdateController = async(req: Request, res: Response): Promise<void> => {
    try {
        const { id , grade } = req.body;
        const gradeinfo = await GradeServices.updategradeService(id , grade);

        SuccessResponse.data = gradeinfo!;
        res.status(200).json(SuccessResponse);
        return;
    } catch (error) {
        ErrorResponse.error = error!;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
        return;      
    };
};

const GradeController = { createExerciseController, createGradeController, getExercisesController, getQuizzesController ,gradeupdateController };

export default GradeController;