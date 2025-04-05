import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AuthRequest } from "../middlewares/index.js";
import { UserServices } from '../services/index.js';
import { ErrorResponse, SuccessResponse } from '../utils/index.js';

const getUserProfile = async(req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        
        const userInfo = await UserServices.getDocByUID(userId!);
        delete userInfo?.password;

        SuccessResponse.data = userInfo!;
        res.status(StatusCodes.OK).json(SuccessResponse);
        return;
    } catch (error) {
        ErrorResponse.error = error!
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
};

const UserController = { getUserProfile }

export default UserController;