"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateChannel_1 = require("../Flows/CreateChannel");
const Logger_1 = require("../Utilities/Logger");
const Action_1 = require("./Action");
class ConversationUpdate extends Action_1.Action {
    getAction() {
        return 'conversationUpdate';
    }
    listener(data) {
        let botAdded = data.membersAdded &&
            data.membersAdded[0] &&
            data.membersAdded[0].id == data.address.bot.id;
        if (botAdded) {
            Logger_1.Logger.log('actions.conversationUpdate.listener', 'Bot added, adding all members to all channels.');
            (new CreateChannel_1.CreateChannel(data))
                .handle();
        }
        else {
            Logger_1.Logger.log('actions.conversationUpdate.listener', 'Detected a conversation update, not sure what to do.');
            console.log(data);
        }
    }
}
exports.ConversationUpdate = ConversationUpdate;
