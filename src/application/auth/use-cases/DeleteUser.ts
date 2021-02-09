import {UUID} from "@domain/utils/value-objects/UUID";
import {DeleteUser} from "@domain/auth/use-cases/DeleteUser";
import {UserRepository} from "@domain/auth/repositories/UserRepository";

export class DeleteUserImpl implements DeleteUser {

    constructor(private userRepository: UserRepository) {}

    execute(userUUID: UUID): boolean {
        return this.userRepository.deleteUserByUUID(userUUID);
    }
}
