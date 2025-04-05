import {Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { UserSchema } from '../models/index.js'
import { UserServices } from '../services/index.js';
import { FirebaseConfig } from '../config/index.js';
import { ErrorResponse, SuccessResponse } from '../utils/index.js';
import { JWT } from "../utils/index.js";

const emailSignup = async(req: Request, res: Response): Promise<void> => {
    try {
        const userData = UserSchema.safeParse(req.body);
        if(!userData.success) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something Went Wrong", errors: userData.error.format()});
            return; 
        };

        const userCredential = await createUserWithEmailAndPassword(FirebaseConfig.auth, userData.data.email, userData.data.password);
        
        const user = userCredential.user;
        userData.data.userId = user.uid;

        const token = JWT.generateToken({userId: user.uid.toString()});
        userData.data.token = token;

        const docRef = await UserServices.createDocService(userData.data);
        const docId = docRef.id;

        const userInfo = await UserServices.getDocByIdService(docId);
        delete userInfo!.password;

        SuccessResponse.data = userInfo!;
        res.status(StatusCodes.CREATED).json(SuccessResponse);
        return;
    } catch (error: any) {
        ErrorResponse.error = error;
        res.status(StatusCodes.CONFLICT).json(ErrorResponse);
        return; 
    }  
} 

const emailLogin = async(req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;
        const userCredential = await signInWithEmailAndPassword(FirebaseConfig.auth, email, password);
        const userId = userCredential.user.uid;

        const token = JWT.generateToken({userId: userCredential.user.uid.toString()});

        const userData = await UserServices.getDocByUID(userId);
        userData!.token = token;
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