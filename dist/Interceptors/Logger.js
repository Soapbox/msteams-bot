"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../Utilities/Logger");
class Logger {
    constructor() {
        this.botbuilder = (session, next) => {
            Logger_1.Logger.debug('inbound', session.message.text);
            next();
        };
        this.send = (event, next) => {
            Logger_1.Logger.debug('outbound', event.text);
            next();
        };
    }
}
exports.Logger = Logger;
