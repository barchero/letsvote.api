import {User} from "@domain/auth/entities/User";

export abstract class CreateUser {
    abstract execute(user: User): User;
}
