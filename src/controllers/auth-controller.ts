import {Request, Response} from 'express';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { UserSchema } from '../models/index.js'
import { UserServices } from '../services/index.js';
import { FirebaseConfig } from '../config/index.js';
import { ErrorResponse, SuccessResponse } from '../utils/index.js';
import { StatusCodes } from 'http-status-codes';

const emailSignup = async(req: Request, res: Response): Promise<void> => {
    try {
        const userData = UserSchema.safeParse(req.body);
        if(!userData.success) {
            res.status(400).json({message: "Invalid Input", errors: userData.error.format()});
            return; 
        };

        const userCredential = await createUserWithEmailAndPassword(FirebaseConfig.auth, userData.data.email, userData.data.password);
        
        const user = userCredential.user;
        userData.data.userId = user.uid;

        const docRef = await UserServices.createDocService(userData.data);
        const docId = docRef.id;

        const userInfo = await UserServices.getDocByIdService(docId);
        delete userInfo!.password;

        SuccessResponse.data = userInfo!;
        res.status(StatusCodes.CREATED).json(SuccessResponse);
        return;
    } catch (error: any) {
        ErrorResponse.error = error;
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        return; 
    }  
} 

const emailLogin = async(req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;
        const userCredential = await signInWithEmailAndPassword(FirebaseConfig.auth, email, password);
        const userId = userCredential.user.uid;

        const userData = await UserServices.getDocByUID(userId);
        SuccessResponse.data = userData!;

        res.status(StatusCodes.OK).json(SuccessResponse);
        return; 
    } catch (error) {    
        ErrorResponse.error = error!;
        res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
        return; 
    }
};

const AuthController = {emailSignup, emailLogin};

export default AuthController;