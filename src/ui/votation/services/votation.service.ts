import {Injectable} from '@nestjs/common';
import {JoinRoomImpl} from "@application/votation/use-cases/JoinRoom";
import {UserRepositoryImpl} from "@infrastructure/memory/auth/UserRepository";
import {RoomRepositoryImpl} from "@infrastructure/memory/votation/RoomRepository";
import {JoinRoom} from "@domain/votation/use-cases/JoinRoom";
import {UUID} from "@domain/utils/value-objects/UUID";
import {Room} from "@domain/votation/entities/Room";
import {CreateRoom} from "@domain/votation/use-cases/CreateRoom";
import {CreateRoomImpl} from "@application/votation/use-cases/CreateRoom";
import {ChangeRoomStatus} from "@domain/votation/use-cases/ChangeRoomStatus";
import {ChangeRoomStatusImpl} from "@application/votation/use-cases/ChangeRoomStatus";
import {StatusEnum} from "@domain/votation/enums/StatusEnum";
import {Vote} from "@domain/votation/use-cases/Vote";
import {VoteImpl} from "@application/votation/use-cases/Vote";

@Injectable()
export class VotationService {

    private joinRoomImpl: JoinRoom;
    private createRoomImpl: CreateRoom;
    private changeRoomStatusImpl: ChangeRoomStatus;
    private voteImpl: Vote;

    constructor() {
        this.joinRoomImpl = new JoinRoomImpl(UserRepositoryImpl.getInstance(), RoomRepositoryImpl.getInstance());
        this.createRoomImpl = new CreateRoomImpl(RoomRepositoryImpl.getInstance());
        this.changeRoomStatusImpl = new ChangeRoomStatusImpl(RoomRepositoryImpl.getInstance());
        this.voteImpl = new VoteImpl(RoomRepositoryImpl.getInstance(), UserRepositoryImpl.getInstance());
    }

    createRoom(room: Room): Room{
        return this.createRoomImpl.execute(room);
    }

    joinRoom({roomUUID, userUUID}: {roomUUID: UUID, userUUID: UUID}): Room{
        return this.joinRoomImpl.execute(roomUUID, userUUID);
    }

    changeRoomStatus({roomUUID, status}: {roomUUID: UUID, status: StatusEnum}): Room {
        return this.changeRoomStatusImpl.execute(roomUUID, status);
    }

    vote({roomUUID, userUUID, value}: {roomUUID: UUID, userUUID: UUID, value: string}): Room {
        return this.voteImpl.execute(roomUUID, userUUID, value);
    }
}
