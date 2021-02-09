import {UUID} from "@domain/utils/value-objects/UUID";
import {Room} from "@domain/votation/entities/Room";
import {RoomRepository} from "@domain/votation/repositories/RoomRepository";
import {User} from "@domain/auth/entities/User";

export class RoomRepositoryImpl implements RoomRepository {
    private static instance: RoomRepository;
    private rooms: Room[] = [];

    private constructor() {}
    
    static getInstance() {
        if(!RoomRepositoryImpl.instance){
            RoomRepositoryImpl.instance = new RoomRepositoryImpl();
        }
        return RoomRepositoryImpl.instance;
    }

    getRoomByUUID(uuid: UUID): Room{
        const room = this.rooms.find((_room)=> _room.id.value === uuid.value);
        if(room){
            return room;
        } else {
            throw Error(`Room "${uuid}" doesn't exist`);
        }
    };

    getRoomList(): Room[]{
        return this.rooms;
    };

    saveRoom(room: Room): Room{
        if(!this.rooms.find((_room)=>_room.id.value === room.id.value)){
            const newRoom = new Room({...room});
            this.rooms.push(newRoom);
            return newRoom;
        } else {
            throw Error(`Room "${room.id}" already exist`);
        }
    };

    updateRoomByUUID(uuid: UUID, room: Room): Room{
        this.rooms = this.rooms.map((_room) => {
            if(_room.id.value === room.id.value){
                return new Room({...room});
            } else {
                return _room;
            }
        });
        return this.getRoomByUUID(uuid);
    };

    deleteRoomByUUID(uuid: UUID): boolean{
        if(this.rooms.find((_user) => _user.id.value === uuid.value)) {
            this.rooms = this.rooms.splice(this.rooms.findIndex((_user) => _user.id === uuid), 1);
            return true;
        } else {
            throw Error(`Room "${uuid}" doesn't exist`);
        }
        return false;
    };
}
