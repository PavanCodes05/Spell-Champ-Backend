import { Request, Response } from 'express';
import { GradeServices } from '../services/index.js';
import { ErrorResponse, SuccessResponse } from '../utils/index.js';
import { StatusCodes } from 'http-status-codes';

const createGradeController = async(req: Request, res: Response): Promise<void> => {
    try {
        const { grade } = req.body;
        const gradeInfo = await GradeServices.createGradeService(grade, req.body);

        SuccessResponse.data = gradeInfo!;
        res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error!;
        res.status(400).json(ErrorResponse);
    };
};

const createExerciseController = async(req: Request, res: Response): Promise<void> => {
    try {
        const { grade } = req.body;
        const gradeInfo = await GradeServices.createExerciseService(grade);

        SuccessResponse.data = gradeInfo!;
        res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error!;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    };
};

const GradeController = { createExerciseController, createGradeController };

export default GradeController;