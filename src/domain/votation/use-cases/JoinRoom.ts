import {UUID} from "@domain/utils/value-objects/UUID";
import {Room} from "@domain/votation/entities/Room";

export abstract class JoinRoom {
    abstract execute(roomUUID: UUID, userUUID: UUID): Room;
}
