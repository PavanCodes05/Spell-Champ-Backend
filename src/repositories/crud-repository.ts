import { doc, collection, addDoc, getDocs, getDoc, updateDoc, query, where } from 'firebase/firestore';
import { StatusCodes } from 'http-status-codes'; 

import { FirebaseConfig } from '../config/index.js';
import { AppError } from '../utils/index.js';

class CrudRepository {
    collectionName: string;

    constructor(collectionName: string) {
        this.collectionName = collectionName;
    };

    addDocument = async(data: Object) => {
        try {
            const docRef = await addDoc(collection(FirebaseConfig.db, this.collectionName), data);

            return docRef;
        } catch (error) {
            throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Not able to create document");
        };
    };

    getAllDocuments = async() => {
        try {
            const querySnapshot = await getDocs(collection(FirebaseConfig.db, this.collectionName));

            const documents = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return documents;
        } catch (error) {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Not able to get all docs");
        };
    };

    getDocumentById = async(docId: string) => {
        try {
            const docRef = doc(FirebaseConfig.db, this.collectionName , docId);

            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                const data = docSnap.data();
                delete data.password;

                return data;
            } else {
                console.log("No such document!");
            };

        } catch (error) {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Not able to get docs");
        };
    };

    getDocumentByUID = async(uid: string) => {
      try {
        const q = query(collection(FirebaseConfig.db, 'users'), where('userId', '==', uid));
        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty) { 
            const userData = querySnapshot.docs[0].data();
            return userData;
        } else {
            return null;
        };
      } catch (error) {
        throw new AppError(500, "Not able to retrieve user by uid");
      };
    };

    updateField = async(id: string, newData: any) => {
        try {
            const docRef = doc(FirebaseConfig.db, this.collectionName, id);

            await updateDoc(docRef, newData);
            const updatedDoc = await this.getDocumentById(docRef.id);

            return updatedDoc;
        } catch (error) {
            throw new AppError(StatusCodes.CONFLICT, "Not able to update field!");
        };
    };
};

export default CrudRepository;