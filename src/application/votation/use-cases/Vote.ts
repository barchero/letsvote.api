import {UUID} from "@domain/utils/value-objects/UUID";
import {Vote} from "@domain/votation/use-cases/Vote";
import {Vote as VoteEntity} from '@domain/votation/entities/Vote';
import {UserRepository} from "@domain/auth/repositories/UserRepository";
import {RoomRepository} from "@domain/votation/repositories/RoomRepository";
import {Room} from "@domain/votation/entities/Room";

export class VoteImpl implements Vote {

    constructor(private roomRepository: RoomRepository, private userRepository: UserRepository){}

    execute(roomUUID: UUID, userUUID: UUID, value: string): Room {
        const room = this.roomRepository.getRoomByUUID(roomUUID);
        const user = this.userRepository.getUserByUUID(userUUID);
        if(room && user) {
            const userVote = room.votes.find((_vote) =>_vote.user.id.value === userUUID.value);
            if(userVote) {
                userVote.value = value;
            } else {
                room.votes.push(new VoteEntity({value, user}))
            }
        } else {
            if(!room){
                throw Error(`The room "${roomUUID}" doesn't exists`);
            }
            if(!user){
                throw Error(`The user "${userUUID}" doesn't exists`);
            }
        }
        return room;
    }
}
