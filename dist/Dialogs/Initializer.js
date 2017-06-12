"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Default_1 = require("./Default");
const Help_1 = require("./Help");
class Initializer {
    static initialize(bot) {
        new Default_1.Default(bot);
        new Help_1.Help(bot);
    }
}
exports.Initializer = Initializer;
