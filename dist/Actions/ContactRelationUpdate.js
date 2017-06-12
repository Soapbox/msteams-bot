"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("./Action");
const Logger_1 = require("../Interceptors/Logger");
const Channels_1 = require("../Handlers/Channels");
class ContactRelationUpdate extends Action_1.Action {
    getAction() {
        return 'contactRelationUpdate';
    }
    listener(data) {
        let action = data.action;
        if (action === 'add') {
            Logger_1.Logger.log('bot-added', 'Creating a channel for the team.');
            Channels_1.Channels.create(this, data);
        }
    }
}
exports.ContactRelationUpdate = ContactRelationUpdate;
