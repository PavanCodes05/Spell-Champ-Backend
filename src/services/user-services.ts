import { UserRepository } from '../repositories/index.js';
import { UserSchema } from '../models/index.js';
import { AppError } from '../utils/index.js';
import { updateDoc } from 'firebase/firestore';

const users = new UserRepository();

const createDocService = async(data: unknown) => {
    try {
        const validatedData = UserSchema.parse(data);

        const docRef = await users.addDocument(validatedData);
        return docRef;
    } catch (error) {
        throw error;
    };
};

const getAllDocsService = async() => {
    try {
        const documents = await users.getAllDocuments();
        return documents;
    } catch (error) {
        throw error;
    };
};

const getDocByIdService = async(docId: string) => {
    try {
        const document = await users.getDocumentById(docId);
        return document;
    } catch (error) {
        throw error;
    };
};

const getDocByUID = async(uid: string) => {
    try {
        const document = await users.getDocumentByUID(uid);
        return document;
    } catch (error) {
        throw error;
    };
};

const updateFieldService = async(id: string, newData: any) => {
    try {
        const updatedDoc = await users.updateField(id, newData);
        return updatedDoc;
    } catch (error) {
        throw error;
    };
};
const updategradeService = async( id: string ,grade: number) => {
    try{
        const userInfo = await UserServices.getDocByIdService(id);
        if (!userInfo){
            throw new AppError(404,"user doesn't exist");
        }
        
        const newgrade = await UserServices.updateFieldService(id,{currentGrade : grade});
        
        const UpdatedUserInfo = await UserServices.getDocByIdService(id);
        return UpdatedUserInfo;
    }catch ( error) {
        throw error;
    }
};

const UserServices = { createDocService, getAllDocsService, getDocByIdService, getDocByUID, updateFieldService , updategradeService};

export default UserServices;
