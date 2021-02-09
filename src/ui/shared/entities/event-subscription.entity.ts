import {EventTypeEnum} from "@ui/shared/enums/event-type.enum";

export class EventSubscription {
    type: EventTypeEnum;
    method: (event?: unknown) => unknown | void;

    constructor({type, method}: {type: EventTypeEnum, method: (event?: unknown) => unknown | void}){
        Object.assign(this, {type, method});
    }
}
