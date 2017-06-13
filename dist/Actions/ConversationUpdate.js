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
        console.log(data);
        if (data.membersAdded) {
            Logger_1.Logger.log('members-added', 'Adding members to channels.');
            (new CreateChannel_1.CreateChannel(data))
                .handle();
        }
    }
}
exports.ConversationUpdate = ConversationUpdate;
