"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Constants_1 = require("../Constants");
class Service {
    static create(tenantId, actor, channel) {
        let url = Constants_1.Constants.ROOT_URL + 'channels';
        //let url = 'https://requestb.in/15tdhpb1';
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
