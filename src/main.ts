import {NestFactory} from '@nestjs/core';
import {Module} from "@nestjs/common";
import {Config} from "./Config";
import {VotationModule} from "@ui/votation/modules/votation.module";
import {AuthModule} from "@ui/auth/modules/auth.module";

@Module({
    imports: [
        AuthModule,
        VotationModule
    ]
})
class AppModule {}

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true});
    await app.listen(Config.SERVER_PORT);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
