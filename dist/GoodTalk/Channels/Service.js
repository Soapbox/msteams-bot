"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class Service {
    static create(tenantId, actor, channel) {
        //let url = Constants.ROOT_URL + 'channels';
        let url = 'http://webhook.site/72c58b88-f92f-4c56-84a7-9491f123cdbc';
        let name = 'General';
        if (!(channel.name) || channel.name.length === 0) {
            channel.name = name;
        }
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
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}
exports.Service = Service;
