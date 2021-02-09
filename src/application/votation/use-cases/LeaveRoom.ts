import {UUID} from "@domain/utils/value-objects/UUID";
import {LeaveRoom} from "@domain/votation/use-cases/LeaveRoom";
import {UserRepository} from "@domain/auth/repositories/UserRepository";
import {RoomRepository} from "@domain/votation/repositories/RoomRepository";
import {RolesEnum} from "@domain/auth/enums/RolesEnum";
import {CloseRoomImpl} from "@application/votation/use-cases/CloseRoom";
import {ChangeRolesImpl} from "@application/auth/use-cases/ChangeRoles";

export class LeaveRoomImpl implements LeaveRoom{
    constructor(private userRepository: UserRepository, private roomRepository: RoomRepository) {}

    execute(roomUUID: UUID, userUUID: UUID): boolean{
        const room = this.roomRepository.getRoomByUUID(roomUUID);
        const user = this.userRepository.getUserByUUID(userUUID);
        if(room && user) {
            const userInRoom = room.users.find((_user) => user.id.value === _user.id.value);
            if(userInRoom) {
                room.users = room.users.splice(room.users.findIndex((_user) => user.id.value === _user.id.value), 1);
                if(!room.users.find((_user) => _user.roles.indexOf(RolesEnum.ADMIN) !== -1)){
                    const userToPromote = room.users[0];
                    const changeRoles = new ChangeRolesImpl(this.userRepository);
                    changeRoles.execute(userToPromote.id, [RolesEnum.ADMIN, ...userToPromote.roles]);
                }
                if(room.users.length === 0){
                    const closeRoom = new CloseRoomImpl(this.roomRepository);
                    closeRoom.execute(roomUUID);
                }
                return true;
            } else {
                throw Error(`User "${userUUID}" doesn't esists in room "${roomUUID}"`);
            }
        } else {
            if(!room){
                throw Error(`The room "${roomUUID}" doesn't exists`);
            }
            if(!user){
                throw Error(`The user "${userUUID}" doesn't exists`);
            }
        }
        return false;
    }
}
