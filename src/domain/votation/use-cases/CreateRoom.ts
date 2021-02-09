import {Room} from "@domain/votation/entities/Room";

export abstract class CreateRoom {
    abstract execute(room: Room): Room;
}
