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
        const { password, ...userWithoutPassword } = userData.data;

        SuccessResponse.data = userWithoutPassword;
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
        const user = userCredential.user;

        res.status(200).json({user});
        return; 
    } catch (error) {
        res.status(500).json({message: "Error in emailLogin-controller"});
        return; 
    }
};

const AuthController = {emailSignup, emailLogin};

export default AuthController;