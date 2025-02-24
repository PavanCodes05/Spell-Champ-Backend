import { GradeRepository } from '../repositories/index.js';
import { GradeSchema } from '../models/index.js';
import { AppError } from '../utils/index.js';

const grades = new GradeRepository();

const createGradeService = async(grade: number, data: unknown) => {
    try {
        const gradeInfo = await grades.getGradeInfo(grade);
        if(gradeInfo) {
            throw new AppError(403, "Grade Aleady Exists");
        };
        
        const validatedData = GradeSchema.parse(data);
        const docRef = await grades.addDocument(validatedData);
        
        const docId = docRef.id;
        const doc = await grades.updateField(docId, {id: docId});
        
        return doc;
    } catch (error) {
        throw error
    };
}

const createExerciseService = async(grade: number) => {
    try {
        const gradeInfo = await grades.getGradeInfo(grade);
        if (!gradeInfo) {
            throw new AppError(404, "Grade Not Found!")
        };

        const exercises = gradeInfo?.exercises;
        const newExerciseNumber = Object.keys(exercises).length + 1;

        const updatedDoc = await grades.updateField(gradeInfo.id, {[`exercises.${newExerciseNumber}`]: []});
        
        return updatedDoc;
    } catch (error) {
        throw error;
    };
};

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


const GradeServices = { createExerciseService, createGradeService, getExercisesService, getQuizzesService};
export default GradeServices;