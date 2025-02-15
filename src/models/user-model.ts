import { z as zod } from 'zod';

const UserSchema = zod.object({
    userId: zod.string(),
    name: zod.string().min(1, "Name is required"),
    email: zod.string().email(),
    currentGrade: zod.number().min(1, "Grade must be at least 1"),
    trophies: zod.number().nonnegative().default(0)
});

export default UserSchema;