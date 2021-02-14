import {EventTypeEnum} from "@ui/shared/enums/event-type.enum";
import {Socket} from "socket.io";

export class EventSubscription {
    type: EventTypeEnum;
    method: (socket: Socket, event?: unknown) => unknown | void;

    constructor({type, method}: {type: EventTypeEnum, method: (socket: Socket, event?: unknown) => unknown | void}){
        Object.assign(this, {type, method});
    }
}
