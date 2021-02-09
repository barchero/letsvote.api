import {User} from "@domain/auth/entities/User";
import {UserRepository} from "@domain/auth/repositories/UserRepository";
import {CreateUser} from "@domain/auth/use-cases/CreateUser";

export class CreateUserImpl implements CreateUser {

    constructor(private userRepository: UserRepository) {}

    execute(user: User): User{
        return this.userRepository.saveUser(new User({...user}));
    }
}
