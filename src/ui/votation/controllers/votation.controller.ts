import {Controller} from "@nestjs/common";
import {Room} from "@domain/votation/entities/Room";
import {EventTypeEnum} from "@ui/shared/enums/event-type.enum";
import {EventBusService} from "@ui/shared/services/event-bus.service";
import {Socket} from "socket.io";
import {VotationService} from "@ui/votation/services/votation.service";
import {EventMessage} from "@ui/shared/entities/event-message.entity";
import {UUID} from "@domain/utils/value-objects/UUID";
import {StatusEnum} from "@domain/votation/enums/StatusEnum";

@Controller()
export class VotationController {
    constructor(
        private eventBusService: EventBusService,
        private votationService: VotationService
    ){
        this.eventBusService.register<object, Room>(EventTypeEnum.CREATE_ROOM, this.createRoom.bind(this));
        this.eventBusService.register<{roomUUID: string, userUUID: string}, Room>(EventTypeEnum.JOIN_ROOM, this.joinRoom.bind(this));
        this.eventBusService.register<{roomUUID: string, status: string}, Room>(EventTypeEnum.CHANGE_ROOM_STATUS, this.changeRoomStatus.bind(this));
        this.eventBusService.register< {roomUUID: string, userUUID: string, value: string}, Room>(EventTypeEnum.VOTE, this.vote.bind(this));
    }

    createRoom(socket: Socket, room: Room): Room | void {
        const res = this.votationService.createRoom(new Room({...room}));
        if(socket){
            socket.emit('event', new EventMessage<Room>({
                type: EventTypeEnum.CREATE_ROOM,
                data: res
            }));
        } else {
            return res;
        }
    }

    joinRoom(socket: Socket, {roomUUID, userUUID}: {roomUUID: string, userUUID: string}): Room | void{
        const room = this.votationService.joinRoom({
            roomUUID: new UUID(roomUUID),
            userUUID: new UUID(userUUID)
        });

        if(socket) {
            socket.join((room as Room).id.value);
            socket.emit('event', new EventMessage({
                type: EventTypeEnum.JOIN_ROOM,
                data: room
            }));
        } else {
            return room;
        }
    }

    changeRoomStatus(socket: Socket, {roomUUID, status}: {roomUUID: string, status: string}): Room | void {
        const room = this.votationService.changeRoomStatus({roomUUID: new UUID(roomUUID), status: (status as StatusEnum)});

        if(socket) {
            socket.to(room.id.value).broadcast.emit('event', new EventMessage({
                type: EventTypeEnum.CHANGE_ROOM_STATUS,
                data: room
            }));
        } else {
            return room;
        }
    }

    vote(socket: Socket, {roomUUID, userUUID, value}: {roomUUID: string, userUUID: string, value: string}): Room | void {
        const voteRoom = this.votationService.vote({
            roomUUID: new UUID(roomUUID),
            userUUID: new UUID(userUUID),
            value
        });

        if(socket) {
            socket.to(roomUUID).broadcast.emit('event', new EventMessage({
                type: EventTypeEnum.VOTE,
                data: voteRoom
            }));
        } else {
            return voteRoom;
        }
    }

}
