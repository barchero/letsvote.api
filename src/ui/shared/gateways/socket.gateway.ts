import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {EventBusService} from "@ui/shared/services/event-bus.service";
import {EventMessage} from "@ui/shared/entities/event-message.entity";

@WebSocketGateway()
export class SocketGateway {

    constructor(
        private eventBusService: EventBusService
    ){ }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('event')
    onEvent(@ConnectedSocket() socket: Socket, @MessageBody() event: string) {
        this.eventBusService.notify(socket, new EventMessage<unknown>(JSON.parse(event)))
    }
}
