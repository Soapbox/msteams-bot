"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require("botbuilder");
const Initializer_1 = require("./Dialogs/Initializer");
const Initializer_2 = require("./Actions/Initializer");
const Logger_1 = require("./Interceptors/Logger");
const StripBotAtMentions_1 = require("./Interceptors/StripBotAtMentions");
class Bot extends builder.UniversalBot {
    static initialize(connector, settings) {
        Bot.bot = new Bot(connector, settings);
        console.log('BOT _ INIT');
        console.log(connector);
    }
    static getInstance() {
        return Bot.bot;
    }
    constructor(connector, settings) {
        super(connector, settings);
        Initializer_1.Initializer.initialize(this);
        Initializer_2.Initializer.initialize(this);
        this.use(new Logger_1.Logger());
        this.use(new StripBotAtMentions_1.StripBotAtMentions());
    }
}
exports.Bot = Bot;
