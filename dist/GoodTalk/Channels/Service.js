"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const Channel_1 = require("./Channel");
const axios_1 = require("axios");
class Service {
    static createOrFind(channel) {
        return new Promise((resolve, reject) => {
            resolve(new Channel_1.Channel('name'));
        });
    }
    static create(tenantId, actor, channel) {
        let url = Constants_1.Constants.ROOT_URL;
        return new Promise((resolve, reject) => {
            axios_1.default.post(url, {
                tenant: {
                    id: tenantId
                },
                actor: {
                    id: actor.id,
                    name: actor.givenName,
                    email: actor.email
                },
                channel: {
                    id: channel.id,
                    name: channel.name
                }
            }).then((response) => {
                resolve(true);
            }).catch((error) => {
                resolve(false);
            });
            reject(new Error('wat'));
        });
    }
}
exports.Service = Service;
