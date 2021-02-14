import {Module} from "@nestjs/common";
import {SharedModule} from "@ui/shared/modules/shared.module";
import {AuthService} from "@ui/auth/services/auth.service";
import {AuthController} from "@ui/auth/controllers/auth.controller";

@Module({
    controllers: [
      AuthController
    ],
    imports: [
        SharedModule
    ],
    providers: [AuthService],
})
export class AuthModule {
}
