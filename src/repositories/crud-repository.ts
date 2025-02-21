import { doc, collection, addDoc, getDocs, getDoc, updateDoc } from 'firebase/firestore';
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
            console.log("error in getall-repo");        
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
            console.log("Error in getDocumentById-repo");
        };
    };

    updateField = async(id: string, newData: any) => {
        try {
            const docRef = doc(FirebaseConfig.db, this.collectionName, id);

            await updateDoc(docRef, newData);
            const updatedDoc = await this.getDocumentById(docRef.id);

            return updatedDoc;
        } catch (error) {
            console.log("Error in updateField-repo");       
        };
    };
};

export default CrudRepository;