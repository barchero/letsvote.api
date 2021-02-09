import {User} from "@domain/auth/entities/User";
import {UUID} from "@domain/utils/value-objects/UUID";

export class Vote {
    id: UUID;
    value: string;
    user: User;

    constructor({id = new UUID(), value, user}: {id?: UUID, value: string, user: User}){
        Object.assign(this, {id, value, user});
    }
}
