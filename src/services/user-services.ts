import { UserRepository } from '../repositories/index.js';
import { UserSchema } from '../models/index.js';

const users = new UserRepository();

const createDocService = async(data: unknown) => {
    try {
        const validatedData = UserSchema.parse(data);

        const docRef = await users.addDocument(validatedData);
        return docRef;
    } catch (error) {
        console.log("Error in create-doc service");
    };
};

const UserServices = { createDocService };

export default UserServices;
