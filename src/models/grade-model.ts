import { z as zod } from 'zod';

const ExerciseSchema = zod.object({
    word: zod.string(),
    picture: zod.string()
});

const FillInQuestionSchema = zod.object({
    title: zod.string(),
    type: zod.literal("fill-in"),
    image_url: zod.string().url(),
    given_letters: zod.array(zod.string()),       // like ["A", "", "P", "L", "E"]
    correct_answer: zod.string(),               // like "APPLE"
  });
  
  const ImageChoiceQuestionSchema = zod.object({
    title: zod.string(),
    type: zod.literal("image-choice"),
    word: zod.string(),                         // e.g., "Apple"
    options: zod.array(zod.string().url()),       // list of image URLs
    correct_index: zod.number().int().nonnegative().max(3), // assuming 4 options
  });
  
  const QuizSchema = zod.union([FillInQuestionSchema, ImageChoiceQuestionSchema]);
  
  const QuizzesSchema = zod.array(QuizSchema);

const ExercisesSchema = zod.array(ExerciseSchema);



const GradeSchema = zod.object({
    id: zod.string().optional(),
    grade: zod.number(),
    exercises: zod.record(zod.string(), zod.array(ExerciseSchema)).default({}),
    quizzes: zod.record(zod.string(), zod.array(QuizSchema)).default({})
});

export { ExercisesSchema, QuizzesSchema };