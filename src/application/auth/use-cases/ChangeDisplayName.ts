import {User} from "@domain/auth/entities/User";
import {ChangeDisplayName} from "@domain/auth/use-cases/ChangeDisplayName";
import {UserRepository} from "@domain/auth/repositories/UserRepository";
import {UUID} from "@domain/utils/value-objects/UUID";

export class ChangeDisplayNameImpl implements ChangeDisplayName {

    constructor(private userRepository: UserRepository) {}

    execute(userUUID: UUID, name: string): User {
        const user = this.userRepository.getUserByUUID(userUUID);
        user.displayName = name;
        return user;
    }
}
