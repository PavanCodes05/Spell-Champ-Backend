import { z as zod } from 'zod';

const TrophiesSchema = zod.object({
    gold: zod.number().int().nonnegative().default(0),
    silver: zod.number().int().nonnegative().default(0),
    bronze: zod.number().int().nonnegative().default(0)
});


const UserSchema = zod.object({
    docId: zod.string().optional(),
    userId: zod.string().default(""),
    name: zod.string().min(1, "Name is required"),
    email: zod.string().email(),
    password: zod.string().min(6, "Password must be atleast 6 characters"),
    currentGrade: zod.number().min(1, "Grade must be at least 1").max(12).default(1),
    exercisesCompleted: zod.number().default(0),
    quizzesCompleted: zod.number().default(0),
    completedWords: zod.array(zod.string()).optional(),
    completedExerciseIds: zod.array(zod.string()).default([]),
    completedQuizIds: zod.array(zod.string()).default([]),
    trophies: TrophiesSchema.default({ gold: 0, silver: 0, bronze: 0 }),
    quizTrophies: zod.record(zod.string()).default({}),
    diamonds: zod.number().nonnegative().default(0),
    token: zod.string().optional()
}).strict();

export default UserSchema;