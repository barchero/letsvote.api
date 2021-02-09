import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse,} from '@nestjs/websockets';
import {Server} from 'socket.io';
import {EventBusService} from "@ui/shared/services/event-bus.service";
import {EventMessage} from "@ui/shared/entities/event-message.entity";

@WebSocketGateway()
export class EventGateway{

    constructor(
        private eventBusService: EventBusService
    ){ }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('event')
    onEvent(@MessageBody() event: string): WsResponse<unknown> | void {
        const res = this.eventBusService.notify(new EventMessage<unknown>(JSON.parse(event)));
        if(res){
            return {
                event: 'event',
                data: res
            };
        }
    }
}
