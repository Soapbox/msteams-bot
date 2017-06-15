"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class Service {
    static create(tenantId, actor, channel) {
        //let url = Constants.ROOT_URL + 'channels';
        let url = 'http://webhook.site/fdb0f2c4-2f99-4159-a72f-5b4a03985116';
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
