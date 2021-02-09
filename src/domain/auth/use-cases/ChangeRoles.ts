import {RolesEnum} from "@domain/auth/enums/RolesEnum";
import {User} from "@domain/auth/entities/User";
import {UUID} from "@domain/utils/value-objects/UUID";

export abstract class ChangeRoles {
    abstract execute(userUUID: UUID, roles: RolesEnum[]): User;
}
