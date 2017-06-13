"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Configurations_1 = require("./Configurations");
const sprintf_js_1 = require("sprintf-js");
class Logger {
    static debug(tag, message) {
        if (Configurations_1.Configurations.isDebugging()) {
            Logger.log(tag, message);
        }
    }
    static log(tag, message) {
        if (message) {
            console.log(sprintf_js_1.sprintf('%s: %s', tag, message));
        }
    }
}
exports.Logger = Logger;
