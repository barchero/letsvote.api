import {UUID} from "@domain/utils/value-objects/UUID";
import {RolesEnum} from "@domain/auth/enums/RolesEnum";

export class User {
    id: UUID;
    displayName: string;
    roles: RolesEnum[];

    constructor({id = new UUID(), displayName, roles = []}: {id: UUID, displayName: string, roles: RolesEnum[]}){
        Object.assign(this, {id, displayName, roles});
    }
}
