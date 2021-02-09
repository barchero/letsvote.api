import {StatusEnum} from "@domain/votation/enums/StatusEnum";
import {Room} from "@domain/votation/entities/Room";
import {ChangeRoomStatus} from "@domain/votation/use-cases/ChangeRoomStatus";
import {UUID} from "@domain/utils/value-objects/UUID";
import {RoomRepository} from "@domain/votation/repositories/RoomRepository";

export class ChangeRoomStatusImpl implements ChangeRoomStatus{
    constructor(private roomRepository: RoomRepository) {}

    execute(roomUUID: UUID, status: StatusEnum): Room{
        const room = this.roomRepository.getRoomByUUID(roomUUID);
        room.status = status;
        return room;
    }
}
