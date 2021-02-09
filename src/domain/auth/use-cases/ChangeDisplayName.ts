import {User} from "@domain/auth/entities/User";
import {UUID} from "@domain/utils/value-objects/UUID";

export abstract class ChangeDisplayName {
    abstract execute(userUUID: UUID, name: string): User;
}
