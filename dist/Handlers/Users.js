"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sessions_1 = require("../Utilities/Sessions");
const Bot_1 = require("../Bot");
const Team_1 = require("../Team");
const teams = require("botbuilder-teams");
const Logger_1 = require("../Interceptors/Logger");
class Users {
    static lookup(data) {
        let address = data.address;
        let session = Sessions_1.Sessions.load(Bot_1.Bot.getInstance(), address);
        Logger_1.Logger.log('Users.lookup', 'Looking up users');
        console.log(address);
        session.then((session) => {
            let connector = Team_1.Team.getInstance();
            let address = session.message.address;
            let serviceUrl = session.message.address.serviceUrl;
            if (serviceUrl && address.conversation && address.conversation.id) {
                connector.fetchMemberList(serviceUrl, session.message.address.conversation.id, teams.TeamsMessage.getTenantId(data), (err, result) => {
                    if (!err) {
                        let response = "";
                        for (let i = 0; i < result.length; i++) {
                            console.log(result[i]);
                            response += result[i].givenName + " " + result[i].surname + "<br>";
                        }
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
