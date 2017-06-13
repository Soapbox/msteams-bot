"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_teams_1 = require("botbuilder-teams");
const Sessions_1 = require("../Utilities/Sessions");
const Logger_1 = require("../Utilities/Logger");
const Team_1 = require("../Team");
const Bot_1 = require("../Bot");
class Accounts {
    static list(data) {
        let address = data.address;
        let session = Sessions_1.Sessions.load(Bot_1.Bot.getInstance(), address);
        return new Promise((resolve, reject) => {
            session.then((session) => {
                let connector = Team_1.Team.getInstance();
                let address = session.message.address;
                let serviceUrl = session.message.address.serviceUrl;
                let messages = new Array();
                if (serviceUrl === undefined) {
                    let message = 'Unexpected undefined session.message.address.serviceUrl.';
                    Logger_1.Logger.debug('microsoft.accounts.list', message);
                    messages.push(message);
                }
                if (address.conversation === undefined) {
                    let message = 'Unexpected undefinded session.message.address.conversation.';
                    Logger_1.Logger.debug('microsoft.accounts.list', message);
                    messages.push(message);
                }
                if (address.conversation.id === undefined) {
                    let message = 'Unexpected undefined session.message.address.conversation.id.';
                    Logger_1.Logger.debug('microsoft.accounts.list', message);
                    messages.push(message);
                }
                if (messages.length > 0) {
                    reject(new Error(messages.join(' ')));
                }
                connector.fetchMemberList(serviceUrl, session.message.address.conversation.id, botbuilder_teams_1.TeamsMessage.getTenantId(data), (error, result) => {
                    if (!error) {
                        resolve(result);
                    }
                    else {
                        Logger_1.Logger.debug('microsoft.accounts.list', 'Could not fetch memeber list.');
                        reject(error);
                    }
                });
            }).catch((error) => {
                Logger_1.Logger.debug('microsoft.accounts.list', 'Could not load a session');
                reject(error);
            });
        });
    }
}
exports.Accounts = Accounts;
