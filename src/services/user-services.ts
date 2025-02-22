import { UserRepository } from '../repositories/index.js';
import { UserSchema } from '../models/index.js';

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
        console.log("Error in getAllDocs service");
    };
};

const getDocByIdService = async(docId: string) => {
    try {
        const document = await users.getDocumentById(docId);
        return document;
    } catch (error) {
        console.log("Error in getDocById service"); 
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
        console.log("Error in updateField service");     
    };
};

const UserServices = { createDocService, getAllDocsService, getDocByIdService, getDocByUID, updateFieldService};

export default UserServices;
