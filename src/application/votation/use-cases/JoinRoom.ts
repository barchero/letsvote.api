import {UUID} from "@domain/utils/value-objects/UUID";
import {Room} from "@domain/votation/entities/Room";
import {JoinRoom} from "@domain/votation/use-cases/JoinRoom";
import {UserRepository} from "@domain/auth/repositories/UserRepository";
import {RoomRepository} from "@domain/votation/repositories/RoomRepository";

export class JoinRoomImpl implements JoinRoom {
    constructor(private userRepository: UserRepository, private roomRepository: RoomRepository){}

    execute(roomUUID: UUID, userUUID: UUID): Room{
        const room = this.roomRepository.getRoomByUUID(roomUUID);
        const user = this.userRepository.getUserByUUID(userUUID);
        if(room && user) {
            const userInRoom = room.users.find((_user) => user.id.value === _user.id.value);
            if(!userInRoom) {
                room.users.push(user);
            }
            return room;
        } else {
            if(!room){
                throw Error(`The room "${roomUUID}" doesn't exists`);
            }
            if(!user){
                throw Error(`The user "${userUUID}" doesn't exists`);
            }
        }
    };
}
