"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../Utilities/Logger");
const Action_1 = require("./Action");
class ContactRelationUpdate extends Action_1.Action {
    getAction() {
        return 'contactRelationUpdate';
    }
    listener(data) {
        console.log(data);
        let action = data.action;
        if (action === 'add') {
            Logger_1.Logger.log('bot-added', 'Creating a channel for the team.');
        }
    }
}
exports.ContactRelationUpdate = ContactRelationUpdate;
