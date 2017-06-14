"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Constants_1 = require("../Constants");
class Service {
    static create(channel, actor, user) {
        let url = Constants_1.Constants.ROOT_URL + '14ie8wu1';
        return new Promise((resolve, reject) => {
            axios_1.default.post(url, {
                channel: {
                    id: channel.id
                },
                actor: {
                    id: actor.id,
                    name: actor.givenName,
                    email: actor.email
                },
                user: {
                    id: user.id,
                    name: user.givenName,
                    email: user.email
                }
            }).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}
exports.Service = Service;
