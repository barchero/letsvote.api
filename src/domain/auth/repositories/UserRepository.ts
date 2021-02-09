import {User} from "@domain/auth/entities/User";
import {UUID} from "@domain/utils/value-objects/UUID";

export abstract class UserRepository{
    abstract saveUser(user: User): User;
    abstract getUserByUUID(uuid: UUID): User;
    abstract updateUserByUUID(uuid: UUID, user: User): User;
    abstract deleteUserByUUID(uuid: UUID): boolean;
}
