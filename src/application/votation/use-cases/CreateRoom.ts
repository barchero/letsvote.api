import {Room} from "@domain/votation/entities/Room";
import {CreateRoom} from "@domain/votation/use-cases/CreateRoom";
import {RoomRepository} from "@domain/votation/repositories/RoomRepository";

export class CreateRoomImpl implements CreateRoom{

    constructor(private roomRepository: RoomRepository) {}

    execute(room: Room): Room{
        return this.roomRepository.saveRoom(new Room({...room}));
    }
}
