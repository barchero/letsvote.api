import {UUID} from "@domain/utils/value-objects/UUID";

export abstract class DeleteUser {
    abstract execute(userUUID: UUID): boolean;
}
