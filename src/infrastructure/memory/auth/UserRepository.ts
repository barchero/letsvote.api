import {User} from "@domain/auth/entities/User";
import {UUID} from "@domain/utils/value-objects/UUID";
import {UserRepository} from "@domain/auth/repositories/UserRepository";

export class UserRepositoryImpl implements UserRepository{
    private static instance: UserRepository;
    private users: User[] = [];

    private constructor() {}

    static getInstance() {
        if(!UserRepositoryImpl.instance){
            UserRepositoryImpl.instance = new UserRepositoryImpl();
        }
        return UserRepositoryImpl.instance;
    }

    saveUser(user: User): User{
        if(!this.users.find((_user) => _user.id.value === user.id.value)){
            const newUser = new User({...user});
            this.users.push(newUser);
            return newUser;
        } else {
            throw Error(`User "${user.id}" already exist`);
        }
    };

    getUserByUUID(uuid: UUID): User{
        const user = this.users.find((_user) => _user.id.value === uuid.value);
        if(user) {
            return user;
        } else {
            throw Error(`User "${uuid}" doesn't exist`);
        }
    };

    updateUserByUUID(uuid: UUID, user: User): User{
        this.users = this.users.map((_user) => {
            if(_user.id === user.id){
                return new User({...user});
            } else {
                return _user;
            }
        });
        return this.getUserByUUID(uuid);
    }

    deleteUserByUUID(uuid: UUID): boolean{
        if(this.users.find((_user) => _user.id.value === uuid.value)) {
            this.users = this.users.splice(this.users.findIndex((_user) => _user.id.value === uuid.value), 1);
            return true;
        } else {
            throw Error(`User "${uuid}" doesn't exist`);
        }
        return false;
    };
}
