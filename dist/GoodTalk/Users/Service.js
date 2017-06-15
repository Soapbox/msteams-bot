"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class Service {
    static create(channel, actor, user, role = "employee") {
        //let url = Constants.ROOT_URL + 'users/invite';
        let url = 'http://webhook.site/8144e40c-4f9d-49f1-b357-df1585ae7643';
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
