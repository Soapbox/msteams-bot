"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Constants_1 = require("../Constants");
class Service {
    static create(channel, actor, user, role = "employee") {
        let url = Constants_1.Constants.ROOT_URL + 'users/invite';
        //let url = 'http://webhook.site/90ce2e64-5317-4075-9abe-f24a28fe1ea4';
        return new Promise((resolve, reject) => {
            axios_1.default.post(url, {
                channel: {
                    id: channel.id
                },
                actor: {
                    id: actor.objectId,
                    name: actor.givenName,
                    email: actor.email
                },
                user: {
                    id: user.objectId,
                    name: user.givenName,
                    email: user.email,
                    role: role
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
