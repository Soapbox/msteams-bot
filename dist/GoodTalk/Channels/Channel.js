"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Channel {
    constructor(name) {
        this.name = name;
        this.users = new Array();
    }
    addUser(user) {
        this.users.push(user);
    }
    getUsers() {
        return this.users;
    }
}
exports.Channel = Channel;
