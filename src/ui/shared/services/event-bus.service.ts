import {Injectable} from "@nestjs/common";
import {EventTypeEnum} from "@ui/shared/enums/event-type.enum";
import {EventSubscription} from '@ui/shared/entities/event-subscription.entity';
import {EventMessage} from "@ui/shared/entities/event-message.entity";

@Injectable()
export class EventBusService {
    private registrations: EventSubscription[] = [];

    register<RequestType, ResponseType>(type: EventTypeEnum, method: (event: RequestType) => ResponseType){
        if(!this.registrations.find((registration) => registration.type === type)){
            this.registrations.push(new EventSubscription({type, method}));
        } else {
            throw Error(`Event "${type}" already registered`);
        }
    }

    notify(eventMessage: EventMessage<unknown>): EventMessage<unknown> | void{
        const registration = this.registrations.find((_registration) => _registration.type === eventMessage.type);
        if(registration){
            return new EventMessage({
                type: registration.type,
                data: registration.method(eventMessage.data)
            });
        } else {
            throw Error(`No event "${eventMessage.type}" found`);
        }
    }

}
