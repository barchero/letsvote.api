import {Controller} from "@nestjs/common";
import {EventBusService} from "@ui/shared/services/event-bus.service";
import {EventTypeEnum} from "@ui/shared/enums/event-type.enum";
import {AuthService} from "@ui/auth/services/auth.service";
import {Socket} from "socket.io";
import {EventMessage} from "@ui/shared/entities/event-message.entity";
import {User} from "@domain/auth/entities/User";

@Controller()
export class AuthController {
    constructor(
        private eventBusService: EventBusService,
        private authService: AuthService
    ){
        this.eventBusService.register(EventTypeEnum.CREATE_USER, this.createUser.bind(this));
    }

    createUser(socket: Socket, user: User): User | void{
        const res = this.authService.createUser(new User({...user as User}))

        if(socket){
            socket.emit('event', new EventMessage({
                type: EventTypeEnum.CREATE_USER,
                data: res
            }));
        } else {
            return res;
        }
    }
}
