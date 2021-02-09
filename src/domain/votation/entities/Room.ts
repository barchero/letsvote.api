import {UUID} from "@domain/utils/value-objects/UUID";
import {User} from "@domain/auth/entities/User";
import {StatusEnum} from "@domain/votation/enums/StatusEnum";
import {Vote} from "@domain/votation/entities/Vote";

export class Room {
    id: UUID;
    name: string;
    users: User[];
    status: StatusEnum;
    votes: Vote[];

    constructor({id = new UUID(), name, users = [], status = StatusEnum.IDLE, votes = []}: {id?: UUID, name: string, users: User[], status: StatusEnum, votes: Vote[]}){
        Object.assign(this, {id, name, users, status, votes});
    }

}
