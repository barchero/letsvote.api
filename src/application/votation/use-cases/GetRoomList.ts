import {Room} from "@domain/votation/entities/Room";
import {GetRoomList} from "@domain/votation/use-cases/GetRoomList";
import {RoomRepository} from "@domain/votation/repositories/RoomRepository";

export class GetRoomListImpl implements GetRoomList {

    constructor(private roomRepository: RoomRepository){}

    execute(): Room[]{
        return this.roomRepository.getRoomList();
    };
}
