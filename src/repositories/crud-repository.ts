import { collection, addDoc } from 'firebase/firestore';
import { FirebaseConfig } from '../config/index.js';

class CrudRepository {
    collectionName: string;

    constructor(collectionName: string) {
        this.collectionName = collectionName;
    };

    addDocument = async(data: Object) => {
        try {
            const docRef = await addDoc(collection(FirebaseConfig.db, this.collectionName), data);
            console.log(`Document written with ID: ${docRef.id}`);

            return docRef;
        } catch (error) {
            console.log("Error in repo");   
        }
    }
};

export default CrudRepository;