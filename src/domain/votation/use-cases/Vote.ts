import {UUID} from "@domain/utils/value-objects/UUID";
import {Room} from "@domain/votation/entities/Room";

export abstract class Vote {
    abstract execute(roomUUID: UUID, userUUID: UUID, value: string): Room
}
