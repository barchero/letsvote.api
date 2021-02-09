import {Injectable} from '@nestjs/common';
import {EventBusService} from "@ui/shared/services/event-bus.service";
import {JoinRoomImpl} from "@application/votation/use-cases/JoinRoom";
import {UserRepositoryImpl} from "@infrastructure/memory/auth/UserRepository";
import {RoomRepositoryImpl} from "@infrastructure/memory/votation/RoomRepository";
import {JoinRoom} from "@domain/votation/use-cases/JoinRoom";
import {UUID} from "@domain/utils/value-objects/UUID";
import {Room} from "@domain/votation/entities/Room";
import {EventTypeEnum} from "@ui/shared/enums/event-type.enum";
import {CreateRoom} from "@domain/votation/use-cases/CreateRoom";
import {CreateRoomImpl} from "@application/votation/use-cases/CreateRoom";

@Injectable()
export class VotationService {

    private static joinRoomImpl: JoinRoom;
    private static createRoomImpl: CreateRoom;

    constructor(private eventBusService: EventBusService) {
        VotationService.joinRoomImpl = new JoinRoomImpl(UserRepositoryImpl.getInstance(), RoomRepositoryImpl.getInstance());
        VotationService.createRoomImpl = new CreateRoomImpl(RoomRepositoryImpl.getInstance());

        this.eventBusService.register<object, Room>(EventTypeEnum.CREATE_ROOM, VotationService.createRoom);
        this.eventBusService.register<{roomUUID: string, userUUID: string}, Room>(EventTypeEnum.JOIN_ROOM, VotationService.joinRoom);
    }

    static createRoom(room): Room{
        return VotationService.createRoomImpl.execute(new Room({...room}))
    }

    static joinRoom({roomUUID, userUUID}: {roomUUID: string, userUUID: string}): Room{
        return VotationService.joinRoomImpl.execute(new UUID(roomUUID), new UUID(userUUID));
    }

}
