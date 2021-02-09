import {UUID} from "@domain/utils/value-objects/UUID";

export abstract class Vote {
    abstract execute(roomUUID: UUID, userUUID: UUID, value: string): boolean
}
