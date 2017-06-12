"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sprintf = require('sprintf-js').sprintf;
class Logger {
    constructor() {
        this.botbuilder = (session, next) => {
            Logger.log('inbound', session.message.text);
            next();
        };
        this.send = (event, next) => {
            Logger.log('outbound', event.text);
            next();
        };
    }
    static log(tag, message) {
        if (message) {
            console.log(sprintf('%s: %s', tag, message));
        }
    }
}
exports.Logger = Logger;
