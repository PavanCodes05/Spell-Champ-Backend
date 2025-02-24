import { collection, getDocs, query, where } from "firebase/firestore";
import CrudRepository from "./crud-repository.js";
import FirebaseConfig from "../config/database-config.js";
import { AppError } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";

class GradeRepository extends CrudRepository {
    constructor() {
        super('grades')
    };

    getGradeInfo = async (grade: number) => {
        try {
          const q = query(collection(FirebaseConfig.db, 'grades'), where('grade', '==', grade));
          const querySnapshot = await getDocs(q);

          if(!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data();
            return data;
          } else {
            return null;
          };

        } catch (error) {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Not able to process grades.");
        };
    }
};

export default GradeRepository;