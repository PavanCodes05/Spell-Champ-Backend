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
    console.log(`updateFieldService: id=${id}, newData=${JSON.stringify(newData)}`);
    try {
        const updatedDoc = await users.updateField(id, newData);
        console.log(`updateFieldService: updatedDoc=${JSON.stringify(updatedDoc)}`);
        return updatedDoc;
    } catch (error) {
        console.log(`updateFieldService: error=${error}`);
        throw error;
    };
};


const UserServices = { createDocService, getAllDocsService, getDocByIdService, getDocByUID, updateFieldService};

export default UserServices;
