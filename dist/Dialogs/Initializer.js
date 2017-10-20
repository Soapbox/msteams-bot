"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Help_1 = require("./Help");
class Initializer {
    static initialize(bot) {
        // new Default(bot);
        new Help_1.Help(bot);
    }
}
exports.Initializer = Initializer;
