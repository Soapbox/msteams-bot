"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConversationUpdate_1 = require("./ConversationUpdate");
const ContactRelationUpdate_1 = require("./ContactRelationUpdate");
class Initializer {
    static initialize(bot) {
        new ConversationUpdate_1.ConversationUpdate(bot);
        new ContactRelationUpdate_1.ContactRelationUpdate(bot);
    }
}
exports.Initializer = Initializer;
