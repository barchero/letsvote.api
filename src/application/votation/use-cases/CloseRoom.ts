import {UUID} from "@domain/utils/value-objects/UUID";
import {CloseRoom} from "@domain/votation/use-cases/CloseRoom";
import {RoomRepository} from "@domain/votation/repositories/RoomRepository";

export class CloseRoomImpl implements CloseRoom {
    constructor(private roomRepository: RoomRepository){}

    execute(roomUUID: UUID): boolean{
        return this.roomRepository.deleteRoomByUUID(roomUUID);
    }
}
