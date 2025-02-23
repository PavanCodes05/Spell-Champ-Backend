import { z as zod } from 'zod';

const ExerciseSchema = zod.object({
    word: zod.string(),
    picture: zod.string()
});

const QuizSchema = zod.object({
    question: zod.string(),
    answer: zod.any()
});

const GradeSchema = zod.object({
    id: zod.string().optional(),
    grade: zod.number(),
    exercises: zod.record(zod.string(), zod.array(ExerciseSchema)).default({}),
    quizzes: zod.record(zod.string(), zod.array(QuizSchema)).default({})
});

export default GradeSchema;