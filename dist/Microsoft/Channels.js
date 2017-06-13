"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sessions_1 = require("../Utilities/Sessions");
const Logger_1 = require("../Utilities/Logger");
const Team_1 = require("../Team");
const Bot_1 = require("../Bot");
class Channels {
    static list(data) {
        let address = data.address;
        let session = Sessions_1.Sessions.load(Bot_1.Bot.getInstance(), address);
        return new Promise((resolve, reject) => {
            session.then((session) => {
                let connector = Team_1.Team.getInstance();
                let address = session.message.address;
                let serviceUrl = session.message.address.serviceUrl;
                let teamId = session.message.sourceEvent.team.id;
                connector.fetchChannelList(serviceUrl, teamId, (err, result) => {
                    if (!err) {
                        resolve(result);
                    }
                    else {
                        Logger_1.Logger.debug('microsoft.channels.list', 'Could not fetch channel list.');
                        reject(err);
                    }
                });
            }).catch((error) => {
                Logger_1.Logger.debug('microsoft.channels.list', 'Could not load session');
                console.log(error);
                reject(error);
            });
        });
    }
}
exports.Channels = Channels;
