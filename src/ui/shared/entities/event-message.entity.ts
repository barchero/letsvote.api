import {EventTypeEnum} from "@ui/shared/enums/event-type.enum";

export class EventMessage<T> {
    type: EventTypeEnum;
    data: T;

    constructor({type, data}: {type: EventTypeEnum, data: T}){
        Object.assign(this, {type, data});
    }
}
