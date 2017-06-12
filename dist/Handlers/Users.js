"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sessions_1 = require("../Utilities/Sessions");
const Bot_1 = require("../Bot");
const Team_1 = require("../Team");
const teams = require("botbuilder-teams");
const Logger_1 = require("../Interceptors/Logger");
class Users {
    static lookup(address) {
        let session = Sessions_1.Sessions.load(Bot_1.Bot.getInstance(), address);
        Logger_1.Logger.log('Users.lookup', 'Looking up users');
        session.then((session) => {
            let connector = Team_1.Team.getInstance();
            let address = session.message.address;
            let serviceUrl = session.message.address.serviceUrl;
            Logger_1.Logger.log('Users.lookup.session', 'Inpsecting that session');
            if (serviceUrl && address.conversation && address.conversation.id) {
                Logger_1.Logger.log('fetchMemberList', 'Fetching the member list');
                console.log(connector);
                connector.fetchMemberList(serviceUrl, session.message.address.conversation.id, teams.TeamsMessage.getTenantId(session.message), (err, result) => {
                    if (!err) {
                        let response = "";
                        for (let i = 0; i < result.length; i++) {
                            response += result[i].givenName + " " + result[i].surname + "<br>";
                        }
                        console.log(response);
                        session.send(response);
                    }
                    else {
                        session.error(err);
                    }
                    session.endDialog();
                });
            }
        }).catch((reason) => {
            console.log("Could not get users");
        });
    }
}
exports.Users = Users;
