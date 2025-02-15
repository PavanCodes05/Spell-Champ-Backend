import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository{
    constructor() {
        super('users');
    };
};

export default UserRepository;