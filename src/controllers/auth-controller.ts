import {Request, Response} from 'express';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { FirebaseConfig } from '../config/index.js';

const emailSignup = async(req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body || {};
        const userCredential = await createUserWithEmailAndPassword(FirebaseConfig.auth, email, password);
        const user = userCredential.user;

        res.status(200).json({user});
    } catch (error) {
       res.status(500).json({message: "Error in emailSignup-controller"}); 
    }  
} 

const emailLogin = async(req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;
        const userCredential = await signInWithEmailAndPassword(FirebaseConfig.auth, email, password);
        const user = userCredential.user;

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: "Error in emailLogin-controller"});
    }
}

const authController = {emailSignup, emailLogin};

export default authController;