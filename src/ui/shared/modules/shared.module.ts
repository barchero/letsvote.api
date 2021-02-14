import {Module} from '@nestjs/common';
import {EventBusService} from "@ui/shared/services/event-bus.service";
import {SocketGateway} from "@ui/shared/gateways/socket.gateway";

@Module({
    providers: [EventBusService, SocketGateway],
    exports: [EventBusService, SocketGateway]
})
export class SharedModule {
}
