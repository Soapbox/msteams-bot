"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateChannel_1 = require("../Flows/CreateChannel");
const Sessions_1 = require("../Utilities/Sessions");
const Logger_1 = require("../Utilities/Logger");
const Action_1 = require("./Action");
const Bot_1 = require("../Bot");
class ConversationUpdate extends Action_1.Action {
    getAction() {
        return 'conversationUpdate';
    }
    listener(data) {
        let session = Sessions_1.Sessions.load(Bot_1.Bot.getInstance(), data.address);
        console.log(session);
        console.log(data);
        if (data.membersAdded) {
            Logger_1.Logger.log('members-added', 'Adding members to channels.');
            (new CreateChannel_1.CreateChannel(data))
                .handle();
        }
    }
}
exports.ConversationUpdate = ConversationUpdate;
