import {StatusEnum} from "@domain/votation/enums/StatusEnum";
import {Room} from "@domain/votation/entities/Room";
import {UUID} from "@domain/utils/value-objects/UUID";

export abstract class ChangeRoomStatus {
    abstract execute(roomUUID: UUID, status: StatusEnum): Room;
}
