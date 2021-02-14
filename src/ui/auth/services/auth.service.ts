import {Injectable} from '@nestjs/common';
import {EventBusService} from "@ui/shared/services/event-bus.service";
import {UserRepositoryImpl} from "@infrastructure/memory/auth/UserRepository";
import {User} from "@domain/auth/entities/User";
import {EventTypeEnum} from "@ui/shared/enums/event-type.enum";
import {CreateUser} from "@domain/auth/use-cases/CreateUser";
import {CreateUserImpl} from "@application/auth/use-cases/CreateUser";

@Injectable()
export class AuthService {

    private createUserImpl: CreateUser;

    constructor() {
        this.createUserImpl = new CreateUserImpl(UserRepositoryImpl.getInstance());
    };

    createUser(user): User{
        return this.createUserImpl.execute(user);
    }

}
