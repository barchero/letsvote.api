import {UUID} from "@domain/utils/value-objects/UUID";

export abstract class LeaveRoom{
    abstract execute(roomUUID: UUID, userUUID: UUID): boolean;
}
