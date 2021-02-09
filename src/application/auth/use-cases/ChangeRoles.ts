import {RolesEnum} from "@domain/auth/enums/RolesEnum";
import {User} from "@domain/auth/entities/User";
import {ChangeRoles} from "@domain/auth/use-cases/ChangeRoles";
import {UUID} from "@domain/utils/value-objects/UUID";
import {UserRepository} from "@domain/auth/repositories/UserRepository";

export class ChangeRolesImpl implements ChangeRoles{
    constructor(private userRepository: UserRepository){}

    execute(userUUID: UUID, roles: RolesEnum[]): User {
        const user = this.userRepository.getUserByUUID(userUUID);
        user.roles = roles;
        return user;
    }
}
