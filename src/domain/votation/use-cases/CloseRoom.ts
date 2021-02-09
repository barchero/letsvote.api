import {UUID} from "@domain/utils/value-objects/UUID";

export abstract class CloseRoom {
    abstract execute(roomUUID: UUID): boolean;
}
