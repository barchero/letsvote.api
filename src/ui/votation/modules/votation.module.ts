import {Module} from "@nestjs/common";
import {SharedModule} from "@ui/shared/modules/shared.module";
import {VotationService} from "@ui/votation/services/votation.service";
import {VotationController} from "@ui/votation/controllers/votation.controller";

@Module({
    controllers: [
        VotationController
    ],
    imports: [
        SharedModule
    ],
    providers: [VotationService],

})
export class VotationModule {
}
