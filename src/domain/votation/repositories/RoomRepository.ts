import {UUID} from "@domain/utils/value-objects/UUID";
import {Room} from "@domain/votation/entities/Room";

export abstract class RoomRepository {
    abstract getRoomByUUID(uuid: UUID): Room;
    abstract getRoomList(): Room[];
    abstract saveRoom(room: Room): Room;
    abstract updateRoomByUUID(uuid: UUID, room: Room): Room;
    abstract deleteRoomByUUID(uuid: UUID): boolean;
}
