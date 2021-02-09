import {Module} from "@nestjs/common";
import {SharedModule} from "@ui/shared/modules/shared.module";
import {VotationService} from "@ui/votation/services/votation.service";

@Module({
    imports: [
        SharedModule
    ],
    providers: [VotationService],

})
export class VotationModule {
}
