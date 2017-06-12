"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("./Action");
const Logger_1 = require("../Interceptors/Logger");
const Channels_1 = require("../Handlers/Channels");
class ConversationUpdate extends Action_1.Action {
    getAction() {
        return 'conversationUpdate';
    }
    listener(data) {
        Logger_1.Logger.log('members-added', 'Adding members to channels.');
        Channels_1.Channels.addMembers(this, data);
    }
}
exports.ConversationUpdate = ConversationUpdate;
