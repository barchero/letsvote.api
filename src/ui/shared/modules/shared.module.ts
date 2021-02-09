import {Module} from '@nestjs/common';
import {EventBusService} from "@ui/shared/services/event-bus.service";
import {EventGateway} from "@ui/shared/gateways/event.gateway";

@Module({
    providers: [EventBusService, EventGateway],
    exports: [EventBusService]
})
export class SharedModule {
}
