"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require("botbuilder");
const Initializer_1 = require("./Dialogs/Initializer");
const Initializer_2 = require("./Actions/Initializer");
const Logger_1 = require("./Interceptors/Logger");
class Bot extends builder.UniversalBot {
    constructor(connector, settings) {
        super(connector, settings);
        Initializer_1.Initializer.initialize(this);
        Initializer_2.Initializer.initialize(this);
        this.use(new Logger_1.Logger());
    }
}
exports.Bot = Bot;
