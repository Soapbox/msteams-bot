"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sessions_1 = require("../Utilities/Sessions");
const Bot_1 = require("../Bot");
const Team_1 = require("../Team");
const teams = require("botbuilder-teams");
class Users {
    static list(data) {
        let address = data.address;
        let session = Sessions_1.Sessions.load(Bot_1.Bot.getInstance(), address);
        return new Promise((resolve, reject) => {
            session.then((session) => {
                let connector = Team_1.Team.getInstance();
                let address = session.message.address;
                let serviceUrl = session.message.address.serviceUrl;
                if (serviceUrl && address.conversation && address.conversation.id) {
                    connector.fetchMemberList(serviceUrl, session.message.address.conversation.id, teams.TeamsMessage.getTenantId(data), (err, result) => {
                        if (!err) {
                            resolve(result);
                        }
                        else {
                            reject(err);
                        }
                    });
                }
            }).catch((reason) => {
                reject(reason);
            });
        });
    }
}
exports.Users = Users;
