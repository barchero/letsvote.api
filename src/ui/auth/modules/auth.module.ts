import {Module} from "@nestjs/common";
import {SharedModule} from "@ui/shared/modules/shared.module";
import {AuthService} from "@ui/auth/services/auth.service";

@Module({
    imports: [
        SharedModule
    ],
    providers: [AuthService],

})
export class AuthModule {
}
