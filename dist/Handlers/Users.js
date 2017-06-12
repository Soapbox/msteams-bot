"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sessions_1 = require("../Utilities/Sessions");
const Bot_1 = require("../Bot");
const teams = require("botbuilder-teams");
class Users {
    static lookup(address) {
        let session = Sessions_1.Sessions.load(Bot_1.Bot.getInstance(), address);
        session.then((session) => {
            let connector = new teams.TeamsChatConnector(session.connector);
            let address = session.message.address;
            let serviceUrl = address.serviceUrl;
            if (serviceUrl && address.conversation && address.conversation.id) {
                connector.fetchMemberList(serviceUrl, address.conversation.id, teams.TeamsMessage.getTenantId(session.message), (err, result) => {
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
