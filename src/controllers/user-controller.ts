import { Request, Response } from 'express';
import UserServices from '../services/user-services.js';

const getAllDocs = async(req: Request, res: Response): Promise<void> => {
    try {
        const docs = await UserServices.getAllDocsService();
        res.status(200).json(docs);
        return
    } catch(error) {
        res.status(500).json({message: "Error in getAllDocs Controllers"});
    };
};

const getDocById = async(req: Request, res: Response): Promise<void> => {
    try {
        const {docId} = req.body;
        const doc = await UserServices.getDocByIdService(docId);

        res.status(200).json(doc);
    } catch (error) {
        res.status(500).json({message: "Error in getAllDocs Controllers"});
    };
}

const UserController = {getAllDocs, getDocById};

export default UserController;