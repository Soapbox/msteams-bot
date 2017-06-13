"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Channel_1 = require("./Channel");
class Service {
    static createOrFind(channel) {
        return new Promise((resolve, reject) => {
            resolve(new Channel_1.Channel('name'));
        });
    }
}
exports.Service = Service;
