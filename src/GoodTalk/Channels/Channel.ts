import { User } from '../Users/User'

export class Channel {
    users: Array<User>;

    constructor(protected name: string) {
        this.users = new Array<User>();
    }

    public addUser(user: User): void {
        this.users.push(user);
    }

    public getUsers(): Array<User> {
        return this.users;
    }
}