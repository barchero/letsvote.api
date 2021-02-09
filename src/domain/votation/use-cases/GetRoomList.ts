import {Room} from "@domain/votation/entities/Room";

export abstract class GetRoomList {
    abstract execute(): Room[];
}
