import { GradeRepository } from '../repositories/index.js';
import { ExercisesSchema, QuizzesSchema } from '../models/index.js';
import { AppError } from '../utils/index.js';
import UserServices from "./user-services.js";

const grades = new GradeRepository();

const createGradeService = async(grade: number) => {
    try {
        const gradeInfo = await grades.getGradeInfo(grade);
        if(gradeInfo) {
            return gradeInfo;
        };
        
        const docRef = await grades.addDocument({"grade": grade,  exercises: [], quizzes: []});
        
        const docId = docRef.id;
        const doc = await grades.updateField(docId, {id: docId});
        
        return doc;
    } catch (error) {
        throw error
    };
}

const createExerciseService = async(gradeInfo: any, newExercises: Array<Object>) => {
    try {
        const exercises = gradeInfo?.exercises;
        const newExerciseNumber = Object.keys(exercises).length + 1;

        const ValidatedData = ExercisesSchema.parse(newExercises);
        const newExercise = {[`exercises.${newExerciseNumber}`]: ValidatedData};

        const updatedDoc = await grades.updateField(gradeInfo.id, newExercise);
    
        return updatedDoc;
    } catch (error) {
        throw error;
    };
};

const createQuizService = async(gradeInfo: any, newQuizzes: Array<Object>) => {
    try {
        const quizzes = gradeInfo?.quizzes;
        const newQuizNumber = Object.keys(quizzes).length + 1;

        const ValidatedData = QuizzesSchema.parse(newQuizzes);
        const newQuiz = {[`quizzes.${newQuizNumber}`]: ValidatedData};

        const updatedDoc = await grades.updateField(gradeInfo.id, newQuiz);
    
        return updatedDoc;
    } catch (error) {
        throw error;
    };
}

const getExercisesService = async(grade: number) => {
    try {
        const gradeInfo = await grades.getGradeInfo(grade);
        if(!gradeInfo) {
            throw new AppError(404, "Grade Not Found!")
        };
        const exercises = gradeInfo?.exercises;
        
        return exercises;
    } catch (error) {
        throw error;
    };
};

const getQuizzesService = async(grade: number) => {
    try {
        const gradeInfo = await grades.getGradeInfo(grade);
        if(!gradeInfo) {
            throw new AppError(404, "Grade Not Found!");
        };

        const quizzes = gradeInfo?.quizzes;
        
        return quizzes;
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
        };
    
    
};
const GradeServices = { createExerciseService, createGradeService, getExercisesService, getQuizzesService, updategradeService, createQuizService};
export default GradeServices;